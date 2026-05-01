'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { LEGAL_SLUGS_QUERY } from '@/sanity/lib/queries';

/**
 * useLegalDocs — Sanity'den yasal belge linklerini çeker.
 * Sayfa açılışında bir kez çalışır.
 */
export function useLegalDocs() {
  const [legalDocs, setLegalDocs] = useState([]);

  useEffect(() => {
    const fetchLegal = async () => {
      try {
        const data = await client.fetch(LEGAL_SLUGS_QUERY);
        setLegalDocs(data || []);
      } catch (error) {
        console.error('Legal slugs fetch error:', error);
      }
    };

    fetchLegal();
  }, []);

  return legalDocs;
}