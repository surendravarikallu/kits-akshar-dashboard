import { motion } from 'framer-motion';
import { SPRING_REVEAL, SPRING_STAGGER, SPRING_HOVER } from '../../utils/animations';

export default function AboutSection({ data }) {
  return (
    <section className="relative w-full py-24 bg-kits-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={SPRING_STAGGER(0.2)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div className="flex flex-col gap-6">
            <motion.h2 
              variants={SPRING_REVEAL}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-clash text-kits-gold uppercase tracking-wide"
            >
              {data?.title || "About KITS Akshar"}
            </motion.h2>
            <motion.p 
              variants={SPRING_REVEAL}
              className="text-lg text-kits-white/80 leading-relaxed font-satoshi"
            >
              {data?.description || "A premier institution fostering innovation and academic excellence. We empower the next generation of leaders through cutting-edge technology and immersive learning environments."}
            </motion.p>
            {data?.ctaText && (
              <motion.button 
                variants={SPRING_REVEAL}
                whileHover={SPRING_HOVER}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-fit px-8 py-3 bg-kits-gold text-kits-black font-semibold rounded-sm hover:bg-white transition-colors duration-300"
              >
                {data.ctaText}
              </motion.button>
            )}
          </div>
          
          {/* Immersive Image/Video Container */}
          <motion.div 
            variants={SPRING_REVEAL}
            className="w-full h-[400px] lg:h-[500px] rounded-sm bg-kits-black border border-white/10 relative overflow-hidden group cursor-pointer"
          >
            {data?.imageUrl ? (
              <motion.img 
                src={data.imageUrl} 
                alt="Campus" 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="object-cover w-full h-full opacity-80 group-hover:opacity-100" 
              />
            ) : (
              <motion.div 
                whileHover={{ scale: 1.05, backgroundColor: "#111" }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center text-kits-gray font-mono text-sm bg-kits-black"
              >
                [ Institutional Media Placeholder ]
              </motion.div>
            )}
            
            {/* Parallax Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-kits-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
