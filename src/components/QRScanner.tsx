import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Plus, Minus, Smartphone, Camera, CameraOff, WifiOff } from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { toast } from 'sonner';

import { VenueIcon } from './VenueIcon';

export function QRScanner() {
  const { venues, scanEntry, scanExit } = useFestival();
  const [selectedVenue, setSelectedVenue] = useState(venues[0]?.id || '');
  const [scanCount, setScanCount] = useState(0);
  const [mode, setMode] = useState<'real' | 'simulate'>('real');
  const [scanType, setScanType] = useState<'entry' | 'exit'>('entry');
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  /**
   * Offline detection state
   */
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  /**
   * Developer mode trigger state
   */
  const [devModeClicks, setDevModeClicks] = useState(0);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleDevClick = () => {
    const newCount = devModeClicks + 1;
    setDevModeClicks(newCount);
    if (newCount === 5) {
      setIsDevMode(true);
      toast.info("Developer Mode Enabled: Simulation Active");
    }
  };

  const handleScan = (type: 'entry' | 'exit', data?: string) => {
    if (!selectedVenue) {
      toast.error('Please select a venue first');
      return;
    }

    /**
     * Attempt to parse QR data if it is a JSON string
     */
    let studentInfo = data;
    if (data) {
      try {
        const parsed = JSON.parse(data);
        studentInfo = parsed.name || parsed.sid || data;
      } catch (e) {
        // Not JSON, use raw string
      }
    }

    if (type === 'entry') {
      scanEntry(selectedVenue);
      toast.success(`Entry Scanned${studentInfo ? `: ${studentInfo}` : ''}`);
    } else {
      scanExit(selectedVenue);
      toast.info(`Exit Scanned${studentInfo ? `: ${studentInfo}` : ''}`);
    }
    setScanCount(prev => prev + 1);
    setLastScanned(studentInfo || 'Manual Scan');

    /**
     * Provide haptic feedback on scan
     */
    if (navigator.vibrate) {
      navigator.vibrate(type === 'entry' ? 50 : [50, 50, 50]);
    }
  };

  interface IDetectedBarcode {
    rawValue: string;
    format: string;
  }

  const onQrDecode = (result: IDetectedBarcode[]) => {

    const rawValue = result?.[0]?.rawValue;
    if (rawValue) {
      handleScan(scanType, rawValue);
    }
  };

  const selectedVenueData = venues.find(v => v.id === selectedVenue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      {/* Offline Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-destructive/15 text-destructive text-xs font-semibold p-2 rounded-t-lg flex items-center justify-center gap-2 mb-4 border border-destructive/20"
          >
            <WifiOff className="w-3 h-3" />
            OFFLINE MODE - Queuing Scans
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${mode === 'real' ? 'bg-purple-500/10 text-purple-500' : 'bg-primary/10 text-primary'}`}
            onClick={handleDevClick}
          >
            {mode === 'real' ? <Camera className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-semibold text-foreground select-none" onClick={handleDevClick}>
              {mode === 'real' ? 'Live Scanner' : 'Simulate Scan'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {mode === 'real' ? 'Auto-detects QR codes' : 'Manual entry/exit buttons'}
            </p>
          </div>
        </div>

        {/* Only show toggle if Dev Mode is active */}
        {isDevMode && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={mode === 'simulate' ? 'default' : 'outline'}
              onClick={() => setMode('simulate')}
              className="text-xs h-8"
            >
              Sim
            </Button>
            <Button
              size="sm"
              variant={mode === 'real' ? 'default' : 'outline'}
              onClick={() => setMode('real')}
              className="text-xs h-8"
            >
              Cam
            </Button>
          </div>
        )}
      </div>

      {/* Venue Selector */}
      <div className="mb-6">
        <label className="text-xs text-muted-foreground mb-2 block">Select Venue</label>
        <Select value={selectedVenue} onValueChange={setSelectedVenue}>
          <SelectTrigger className="bg-muted/50 border-border">
            <SelectValue placeholder="Choose venue" />
          </SelectTrigger>
          <SelectContent>
            {venues.map(venue => (
              <SelectItem key={venue.id} value={venue.id}>
                <span className="flex items-center gap-2">
                  <VenueIcon icon={venue.icon} className="w-4 h-4" />
                  <span>{venue.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current Count */}
      {selectedVenueData && (
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground mb-1">Current at {selectedVenueData.name}</p>
          <p className={`text-4xl font-bold ${scanType === 'entry' ? 'text-green-500' : 'text-red-500'} transition-colors`}>
            {selectedVenueData.currentCrowd.toLocaleString()}
          </p>
        </div>
      )}

      {/* Real Scanner Mode */}
      {mode === 'real' && (
        <div className="mb-6 space-y-4">
          <div className="flex gap-2 p-1 bg-muted/50 rounded-lg">
            <button
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${scanType === 'entry' ? 'bg-green-500 text-white shadow-lg' : 'text-muted-foreground hover:bg-background/50'}`}
              onClick={() => setScanType('entry')}
            >
              ENTRY MODE
            </button>
            <button
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${scanType === 'exit' ? 'bg-red-500 text-white shadow-lg' : 'text-muted-foreground hover:bg-background/50'}`}
              onClick={() => setScanType('exit')}
            >
              EXIT MODE
            </button>
          </div>

          <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary/20 bg-black">
            <Scanner
              onScan={onQrDecode}
              components={{
                onOff: true,
                torch: true,
                zoom: true,
                finder: true
              }}
              allowMultiple={true}
              scanDelay={500}
            />
            <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 text-white text-[10px] text-center">
              Point at a QR Code
            </div>
          </div>
        </div>
      )}

      {/* Simulation Mode - Only shown if active */}
      {mode === 'simulate' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button
            onClick={() => handleScan('exit')}
            variant="outline"
            className="h-16 flex flex-col items-center gap-1 border-border hover:bg-danger/10 hover:text-danger hover:border-danger/50"
          >
            <Minus className="w-5 h-5" />
            <span className="text-xs">Exit</span>
          </Button>
          <Button
            onClick={() => handleScan('entry')}
            className="h-16 flex flex-col items-center gap-1 bg-gradient-brand hover:opacity-90"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs">Entry</span>
          </Button>
        </div>
      )}

      {/* Scan Counter */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          Session scans: <span className="font-semibold text-foreground">{scanCount}</span>
        </p>
        {lastScanned && (
          <p className="text-xs text-primary mt-1 animate-pulse">
            Last: {lastScanned}
          </p>
        )}
      </div>
    </motion.div>
  );
}
