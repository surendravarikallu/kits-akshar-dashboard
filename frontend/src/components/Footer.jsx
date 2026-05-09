import { motion } from 'framer-motion';
import { SPRING_REVEAL } from './../styles/motion.js';

const Footer = ({ content }) => {
  if (!content) return null;

  return (
    <footer className="py-20 px-6 border-t border-white/10 bg-kits-navy">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <motion.div 
          variants={SPRING_REVEAL}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2"
        >
          <h2 className="text-3xl font-display font-bold tracking-tight text-kits-white mb-6">
            KITS Akshar
          </h2>
          <p className="text-kits-gray max-w-md mb-8">
            {content.address}
          </p>
          <div className="space-y-2">
            <p className="text-kits-white font-medium">Contact</p>
            <p className="text-kits-gray">{content.phone}</p>
            <p className="text-kits-gray">{content.email}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={SPRING_REVEAL}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="col-span-1"
        >
          <h3 className="text-lg font-bold text-kits-white mb-6">Explore</h3>
          <ul className="space-y-4">
            {content.links?.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} className="text-kits-gray hover:text-kits-gold transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          variants={SPRING_REVEAL}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="col-span-1"
        >
          <h3 className="text-lg font-bold text-kits-white mb-6">Follow Us</h3>
          <div className="flex gap-6">
            {Object.entries(content.socials || {}).map(([platform, url]) => (
              <a 
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-kits-gray hover:text-kits-gold transition-colors capitalize"
              >
                {platform}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-kits-gray text-sm">
          © {new Date().getFullYear()} KITS Akshar. All rights reserved.
        </p>
        <p className="text-kits-gray text-sm italic">
          Designed with UI/UX Pro Max Excellence
        </p>
      </div>
    </footer>
  );
};

export default Footer;
