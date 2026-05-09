import { motion } from 'framer-motion';
import { SPRING_REVEAL, SPRING_HOVER } from '../../styles/motion';

const DepartmentsSection = ({ content }) => {
  if (!content) return null;

  return (
    <section id="departments" className="py-24 px-6 bg-kits-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <motion.h2 
            variants={SPRING_REVEAL}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-kits-white mb-6"
          >
            {content.title}
          </motion.h2>
          <motion.p 
            variants={SPRING_REVEAL}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-xl text-kits-gray max-w-2xl mx-auto"
          >
            {content.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.items?.map((dept, idx) => (
            <motion.div
              key={dept.id}
              variants={SPRING_REVEAL}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={SPRING_HOVER}
              className="p-8 bg-kits-navy/50 border border-white/5 rounded-2xl group hover:border-kits-gold/30 transition-colors cursor-pointer"
            >
              <div className="mb-6 inline-block p-4 bg-kits-black border border-white/10 rounded-xl text-kits-gold font-bold group-hover:bg-kits-gold group-hover:text-kits-black transition-all duration-500">
                {dept.code}
              </div>
              <h3 className="text-xl font-bold text-kits-white mb-4">{dept.name}</h3>
              <p className="text-kits-gray leading-relaxed">
                {dept.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
