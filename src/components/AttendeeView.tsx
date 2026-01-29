import { motion } from 'framer-motion';
import { Users, Search, RefreshCw, MapPin, ThumbsUp, AlertTriangle, Radio } from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';
import { getVenueStatus } from '@/data/venueData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { VenueIcon } from './VenueIcon';

const statusConfig = {
  safe: {
    bg: 'bg-success/10',
    border: 'border-success/30',
    text: 'text-success',
    badge: 'bg-success text-success-foreground',
    recommendation: 'Recommended',
  },
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    text: 'text-warning',
    badge: 'bg-warning text-warning-foreground',
    recommendation: 'Getting Busy',
  },
  critical: {
    bg: 'bg-danger/10',
    border: 'border-danger/30',
    text: 'text-danger',
    badge: 'bg-danger text-danger-foreground',
    recommendation: 'Avoid Now',
  },
};

export function AttendeeView() {
  const { venues } = useFestival();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'recommended'>('all');

  useEffect(() => {
    document.title = "Attendees | FESTPULSE";
  }, []);

  const filteredVenues = venues
    .filter(venue =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(venue => {
      if (filter === 'recommended') {
        return getVenueStatus(venue) === 'safe';
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by capacity percentage (lowest first = recommended)
      const aPercent = a.currentCrowd / a.capacity;
      const bPercent = b.currentCrowd / b.capacity;
      return aPercent - bPercent;
    });

  const recommendedVenue = venues.reduce((best, venue) => {
    const bestPercent = best.currentCrowd / best.capacity;
    const venuePercent = venue.currentCrowd / venue.capacity;
    return venuePercent < bestPercent ? venue : best;
  }, venues[0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shadow-inner overflow-hidden border border-border">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tighter text-foreground leading-none">FESTPULSE</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <Radio className="w-3 h-3 text-success animate-pulse" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Live Monitoring</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-primary' : ''}
            >
              All Venues
            </Button>
            <Button
              size="sm"
              variant={filter === 'recommended' ? 'default' : 'outline'}
              onClick={() => setFilter('recommended')}
              className={cn(
                filter === 'recommended' ? 'bg-success hover:bg-success/90' : 'border-success/50 text-success'
              )}
            >
              <ThumbsUp className="w-3 h-3 mr-1" />
              Less Crowded
            </Button>
          </div>
        </div>
      </div>

      {/* Recommendation Banner */}
      {recommendedVenue && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto p-4"
        >
          <div className="glass-card p-4 border-success/30 bg-success/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-success font-medium mb-1">RECOMMENDED RIGHT NOW</p>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <VenueIcon icon={recommendedVenue.icon} className="w-5 h-5 text-success" /> {recommendedVenue.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Only {Math.round((recommendedVenue.currentCrowd / recommendedVenue.capacity) * 100)}% full
                </p>
              </div>
              <Button size="sm" className="bg-success hover:bg-success/90">
                <MapPin className="w-4 h-4 mr-1" />
                Navigate
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Venue Cards */}
      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-3">
        {filteredVenues.map((venue, index) => {
          const status = getVenueStatus(venue);
          const percentage = Math.round((venue.currentCrowd / venue.capacity) * 100);
          const config = statusConfig[status];

          return (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'glass-card p-4 border',
                config.bg,
                config.border
              )}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50 shadow-inner">
                  <VenueIcon icon={venue.icon} className={cn("w-7 h-7", config.text)} />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{venue.name}</h3>
                    <span className={cn(
                      'text-xs px-2 py-0.5 rounded-full font-medium',
                      config.badge
                    )}>
                      {config.recommendation}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={cn(
                        'h-full rounded-full',
                        status === 'safe' && 'bg-success',
                        status === 'warning' && 'bg-warning',
                        status === 'critical' && 'bg-danger'
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {venue.currentCrowd.toLocaleString()} / {venue.capacity.toLocaleString()}
                    </span>
                    <span className={cn('font-semibold', config.text)}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning Message for Critical */}
              {status === 'critical' && (
                <div className="mt-3 flex items-center gap-2 text-danger text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>High crowd density - consider visiting later</span>
                </div>
              )}
            </motion.div>
          );
        })}

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No venues found</p>
          </div>
        )}
      </div>
    </div>
  );
}
