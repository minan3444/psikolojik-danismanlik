//← "use client" (useState + useMemo)
"use client";

import { useState, useMemo } from "react";
import BlogFilter from "./BlogFilter";
import BlogGrid   from "./BlogGrid";

/**
 * BlogFilteredContent — Filtre state'ini yönetir ve Grid'i besler.
 * Yalnızca /blog (isFullPage) sayfasında kullanılır.
 * useState zorunlu olduğu için "use client".
 */
export default function BlogFilteredContent({ posts }) {
  const [activeKategori, setActiveKategori] = useState("Tümü");

  const kategoriler = useMemo(
    () => ["Tümü", ...new Set(posts.map((y) => y.kategori))],
    [posts]
  );

  const filteredPosts = useMemo(
    () =>
      activeKategori === "Tümü"
        ? posts
        : posts.filter((y) => y.kategori === activeKategori),
    [posts, activeKategori]
  );

  return (
    <>
      <BlogFilter
        kategoriler={kategoriler}
        activeKategori={activeKategori}
        onKategoriChange={setActiveKategori}
      />
      <BlogGrid posts={filteredPosts} />
    </>
  );
}