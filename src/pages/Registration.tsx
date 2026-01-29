import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check, Download, Loader2, ArrowRight } from 'lucide-react';
import QRCode from 'qrcode';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


/**
 * Form validation schema for registration
 */
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits." }),
    college: z.string({ required_error: "Please select your college." }),
    rollNumber: z.string().optional(),
    terms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const COLLEGES = [
    "IIT Goa",
    "Goa Engineering College",
    "BITS Goa",
    "NIT Goa",
    "PCCE",
    "Don Bosco College",
    "Other"
];

export default function Registration() {
    const [loading, setLoading] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [studentData, setStudentData] = useState<{ id: string, name: string } | null>(null);

    /**
     * Set the page title on mount
     */
    useEffect(() => {
        document.title = "Register | HackOverFlow @ CULTRANG";
    }, []);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            rollNumber: "",
            terms: false,
        },
    });

    const onSubmit = async (data: FormValues) => {
        setLoading(true);

        /**
         * Simulation of a network request
         */
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            /**
             * Generate a unique ID for the student
             */
            const uniqueId = uuidv4();

            /**
             * Secure payload structure for the QR code
             * In a production app, this would be signed on the server
             */
            const payload = {
                v: "2.0",
                id: uniqueId,
                fid: "CULTRANG_2026",
                nm: data.name,
                clg: data.college,
                ts: Date.now(),
                // mock signature - in prod fetch from API
                sig: btoa(`${uniqueId}:${data.email}:${Date.now()}`),
            };

            const url = await QRCode.toDataURL(JSON.stringify(payload), {
                width: 512,
                margin: 2,
                color: {
                    dark: '#020617', // Slate 950
                    light: '#ffffff',
                },
                errorCorrectionLevel: 'H',
            });

            setQrCodeUrl(url);
            setStudentData({ id: uniqueId, name: data.name });
            toast.success("Registration Successful!", {
                description: "Your festival pass is ready."
            });
        } catch (err) {
            toast.error("Generation Failed", {
                description: "Could not generate QR code. Please try again."
            });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const downloadQR = () => {
        if (qrCodeUrl && studentData) {
            const link = document.createElement('a');
            link.href = qrCodeUrl;
            link.download = `FESTPULSE_PASS_${studentData.name.replace(/\s+/g, '_')}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Ticket Downloaded");
        }
    };

    // --- Success State ---
    if (qrCodeUrl && studentData) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-background">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="w-full max-w-md border-border shadow-2xl">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-foreground">You're In!</CardTitle>
                            <CardDescription>
                                Registration confirmed for <span className="font-semibold text-foreground">{studentData.name}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center space-y-6 pt-4">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative p-6 bg-white rounded-xl">
                                    <img src={qrCodeUrl} alt="Entry QR Code" className="w-56 h-56" />
                                </div>
                            </div>
                            <div className="text-center space-y-1 bg-muted/50 p-3 rounded-lg w-full">
                                <p className="text-xs uppercase tracking-widest text-muted-foreground">Ticket ID</p>
                                <p className="text-sm font-mono font-medium truncate px-4">{studentData.id}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 pb-8">
                            <Button onClick={downloadQR} className="w-full gap-2 bg-gradient-brand shadow-lg hover:shadow-xl transition-all">
                                <Download className="w-4 h-4" /> Save Ticket to Device
                            </Button>
                            <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" onClick={() => {
                                setQrCodeUrl(null);
                                setStudentData(null);
                                form.reset();
                            }}>
                                Register Another Attendee
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // --- Registration Form ---
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background/50">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <div className="mb-8 text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                        FESTPULSE
                    </h1>
                    <p className="text-muted-foreground font-medium">Official Registration Portal</p>
                </div>

                <Card className="border-border shadow-xl backdrop-blur-sm bg-card/80">
                    <CardHeader>
                        <CardTitle className="text-xl">Student Registration</CardTitle>
                        <CardDescription>
                            Enter your details to generate your secure entry pass.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Aditi Sharma" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="98765 00000" type="tel" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="student@org.edu" type="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="college"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Institution</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your college" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {COLLEGES.map((college) => (
                                                        <SelectItem key={college} value={college}>
                                                            {college}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="rollNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Roll Number <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 2024CS01" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="terms"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="font-normal cursor-pointer">
                                                    I agree to the <span className="text-primary hover:underline">Code of Conduct</span> and event guidelines.
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-semibold bg-gradient-brand shadow-md hover:shadow-lg transition-all"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Securing Pass...
                                        </>
                                    ) : (
                                        <>
                                            Get Festival Pass <ArrowRight className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="justify-center border-t py-4 bg-muted/20">
                        <p className="text-xs text-muted-foreground text-center">
                            Protected by CrowdPulse SecureEntry™ v2.0
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
