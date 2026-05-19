import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Geliştirme sırasında gerçek zamanlı veri için CDN'i devre dışı bırakıyoruz
});
