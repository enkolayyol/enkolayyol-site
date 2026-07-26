import React, { useState, useMemo, useEffect } from "react";
import {
  Search, ShoppingCart, X, Plus, Minus, Star, Trash2, Check, MapPin, Truck,
  ChevronRight, ChevronLeft, Heart, User, SlidersHorizontal, ShieldCheck, RotateCcw,
  CreditCard, Home, Briefcase, Lock, Sparkles, Loader2, LogOut, Pencil,
  ZoomIn, ZoomOut, RotateCw, MessageCircle, Send, Upload, Video, ImagePlus, ChevronDown, ChevronUp,
} from "lucide-react";

const CATEGORIES = [
  { id: "tumu", label: "Tümü" },
  { id: "elektronik", label: "Elektronik" },
  { id: "moda", label: "Moda" },
  { id: "ev", label: "Ev & Yaşam" },
  { id: "kozmetik", label: "Kozmetik" },
  { id: "spor", label: "Spor & Outdoor" },
  { id: "kitap", label: "Kitap & Kırtasiye" },
];

const CATEGORY_DESC = {
  elektronik: "Günlük kullanımı kolaylaştıran, güvenilir markaların teknoloji ürünleri arasında yer alır.",
  moda: "Sezonun öne çıkan kesim ve kumaşlarıyla dolabına kolayca uyum sağlayacak bir parça.",
  ev: "Evinin konforunu artıran, kullanışlı ve uzun ömürlü bir ev & yaşam ürünü.",
  kozmetik: "Cilt tipine uygun formülasyonuyla düzenli kullanımda fark yaratan bir bakım ürünü.",
  spor: "Aktif yaşam tarzını destekleyen, dayanıklı malzemeden üretilmiş bir spor ekipmanı.",
  kitap: "Günlük çalışma ve üretkenliğini destekleyecek pratik bir kırtasiye ürünü.",
};

const CATEGORY_SPECS = {
  elektronik: [{ k: "Garanti", v: "2 Yıl Resmi Distribütör Garantisi" }, { k: "Kutu İçeriği", v: "Cihaz, USB-C Kablo, Kullanım Kılavuzu" }, { k: "Menşei", v: "İthal" }],
  moda: [{ k: "Kumaş", v: "%100 Pamuk" }, { k: "Bakım", v: "30°C'de makinede yıkanabilir" }, { k: "Menşei", v: "Türkiye" }],
  ev: [{ k: "Malzeme", v: "BPA İçermez, Gıdayla Temasa Uygun" }, { k: "Garanti", v: "2 Yıl" }, { k: "Kutu İçeriği", v: "Ana Ürün, Kullanım Kılavuzu" }],
  kozmetik: [{ k: "Cilt Tipi", v: "Tüm Cilt Tipleri" }, { k: "İçerik", v: "Paraben İçermez" }, { k: "Hacim", v: "Ürün ambalajında belirtilmiştir" }],
  spor: [{ k: "Malzeme", v: "Dayanıklı, Kaymaz Yüzey" }, { k: "Kullanım Alanı", v: "İç/Dış Mekan" }, { k: "Garanti", v: "1 Yıl" }],
  kitap: [{ k: "Kağıt Türü", v: "1. Hamur" }, { k: "Sayfa/Adet", v: "Ürün ambalajında belirtilmiştir" }],
};

const DEFAULT_PRODUCTS = [
  { id: 1, cat: "elektronik", name: "Kablosuz Kulaklık Pro X3", brand: "SonicWave", price: 1249, oldPrice: 1899, rating: 4.6, reviews: 2140, img: "wireless-headphones" },
  { id: 2, cat: "elektronik", name: "Akıllı Saat Fit 5", brand: "Chronotech", price: 2399, oldPrice: 3199, rating: 4.4, reviews: 987, img: "smartwatch" },
  { id: 3, cat: "elektronik", name: "Taşınabilir Şarj Cihazı 20000mAh", brand: "VoltCore", price: 449, oldPrice: 690, rating: 4.7, reviews: 3320, img: "power-bank" },
  { id: 4, cat: "moda", name: "Oversize Örme Kazak", brand: "Urbanite", price: 379, oldPrice: 599, rating: 4.3, reviews: 512, img: "knit-sweater" },
  { id: 5, cat: "moda", name: "Yüksek Bel Straight Kot Pantolon", brand: "Denim&Co", price: 549, oldPrice: 799, rating: 4.5, reviews: 1290, img: "blue-jeans" },
  { id: 6, cat: "moda", name: "Deri Görünümlü Crossbody Çanta", brand: "Marlowe", price: 629, oldPrice: 990, rating: 4.2, reviews: 340, img: "handbag" },
  { id: 7, cat: "ev", name: "Aromalı Kahve Makinesi", brand: "Brewhaus", price: 1799, oldPrice: 2450, rating: 4.6, reviews: 764, img: "coffee-maker" },
  { id: 8, cat: "ev", name: "Pamuklu Nevresim Takımı Çift Kişilik", brand: "Cottonyx", price: 899, oldPrice: 1250, rating: 4.8, reviews: 2010, img: "bedding-set" },
  { id: 9, cat: "kozmetik", name: "C Vitamini Serumu 30ml", brand: "Dermalique", price: 289, oldPrice: 420, rating: 4.5, reviews: 4410, img: "skincare-serum" },
  { id: 10, cat: "kozmetik", name: "Nemlendirici Yüz Kremi SPF30", brand: "Purevie", price: 199, oldPrice: 299, rating: 4.4, reviews: 1876, img: "face-cream" },
  { id: 11, cat: "spor", name: "Yoga Matı 6mm Kaymaz Taban", brand: "FlexCore", price: 349, oldPrice: 499, rating: 4.7, reviews: 998, img: "yoga-mat" },
  { id: 12, cat: "spor", name: "Koşu Ayakkabısı AirRun 2.0", brand: "Sprintix", price: 1099, oldPrice: 1599, rating: 4.5, reviews: 2650, img: "running-shoes" },
  { id: 13, cat: "kitap", name: "A5 Çizgili Defter Set (3'lü)", brand: "Kalemhane", price: 129, oldPrice: 189, rating: 4.6, reviews: 720, img: "notebook" },
  { id: 14, cat: "kitap", name: "Metal Gövdeli Dolma Kalem", brand: "Yazıevi", price: 249, oldPrice: 349, rating: 4.3, reviews: 410, img: "fountain-pen" },
  { id: 15, cat: "elektronik", name: "4K Ultra HD Web Kamerası", brand: "ClearView", price: 899, oldPrice: 1250, rating: 4.4, reviews: 610, img: "webcam" },
  { id: 16, cat: "ev", name: "Aromaterapi Difüzör Set", brand: "Sereneair", price: 379, oldPrice: 549, rating: 4.6, reviews: 1330, img: "essential-oil-diffuser" },
];

const DEFAULT_HERO = { title: "Aradığın her şeye en kolay yol.", subtitle: "Binlerce üründe hızlı teslimat, güvenli ödeme ve kolay iade. Yolun kısası burada." };
const DEFAULT_ADMIN_PASSWORD = "enkolayyol2026";

const DEFAULT_ADDRESSES = [
  { id: "a1", type: "ev", title: "Ev Adresi", name: "Ayşe Yılmaz", detail: "Bahçelievler Mah. Gül Sok. No:14 D:3, Bahçelievler / İstanbul", phone: "0532 111 22 33" },
  { id: "a2", type: "is", title: "İş Adresi", name: "Ayşe Yılmaz", detail: "Levent Mah. Büyükdere Cad. No:100 Kat:5, Şişli / İstanbul", phone: "0532 111 22 33" },
];

const money = (n) => Number(n).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const imgUrl = (keyword, size = 400, lock = 1) => `https://loremflickr.com/${size}/${size}/${encodeURIComponent(keyword)}?lock=${lock}`;

function cardBrand(number) {
  const n = number.replace(/\D/g, "");
  if (n.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(n)) return "Mastercard";
  return "Kart";
}

function youtubeEmbedUrl(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

function getProductImages(p) {
  if (p.customImages && p.customImages.length > 0) return p.customImages;
  return [imgUrl(p.img, 700, p.id), imgUrl(p.img, 700, p.id * 10 + 1), imgUrl(p.img, 700, p.id * 10 + 2), imgUrl(p.img, 700, p.id * 10 + 3)];
}

function getProductSpecs(p) {
  return (p.specs && p.specs.length > 0) ? p.specs : (CATEGORY_SPECS[p.cat] || []);
}

function StarRow({ rating, reviews, size = 12 }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-neutral-500">
      <div className="flex items-center gap-[1px] text-[#FF7A29]">
        <Star size={size} fill="#FF7A29" strokeWidth={0} />
        <span className="font-semibold text-neutral-700">{rating}</span>
      </div>
      <span>({Number(reviews).toLocaleString("tr-TR")})</span>
    </div>
  );
}

function StarPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <Star size={20} className={n <= value ? "text-[#FF7A29]" : "text-neutral-300"} fill={n <= value ? "#FF7A29" : "none"} />
        </button>
      ))}
    </div>
  );
}

function ProductCard({ p, onAdd, onOpen, isFav, onToggleFav }) {
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);
  const mainImg = (p.customImages && p.customImages[0]) || imgUrl(p.img, 400, p.id);
  return (
    <div className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer" onClick={() => onOpen(p.id)}>
        <img src={mainImg} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2 bg-[#FFB84D] text-[#1544C7] text-[11px] font-bold px-2 py-0.5 rounded-full">
          %{discount} indirim
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(p.id); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart size={14} className={isFav ? "text-red-500" : "text-neutral-400"} fill={isFav ? "#ef4444" : "none"} />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <span className="text-[11px] uppercase tracking-wide text-neutral-400 font-semibold">{p.brand}</span>
        <h3 onClick={() => onOpen(p.id)} className="text-sm font-medium text-neutral-800 leading-snug line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-[#FF7A29]">
          {p.name}
        </h3>
        <StarRow rating={p.rating} reviews={p.reviews} />
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-neutral-900">₺{money(p.price)}</span>
          <span className="text-xs text-neutral-400 line-through">₺{money(p.oldPrice)}</span>
        </div>
        <button
          onClick={() => onAdd(p)}
          className="mt-2 w-full bg-[#1544C7] hover:bg-[#FF7A29] text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}

function RoadDivider() {
  return (
    <div className="relative h-6 overflow-hidden" aria-hidden="true">
      <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#FFB84D_0px,#FFB84D_22px,transparent_22px,transparent_40px)] opacity-70" />
    </div>
  );
}

function FilterPanel({ priceRange, maxPrice, setPriceRange, brands, selectedBrands, toggleBrand, onClear }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-sm text-neutral-800">Filtrele</h3>
        <button onClick={onClear} className="text-xs text-[#FF7A29] font-medium hover:underline">Temizle</button>
      </div>
      <div>
        <p className="text-xs font-semibold text-neutral-600 mb-2">Fiyat Aralığı</p>
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          <span>₺{money(priceRange[0])}</span><span>—</span><span>₺{money(priceRange[1])}</span>
        </div>
        <input type="range" min={0} max={maxPrice} step={50} value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full accent-[#FF7A29]" />
      </div>
      <div>
        <p className="text-xs font-semibold text-neutral-600 mb-2">Marka</p>
        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="accent-[#FF7A29] w-3.5 h-3.5" />
              {b}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuthModal({ onClose, onLogin }) {
  const [tab, setTab] = useState("giris");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const displayName = tab === "kayit" && name.trim() ? name.trim() : (email.split("@")[0] || "Kullanıcı");
    onLogin(displayName);
  };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="flex border-b border-neutral-200">
          {[["giris", "Giriş Yap"], ["kayit", "Kayıt Ol"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === id ? "text-[#FF7A29] border-b-2 border-[#FF7A29]" : "text-neutral-400"}`}>
              {label}
            </button>
          ))}
          <button onClick={onClose} className="px-3 text-neutral-400 hover:text-neutral-700"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-3">
          {tab === "kayit" && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad Soyad"
              className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
          )}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta"
            className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
          <input type="password" placeholder="Şifre"
            className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
          <button type="submit" className="w-full bg-[#FF7A29] hover:bg-[#E8621A] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors">
            {tab === "giris" ? "Giriş Yap" : "Hesap Oluştur"}
          </button>
          <p className="text-[11px] text-neutral-400 text-center pt-1">Bu bir demo formdur, gerçek kimlik doğrulama yapılmaz.</p>
        </form>
      </div>
    </div>
  );
}

function AdminLoginModal({ onClose, onSubmit, error }) {
  const [pw, setPw] = useState("");
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-xl w-full max-w-xs shadow-2xl overflow-hidden">
        <div className="bg-[#1544C7] text-white px-5 py-4 flex items-center gap-2">
          <Lock size={16} className="text-[#FFB84D]" />
          <span className="font-display font-semibold">Firma Girişi</span>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(pw); }} className="p-5 space-y-3">
          <input type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Firma şifresi"
            className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-[#1544C7] hover:bg-[#FF7A29] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors">Giriş Yap</button>
          <button type="button" onClick={onClose} className="w-full text-xs text-neutral-400 hover:text-neutral-600">Vazgeç</button>
        </form>
      </div>
    </div>
  );
}

function ImageZoomViewer({ src }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <img
          src={src}
          alt=""
          className="max-w-none transition-transform duration-200"
          style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 rounded-lg p-1 shadow">
        <button onClick={() => setZoom((z) => Math.max(1, z - 0.25))} className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100" title="Uzaklaştır">
          <ZoomOut size={16} className="text-neutral-700" />
        </button>
        <button onClick={() => setZoom((z) => Math.min(3, z + 0.25))} className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100" title="Yakınlaştır">
          <ZoomIn size={16} className="text-neutral-700" />
        </button>
        <button onClick={() => setRotation((r) => r - 90)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100" title="Sola Döndür">
          <RotateCcw size={16} className="text-neutral-700" />
        </button>
        <button onClick={() => setRotation((r) => r + 90)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100" title="Sağa Döndür">
          <RotateCw size={16} className="text-neutral-700" />
        </button>
        {(zoom !== 1 || rotation !== 0) && (
          <button onClick={() => { setZoom(1); setRotation(0); }} className="text-[11px] font-semibold text-[#FF7A29] px-1.5">Sıfırla</button>
        )}
      </div>
    </div>
  );
}

function ReviewsSection({ product, onAddReview }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const reviews = product.reviews || [];

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    onAddReview(product.id, { name: name.trim(), rating, comment: comment.trim() });
    setName(""); setComment(""); setRating(5);
  };

  return (
    <div className="mt-12">
      <h2 className="font-display font-semibold text-lg text-neutral-800 mb-4 flex items-center gap-2">
        <MessageCircle size={18} className="text-[#FF7A29]" /> Değerlendirmeler ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-neutral-400 mb-6">Bu ürün için henüz değerlendirme yok, ilk yorumu sen yaz.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {reviews.map((r) => (
            <div key={r.id} className="border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral-800">{r.name}</p>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={13} className={n <= r.rating ? "text-[#FF7A29]" : "text-neutral-200"} fill={n <= r.rating ? "#FF7A29" : "none"} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">{new Date(r.date).toLocaleDateString("tr-TR")}</p>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{r.comment}</p>
              {r.reply && (
                <div className="mt-3 bg-[#F3F7FF] border border-[#1544C7]/15 rounded-lg p-3">
                  <p className="text-xs font-semibold text-[#1544C7] mb-1">Enkolayyol Yanıtı</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{r.reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="border border-neutral-200 rounded-lg p-4 space-y-3">
        <p className="text-sm font-semibold text-neutral-700">Yorum Yaz</p>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adın"
          className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
        <StarPicker value={rating} onChange={setRating} />
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="Ürün hakkında ne düşünüyorsun?"
          className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29] resize-none" required />
        <button type="submit" className="bg-[#1544C7] hover:bg-[#FF7A29] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          Yorumu Gönder
        </button>
      </form>
    </div>
  );
}

function ProductDetail({ product, related, onBack, onAdd, onOpen, isFav, onToggleFav, onAddReview }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  const images = getProductImages(product);
  const specs = getProductSpecs(product);
  const videoEmbed = youtubeEmbedUrl(product.videoUrl);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800 mb-4">
        <ChevronLeft size={16} /> Ürünlere dön
      </button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ImageZoomViewer src={images[activeImg] || images[0]} />
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${activeImg === i ? "border-[#FF7A29]" : "border-transparent"}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {videoEmbed && (
            <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-neutral-200">
              <iframe src={videoEmbed} title="Ürün Videosu" className="w-full h-full" allowFullScreen />
            </div>
          )}
        </div>

        <div>
          <span className="text-xs uppercase tracking-wide text-neutral-400 font-semibold">{product.brand}</span>
          <h1 className="font-display font-semibold text-2xl text-neutral-900 mt-1 leading-snug">{product.name}</h1>
          <div className="mt-2"><StarRow rating={product.rating} reviews={product.reviews?.length ? product.reviews.length : product.reviews} size={14} /></div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-neutral-900">₺{money(product.price)}</span>
            <span className="text-sm text-neutral-400 line-through">₺{money(product.oldPrice)}</span>
            <span className="bg-[#FFB84D] text-[#1544C7] text-xs font-bold px-2 py-0.5 rounded-full">%{discount} indirim</span>
          </div>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{CATEGORY_DESC[product.cat] || "Enkolayyol güvencesiyle."}</p>
          <div className="mt-5 flex items-center gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-1.5"><Truck size={15} className="text-[#FF7A29]" /> Aynı gün kargo</div>
            <div className="flex items-center gap-1.5"><RotateCcw size={15} className="text-[#FF7A29]" /> 30 gün iade</div>
            <div className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#FF7A29]" /> Güvenli ödeme</div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-neutral-300 rounded-lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-neutral-100"><Minus size={14} /></button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-neutral-100"><Plus size={14} /></button>
            </div>
            <button onClick={() => { for (let i = 0; i < qty; i++) onAdd(product); }}
              className="flex-1 bg-[#1544C7] hover:bg-[#FF7A29] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors">
              Sepete Ekle
            </button>
            <button onClick={() => onToggleFav(product.id)} className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg border border-neutral-300 hover:bg-neutral-100">
              <Heart size={18} className={isFav ? "text-red-500" : "text-neutral-400"} fill={isFav ? "#ef4444" : "none"} />
            </button>
          </div>

          {specs.length > 0 && (
            <div className="mt-6 border-t border-neutral-200 pt-4">
              <h3 className="text-sm font-semibold text-neutral-800 mb-2">Ürün Özellikleri</h3>
              <dl className="text-sm divide-y divide-neutral-100">
                {specs.map((s, i) => (
                  <div key={i} className="flex justify-between py-1.5">
                    <dt className="text-neutral-500">{s.k}</dt>
                    <dd className="text-neutral-800 font-medium text-right">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      <ReviewsSection product={product} onAddReview={onAddReview} />

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display font-semibold text-lg text-neutral-800 mb-4">Benzer Ürünler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((rp) => (
              <ProductCard key={rp.id} p={rp} onAdd={onAdd} onOpen={onOpen} isFav={isFav === rp.id} onToggleFav={onToggleFav} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function StepHeader({ step }) {
  const steps = [{ id: "cart", label: "Sepet" }, { id: "address", label: "Adres" }, { id: "payment", label: "Ödeme" }];
  const idx = steps.findIndex((s) => s.id === step);
  return (
    <div className="flex items-center gap-1.5 px-4 pt-3">
      {steps.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${i <= idx ? "text-[#FF7A29]" : "text-neutral-300"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${i <= idx ? "bg-[#FF7A29] text-white" : "bg-neutral-200 text-neutral-400"}`}>
              {i < idx ? <Check size={11} /> : i + 1}
            </span>
            {s.label}
          </div>
          {i < steps.length - 1 && <div className={`flex-1 h-[2px] ${i < idx ? "bg-[#FF7A29]" : "bg-neutral-200"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function AddressStep({ addresses, selectedId, onSelect, onAdd, onBack, onContinue }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", name: "", phone: "", detail: "" });
  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.name || !form.detail) return;
    onAdd({ id: "a" + Date.now(), type: "diger", ...form });
    setForm({ title: "", name: "", phone: "", detail: "" });
    setShowForm(false);
  };
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <p className="text-sm font-semibold text-neutral-700">Teslimat Adresi Seç</p>
        {addresses.map((a) => (
          <label key={a.id} className={`flex items-start gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${selectedId === a.id ? "border-[#FF7A29] bg-[#FF7A29]/5" : "border-neutral-200 hover:border-neutral-300"}`}>
            <input type="radio" name="address" checked={selectedId === a.id} onChange={() => onSelect(a.id)} className="mt-1 accent-[#FF7A29]" />
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              {a.type === "ev" ? <Home size={15} className="text-neutral-600" /> : a.type === "is" ? <Briefcase size={15} className="text-neutral-600" /> : <MapPin size={15} className="text-neutral-600" />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-800">{a.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{a.name} · {a.phone}</p>
              <p className="text-xs text-neutral-500 mt-0.5 leading-snug">{a.detail}</p>
            </div>
          </label>
        ))}
        {showForm ? (
          <form onSubmit={submit} className="border border-neutral-200 rounded-lg p-3 space-y-2">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Adres Başlığı (ör. Ev, İş)"
              className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ad Soyad"
              className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Telefon"
              className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" />
            <textarea value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} placeholder="Açık Adres (Mahalle, Sokak, No, İlçe/İl)" rows={2}
              className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29] resize-none" required />
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 text-sm font-medium py-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50">Vazgeç</button>
              <button type="submit" className="flex-1 text-sm font-semibold py-2 rounded-lg bg-[#1544C7] text-white hover:bg-[#FF7A29]">Kaydet</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[#FF7A29] border border-dashed border-[#FF7A29] rounded-lg py-2.5 hover:bg-[#FF7A29]/5">
            <Plus size={15} /> Yeni Adres Ekle
          </button>
        )}
      </div>
      <div className="border-t border-neutral-200 px-4 py-4 flex gap-2">
        <button onClick={onBack} className="px-4 py-3 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50"><ChevronLeft size={16} /></button>
        <button onClick={onContinue} disabled={!selectedId}
          className="flex-1 bg-[#FF7A29] hover:bg-[#E8621A] disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
          Ödemeye Geç <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function PaymentStep({ cards, selectedId, onSelect, onAdd, onBack, onConfirm, total }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ holder: "", number: "", expiry: "", cvv: "" });
  const submit = (e) => {
    e.preventDefault();
    const digits = form.number.replace(/\D/g, "");
    if (!form.holder || digits.length < 12 || !form.expiry || !form.cvv) return;
    onAdd({ id: "c" + Date.now(), holder: form.holder, last4: digits.slice(-4), brand: cardBrand(digits), expiry: form.expiry });
    setForm({ holder: "", number: "", expiry: "", cvv: "" });
    setShowForm(false);
  };
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <p className="text-sm font-semibold text-neutral-700">Ödeme Yöntemi Seç</p>
        {cards.map((c) => (
          <label key={c.id} className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${selectedId === c.id ? "border-[#FF7A29] bg-[#FF7A29]/5" : "border-neutral-200 hover:border-neutral-300"}`}>
            <input type="radio" name="card" checked={selectedId === c.id} onChange={() => onSelect(c.id)} className="accent-[#FF7A29]" />
            <div className="w-9 h-7 rounded bg-[#1544C7] flex items-center justify-center shrink-0">
              <CreditCard size={14} className="text-[#FFB84D]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-neutral-800">{c.brand} •••• {c.last4}</p>
              <p className="text-xs text-neutral-500">{c.holder} · SKT {c.expiry}</p>
            </div>
          </label>
        ))}
        {cards.length === 0 && !showForm && <p className="text-xs text-neutral-400">Henüz kayıtlı kartın yok, devam etmek için bir kart ekle.</p>}
        {showForm ? (
          <form onSubmit={submit} className="border border-neutral-200 rounded-lg p-3 space-y-2">
            <input value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} placeholder="Kart Üzerindeki İsim"
              className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
            <input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} placeholder="Kart Numarası" inputMode="numeric" maxLength={19}
              className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
            <div className="flex gap-2">
              <input value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} placeholder="AA/YY"
                className="w-1/2 text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
              <input value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} placeholder="CVV" inputMode="numeric" maxLength={4}
                className="w-1/2 text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 text-sm font-medium py-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50">Vazgeç</button>
              <button type="submit" className="flex-1 text-sm font-semibold py-2 rounded-lg bg-[#1544C7] text-white hover:bg-[#FF7A29]">Kartı Kaydet</button>
            </div>
            <p className="text-[10px] text-neutral-400 pt-0.5">Bu bir demo formdur, gerçek kart bilgisi işlenmez.</p>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[#FF7A29] border border-dashed border-[#FF7A29] rounded-lg py-2.5 hover:bg-[#FF7A29]/5">
            <Plus size={15} /> Yeni Kart Ekle
          </button>
        )}
      </div>
      <div className="border-t border-neutral-200 px-4 py-4 space-y-3">
        <div className="flex items-center justify-between font-bold text-base"><span>Toplam</span><span>₺{money(total)}</span></div>
        <div className="flex gap-2">
          <button onClick={onBack} className="px-4 py-3 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50"><ChevronLeft size={16} /></button>
          <button onClick={onConfirm} disabled={!selectedId}
            className="flex-1 bg-[#FF7A29] hover:bg-[#E8621A] disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            Siparişi Onayla <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminProductRow({ p, onUpdateProduct, onDeleteProduct }) {
  const [expanded, setExpanded] = useState(false);
  const [specsDraft, setSpecsDraft] = useState(getProductSpecs(p));
  const [videoUrl, setVideoUrl] = useState(p.videoUrl || "");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdateProduct(p.id, { customImages: [...(p.customImages || []), reader.result] });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (idx) => {
    onUpdateProduct(p.id, { customImages: (p.customImages || []).filter((_, i) => i !== idx) });
  };

  const saveSpecs = () => onUpdateProduct(p.id, { specs: specsDraft.filter((s) => s.k.trim() && s.v.trim()) });
  const saveVideo = () => onUpdateProduct(p.id, { videoUrl: videoUrl.trim() });

  return (
    <div className="border border-neutral-100 rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 p-2">
        <img src={(p.customImages && p.customImages[0]) || imgUrl(p.img, 80, p.id)} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
        <input
          defaultValue={p.name}
          onBlur={(e) => e.target.value !== p.name && onUpdateProduct(p.id, { name: e.target.value })}
          className="flex-1 min-w-0 text-sm border border-transparent hover:border-neutral-200 focus:border-neutral-300 rounded px-2 py-1 outline-none"
        />
        <input
          type="number" defaultValue={p.price}
          onBlur={(e) => Number(e.target.value) !== p.price && onUpdateProduct(p.id, { price: Number(e.target.value) })}
          className="w-20 text-sm border border-neutral-200 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#FF7A29]"
        />
        <button onClick={() => setExpanded((v) => !v)} className="text-neutral-400 hover:text-[#1544C7] shrink-0">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <button onClick={() => onDeleteProduct(p.id)} className="text-neutral-400 hover:text-red-500 shrink-0"><Trash2 size={15} /></button>
      </div>

      {expanded && (
        <div className="border-t border-neutral-100 p-3 space-y-4 bg-neutral-50">
          <div>
            <p className="text-xs font-semibold text-neutral-600 mb-2 flex items-center gap-1.5"><ImagePlus size={13} /> Ürün Fotoğrafları</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {(p.customImages || []).map((img, i) => (
                <div key={i} className="relative w-14 h-14 rounded overflow-hidden border border-neutral-200">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)} className="absolute top-0 right-0 bg-black/60 text-white w-4 h-4 flex items-center justify-center text-[10px]">✕</button>
                </div>
              ))}
            </div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1544C7] cursor-pointer w-fit">
              <Upload size={13} /> Fotoğraf Yükle
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
            <p className="text-[10px] text-neutral-400 mt-1">Fotoğraflar tarayıcında saklanır, çok sayıda/büyük fotoğraf yüklemekten kaçın.</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-neutral-600 mb-2 flex items-center gap-1.5"><Video size={13} /> Ürün Videosu (YouTube bağlantısı)</p>
            <div className="flex gap-2">
              <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..."
                className="flex-1 text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" />
              <button onClick={saveVideo} className="text-xs font-semibold bg-[#1544C7] text-white px-3 rounded-lg">Kaydet</button>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-neutral-600 mb-2">Ürün Özellikleri</p>
            <div className="space-y-1.5">
              {specsDraft.map((s, i) => (
                <div key={i} className="flex gap-1.5">
                  <input value={s.k} onChange={(e) => setSpecsDraft((prev) => prev.map((x, xi) => xi === i ? { ...x, k: e.target.value } : x))}
                    placeholder="Özellik" className="w-1/3 text-xs border border-neutral-300 rounded px-2 py-1.5 outline-none" />
                  <input value={s.v} onChange={(e) => setSpecsDraft((prev) => prev.map((x, xi) => xi === i ? { ...x, v: e.target.value } : x))}
                    placeholder="Değer" className="flex-1 text-xs border border-neutral-300 rounded px-2 py-1.5 outline-none" />
                  <button onClick={() => setSpecsDraft((prev) => prev.filter((_, xi) => xi !== i))} className="text-neutral-400 hover:text-red-500"><X size={14} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => setSpecsDraft((prev) => [...prev, { k: "", v: "" }])} className="text-xs font-semibold text-[#FF7A29]">+ Özellik Ekle</button>
              <button onClick={saveSpecs} className="text-xs font-semibold bg-[#1544C7] text-white px-3 py-1 rounded-lg ml-auto">Özellikleri Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminReviewsPanel({ products, onReply }) {
  const [drafts, setDrafts] = useState({});
  const allReviews = products.flatMap((p) => (p.reviews || []).map((r) => ({ ...r, productId: p.id, productName: p.name })));

  if (allReviews.length === 0) {
    return <p className="text-sm text-neutral-400">Henüz hiçbir üründe müşteri yorumu yok.</p>;
  }

  return (
    <div className="space-y-3">
      {allReviews.map((r) => (
        <div key={`${r.productId}-${r.id}`} className="border border-neutral-100 rounded-lg p-3">
          <p className="text-xs text-neutral-400">{r.productName}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm font-semibold text-neutral-800">{r.name}</p>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={12} className={n <= r.rating ? "text-[#FF7A29]" : "text-neutral-200"} fill={n <= r.rating ? "#FF7A29" : "none"} />
              ))}
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-1.5">{r.comment}</p>
          {r.reply && <p className="text-xs text-[#1544C7] mt-2 bg-[#F3F7FF] rounded px-2 py-1.5">Yanıtın: {r.reply}</p>}
          <div className="flex gap-2 mt-2">
            <input
              value={drafts[r.id] ?? ""}
              onChange={(e) => setDrafts((prev) => ({ ...prev, [r.id]: e.target.value }))}
              placeholder={r.reply ? "Yanıtı güncelle..." : "Yanıtla..."}
              className="flex-1 text-xs border border-neutral-300 rounded-lg px-2 py-1.5 outline-none focus:ring-1 focus:ring-[#FF7A29]"
            />
            <button
              onClick={() => { if (drafts[r.id]?.trim()) { onReply(r.productId, r.id, drafts[r.id].trim()); setDrafts((prev) => ({ ...prev, [r.id]: "" })); } }}
              className="text-xs font-semibold bg-[#1544C7] text-white px-3 rounded-lg flex items-center gap-1"
            >
              <Send size={12} /> Gönder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminPanel({ products, hero, onBack, onLogout, onUpdateProduct, onDeleteProduct, onAddProduct, onUpdateHero, onReplyReview, aiRun, aiLoading, aiResult }) {
  const [heroForm, setHeroForm] = useState(hero);
  const [newProduct, setNewProduct] = useState({ cat: "elektronik", name: "", brand: "", price: "", oldPrice: "" });
  const [aiCommand, setAiCommand] = useState("");
  const [tab, setTab] = useState("urunler");

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800"><ChevronLeft size={16} /> Siteye Dön</button>
        <button onClick={onLogout} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-red-500"><LogOut size={15} /> Çıkış Yap</button>
      </div>

      <h1 className="font-display font-bold text-2xl text-neutral-900 flex items-center gap-2 mb-1">
        <Lock size={20} className="text-[#FF7A29]" /> Firma Paneli
      </h1>
      <p className="text-sm text-neutral-500 mb-6">Değişiklikler tüm ziyaretçiler için anında kaydedilir.</p>

      <div className="bg-[#1544C7] text-white rounded-xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-[#FFB84D]" />
          <h2 className="font-display font-semibold">AI Destekli Düzenleme</h2>
        </div>
        <p className="text-xs text-neutral-400 mb-3">Doğal dille komut ver, ör: "3 numaralı ürünün fiyatını 999 yap" veya "ana başlığı 'Yaza Merhaba' yap".</p>
        <div className="flex gap-2">
          <input
            value={aiCommand}
            onChange={(e) => setAiCommand(e.target.value)}
            placeholder="Yapmak istediğin değişikliği yaz..."
            className="flex-1 text-sm bg-white/10 border border-white/15 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FFB84D] placeholder:text-neutral-500"
            onKeyDown={(e) => { if (e.key === "Enter" && aiCommand.trim() && !aiLoading) { aiRun(aiCommand); setAiCommand(""); } }}
          />
          <button
            onClick={() => { if (aiCommand.trim()) { aiRun(aiCommand); setAiCommand(""); } }}
            disabled={aiLoading || !aiCommand.trim()}
            className="bg-[#FF7A29] hover:bg-[#E8621A] disabled:opacity-50 text-white font-semibold text-sm px-4 py-2.5 rounded-lg flex items-center gap-1.5 shrink-0"
          >
            {aiLoading ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />} Uygula
          </button>
        </div>
        {aiResult && <p className="text-xs text-[#FFB84D] mt-2">{aiResult}</p>}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-8">
        <h2 className="font-display font-semibold text-neutral-800 mb-3">Ana Sayfa Başlığı</h2>
        <div className="space-y-2">
          <input value={heroForm.title} onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
            className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" placeholder="Başlık" />
          <textarea value={heroForm.subtitle} onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })} rows={2}
            className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29] resize-none" placeholder="Alt başlık" />
          <button onClick={() => onUpdateHero(heroForm)} className="text-sm font-semibold bg-[#1544C7] hover:bg-[#FF7A29] text-white px-4 py-2 rounded-lg transition-colors">Kaydet</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-8">
        <h2 className="font-display font-semibold text-neutral-800 mb-3">Yeni Ürün Ekle</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <select value={newProduct.cat} onChange={(e) => setNewProduct({ ...newProduct, cat: e.target.value })}
            className="text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]">
            {CATEGORIES.filter((c) => c.id !== "tumu").map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <input value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} placeholder="Marka"
            className="text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" />
          <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Ürün Adı"
            className="sm:col-span-2 text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" />
          <input value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Fiyat (₺)" inputMode="decimal"
            className="text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" />
          <input value={newProduct.oldPrice} onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })} placeholder="Eski Fiyat (₺)" inputMode="decimal"
            className="text-sm border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7A29]" />
        </div>
        <button
          onClick={() => {
            if (!newProduct.name || !newProduct.brand || !newProduct.price) return;
            onAddProduct({
              cat: newProduct.cat, name: newProduct.name, brand: newProduct.brand,
              price: Number(newProduct.price), oldPrice: Number(newProduct.oldPrice) || Number(newProduct.price),
            });
            setNewProduct({ cat: "elektronik", name: "", brand: "", price: "", oldPrice: "" });
          }}
          className="mt-3 text-sm font-semibold bg-[#FF7A29] hover:bg-[#E8621A] text-white px-4 py-2 rounded-lg transition-colors"
        >
          Ürünü Ekle
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("urunler")} className={`text-sm font-semibold px-3 py-1.5 rounded-full ${tab === "urunler" ? "bg-[#1544C7] text-white" : "bg-neutral-100 text-neutral-600"}`}>Ürün Kataloğu</button>
        <button onClick={() => setTab("yorumlar")} className={`text-sm font-semibold px-3 py-1.5 rounded-full ${tab === "yorumlar" ? "bg-[#1544C7] text-white" : "bg-neutral-100 text-neutral-600"}`}>Yorumlar & Şikayetler</button>
      </div>

      {tab === "urunler" ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h2 className="font-display font-semibold text-neutral-800 mb-3">Ürün Kataloğu ({products.length})</h2>
          <div className="space-y-2">
            {products.map((p) => (
              <AdminProductRow key={p.id} p={p} onUpdateProduct={onUpdateProduct} onDeleteProduct={onDeleteProduct} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h2 className="font-display font-semibold text-neutral-800 mb-3">Yorumlar & Şikayetler</h2>
          <AdminReviewsPanel products={products} onReply={onReplyReview} />
        </div>
      )}
    </main>
  );
}

export default function Enkolayyol() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [activeCat, setActiveCat] = useState("tumu");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState({ name: "home" });
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [addresses, setAddresses] = useState(DEFAULT_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState(DEFAULT_ADDRESSES[0].id);
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [orderDone, setOrderDone] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");

  useEffect(() => {
    try {
      const rawCatalog = localStorage.getItem("enkolayyol-catalog");
      if (rawCatalog) setProducts(JSON.parse(rawCatalog));
      else localStorage.setItem("enkolayyol-catalog", JSON.stringify(DEFAULT_PRODUCTS));
    } catch (e) {}
    try {
      const rawHero = localStorage.getItem("enkolayyol-hero");
      if (rawHero) setHero(JSON.parse(rawHero));
      else localStorage.setItem("enkolayyol-hero", JSON.stringify(DEFAULT_HERO));
    } catch (e) {}
    try {
      if (!localStorage.getItem("enkolayyol-admin-password")) {
        localStorage.setItem("enkolayyol-admin-password", DEFAULT_ADMIN_PASSWORD);
      }
    } catch (e) {}
    setDataLoaded(true);
  }, []);

  const BRANDS = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products]);
  const MAX_PRICE = useMemo(() => Math.max(...products.map((p) => p.price), 100), [products]);

  const persistProducts = (next) => {
    setProducts(next);
    try { localStorage.setItem("enkolayyol-catalog", JSON.stringify(next)); } catch (e) {}
  };
  const persistHero = (next) => {
    setHero(next);
    try { localStorage.setItem("enkolayyol-hero", JSON.stringify(next)); } catch (e) {}
  };

  const toggleFav = (id) => setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  const toggleBrand = (b) => setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  const clearFilters = () => { setPriceRange([0, MAX_PRICE]); setSelectedBrands([]); };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = activeCat === "tumu" || p.cat === activeCat;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= (priceRange[1] || MAX_PRICE);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      return matchesCat && matchesQuery && matchesPrice && matchesBrand;
    });
  }, [products, activeCat, query, priceRange, selectedBrands, MAX_PRICE]);

  const addToCart = (p) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === p.id);
      if (exists) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
    setToast(`${p.name} sepete eklendi`);
    setTimeout(() => setToast(null), 1800);
  };
  const changeQty = (id, delta) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)).filter((i) => i.qty > 0));
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const confirmOrder = () => {
    setOrderDone(true);
    setTimeout(() => { setOrderDone(false); setCart([]); setCartOpen(false); setCheckoutStep("cart"); setSelectedCardId(null); }, 2200);
  };

  const openProduct = (id) => { setView({ name: "product", id }); window.scrollTo?.(0, 0); };
  const goHome = () => setView({ name: "home" });
  const goFavorites = () => setView({ name: "favorites" });
  const goAdmin = () => setView({ name: "admin" });

  const activeProduct = view.name === "product" ? products.find((p) => p.id === view.id) : null;
  const relatedProducts = activeProduct ? products.filter((p) => p.cat === activeProduct.cat && p.id !== activeProduct.id).slice(0, 4) : [];
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleAdminLogin = (pw) => {
    let stored = DEFAULT_ADMIN_PASSWORD;
    try { stored = localStorage.getItem("enkolayyol-admin-password") || DEFAULT_ADMIN_PASSWORD; } catch (e) {}
    if (pw === stored) { setIsAdmin(true); setAdminLoginOpen(false); setAdminLoginError(""); goAdmin(); }
    else setAdminLoginError("Şifre hatalı, tekrar dene.");
  };

  const updateProduct = (id, patch) => persistProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const deleteProduct = (id) => persistProducts(products.filter((p) => p.id !== id));
  const addProduct = (data) => {
    const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const CATEGORY_IMG_KEYWORDS = { elektronik: "electronics", moda: "fashion-clothing", ev: "home-decor", kozmetik: "cosmetics", spor: "sports-equipment", kitap: "stationery" };
    const img = CATEGORY_IMG_KEYWORDS[data.cat] || "product";
    persistProducts([...products, { id: nextId, rating: 4.5, reviews: [], img, ...data }]);
  };

  const addReview = (productId, review) => {
    persistProducts(products.map((p) => {
      if (p.id !== productId) return p;
      const newReview = { id: "r" + Date.now(), name: review.name, rating: review.rating, comment: review.comment, date: new Date().toISOString(), reply: null };
      const existingReviews = Array.isArray(p.reviews) ? p.reviews : [];
      const updatedReviews = [newReview, ...existingReviews];
      const avgRating = updatedReviews.reduce((s, r) => s + r.rating, 0) / updatedReviews.length;
      return { ...p, reviews: updatedReviews, rating: Math.round(avgRating * 10) / 10 };
    }));
    setToast("Yorumun için teşekkürler!");
    setTimeout(() => setToast(null), 1800);
  };

  const replyToReview = (productId, reviewId, replyText) => {
    persistProducts(products.map((p) => {
      if (p.id !== productId) return p;
      const updatedReviews = (p.reviews || []).map((r) => (r.id === reviewId ? { ...r, reply: replyText } : r));
      return { ...p, reviews: updatedReviews };
    }));
    setToast("Yanıtın gönderildi");
    setTimeout(() => setToast(null), 1800);
  };

  const applyAiAction = (action) => {
    if (!action || typeof action !== "object") { setAiResult("Komut anlaşılamadı."); return; }
    switch (action.action) {
      case "update_price":
        updateProduct(action.id, { price: Number(action.price) });
        setAiResult(`Ürün #${action.id} fiyatı ₺${money(action.price)} olarak güncellendi.`);
        break;
      case "update_old_price":
        updateProduct(action.id, { oldPrice: Number(action.oldPrice) });
        setAiResult(`Ürün #${action.id} eski fiyatı güncellendi.`);
        break;
      case "update_name":
        updateProduct(action.id, { name: action.name });
        setAiResult(`Ürün #${action.id} adı güncellendi.`);
        break;
      case "delete_product":
        deleteProduct(action.id);
        setAiResult(`Ürün #${action.id} silindi.`);
        break;
      case "add_product":
        addProduct(action.product);
        setAiResult(`Yeni ürün eklendi: ${action.product?.name || ""}`);
        break;
      case "update_hero":
        persistHero({ title: action.title || hero.title, subtitle: action.subtitle || hero.subtitle });
        setAiResult("Ana sayfa başlığı güncellendi.");
        break;
      default:
        setAiResult(action.message || "Bu komutu uygulayamadım, farklı bir şekilde ifade edebilir misin?");
    }
  };

  const runAiCommand = async (command) => {
    setAiLoading(true);
    setAiResult("");
    try {
      const catalogSummary = products.map((p) => ({ id: p.id, name: p.name, price: p.price, oldPrice: p.oldPrice, cat: p.cat, brand: p.brand }));
      const prompt = `Sen Enkolayyol adlı bir e-ticaret sitesinin yönetim asistanısın. Mevcut ürün kataloğu (JSON):
${JSON.stringify(catalogSummary)}

Ana başlık: "${hero.title}"
Alt başlık: "${hero.subtitle}"

Yönetici komutu: "${command}"

Bu komutu uygulamak için SADECE aşağıdaki formatlardan birine uyan TEK bir JSON nesnesi döndür. Başka hiçbir açıklama, markdown ya da kod bloğu ekleme:
{"action":"update_price","id":<number>,"price":<number>}
{"action":"update_old_price","id":<number>,"oldPrice":<number>}
{"action":"update_name","id":<number>,"name":"<string>"}
{"action":"delete_product","id":<number>}
{"action":"add_product","product":{"cat":"elektronik|moda|ev|kozmetik|spor|kitap","name":"<string>","brand":"<string>","price":<number>,"oldPrice":<number>}}
{"action":"update_hero","title":"<string>","subtitle":"<string>"}
{"action":"none","message":"<kısa açıklama>"}`;

      const response = await fetch("/api/ai-command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      const text = (data.content || []).map((b) => b.text || "").join("").trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const action = JSON.parse(clean);
      applyAiAction(action);
    } catch (err) {
      setAiResult("Komut işlenirken bir sorun oluştu, tekrar dener misin?");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F7FF]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Oswald', sans-serif; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <header className="sticky top-0 z-40 bg-[#1544C7] text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={goHome} className="flex flex-col leading-none shrink-0 text-left">
            <span className="font-display font-bold text-2xl tracking-tight">Enkolay<span className="text-[#FFB84D]">yol</span></span>
            <span className="text-[10px] text-neutral-400 tracking-wide mt-0.5">alışverişin en kolay yolu</span>
          </button>
          <div className="flex-1 relative max-w-xl mx-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input value={query} onChange={(e) => { setQuery(e.target.value); if (view.name !== "home") goHome(); }} placeholder="Ürün, kategori veya marka ara..."
              className="w-full bg-white text-neutral-900 text-sm rounded-lg pl-9 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FFB84D]" />
          </div>
          <button
            onClick={() => (isAdmin ? goAdmin() : setAdminLoginOpen(true))}
            title="Firma Girişi"
            className={`flex items-center justify-center rounded-lg px-2.5 py-2 shrink-0 transition-colors ${isAdmin ? "bg-[#FFB84D] text-[#1544C7]" : "bg-white/10 hover:bg-white/20"}`}
          >
            <Lock size={18} />
          </button>
          <button onClick={() => (user ? goFavorites() : setAuthOpen(true))} className="relative flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-2.5 py-2 shrink-0">
            <Heart size={18} />
            {favorites.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#FFB84D] text-[#1544C7] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{favorites.length}</span>}
          </button>
          <button onClick={() => setAuthOpen(true)} className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-2.5 py-2 shrink-0 max-w-[120px]">
            <User size={18} className="shrink-0" />
            <span className="text-xs font-medium truncate hidden sm:inline">{user ? user : "Giriş Yap"}</span>
          </button>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-2 shrink-0">
            <ShoppingCart size={18} />
            <span className="text-sm font-medium hidden sm:inline">Sepetim</span>
            {itemCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#FFB84D] text-[#1544C7] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{itemCount}</span>}
          </button>
        </div>

        {view.name === "home" && (
          <div className="max-w-6xl mx-auto px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                className={`whitespace-nowrap text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${activeCat === c.id ? "bg-[#FF7A29] border-[#FF7A29] text-white" : "border-white/15 text-neutral-300 hover:border-white/40"}`}>
                {c.label}
              </button>
            ))}
            <button onClick={() => setFiltersOpen((v) => !v)}
              className={`ml-auto whitespace-nowrap flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${filtersOpen || selectedBrands.length > 0 || priceRange[1] < MAX_PRICE ? "bg-[#FFB84D] border-[#FFB84D] text-[#1544C7]" : "border-white/15 text-neutral-300 hover:border-white/40"}`}>
              <SlidersHorizontal size={13} /> Filtrele
            </button>
          </div>
        )}
      </header>

      {view.name === "home" && (
        <>
          <section className="bg-[#1544C7] text-white pb-10 pt-2 relative">
            <RoadDivider />
            <div className="max-w-6xl mx-auto px-4 pt-8 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div className="max-w-lg">
                <h1 className="font-display font-bold text-4xl md:text-5xl leading-[1.05]">{hero.title}</h1>
                <p className="mt-3 text-neutral-400 text-sm md:text-base">{hero.subtitle}</p>
                <div className="mt-5 flex items-center gap-5 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5"><Truck size={15} className="text-[#FF7A29]" /> Aynı gün kargo</div>
                  <div className="flex items-center gap-1.5"><MapPin size={15} className="text-[#FF7A29]" /> Türkiye geneli teslimat</div>
                </div>
              </div>
              <div className="hidden md:block w-64 h-40 rounded-xl overflow-hidden shrink-0 border border-white/10">
                <img src={imgUrl("istanbul-shopping-street", 400, 1)} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
          <RoadDivider />

          <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-xl text-neutral-800">{activeCat === "tumu" ? "Öne Çıkan Ürünler" : CATEGORIES.find((c) => c.id === activeCat)?.label}</h2>
              <span className="text-sm text-neutral-400">{filtered.length} ürün</span>
            </div>
            <div className={`grid gap-6 ${filtersOpen ? "md:grid-cols-[220px_1fr]" : "grid-cols-1"}`}>
              {filtersOpen && (
                <div className="md:sticky md:top-32 h-fit">
                  <FilterPanel priceRange={priceRange} maxPrice={MAX_PRICE} setPriceRange={setPriceRange} brands={BRANDS} selectedBrands={selectedBrands} toggleBrand={toggleBrand} onClear={clearFilters} />
                </div>
              )}
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-neutral-400">
                  <p className="font-medium">Aradığın kriterlere uygun ürün bulunamadı.</p>
                  <p className="text-sm mt-1">Farklı bir arama, kategori veya filtre dene.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} p={p} onAdd={addToCart} onOpen={openProduct} isFav={favorites.includes(p.id)} onToggleFav={toggleFav} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {view.name === "product" && activeProduct && (
        <ProductDetail product={activeProduct} related={relatedProducts} onBack={goHome} onAdd={addToCart} onOpen={openProduct}
          isFav={favorites.includes(activeProduct.id) ? activeProduct.id : null} onToggleFav={toggleFav} onAddReview={addReview} />
      )}

      {view.name === "favorites" && (
        <main className="max-w-6xl mx-auto px-4 py-8">
          <button onClick={goHome} className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800 mb-4"><ChevronLeft size={16} /> Ürünlere dön</button>
          <h2 className="font-display font-semibold text-xl text-neutral-800 mb-4">Favorilerim ({favoriteProducts.length})</h2>
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-20 text-neutral-400">
              <Heart size={36} className="mx-auto mb-2" />
              <p className="font-medium">Henüz favori ürünün yok</p>
              <p className="text-sm mt-1">Beğendiğin ürünlerin kalp ikonuna dokunarak buraya ekle.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {favoriteProducts.map((p) => (
                <ProductCard key={p.id} p={p} onAdd={addToCart} onOpen={openProduct} isFav={true} onToggleFav={toggleFav} />
              ))}
            </div>
          )}
        </main>
      )}

      {view.name === "admin" && isAdmin && (
        <AdminPanel
          products={products}
          hero={hero}
          onBack={goHome}
          onLogout={() => { setIsAdmin(false); goHome(); }}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
          onAddProduct={addProduct}
          onUpdateHero={persistHero}
          onReplyReview={replyToReview}
          aiRun={runAiCommand}
          aiLoading={aiLoading}
          aiResult={aiResult}
        />
      )}

      <footer className="bg-[#1544C7] text-neutral-400 text-xs py-6 text-center">
        Enkolayyol — bu bir demo arayüzdür, gerçek bir satış platformu değildir.
      </footer>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#1544C7] text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 z-50">
          <Check size={16} className="text-[#FF7A29]" /> {toast}
        </div>
      )}

      {authOpen && (
        <AuthModal onClose={() => setAuthOpen(false)} onLogin={(name) => {
          setUser(name); setAuthOpen(false); setToast(`Hoş geldin, ${name}`); setTimeout(() => setToast(null), 1800);
        }} />
      )}

      {adminLoginOpen && (
        <AdminLoginModal onClose={() => { setAdminLoginOpen(false); setAdminLoginError(""); }} onSubmit={handleAdminLogin} error={adminLoginError} />
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200">
              <h3 className="font-display font-semibold text-lg">
                {checkoutStep === "cart" ? `Sepetim (${itemCount})` : checkoutStep === "address" ? "Teslimat Adresi" : "Ödeme"}
              </h3>
              <button onClick={() => { setCartOpen(false); setCheckoutStep("cart"); }} className="text-neutral-500 hover:text-neutral-900"><X size={20} /></button>
            </div>
            {checkoutStep !== "cart" && !orderDone && <StepHeader step={checkoutStep} />}
            {orderDone ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FF7A29]/10 flex items-center justify-center"><Check size={28} className="text-[#FF7A29]" /></div>
                <p className="font-display font-semibold text-lg">Siparişin alındı!</p>
                <p className="text-sm text-neutral-500">Enkolayyol en kısa yoldan kapına ulaştıracak.</p>
              </div>
            ) : checkoutStep === "address" ? (
              <AddressStep addresses={addresses} selectedId={selectedAddressId} onSelect={setSelectedAddressId}
                onAdd={(a) => { setAddresses((prev) => [...prev, a]); setSelectedAddressId(a.id); }}
                onBack={() => setCheckoutStep("cart")} onContinue={() => setCheckoutStep("payment")} />
            ) : checkoutStep === "payment" ? (
              <PaymentStep cards={cards} selectedId={selectedCardId} onSelect={setSelectedCardId}
                onAdd={(c) => { setCards((prev) => [...prev, c]); setSelectedCardId(c.id); }}
                onBack={() => setCheckoutStep("address")} onConfirm={confirmOrder} total={total} />
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 text-neutral-400 px-6 text-center">
                <ShoppingCart size={36} />
                <p className="font-medium">Sepetin şu an boş</p>
                <p className="text-sm">Beğendiğin ürünleri sepete ekleyerek alışverişe başla.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 px-4 py-3">
                      <img src={(item.customImages && item.customImages[0]) || imgUrl(item.img, 120, item.id)} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-800 line-clamp-2">{item.name}</p>
                        <p className="text-sm font-bold text-neutral-900 mt-1">₺{money(item.price * item.qty)}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded border border-neutral-300 hover:bg-neutral-100"><Minus size={12} /></button>
                          <span className="text-sm w-4 text-center">{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center rounded border border-neutral-300 hover:bg-neutral-100"><Plus size={12} /></button>
                          <button onClick={() => removeItem(item.id)} className="ml-auto text-neutral-400 hover:text-red-500"><Trash2 size={15} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-neutral-200 px-4 py-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-neutral-500"><span>Ara toplam</span><span>₺{money(total)}</span></div>
                  <div className="flex items-center justify-between text-sm text-neutral-500"><span>Kargo</span><span className="text-[#FF7A29] font-medium">Ücretsiz</span></div>
                  <div className="flex items-center justify-between font-bold text-base pt-2 border-t border-neutral-100"><span>Toplam</span><span>₺{money(total)}</span></div>
                  <button onClick={() => setCheckoutStep("address")}
                    className="w-full bg-[#FF7A29] hover:bg-[#E8621A] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Adrese Geç <ChevronRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
