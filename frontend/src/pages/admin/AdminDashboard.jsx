import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Globe, 
  Zap, 
  Clock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SPRING_REVEAL, STAGGER } from '../../utils/animations';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Page Views', value: '12,840', change: '+12%', icon: <Globe size={20} /> },
    { label: 'Active Sessions', value: '42', change: '+5%', icon: <Zap size={20} /> },
    { label: 'Avg. Load Time', value: '0.8s', change: '-15%', icon: <Clock size={20} /> },
    { label: 'Sync Status', value: 'Online', change: 'Stable', icon: <BarChart3 size={20} /> },
  ];

  return (
    <motion.div
      variants={STAGGER(0.1)}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Welcome Hero */}
      <motion.div 
        variants={SPRING_REVEAL}
        className="glass p-10 rounded-sm border border-kits-gold/20 relative overflow-hidden group"
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-clash font-bold mb-4 uppercase tracking-tight">
            Welcome to <span className="text-kits-gold">UI/UX Pro Max</span> Dashboard
          </h1>
          <p className="text-kits-gray max-w-2xl text-lg font-satoshi mb-8">
            Manage your institution's digital presence with ease. Every change you make here is reflected in real-time across the platform using our "Kinetic Synchronization" engine.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-kits-gold text-kits-black font-bold text-sm rounded-sm hover:bg-white transition-colors">
              EDIT HOMEPAGE
            </button>
            <button className="px-6 py-3 border border-white/10 text-white font-bold text-sm rounded-sm hover:bg-white/5 transition-colors">
              VIEW LOGS
            </button>
          </div>
        </div>
        
        {/* Subtle background graphic */}
        <div className="absolute right-[-10%] top-[-50%] w-[500px] h-[500px] bg-kits-gold/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-kits-gold/10 transition-all duration-1000" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            variants={SPRING_REVEAL}
            className="p-6 bg-kits-navy/50 border border-white/5 rounded-sm hover:border-kits-gold/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-kits-black rounded-sm text-kits-gold border border-white/5 group-hover:bg-kits-gold group-hover:text-kits-black transition-colors">
                {stat.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                stat.change.includes('+') ? 'bg-green-500/10 text-green-400' : 'bg-kits-gold/10 text-kits-gold'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs text-kits-gray uppercase tracking-widest mb-1 font-bold">{stat.label}</p>
            <h3 className="text-2xl font-clash font-bold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <motion.div variants={SPRING_REVEAL} className="glass p-8 border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold uppercase tracking-widest text-kits-gold">Live Content Preview</h3>
            <ExternalLink size={16} className="text-kits-gray cursor-pointer hover:text-white" />
          </div>
          <div className="aspect-video bg-kits-black rounded-sm border border-white/5 flex items-center justify-center text-kits-gray font-mono text-xs overflow-hidden relative group">
             <div className="absolute inset-0 bg-kits-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             [ Interactive Site Preview Engine ]
          </div>
        </motion.div>

        <motion.div variants={SPRING_REVEAL} className="glass p-8 border border-white/5">
          <h3 className="text-lg font-bold uppercase tracking-widest text-kits-gold mb-8">Quick Navigation Editor</h3>
          <div className="space-y-4">
            {['Hero Section', 'About KITS', 'Placement Stats', 'Campus Gallery'].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-kits-navy/30 border border-white/5 hover:border-kits-gold/30 transition-all group cursor-pointer">
                <span className="text-sm font-medium">{item}</span>
                <ChevronRight size={16} className="text-kits-gray group-hover:text-kits-gold group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
