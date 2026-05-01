// src/sanity/lib/queries.js
import { defineQuery } from "next-sanity";

// --- BLOG SORGULARI ---

// Tüm blog yazılarını çekme (Liste Sayfası)
export const BLOG_QUERY = defineQuery(`*[_type == "blog"] | order(tarih desc) {
  _id,
  baslik,
  "slug": slug.current,
  kategori,
  gorsel,
  tarih,
  okumaSuresi,
  ozet
}`);

// Tekil blog yazısını detaylı çekme (Detay Sayfası)
export const BLOG_POST_QUERY = defineQuery(`*[_type == "blog" && slug.current == $slug][0] {
  baslik,
  "slug": slug.current,
  kategori,
  gorsel,
  tarih,
  okumaSuresi,
  icerik
}`);


// --- VAKA ANALİZİ SORGULARI ---

// Tüm vakaları çekme (Vaka Liste Sayfası)
export const VAKALAR_QUERY = defineQuery(`*[_type == "vaka"] | order(_createdAt desc) {
  _id,
  baslik,
  "slug": slug.current,
  kategori,
  gorsel,
  sure,
  ozet
}`);

// Ana sayfa için sadece ilk 3 vakayı çekme (Performans için)
export const VAKALAR_ANA_SAYFA_QUERY = defineQuery(`*[_type == "vaka"] | order(_createdAt desc)[0...3] {
  _id,
  baslik,
  "slug": slug.current,
  kategori,
  gorsel,
  sure,
  ozet
}`);

// Tekil vaka detayı çekme (Vaka Detay Sayfası)
export const VAKA_DETAY_QUERY = defineQuery(`*[_type == "vaka" && slug.current == $slug][0] {
  baslik,
  "slug": slug.current,
  kategori,
  gorsel,
  sure,
  problem,
  surec,
  sonuc,
  uzmanNotu
}`);

export const HAKKIMDA_QUERY = defineQuery(`*[_type == "hakkimda"][0]{
  unvan,
  isim,
  ozgecmis,
  heroMaddeler,
  egitimler,
  tecrubeler
}`);

// Tüm yasal belgelerin sluglarını çek (Statik sayfa üretimi için)
export const LEGAL_SLUGS_QUERY = defineQuery(`*[_type == "legal"]{ "slug": slug.current }`);

// Tekil yasal belgeyi çek
export const LEGAL_DOC_QUERY = defineQuery(`*[_type == "legal" && slug.current == $slug][0]{
  baslik,
  "slug": slug.current,
  icerik
}`);