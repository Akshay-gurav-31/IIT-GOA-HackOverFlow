import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, X, Check } from 'lucide-react';
import { Alert } from '@/data/venueData';
import { useFestival } from '@/context/FestivalContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    className: 'border-danger/30 bg-danger/5',
    iconClass: 'text-danger',
    badgeClass: 'bg-danger/20 text-danger',
  },
  warning: {
    icon: AlertCircle,
    className: 'border-warning/30 bg-warning/5',
    iconClass: 'text-warning',
    badgeClass: 'bg-warning/20 text-warning',
  },
  info: {
    icon: Info,
    className: 'border-primary/30 bg-primary/5',
    iconClass: 'text-primary',
    badgeClass: 'bg-primary/20 text-primary',
  },
};

export function AlertPanel() {
  const { alerts, markAlertRead } = useFestival();

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-primary" />
          Recent Alerts
        </h3>
        <span className="text-xs text-muted-foreground">
          {alerts.filter(a => !a.isRead).length} unread
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {alerts.map(alert => {
            const config = alertConfig[alert.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
                className={cn(
                  'p-3 rounded-lg border transition-all',
                  config.className,
                  alert.isRead && 'opacity-60'
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.iconClass)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', config.badgeClass)}>
                        {alert.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground break-words">
                      {alert.venue}
                    </p>
                    <p className="text-xs text-muted-foreground break-words whitespace-normal">
                      {alert.message}
                    </p>
                  </div>
                  {!alert.isRead && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={() => markAlertRead(alert.id)}
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No alerts at this time</p>
          </div>
        )}
      </div>
    </div>
  );
}
