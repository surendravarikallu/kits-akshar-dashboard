import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, Trash2, GripVertical, Save, RefreshCw } from 'lucide-react';
import { SPRING_REVEAL } from '../../utils/animations';

export default function NavbarManager() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/menus/main');
      const data = await res.json();
      if (data && data.items) {
        setItems(data.items.sort((a, b) => a.order - b.order));
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setMessage({ type: 'error', text: 'Failed to fetch menu items.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => {
    const newItem = {
      label: 'New Link',
      url: '#',
      order: items.length + 1,
      isNew: true,
      id: `temp-${Date.now()}`
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // In a real app, you'd send the whole array to the backend
      // and let it update the DB. For this demo, we'll simulate it.
      const response = await fetch('http://localhost:5000/api/menus/main', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ items: items.map((it, idx) => ({ ...it, order: idx + 1 })) }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Navbar updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to save changes.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-20 text-center animate-pulse text-kits-gold">Syncing with Menu Engine...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <motion.div 
        variants={SPRING_REVEAL}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-clash font-bold uppercase tracking-tight mb-2 text-white">Navigation Editor</h1>
          <p className="text-kits-gray">Drag and drop to reorder links. Changes are reflected in real-time.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchItems}
            className="p-3 bg-kits-navy/50 border border-white/5 rounded-sm text-kits-gray hover:text-white transition-all"
            title="Refresh"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={handleAddItem}
            className="flex items-center gap-2 px-6 py-3 bg-kits-navy/50 border border-kits-gold/30 text-kits-gold font-bold text-sm rounded-sm hover:bg-kits-gold hover:text-kits-black transition-all"
          >
            <Plus size={18} /> ADD LINK
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-kits-gold text-kits-black font-bold text-sm rounded-sm hover:bg-white transition-all disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />} SAVE CHANGES
          </button>
        </div>
      </motion.div>

      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-sm border ${
            message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
          } text-sm font-bold uppercase tracking-widest text-center`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="bg-kits-navy/20 border border-white/5 rounded-sm p-4">
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-4">
          {items.map((item) => (
            <Reorder.Item 
              key={item.id} 
              value={item}
              className="bg-kits-black border border-white/5 p-4 flex items-center gap-6 group hover:border-kits-gold/20 transition-all cursor-default"
            >
              <div className="cursor-grab active:cursor-grabbing text-kits-gray hover:text-kits-gold transition-colors">
                <GripVertical size={20} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div>
                  <label className="text-[10px] text-kits-gray font-bold uppercase tracking-[0.2em] mb-1 block">Label</label>
                  <input 
                    type="text" 
                    value={item.label}
                    onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                    className="w-full bg-kits-navy/30 border border-white/10 rounded-sm p-2 text-sm text-white focus:border-kits-gold/50 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-kits-gray font-bold uppercase tracking-[0.2em] mb-1 block">URL / Anchor</label>
                  <input 
                    type="text" 
                    value={item.url}
                    onChange={(e) => handleUpdateItem(item.id, 'url', e.target.value)}
                    className="w-full bg-kits-navy/30 border border-white/10 rounded-sm p-2 text-sm text-white focus:border-kits-gold/50 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={() => handleRemoveItem(item.id)}
                className="p-3 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-all"
              >
                <Trash2 size={18} />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        
        {items.length === 0 && (
          <div className="p-12 text-center text-kits-gray border border-dashed border-white/10 italic">
            No navigation links found. Add your first link above.
          </div>
        )}
      </div>
    </div>
  );
}
