
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useStore } from '../StoreContext';
import { Product } from '../types';
import { MessageCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { t } = useLanguage();
  
  const handleWhatsApp = () => {
    const text = `أهلاً EMZA WATCH VIP،\n\nأريد طلب هذه الساعة:\nاسم الساعة: ${product.name}\nالماركة: ${product.brand}\nالسعر: ${product.price.toLocaleString()} ${t.price}\n\nشكراً لك.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/9647508183614?text=${encoded}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-neutral-100 flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] tracking-widest uppercase">
          {product.brand}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-lg text-neutral-900 leading-tight">{product.name}</h3>
          <span className="text-yellow-600 font-bold text-sm whitespace-nowrap">
            {product.price.toLocaleString()} <small className="font-normal text-[10px]">{t.price}</small>
          </span>
        </div>
        <p className="text-neutral-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        <button 
          onClick={handleWhatsApp}
          className="w-full bg-black hover:bg-neutral-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold group-hover:bg-yellow-600"
        >
          <MessageCircle size={18} />
          {t.orderNow}
        </button>
      </div>
    </motion.div>
  );
};

export const FeedbackSection = () => {
  const { t } = useLanguage();
  const { addComplaint, complaints } = useStore();
  const [name, setName] = React.useState('');
  const [msg, setMsg] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !msg) return;
    await addComplaint(name, msg);
    setName('');
    setMsg('');
    alert('Thank you! Your review has been submitted successfully.');
  };

  return (
    <div className="py-24 bg-[#0a0a0a] border-t border-yellow-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-yellow-500 mb-4 tracking-tight">{t.reviews}</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm sticky top-24">
              <h3 className="text-2xl font-bold text-white mb-6">{t.contactUs}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-500 uppercase font-bold tracking-widest ml-2">{t.name}</label>
                  <input 
                    value={name} onChange={e => setName(e.target.value)}
                    placeholder="Your Name" 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 transition-all outline-none" 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-neutral-500 uppercase font-bold tracking-widest ml-2">{t.message}</label>
                  <textarea 
                    value={msg} onChange={e => setMsg(e.target.value)}
                    placeholder="Tell us about your experience..." 
                    rows={4} 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 transition-all outline-none" 
                    required 
                  />
                </div>
                <button type="submit" className="w-full bg-yellow-600 py-4 rounded-2xl font-bold text-black hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 text-lg">
                  {t.submit}
                </button>
              </form>
            </div>
          </div>

          {/* Reviews Side */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {complaints.length > 0 ? complaints.map((c: any) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  key={c.id} 
                  className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full flex items-center justify-center">
                    <Star fill="#eab308" className="text-yellow-500 ml-4 mb-4" size={20} />
                  </div>
                  <div className="mb-4 flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#eab308" className="text-yellow-500" />)}
                  </div>
                  <p className="text-neutral-700 italic leading-relaxed mb-6 text-lg">"{c.message}"</p>
                  <div className="flex items-center gap-3 border-t border-neutral-50 pt-4">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center font-bold text-white uppercase">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900">{c.name}</h4>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Verified Customer</p>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-2 text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <p className="text-neutral-500">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
