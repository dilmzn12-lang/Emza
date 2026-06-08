
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useStore } from '../StoreContext';
import { BRANDS, Product } from '../types';
import { Plus, Trash2, Lock, Upload } from 'lucide-react';

export const AdminDashboard = () => {
  const { t } = useLanguage();
  const { products, addProduct, removeProduct, complaints, removeComplaint } = useStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    brand: BRANDS[0],
    price: '',
    image: '',
    description: '',
    gender: 'men' as 'men' | 'women'
  });
  const [uploading, setUploading] = useState(false);

  // دالة تحويل الصورة إلى Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // التأكد من حجم الصورة (يفضل أقل من 500 كيلوبايت لأن Firestore لديه حد 1 ميجابايت)
    if (file.size > 800000) {
      alert("الصورة كبيرة جداً، يرجى اختيار صورة أقل من 800 كيلوبايت");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string });
      setUploading(false);
      alert("تمت معالجة الصورة بنجاح!");
    };
    reader.onerror = () => {
      alert("فشل في قراءة الصورة");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'emza750') {
      setIsAuthorized(true);
    } else {
      alert('Unauthorized');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("يرجى اختيار صورة أولاً");
      return;
    }
    const productData = {
      name: formData.name,
      brand: formData.brand,
      price: parseInt(formData.price),
      image: formData.image,
      description: formData.description,
      gender: formData.gender
    };
    await addProduct(productData);
    setFormData({ name: '', brand: BRANDS[0], price: '', image: '', description: '', gender: 'men' });
    alert('تمت إضافة الساعة إلى Firestore بنجاح!');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-neutral-800 p-8 rounded-xl border border-yellow-800/30 w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-600/10 rounded-full flex items-center justify-center border border-yellow-600/50 text-yellow-500">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-white text-center mb-6">EMZA Admin Access</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white mb-4 focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="Enter Admin Password"
          />
          <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition-colors">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif font-bold text-neutral-900">{t.admin}</h1>
          <button onClick={() => setIsAuthorized(false)} className="text-neutral-500 hover:text-red-500 underline text-sm">Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="text-yellow-600" /> {t.addProduct}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">{t.brandName}</label>
                <select 
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full border-neutral-300 rounded-lg focus:ring-yellow-500"
                >
                  {BRANDS.map((b: string) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">{t.watchName}</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-neutral-300 rounded-lg focus:ring-yellow-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1">{t.price} (IQD)</label>
                  <input 
                    type="number" required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full border-neutral-300 rounded-lg focus:ring-yellow-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1">{t.category}</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value as 'men' | 'women'})}
                    className="w-full border-neutral-300 rounded-lg focus:ring-yellow-500"
                  >
                    <option value="men">{t.men}</option>
                    <option value="women">{t.women}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">{t.imageLink} (أو اختر صورة)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" required
                    placeholder="رابط الصورة أو سيتم وضع النص تلقائياً"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="flex-grow border-neutral-300 rounded-lg focus:ring-yellow-500" 
                  />
                  <label className={`cursor-pointer flex items-center justify-center p-3 rounded-lg border border-dashed border-neutral-300 hover:border-yellow-500 transition-colors ${uploading ? 'opacity-50 animate-pulse' : ''}`}>
                    <Upload size={18} className="text-neutral-500" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
                {formData.image && <p className="text-[10px] text-green-600 mt-1">الصورة جاهزة (Base64)</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">{t.description}</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border-neutral-300 rounded-lg focus:ring-yellow-500" 
                />
              </div>
              <button type="submit" disabled={uploading} className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-neutral-800 transition-colors disabled:bg-neutral-400">
                {uploading ? 'جاري المعالجة...' : t.save}
              </button>
            </form>
          </section>

          <div className="space-y-12">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <h2 className="text-xl font-bold mb-6">Recent Inventory</h2>
              <div className="max-h-[400px] overflow-y-auto space-y-4">
                {products.length === 0 && <p className="text-neutral-400">No products added yet.</p>}
                {products.map((p: Product) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-black text-yellow-500 flex items-center justify-center text-[10px] font-bold">
                        {p.brand.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900">{p.name}</h4>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{p.brand} • {p.price.toLocaleString()} IQD</p>
                      </div>
                    </div>
                    <button onClick={() => removeProduct(p.id)} className="text-red-400 hover:text-red-600 p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <h2 className="text-xl font-bold mb-6">{t.complaints}</h2>
              <div className="space-y-4">
                {complaints.length === 0 && <p className="text-neutral-400">No feedback yet.</p>}
                {complaints.map((c: any) => (
                  <div key={c.id} className="p-4 bg-red-50/30 rounded-lg border border-red-100 flex justify-between items-center group transition-all hover:bg-red-50">
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1 rtl:flex-row-reverse">
                        <h4 className="font-bold text-neutral-900">{c.name}</h4>
                        <span className="text-[10px] text-neutral-400">{new Date(c.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-neutral-700 italic">"{c.message}"</p>
                    </div>
                    <button 
                      onClick={() => { if(confirm('هل تريد حذف هذا التقييم نهائياً؟')) removeComplaint(c.id); }}
                      className="ml-4 p-3 bg-white text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
