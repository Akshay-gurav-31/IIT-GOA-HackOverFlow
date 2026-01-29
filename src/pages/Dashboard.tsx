import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FestivalProvider, useFestival } from '@/context/FestivalContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { VenueCard } from '@/components/VenueCard';
import { StatsCards } from '@/components/StatsCards';
import { AlertPanel } from '@/components/AlertPanel';
import { PredictionChart } from '@/components/PredictionChart';
import { CrowdHeatmap } from '@/components/CrowdHeatmap';
import { QRScanner } from '@/components/QRScanner';
import { AnalyticsView } from '@/components/AnalyticsView';
import { AttendeeView } from '@/components/AttendeeView';
import { SettingsView } from '@/components/SettingsView';
import { X, LayoutDashboard, Map, BarChart3, Bell, Users, Settings, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'heatmap', label: 'Heatmap', icon: Map },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'attendees', label: 'Attendees', icon: Users },
];

function MobileSidebar({
  isOpen,
  onClose,
  activeTab,
  onTabChange
}: {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border z-50 lg:hidden flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sidebar-accent flex items-center justify-center overflow-hidden border border-sidebar-border shadow-inner">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground leading-none">FESTPULSE</span>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-0.5">Mobile Port</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center gap-2 text-success">
                <Radio className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Live Monitoring</span>
              </div>
            </div>

            <nav className="flex-1 px-3 py-2">
              <ul className="space-y-1">
                {menuItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => { onTabChange(item.id); onClose(); }}
                      className={cn(
                        'sidebar-item w-full',
                        activeTab === item.id && 'active'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-3 border-t border-sidebar-border">
              <button
                onClick={() => { onTabChange('settings'); onClose(); }}
                className={cn(
                  'sidebar-item w-full transition-all',
                  activeTab === 'settings' ? 'active bg-primary/10 text-primary' : 'hover:bg-muted/50'
                )}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Main Dashboard Home view
 */
function DashboardHome() {
  const { venues } = useFestival();

  useEffect(() => {
    document.title = "Command Center | FESTPULSE";
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
          Command Center
        </h1>
        <p className="text-muted-foreground">
          Real-time crowd monitoring for CULTRANG 2026
        </p>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Primary Monitoring Tools */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-primary" />
              Live Venue Status
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {venues.map(venue => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>

          {/* Prediction Chart */}
          <PredictionChart />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-4 space-y-6 sticky top-6">
          <QRScanner />
          <AlertPanel />
        </div>
      </div>
    </div>
  );
}

// Heatmap Full View
function HeatmapView() {
  const { venues } = useFestival();

  useEffect(() => {
    document.title = "Live Map | FESTPULSE";
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
          Crowd Heatmap
        </h1>
        <p className="text-muted-foreground">
          Visual representation of crowd density across festival grounds
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <CrowdHeatmap />
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4 text-success animate-pulse" />
              Live Area Interaction
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The heatmap provides a real-time visualization of attendee movement. Areas in <span className="text-indigo-400 font-bold uppercase tracking-tighter">Indigo</span> indicate high activity zones. Use the sidebar tokens to monitor specific venue capacities.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 sticky top-6">
          <QRScanner />

          <div className="glass-card p-6 border-indigo-500/10">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1.5 h-4 rounded-full bg-indigo-500" />
              Live Details
            </h2>
            <div className="space-y-4">
              {venues.map(venue => (
                <div key={venue.id} className="p-3 bg-muted/20 rounded-xl border border-border/50 group hover:border-indigo-500/30 transition-colors">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-foreground/80">{venue.name}</span>
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">
                      {Math.round((venue.currentCrowd / venue.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(venue.currentCrowd / venue.capacity) * 100}%` }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Alerts Full View
function AlertsView() {
  useEffect(() => {
    document.title = "Security & Alerts | FESTPULSE";
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
          Security Center
        </h1>
        <p className="text-muted-foreground">
          Real-time incident response and crowd safety management
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <AlertPanel />
          <div className="glass-card p-8 border-dashed border-border/60 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Radio className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Safety Protocol Active</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              All venues are currently under active surveillance. In case of a high-density alert, immediate redirection protocols will be suggested here.
            </p>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6 sticky top-6">
          <StatsCards variant="narrow" />
          <QRScanner />
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'heatmap':
        return <HeatmapView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'alerts':
        return <AlertsView />;
      case 'attendees':
        return <AttendeeView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardHome />;
    }
  };

  const layoutContent = (
    <div className="min-h-screen flex bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );

  return layoutContent;
}

const Dashboard = () => {
  return (
    <FestivalProvider>
      <DashboardContent />
    </FestivalProvider>
  );
};

export default Dashboard;
