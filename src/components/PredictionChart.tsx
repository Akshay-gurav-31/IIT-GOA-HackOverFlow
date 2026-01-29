import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
  Legend
} from 'recharts';
import { Brain, TrendingUp } from 'lucide-react';
import { generateHistoricalData } from '@/data/venueData';

export function PredictionChart() {
  const data = useMemo(() => generateHistoricalData(), []);

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
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">
              {entry.value ? entry.value.toLocaleString() : 'N/A'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Crowd Prediction</h3>
            <p className="text-xs text-muted-foreground">Next 4 hours forecast</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-secondary rounded" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary rounded border-dashed" style={{ borderStyle: 'dashed' }} />
            <span className="text-muted-foreground">Predicted</span>
          </div>
        </div>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(187, 94%, 43%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(263, 70%, 66%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(263, 70%, 66%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 15%)" />
            <XAxis
              dataKey="time"
              tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(222, 47%, 15%)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 10 }}
              axisLine={{ stroke: 'hsl(222, 47%, 15%)' }}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="transparent"
              fill="url(#actualGradient)"
            />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="hsl(187, 94%, 43%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(187, 94%, 43%)' }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              name="Predicted"
              stroke="hsl(263, 70%, 66%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(263, 70%, 66%)' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <TrendingUp className="w-4 h-4 text-success" />
        <span>Peak expected at <strong className="text-foreground">8:00 PM</strong> with ~4,200 attendees</span>
      </div>
    </motion.div>
  );
}
