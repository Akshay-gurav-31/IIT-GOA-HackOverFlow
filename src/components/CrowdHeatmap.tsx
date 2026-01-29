import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';
import { getVenueStatus } from '@/data/venueData';
import { cn } from '@/lib/utils';
import { VenueIcon } from './VenueIcon';

const statusColors = {
  safe: 'bg-green-500',
  warning: 'bg-yellow-500',
  critical: 'bg-red-500',
};

const statusGlows = {
  safe: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
  warning: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]',
  critical: 'shadow-[0_0_30px_rgba(239,68,68,0.5)]',
};

/**
 * Preset map positions for the 6 primary venues
 */
const VENUE_POSITIONS = [
  { top: '15%', left: '50%', labelId: 'main-stage' },     // Main Stage
  { top: '35%', left: '20%', labelId: 'dance-arena' },   // Dance Arena
  { top: '35%', left: '80%', labelId: 'food-court' },    // Food Court
  { top: '65%', left: '25%', labelId: 'gaming-zone' },   // Gaming Zone
  { top: '75%', left: '50%', labelId: 'music-lounge' },  // Music Lounge (swapped with art gallery pos for variety)
  { top: '65%', left: '75%', labelId: 'art-gallery' },   // Art Gallery
];

export function CrowdHeatmap() {
  const { venues } = useFestival();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 border-indigo-500/20 shadow-indigo-500/10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <MapPin className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground tracking-tight">Live Crowd Heatmap</h3>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Live Ground Overview</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 px-3 py-1.5 bg-muted/30 rounded-full border border-border/50">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Safe</span>
          </div>
          <div className="flex items-center gap-1.5 border-x border-border/50 px-4">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Warn</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Crit</span>
          </div>
        </div>
      </div>

      {/* Modern Interactive SVG Ground Map */}
      <div className="relative h-[600px] rounded-2xl overflow-hidden border border-border bg-[#0f172a] group/map shadow-inner">

        {/* SVG Decorative Ground & Paths */}
        <svg className="absolute inset-0 w-full h-full opacity-40 select-none pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />
            </pattern>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <rect width="1000" height="600" fill="url(#grid)" />

          {/* Connecting Path Lines */}
          <path
            d="M 500 100 L 200 200 M 500 100 L 800 200 M 200 200 L 250 400 M 800 200 L 750 400 M 250 400 L 500 450 M 750 400 L 500 450 M 500 100 L 500 450"
            stroke="#6366f1"
            strokeWidth="2"
            strokeDasharray="10 5"
            fill="none"
            className="opacity-20 animate-[dash_20s_linear_infinite]"
          />

          {/* Abstract Ground Shapes */}
          <path d="M 150 150 Q 300 100 450 150" stroke="#334155" fill="none" strokeWidth="1" strokeDasharray="5 5" />
          <path d="M 550 150 Q 700 100 850 150" stroke="#334155" fill="none" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="500" cy="300" r="150" stroke="#334155" fill="none" strokeWidth="1" strokeDasharray="10 10" />
        </svg>

        {/* Dynamic Heat Blobs rendered behind venue markers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {venues.map((venue, index) => {
            const pos = VENUE_POSITIONS[index] || { top: '50%', left: '50%' };
            const percentage = Math.round((venue.currentCrowd / venue.capacity) * 100);
            const status = getVenueStatus(venue);
            const blobSize = 80 + (percentage * 2);

            return (
              <motion.div
                key={`blob-${venue.id}`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3 + index % 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={cn(
                  "absolute rounded-full blur-[60px] transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-1000",
                  status === 'safe' ? 'bg-green-500/20' :
                    status === 'warning' ? 'bg-yellow-500/30' :
                      'bg-red-500/40'
                )}
                style={{
                  top: pos.top,
                  left: pos.left,
                  width: blobSize,
                  height: blobSize
                } as React.CSSProperties}
              />

            );
          })}
        </div>

        {/* Individual Venue Interactive Markers */}
        <AnimatePresence>
          {venues.map((venue, index) => {
            const status = getVenueStatus(venue);
            const percentage = Math.round((venue.currentCrowd / venue.capacity) * 100);
            const pos = VENUE_POSITIONS[index] || { top: '50%', left: '50%' };

            return (
              <motion.div
                key={venue.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', damping: 15 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                style={{ top: pos.top, left: pos.left } as React.CSSProperties}
              >
                {/* Critical Pulse */}
                {status === 'critical' && (
                  <div className="absolute inset-0 rounded-full bg-red-500/40 animate-ping -z-10 w-20 h-20 -m-6" />
                )}

                {/* Interactive Venue Node */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center p-2.5 transition-all duration-300 border-2 cursor-pointer shadow-2xl',
                      status === 'safe' ? 'bg-[#064e3b]/80 border-green-500/50' :
                        status === 'warning' ? 'bg-[#78350f]/80 border-yellow-500/50' :
                          'bg-[#7f1d1d]/80 border-red-500/50',
                      statusGlows[status]
                    )}
                  >
                    <VenueIcon icon={venue.icon} className={cn(
                      "w-full h-full drop-shadow-sm transition-transform group-hover:scale-110",
                      status === 'safe' ? 'text-green-400' :
                        status === 'warning' ? 'text-yellow-400' :
                          'text-red-400 font-bold'
                    )} />

                    {/* Tiny Status Indicator Dot */}
                    <div className={cn(
                      "absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0f172a] shadow-sm",
                      statusColors[status]
                    )} />
                  </motion.div>

                  {/* Label below marker */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 pointer-events-none text-center">
                    <span className="text-[10px] font-bold text-white/90 bg-indigo-950/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-indigo-400/30 shadow-lg uppercase tracking-tight whitespace-nowrap">
                      {venue.name.split(' ')[0]}
                    </span>
                  </div>

                  {/* Pro Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none z-50 origin-bottom">
                    <div className="bg-[#1e1b4b] border border-indigo-400/40 p-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] min-w-[180px]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-200">{venue.name}</span>
                        <div className={cn("px-1.5 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-tighter",
                          status === 'safe' ? 'bg-green-500/20 text-green-400' :
                            status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400 animate-pulse')}>
                          {status}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-indigo-300/60 uppercase text-[9px]">Live Count</span>
                          <span className="text-white font-mono font-bold leading-none">{venue.currentCrowd}</span>
                        </div>
                        <div className="h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            className={cn("h-full",
                              status === 'safe' ? 'bg-green-500' :
                                status === 'warning' ? 'bg-yellow-500' :
                                  'bg-red-500')}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-medium leading-none">
                          <span className="text-indigo-200/50 italic">Full Cap: {venue.capacity}</span>
                          <span className={cn("font-bold",
                            status === 'safe' ? 'text-green-400' :
                              status === 'warning' ? 'text-yellow-400' :
                                'text-red-400')}>
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Global Stats Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
          <div className="bg-indigo-950/60 backdrop-blur-md border border-indigo-400/20 p-2.5 rounded-lg flex items-center gap-3">
            <Info className="w-4 h-4 text-indigo-300 opacity-50" />
            <p className="text-[10px] text-indigo-100/70 font-medium">
              Hotspots updated in <span className="text-indigo-300 font-bold">real-time</span> based on entrance data.
            </p>
          </div>

          <div className="h-full flex flex-col items-end gap-1">
            <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-md">
              <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest leading-none">Security Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

