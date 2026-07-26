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
        
