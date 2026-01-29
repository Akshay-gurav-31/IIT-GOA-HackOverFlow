import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Map,
  BarChart3,
  Bell,
  Users,
  Settings,
  Zap,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'heatmap', label: 'Heatmap', icon: Map },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'attendees', label: 'Attendees', icon: Users },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-sidebar border-r border-sidebar-border z-30">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-accent flex items-center justify-center overflow-hidden border border-sidebar-border shadow-inner">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">FESTPULSE</h1>
            <p className="text-xs text-muted-foreground">Command Center</p>
          </div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 text-success">
          <Radio className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">Live Monitoring</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'sidebar-item w-full',
                  activeTab === item.id && 'active'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => onTabChange('settings')}
          className={cn(
            'sidebar-item w-full transition-all',
            activeTab === 'settings' ? 'active bg-primary/10 text-primary' : 'hover:bg-muted/50'
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
