import { motion } from 'framer-motion';
import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Venue, getVenueStatus, getStatusLabel } from '@/data/venueData';
import { useFestival } from '@/context/FestivalContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VenueIcon } from './VenueIcon';

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  const { scanEntry, scanExit } = useFestival();
  const status = getVenueStatus(venue);
  const percentage = Math.round((venue.currentCrowd / venue.capacity) * 100);

  const statusStyles = {
    safe: 'status-safe',
    warning: 'status-warning',
    critical: 'status-critical pulse-danger',
  };

  const progressColors = {
    safe: 'bg-success',
    warning: 'bg-warning',
    critical: 'bg-danger',
  };

  const TrendIcon = percentage > 80 ? TrendingUp : percentage < 50 ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card-hover p-6 flex flex-col"
    >
      {/* Header Section: Venue Information and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <VenueIcon icon={venue.icon} className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{venue.name}</h3>
            <p className="text-xs text-muted-foreground">
              Updated {venue.lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <span className={cn('px-3 py-1 rounded-full text-xs font-medium', statusStyles[status])}>
          {getStatusLabel(status)}
        </span>
      </div>

      {/* Live Occupancy Statistics */}
      <div className="flex items-end gap-2 mb-4">
        <motion.span
          key={venue.currentCrowd}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-foreground"
        >
          {venue.currentCrowd.toLocaleString()}
        </motion.span>
        <span className="text-muted-foreground text-lg mb-1">
          / {venue.capacity.toLocaleString()}
        </span>
        <TrendIcon className={cn(
          'w-5 h-5 ml-auto mb-1',
          status === 'safe' && 'text-success',
          status === 'warning' && 'text-warning',
          status === 'critical' && 'text-danger',
        )} />
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-full', progressColors[status])}
        />
      </div>

      {/* Capacity Percentage and Manual Scan Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className={cn(
            'text-sm font-medium',
            status === 'safe' && 'text-success',
            status === 'warning' && 'text-warning',
            status === 'critical' && 'text-danger',
          )}>
            {percentage}% capacity
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => scanExit(venue.id)}
            className="h-8 px-3 text-xs border-border hover:bg-danger/10 hover:text-danger hover:border-danger/50"
          >
            Exit
          </Button>
          <Button
            size="sm"
            onClick={() => scanEntry(venue.id)}
            className="h-8 px-3 text-xs bg-primary hover:bg-primary/80"
          >
            Scan Entry
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
