import { motion } from 'framer-motion';
import { SPRING_REVEAL, SPRING_STAGGER, SPRING_HOVER } from '../../utils/animations';
import { TrendingUp, Users, Building, Award } from 'lucide-react';

export default function PlacementsSection({ data }) {
  const stats = data?.stats || [
    { id: 1, label: "Highest Package", value: "45 LPA", icon: <Award size={24} /> },
    { id: 2, label: "Average Package", value: "8.5 LPA", icon: <TrendingUp size={24} /> },
    { id: 3, label: "Total Placements", value: "850+", icon: <Users size={24} /> },
    { id: 4, label: "Top Recruiters", value: "120+", icon: <Building size={24} /> },
  ];

  const recruiters = data?.recruiters || [
    "Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Accenture", "IBM"
  ];

  return (
    <section className="relative w-full py-24 bg-kits-navy/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={SPRING_STAGGER(0.1)}
          className="text-center mb-16"
        >
          <motion.h2 variants={SPRING_REVEAL} className="text-3xl md:text-5xl font-clash font-bold text-white uppercase">
            {data?.title || "Placement Excellence"}
          </motion.h2>
          <motion.p variants={SPRING_REVEAL} className="mt-4 text-kits-white/80 max-w-2xl mx-auto">
            {data?.subtitle || "Our students consistently secure positions in top-tier global companies, demonstrating the strength of our academic and industry-aligned programs."}
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={SPRING_STAGGER(0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={SPRING_REVEAL}
              whileHover={SPRING_HOVER}
              className="glass p-8 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="text-kits-gold mb-4 group-hover:text-white transition-colors duration-300">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-clash font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-sm font-satoshi text-kits-gray uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recruiters Marquee */}
        <div className="relative w-full overflow-hidden flex flex-col items-center">
          <p className="text-sm text-kits-gray uppercase tracking-widest mb-8">Our Top Recruiters</p>
          <div className="flex w-[200%] gap-8 animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
             {/* Creating two sets for seamless infinite scroll */}
             {[...recruiters, ...recruiters].map((company, index) => (
               <motion.div 
                 key={index}
                 whileHover={SPRING_HOVER}
                 className="flex-shrink-0 w-48 h-20 glass flex items-center justify-center grayscale hover:grayscale-0 transition-colors cursor-pointer"
               >
                  <span className="text-xl font-clash font-bold text-white/50 hover:text-white transition-colors">{company}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </div>

      {/* Marquee Keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
