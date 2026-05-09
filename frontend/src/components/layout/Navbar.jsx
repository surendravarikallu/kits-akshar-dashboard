import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { SPRING_HOVER, SPRING_REVEAL } from '../../utils/animations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch menu items from backend
    fetch('http://localhost:5000/api/menus/main')
      .then(res => res.json())
      .then(data => {
        if (data && data.items) {
          setMenuItems(data.items.sort((a, b) => a.order - b.order));
        }
      })
      .catch(err => console.error('Error fetching menu:', err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4 bg-kits-black/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.a 
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-clash font-bold text-white tracking-tight flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-kits-gold rounded-sm flex items-center justify-center text-kits-black group-hover:rotate-12 transition-transform duration-500">
            K
          </div>
          <span className="group-hover:text-kits-gold transition-colors duration-300">AKSHAR</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, idx) => (
            <motion.a
              key={item.id || idx}
              href={item.url}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-sm font-medium text-kits-white/70 hover:text-kits-gold transition-colors uppercase tracking-widest"
            >
              {item.label}
            </motion.a>
          ))}
          
          <motion.button
            whileHover={SPRING_HOVER}
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-6 py-2 bg-kits-gold text-kits-black font-bold text-sm rounded-sm hover:bg-white transition-colors duration-300"
          >
            APPLY NOW
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-kits-black border-b border-white/10 p-8 md:hidden flex flex-col gap-6"
          >
            {menuItems.map((item, idx) => (
              <motion.a
                key={item.id || idx}
                href={item.url}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-clash font-bold text-white flex items-center justify-between group"
              >
                {item.label}
                <ChevronRight className="text-kits-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
            <button className="w-full py-4 bg-kits-gold text-kits-black font-bold mt-4">
              APPLY NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
