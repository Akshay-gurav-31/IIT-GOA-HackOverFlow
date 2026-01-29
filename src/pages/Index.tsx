import { motion } from 'framer-motion';
import { Zap, BarChart3, Bell, Map, Shield, Users, ArrowRight, Radio, Sparkles, Globe, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: BarChart3,
    title: 'Precision Analytics',
    description: 'Deep-dive metrics with per-second synchronization across all festival sectors.',
  },
  {
    icon: Bell,
    title: 'Intelligent Response',
    description: 'Auto-triggered safety protocols when occupancy thresholds are exceeded.',
  },
  {
    icon: Map,
    title: 'Heat Map Visualization',
    description: 'Dynamic intensity layers showing real-time attendee flow and density.',
  },
  {
    icon: Shield,
    title: 'Proactive Safety',
    description: 'Advanced crowd redirection strategies to prevent bottlenecks and surges.',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      </div>

      {/* Navigation */}
      <header className="relative z-50 border-b border-white/5 bg-[#020617]/50 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-indigo-500/20 overflow-hidden border border-white/10">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tighter text-white leading-none">FESTPULSE</span>
              <span className="text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase mt-1">Command Suite</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#security" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Security</a>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5">
                Dashboard
              </Button>
            </Link>
          </div>

          <Link to="/dashboard">
            <Button className="bg-white text-black hover:bg-slate-200 font-bold px-6 rounded-full shadow-xl shadow-white/10 group">
              Launch Live Monitoring
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-md">
                <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="text-xs text-indigo-300 font-bold uppercase tracking-widest">Live Monitoring Active</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-8 tracking-tighter">
                The New Standard for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-purple-400">
                  Festival Safety.
                </span>
              </h1>

              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                Experience real-time crowd intelligence for <span className="text-white font-semibold underline decoration-indigo-500 decoration-2 underline-offset-4">HackOverFlow @ CULTRANG</span>.
                Monitor density, mitigate bottlenecks, and ensure a seamless experience at IIT Goa.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold h-14 px-10 rounded-2xl shadow-2xl shadow-indigo-600/30">
                    Open Control Center
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-indigo-900/50 flex items-center justify-center overflow-hidden">
                        <Users className="w-4 h-4 text-indigo-300" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-300">12.4k monitored</span>
                </div>
              </div>

              <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-12">
                <div className="space-y-1">
                  <p className="text-2xl font-black text-white tracking-tight">99.9%</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">System Reliability</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="space-y-1">
                  <p className="text-2xl font-black text-white tracking-tight">&lt; 150ms</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Analytic Latency</p>
                </div>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative lg:block"
            >
              <div className="relative z-10 rounded-[2.5rem] border border-white/10 bg-slate-900/50 backdrop-blur-3xl p-8 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Global Status</p>
                    <h3 className="text-lg font-bold text-white tracking-tight">Main Event Grounds</h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest animate-pulse">
                    Optimal
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'Main Stage', val: 84, color: 'bg-indigo-500' },
                    { label: 'Food Court', val: 32, color: 'bg-emerald-500' },
                    { label: 'Art Expo', val: 12, color: 'bg-primary' }
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <span>{item.label}</span>
                        <span className="text-slate-300">{item.val}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden p-[2px]">
                        <motion.div
                          className={cn("h-full rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]", item.color)}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                    <Sparkles className="w-4 h-4 text-indigo-400 mb-2" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Alerts Suppressed</p>
                    <p className="text-sm font-bold text-white tracking-tight">Zero Incidents</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                    <HeartPulse className="w-4 h-4 text-primary mb-2" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Average Pulse</p>
                    <p className="text-sm font-bold text-white tracking-tight">72 BPM / Sync</p>
                  </div>
                </div>
              </div>

              {/* Backglow for the card */}
              <div className="absolute -inset-10 bg-indigo-500/20 blur-[100px] rounded-full z-0 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 border-t border-white/5 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-sm font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">Core Technology</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">Built for mission-critical festival environments.</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              FESTPULSE combines real-time data ingestion with predictive modeling to provide organizers with a 360° overview of their venue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-slate-900/30 border border-white/5 hover:border-indigo-500/20 hover:bg-slate-900/50 transition-all shadow-xl shadow-black/20"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 scale-150 transition-all">
                  <feature.icon className="w-20 h-20 text-indigo-500" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-8 flex items-center justify-center group-hover:bg-indigo-500 group-hover:scale-110 transition-all">
                  <feature.icon className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security CTA */}
      <section id="security" className="relative z-10 py-32 bg-[#020617]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 lg:p-20 rounded-[3rem] bg-gradient-to-br from-slate-900/80 to-[#020617] border border-white/10 text-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent)]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <Shield className="w-10 h-10 text-indigo-400 fill-indigo-400/10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-tight">
                Secure your festival vision <br />with FESTPULSE.
              </h2>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                Join the security operations team for **HackOverFlow @ CULTRANG** and take control of your event's safety destiny. Professional tools for professional results.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-black h-16 px-12 text-lg rounded-2xl group shadow-2xl shadow-white/10">
                  Begin Deployment
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center overflow-hidden border border-white/10">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white mb-0">FESTPULSE © 2026</span>
          </div>

          <div className="flex items-center gap-10">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Built for HackOverFlow @ CULTRANG, IIT Goa</p>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-slate-600" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Global Ops</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
