import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  Download,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hourly crowd distribution data
 */
const peakHoursData = [
  { hour: '10 AM', crowd: 1200 },
  { hour: '11 AM', crowd: 2100 },
  { hour: '12 PM', crowd: 3400 },
  { hour: '1 PM', crowd: 4200 },
  { hour: '2 PM', crowd: 3800 },
  { hour: '3 PM', crowd: 4500 },
  { hour: '4 PM', crowd: 5200 },
  { hour: '5 PM', crowd: 6100 },
  { hour: '6 PM', crowd: 7200 },
  { hour: '7 PM', crowd: 8100 },
  { hour: '8 PM', crowd: 8500 },
  { hour: '9 PM', crowd: 7800 },
  { hour: '10 PM', crowd: 5400 },
  { hour: '11 PM', crowd: 2800 },
];

/**
 * Venue popularity distribution data
 */
const venuePopularityData = [
  { name: 'Main Stage', value: 4200, color: 'hsl(263, 70%, 66%)' },
  { name: 'Dance Arena', value: 1800, color: 'hsl(187, 94%, 43%)' },
  { name: 'Food Court', value: 1950, color: 'hsl(38, 92%, 50%)' },
  { name: 'Gaming Zone', value: 800, color: 'hsl(160, 84%, 39%)' },
  { name: 'Art Gallery', value: 350, color: 'hsl(280, 70%, 60%)' },
  { name: 'Music Lounge', value: 1100, color: 'hsl(0, 72%, 51%)' },
];

/**
 * Crowd movement timeline across different venues
 */
const crowdFlowData = [
  { time: '10 AM', mainStage: 800, danceArena: 200, foodCourt: 400, gaming: 100, art: 50, music: 150 },
  { time: '12 PM', mainStage: 2000, danceArena: 600, foodCourt: 1200, gaming: 300, art: 150, music: 400 },
  { time: '2 PM', mainStage: 2500, danceArena: 900, foodCourt: 1500, gaming: 500, art: 200, music: 600 },
  { time: '4 PM', mainStage: 3200, danceArena: 1200, foodCourt: 1800, gaming: 600, art: 250, music: 800 },
  { time: '6 PM', mainStage: 3800, danceArena: 1500, foodCourt: 1900, gaming: 700, art: 300, music: 1000 },
  { time: '8 PM', mainStage: 4200, danceArena: 1800, foodCourt: 1950, gaming: 800, art: 350, music: 1100 },
  { time: '10 PM', mainStage: 3000, danceArena: 1200, foodCourt: 1200, gaming: 400, art: 150, music: 700 },
];

const statsCards = [
  { label: 'Total Attendees Today', value: '12,450', icon: Users, change: '+18%', positive: true },
  { label: 'Peak Concurrent', value: '8,200', icon: TrendingUp, change: '7:30 PM', positive: true },
  { label: 'Avg Stay Duration', value: '3.5 hrs', icon: Clock, change: '+0.5 hrs', positive: true },
  { label: 'Overcrowding Alerts', value: '3', icon: AlertTriangle, change: 'Today', positive: false },
];

interface TooltipPayloadEntry {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {

  if (!active || !payload?.length) return null;

  return (
    <div className="glass-card p-3 border border-border">
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      {payload.map((entry: TooltipPayloadEntry, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold text-foreground">
            {entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function AnalyticsView() {
  useEffect(() => {
    document.title = "Analytics | FESTPULSE";
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Insights and trends from CULTRANG 2026
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Today
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.positive ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger'
                }`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <span className={`text-xs font-medium ${stat.positive ? 'text-success' : 'text-danger'
                }`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Peak Hours Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Peak Hours</h3>
              <p className="text-xs text-muted-foreground">Hourly crowd distribution</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 15%)" />
                <XAxis
                  dataKey="hour"
                  tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 10 }}
                  axisLine={{ stroke: 'hsl(222, 47%, 15%)' }}
                />
                <YAxis
                  tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 10 }}
                  axisLine={{ stroke: 'hsl(222, 47%, 15%)' }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="crowd"
                  name="Attendees"
                  fill="hsl(263, 70%, 66%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Venue Popularity Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Venue Popularity</h3>
              <p className="text-xs text-muted-foreground">Current crowd distribution</p>
            </div>
          </div>
          <div className="h-[280px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={venuePopularityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: 'hsl(215, 20%, 65%)' }}
                >
                  {venuePopularityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Crowd Flow Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Crowd Flow Timeline</h3>
              <p className="text-xs text-muted-foreground">Venue-wise crowd movement throughout the day</p>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={crowdFlowData}>
              <defs>
                <linearGradient id="mainStageGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(263, 70%, 66%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(263, 70%, 66%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="danceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="foodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 15%)" />
              <XAxis
                dataKey="time"
                tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(222, 47%, 15%)' }}
              />
              <YAxis
                tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(222, 47%, 15%)' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="mainStage" name="Main Stage" stackId="1" stroke="hsl(263, 70%, 66%)" fill="url(#mainStageGrad)" />
              <Area type="monotone" dataKey="danceArena" name="Dance Arena" stackId="1" stroke="hsl(187, 94%, 43%)" fill="url(#danceGrad)" />
              <Area type="monotone" dataKey="foodCourt" name="Food Court" stackId="1" stroke="hsl(38, 92%, 50%)" fill="url(#foodGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
