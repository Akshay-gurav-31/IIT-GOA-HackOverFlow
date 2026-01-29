import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  variant?: 'default' | 'narrow';
}

export function StatsCards({ variant = 'default' }: StatsCardsProps) {
  const { venues, totalAttendees } = useFestival();

  const peakConcurrent = Math.max(...venues.map(v => v.currentCrowd));
  const avgOccupancy = Math.round(
    venues.reduce((sum, v) => sum + (v.currentCrowd / v.capacity) * 100, 0) / venues.length
  );
  const criticalVenues = venues.filter(
    v => (v.currentCrowd / v.capacity) * 100 >= 90
  ).length;

  const stats = [
    {
      label: 'Total Attendees',
      value: totalAttendees.toLocaleString(),
      icon: Users,
      color: 'primary',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      label: 'Peak Crowd',
      value: peakConcurrent.toLocaleString(),
      icon: TrendingUp,
      color: 'secondary',
      change: 'Main Stage',
      changeType: 'neutral' as const,
    },
    {
      label: 'Avg Occupancy',
      value: `${avgOccupancy}%`,
      icon: Activity,
      color: avgOccupancy >= 70 ? 'warning' : 'success',
      change: avgOccupancy >= 70 ? 'High' : 'Normal',
      changeType: avgOccupancy >= 70 ? 'warning' : 'positive' as const,
    },
    {
      label: 'Critical Venues',
      value: criticalVenues.toString(),
      icon: AlertTriangle,
      color: criticalVenues > 0 ? 'danger' : 'success',
      change: criticalVenues > 0 ? 'Action needed' : 'All clear',
      changeType: criticalVenues > 0 ? 'negative' : 'positive' as const,
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  const changeColors = {
    positive: 'text-success',
    negative: 'text-danger',
    warning: 'text-warning',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className={cn(
      "grid gap-4",
      variant === 'default' ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"
    )}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-4 lg:p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <motion.p
            key={stat.value}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-2xl lg:text-3xl font-bold text-foreground mb-1 break-words"
          >
            {stat.value}
          </motion.p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
            <span className={`text-xs font-medium flex-shrink-0 ${changeColors[stat.changeType]}`}>
              {stat.change}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
