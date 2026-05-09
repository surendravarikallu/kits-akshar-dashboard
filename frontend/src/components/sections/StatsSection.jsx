import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SPRING_REVEAL, SPRING_STAGGER } from '../../utils/animations';

function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const target = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection({ data }) {
  const stats = data?.items || [
    { id: 1, label: "Placement Rate", value: "98", suffix: "%" },
    { id: 2, label: "Global Partners", value: "120", suffix: "+" },
    { id: 3, label: "Tech Symposiums", value: "45", suffix: "" },
    { id: 4, label: "Student Innovators", value: "5000", suffix: "+" },
  ];

  return (
    <section className="w-full py-24 bg-kits-navy border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={SPRING_STAGGER(0.1)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              variants={SPRING_REVEAL}
              className="text-center"
            >
              <h3 className="text-5xl md:text-6xl font-clash font-bold text-kits-gold mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm font-bold text-white/50 uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
