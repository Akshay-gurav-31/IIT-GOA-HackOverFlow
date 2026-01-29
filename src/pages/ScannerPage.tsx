import { QRScanner } from '@/components/QRScanner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ScannerPage() {
    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-md mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Guard Terminal</h1>
                        <p className="text-sm text-muted-foreground">Entry/Exit Management</p>
                    </div>
                </div>

                <QRScanner />

                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs">
                    <p className="font-semibold mb-1">⚠️ Queue Mode Active</p>
                    <p>Offline scans will be synced when connection is restored.</p>
                </div>
            </div>
        </div>
    );
}
