import React, { useState, useMemo, useEffect } from "react";
import {
  Search, ShoppingCart, X, Plus, Minus, Star, Trash2, Check, MapPin, Truck,
  ChevronRight, ChevronLeft, Heart, User, SlidersHorizontal, ShieldCheck, RotateCcw,
  CreditCard, Home, Briefcase, Lock, Sparkles, Loader2, LogOut, Pencil,
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

const DEFAULT_PRODUCTS = [
  { id: 1, cat: "elektronik", name: "Kablosuz Kulaklık Pro X3", brand: "SonicWave", price: 1249, oldPrice: 1899, rating: 4.6, reviews: 2140, img: "electronics/1" },
  { id: 2, cat: "elektronik", name: "Akıllı Saat Fit 5", brand: "Chronotech", price: 2399, oldPrice: 3199, rating: 4.4, reviews: 987, img: "electronics/2" },
  { id: 3, cat: "elektronik", name: "Taşınabilir Şarj Cihazı 20000mAh", brand: "VoltCore", price: 449, oldPrice: 690, rating: 4.7, reviews: 3320, img: "electronics/3" },
  { id: 4, cat: "moda", name: "Oversize Örme Kazak", brand: "Urbanite", price: 379, oldPrice: 599, rating: 4.3, reviews: 512, img: "fashion/1" },
  { id: 5, cat: "moda", name: "Yüksek Bel Straight Kot Pantolon", brand: "Denim&Co", price: 549, oldPrice: 799, rating: 4.5, reviews: 1290, img: "fashion/2" },
  { id: 6, cat: "moda", name: "Deri Görünümlü Crossbody Çanta", brand: "Marlowe", price: 629, oldPrice: 990, rating: 4.2, reviews: 340, img: "fashion/3" },
  { id: 7, cat: "ev", name: "Aromalı Kahve Makinesi", brand: "Brewhaus", price: 1799, oldPrice: 2450, rating: 4.6, reviews: 764, img: "home/1" },
  { id: 8, cat: "ev", name: "Pamuklu Nevresim Takımı Çift Kişilik", brand: "Cottonyx", price: 899, oldPrice: 1250, rating: 4.8, reviews: 2010, img: "home/2" },
  { id: 9, cat: "kozmetik", name: "C Vitamini Serumu 30ml", brand: "Dermalique", price: 289, oldPrice: 420, rating: 4.5, reviews: 4410, img: "cosmetics/1" },
  { id: 10, cat: "kozmetik", name: "Nemlendirici Yüz Kremi SPF30", brand: "Purevie", price: 199, oldPrice: 299, rating: 4.4, reviews: 1876, img: "cosmetics/2" },
  { id: 11, cat: "spor", name: "Yoga Matı 6mm Kaymaz Taban", brand: "FlexCore", price: 349, oldPrice: 499, rating: 4.7, reviews: 998, img: "sports/1" },
  { id: 12, cat: "spor", name: "Koşu Ayakkabısı AirRun 2.0", brand: "Sprintix", price: 1099, oldPrice: 1599, rating: 4.5, reviews: 2650, img: "sports/2" },
  { id: 13, cat: "kitap", name: "A5 Çizgili Defter Set (3'lü)", brand: "Kalemhane", price: 129, oldPrice: 189, rating: 4.6, reviews: 720, img: "books/1" },
  { id: 14, cat: "kitap", name: "Metal Gövdeli Dolma Kalem", brand: "Yazıevi", price: 249, oldPrice: 349, rating: 4.3, reviews: 410, img: "books/2" },
  { id: 15, cat: "elektronik", name: "4K Ultra HD Web Kamerası", brand: "ClearView", price: 899, oldPrice: 1250, rating: 4.4, reviews: 610, img: "electronics/4" },
  { id: 16, cat: "ev", name: "Aromaterapi Difüzör Set", brand: "Sereneair", price: 379, oldPrice: 549, rating: 4.6, reviews: 1330, img: "home/3" },
];

const DEFAULT_HERO = { title: "Aradığın her şeye en kolay yol.", subtitle: "Binlerce üründe hızlı teslimat, güvenli ödeme ve kolay iade. Yolun kısası burada." };
const DEFAULT_ADMIN_PASSWORD = "enkolayyol2026";

const DEFAULT_ADDRESSES = [
  { id: "a1", type: "ev", title: "Ev Adresi", name: "Ayşe Yılmaz", detail: "Bahçelievler Mah. Gül Sok. No:14 D:3, Bahçelievler / İstanbul", phone: "0532 111 22 33" },
  { id: "a2", type: "is", title: "İş Adresi", name: "Ayşe Yılmaz", detail: "Levent Mah. Büyükdere Cad. No:100 Kat:5, Şişli / İstanbul", phone: "0532 111 22 33" },
];

const money = (n) => Number(n).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const imgUrl = (seed, size = 400) => `https://picsum.photos/seed/enkolayyol-${String(seed).replace("/", "-")}/${size}/${size}`;

function cardBrand(number) {
  const n = number.replace(/\D/g, "");
  if (n.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(n)) return "Mastercard";
  return "Kart";
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

function ProductCard({ p, onAdd, onOpen, isFav, onToggleFav }) {
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);
  return (
    <div className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer" onClick={() => onOpen(p.id)}>
        <img src={imgUrl(p.img)} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
          <span className="font-display font-semibold">Yönetici Girişi</span>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(pw); }} className="p-5 space-y-3">
          <input type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Yönetici şifresi"
            className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF7A29]" required />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-[#1544C7] hover:bg-[#FF7A29] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors">Giriş Yap</button>
          <button type="button" onClick={onClose} className="w-full text-xs text-neutral-400 hover:text-neutral-600">Vazgeç</button>
        </form>
      </div>
    </div>
  );
}

function ProductDetail({ product, related, onBack, onAdd, onOpen, isFav, onToggleFav }) {
  const [qty, setQty] = useState(1);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800 mb-4">
        <ChevronLeft size={16} /> Ürünlere dön
      </button>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          <div className="col-span-4 aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
            <img src={imgUrl(product.img, 700)} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
              <img src={imgUrl(product.img + "-" + i, 200)} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-neutral-400 font-semibold">{product.brand}</span>
          <h1 className="font-display font-semibold text-2xl text-neutral-900 mt-1 leading-snug">{product.name}</h1>
          <div className="mt-2"><StarRow rating={product.rating} reviews={product.reviews} size={14} /></div>
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
        </div>
      </div>
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
        <p className="
