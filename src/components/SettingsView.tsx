import { motion } from 'framer-motion';
import {
    Bell,
    Moon,
    Sun,
    Shield,
    RefreshCw,
    Eye,
    Database,
    Smartphone,
    Info
} from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useFestival } from '@/context/FestivalContext';

export function SettingsView() {
    const { venues } = useFestival();

    useEffect(() => {
        document.title = "Settings | FESTPULSE";
    }, []);

    return (
        <div className="space-y-6 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    System Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your FESTPULSE experience and system preferences
                </p>
            </motion.div>

            <div className="grid gap-6">
                {/* Appearance & Notifications */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        General Preferences
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Push Notifications</p>
                                    <p className="text-xs text-muted-foreground">Receive instant alerts for critical crowd levels</p>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/50 opacity-60">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <Sun className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="font-medium">Theme Mode (Locked)</p>
                                    <p className="text-xs text-muted-foreground">High-contrast dark mode is optimized for festival grounds</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Moon className="w-4 h-4 text-primary" />
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">Dark Only</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Simulation Control */}
                <div className="glass-card p-6 border-indigo-500/20">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-400">
                        <Database className="w-5 h-5" />
                        Simulation Engine
                    </h2>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground mb-4">
                            These controls are available for the hackathon demonstration to test system behavior.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1 border-dashed border-indigo-500/30 hover:bg-indigo-500/5">
                                <RefreshCw className="w-5 h-5 text-indigo-400" />
                                <span className="text-xs">Reset All Venue Data</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1 border-dashed border-indigo-500/30 hover:bg-indigo-500/5">
                                <Smartphone className="w-5 h-5 text-indigo-400" />
                                <span className="text-xs">Trigger Test Alert</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* About / Info */}
                <div className="glass-card p-6 bg-muted/10">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-slate-400" />
                        System Information
                    </h2>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                            <span>Platform Version</span>
                            <span className="text-foreground font-mono">v2.1.0-stable</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Frontend Hash</span>
                            <span className="text-foreground font-mono text-[10px]">CULT_2026_XR_992</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Last Data Sync</span>
                            <span className="text-foreground font-mono">Just Now</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 px-8">
                        Save All Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
