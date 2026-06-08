
export type Language = 'en' | 'ar' | 'ku';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  gender: 'men' | 'women';
}

export interface BrandInfo {
  name: string;
  logo: string;
}

export const BRANDS_INFO: BrandInfo[] = [
  { name: "Rolex", logo: "https://www.thefashionlaw.com/wp-content/uploads/2020/03/rolex-logo.png" },
  { name: "Patek Philippe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Patek_Philippe_logo.svg/1024px-Patek_Philippe_logo.svg.png" },
  { name: "Audemars Piguet", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Audemars_Piguet_Logo.svg/1200px-Audemars_Piguet_Logo.svg.png" },
  { name: "Omega", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Omega_Logo.svg/1200px-Omega_Logo.svg.png" },
  { name: "Cartier", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Cartier_logo.svg/1200px-Cartier_logo.svg.png" },
  { name: "Tissot", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Tissot_logo.svg/1200px-Tissot_logo.svg.png" },
  { name: "Hublot", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Hublot_logo.svg/1200px-Hublot_logo.svg.png" },
  { name: "Breitling", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Breitling_Logo.svg/1200px-Breitling_Logo.svg.png" },
  { name: "Tudor", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Tudor_Watches_logo.svg/1200px-Tudor_Watches_logo.svg.png" },
  { name: "Longines", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Longines_logo.svg/1200px-Longines_logo.svg.png" },
  { name: "Seiko", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Seiko_logo.svg/1200px-Seiko_logo.svg.png" },
  { name: "Citizen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Citizen_Watch_logo.svg/1200px-Citizen_Watch_logo.svg.png" },
  { name: "Casio", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Casio_logo.svg/1200px-Casio_logo.svg.png" },
  { name: "Swatch", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Swatch_Logo.svg/1200px-Swatch_Logo.svg.png" },
  { name: "Fossil", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Fossil_logo.svg/1200px-Fossil_logo.svg.png" },
  { name: "Emporio Armani", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Emporio_Armani_logo.svg/1200px-Emporio_Armani_logo.svg.png" },
  { name: "Hugo Boss", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hugo_Boss_logo.svg/1200px-Hugo_Boss_logo.svg.png" },
  { name: "Michael Kors", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Michael_Kors_logo.svg/1200px-Michael_Kors_logo.svg.png" },
  { name: "Versace", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Versace_logo.svg/1200px-Versace_logo.svg.png" },
  { name: "Roberto Cavalli", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Roberto_Cavalli_logo.svg/1200px-Roberto_Cavalli_logo.svg.png" },
  { name: "Just Cavalli", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6A5WnS0_oE8rY69R5aP0P3I09S9Yv8R_C1A&s" }
];

export const BRANDS = BRANDS_INFO.map(b => b.name);

export const TRANSLATIONS = {
  en: {
    title: "EMZA WATCH VIP",
    subtitle: "Excellence in Every Second",
    men: "Men's Collection",
    women: "Women's Collection",
    orderNow: "Order Now",
    price: "IQD",
    brands: "Brands",
    all: "All",
    admin: "Admin Dashboard",
    addProduct: "Add New Watch",
    brandName: "Brand",
    watchName: "Watch Name",
    imageLink: "Image URL",
    description: "Description",
    category: "Category",
    save: "Save Watch",
    complaints: "Feedback & Complaints",
    location: "Kurdistan-Erbil",
    phone: "+9647508183614",
    submit: "Submit",
    name: "Name",
    message: "Message",
    reviews: "Customer Reviews",
    back: "Back to Home",
    noProducts: "No watches found in this category.",
    contactUs: "Contact Us"
  },
  ar: {
    title: "EMZA WATCH VIP",
    subtitle: "التميز في كل ثانية",
    men: "مجموعة الرجال",
    women: "مجموعة النساء",
    orderNow: "اطلب الآن",
    price: "د.ع",
    brands: "الماركات",
    all: "الكل",
    admin: "لوحة التحكم",
    addProduct: "إضافة ساعة جديدة",
    brandName: "الماركة",
    watchName: "اسم الساعة",
    imageLink: "رابط الصورة",
    description: "الوصف",
    category: "الفئة",
    save: "حفظ الساعة",
    complaints: "الشكاوي والمقترحات",
    location: "كردستان - أربيل",
    phone: "+9647508183614",
    submit: "إرسال",
    name: "الاسم",
    message: "الرسالة",
    reviews: "تقييمات العملاء",
    back: "العودة للرئيسية",
    noProducts: "لا توجد ساعات في هذا القسم.",
    contactUs: "اتصل بنا"
  },
  ku: {
    title: "EMZA WATCH VIP",
    subtitle: "نایابی لە هەموو چرکەیەکدا",
    men: "کۆکراوەی پیاوان",
    women: "کۆکراوەی ئافرەتان",
    orderNow: "ئێستا داوا بکە",
    price: "د.ع",
    brands: "مارکەکان",
    all: "هەموو",
    admin: "بەڕێوەبردنی گشتی",
    addProduct: "زیادکردنی کاتژمێری نوێ",
    brandName: "مارکە",
    watchName: "ناوی کاتژمێر",
    imageLink: "لینکی وێنە",
    description: "وەسف",
    category: "جۆر",
    save: "خەزن کردن",
    complaints: "پێشنیار و سکاڵاکان",
    location: "کوردستان - هەولێر",
    phone: "+9647508183614",
    submit: "ناردن",
    name: "ناو",
    message: "پەیام",
    reviews: "ڕای کڕیاران",
    back: "گەڕانەوە بۆ سەرەتا",
    noProducts: "هیچ کاتژمێرێک لەم بەشەدا نییە.",
    contactUs: "پەیوەندیمان پێوە بکەن"
  }
};
