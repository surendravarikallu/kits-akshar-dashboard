import { motion } from 'framer-motion';
import { Cpu, FlaskConical, Globe2, Lightbulb } from 'lucide-react';
import { SPRING_REVEAL, SPRING_STAGGER, SPRING_HOVER } from '../../utils/animations';

export default function InnovationSection({ data }) {
  const labs = data?.items || [
    {
      id: 1,
      title: "AI Research Hub",
      desc: "Developing neural architectures for next-gen motion engines.",
      icon: <Cpu size={32} />
    },
    {
      id: 2,
      title: "UI/UX Pro Lab",
      desc: "Where kinetic synchronization meets human-computer interaction.",
      icon: <Lightbulb size={32} />
    },
    {
      id: 3,
      title: "Quantum Forge",
      desc: "Simulating molecular dynamics with quantum-accelerated kernels.",
      icon: <FlaskConical size={32} />
    }
  ];

  return (
    <section className="relative w-full py-24 bg-kits-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-kits-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SPRING_STAGGER(0.15)}
          >
            <motion.div variants={SPRING_REVEAL} className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-kits-gold/30 text-kits-gold text-xs font-bold uppercase tracking-widest mb-6">
              <Globe2 size={14} /> Global R&D Centers
            </motion.div>
            <motion.h2 variants={SPRING_REVEAL} className="text-4xl md:text-6xl font-clash font-bold text-white uppercase tracking-tight mb-8">
              Pioneering the <span className="text-kits-gold">Future</span>
            </motion.h2>
            <motion.p variants={SPRING_REVEAL} className="text-xl text-kits-gray font-satoshi leading-relaxed mb-10 max-w-xl">
              Our innovation labs are the heartbeat of KITS. Here, students and researchers collaborate to solve humanity's most pressing technical challenges.
            </motion.p>
            
            <div className="space-y-8">
              {labs.map((lab) => (
                <motion.div 
                  key={lab.id}
                  variants={SPRING_REVEAL}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 group cursor-default"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-kits-navy border border-white/10 flex items-center justify-center text-kits-gold group-hover:bg-kits-gold group-hover:text-kits-black transition-all duration-500 rounded-sm">
                    {lab.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-kits-gold transition-colors">{lab.title}</h3>
                    <p className="text-kits-gray">{lab.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={SPRING_REVEAL}
            className="relative"
          >
            <div className="aspect-square bg-kits-navy/50 border border-white/5 rounded-sm p-4 relative overflow-hidden group">
               <div className="absolute inset-0 bg-kits-gold/5 opacity-50" />
               {/* Animated grid lines could be added here for extra polish */}
               <div className="w-full h-full border border-kits-gold/20 flex flex-col items-center justify-center text-center p-12">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-48 h-48 border-2 border-dashed border-kits-gold/20 rounded-full flex items-center justify-center mb-8"
                  >
                    <div className="w-32 h-32 border border-kits-gold/40 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-kits-gold rounded-full shadow-[0_0_20px_#C9A84C]" />
                    </div>
                  </motion.div>
                  <h4 className="text-2xl font-clash font-bold text-white uppercase tracking-widest mb-4">Core Engine v4.0</h4>
                  <p className="text-kits-gray text-sm uppercase tracking-[0.3em]">Quantum Kinetic Ready</p>
               </div>
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass p-6 border border-kits-gold/30 hidden lg:block"
            >
              <div className="text-[10px] text-kits-gold font-bold uppercase mb-2">Processing Power</div>
              <div className="text-2xl font-clash font-bold">98.2 TFLOPs</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
