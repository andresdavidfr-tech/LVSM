// Catálogo LVSM — fuente de datos única del frontend.
//
// Imágenes: cada una declara un `storageKey` (object key en el bucket de S3) y
// una `src` de fallback. Si S3 está configurado (ver src/lib/images.ts) y la
// imagen existe en el bucket, se sirve desde S3; si no, cae al fallback.
//
// Los productos de abajo usan fotos reales del artículo (importadas como
// asset local), marcadas con `isReal: true` — no son fallback ni stock.
//
// IMPORTANTE: condición, grado y medidas fueron completados a partir de la
// inspección visual de la foto y de las medidas de referencia publicadas por
// el modelo (no de una medición física ni una autenticación profesional).
// Revisar y ajustar antes de publicar precios o claims de estado definitivos.

import gucciSohoDisco from '../assets/catalog/gucci-soho-disco.jpeg';
import balenciagaHourglass from '../assets/catalog/balenciaga-hourglass.jpeg';
import lvIenaMM from '../assets/catalog/lv-iena-mm.jpeg';
import lvNeverfullMonogram from '../assets/catalog/lv-neverfull-monogram.jpeg';
import lvNeverfullDamier1 from '../assets/catalog/lv-neverfull-damier-1.jpeg';
import lvNeverfullDamier2 from '../assets/catalog/lv-neverfull-damier-2.jpeg';
import lvTotallyMM from '../assets/catalog/lv-totally-mm.jpeg';

export type Condition = 'Inmejorable' | 'Como nueva' | 'Excelente' | 'Vintage Muy Bueno';

export interface ProductImage {
  src: string;            // URL de fallback, o asset local si isReal
  storageKey?: string;    // object key en S3, ej. "catalogo/<slug>/1.jpg"
  alt: string;
  caption?: string;       // ej. "Leve roce en esquina inferior"
  isDefect?: boolean;     // foto de condición / desgaste
  isReal?: boolean;       // true: foto verificada del artículo real (no placeholder)
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  type: string;                // Tote, Shoulder, Clutch, etc.
  priceNumber: number | null;  // null => "Consultar" (venta personalizada)
  images: ProductImage[];
  condition: Condition;
  conditionGrade: number;      // sobre 10
  description: string;
  material: string;
  measurements: string;
  includes: string[];
  authVerified: boolean;
  serial?: string;
}

export const STATIC_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'gucci-soho-disco-crossbody',
    name: 'Soho Disco Crossbody',
    brand: 'Gucci',
    type: 'Crossbody',
    priceNumber: null,
    images: [
      { src: gucciSohoDisco, alt: 'Gucci Soho Disco crossbody en cuero negro texturizado', isReal: true },
    ],
    condition: 'Inmejorable',
    conditionGrade: 10,
    description: 'Crossbody en cuero texturizado negro con el logo GG entrelazado grabado y borla de cuero desmontable en la cadena. Incluye las tarjetas de cuidado y autenticidad de Gucci.',
    material: 'Cuero texturizado (calf leather)',
    measurements: '28 × 17 × 9 cm aprox. (medida de referencia del modelo)',
    includes: ['Tarjetas de autenticidad y cuidado Gucci'],
    authVerified: true,
  },
  {
    id: '2',
    slug: 'balenciaga-hourglass-croc-embossed',
    name: 'Hourglass Croc-Embossed Chain Bag',
    brand: 'Balenciaga',
    type: 'Shoulder',
    priceNumber: null,
    images: [
      { src: balenciagaHourglass, alt: 'Balenciaga Hourglass en cuero grabado efecto cocodrilo, azul noche', isReal: true },
    ],
    condition: 'Inmejorable',
    conditionGrade: 10,
    description: 'Silueta Hourglass en cuero grabado efecto cocodrilo azul noche, con el cierre "B" dorado y cadena gruesa tono oro envejecido. Incluye dustbag original de Balenciaga.',
    material: 'Cuero grabado efecto cocodrilo (crocodile embossed calfskin)',
    measurements: '19 × 12 × 5 cm aprox. (medida de referencia del modelo)',
    includes: ['Dustbag original Balenciaga'],
    authVerified: true,
  },
  {
    id: '3',
    slug: 'louis-vuitton-iena-mm',
    name: 'Iéna MM Monogram',
    brand: 'Louis Vuitton',
    type: 'Tote',
    priceNumber: null,
    images: [
      { src: lvIenaMM, alt: 'Louis Vuitton Iéna MM en lona Monogram con asas de cuero Vachetta', isReal: true },
    ],
    condition: 'Inmejorable',
    conditionGrade: 10,
    description: 'Tote en lona Monogram con asas altas de cuero Vachetta natural, bolsillo frontal con cierre y compartimento principal con cierre superior. Un básico versátil para el día a día.',
    material: 'Lona Monogram revestida · cuero Vachetta',
    measurements: '42 × 27 × 17 cm aprox. (medida de referencia del modelo)',
    includes: [],
    authVerified: true,
  },
  {
    id: '4',
    slug: 'louis-vuitton-neverfull-mm-monogram',
    name: 'Neverfull MM Monogram',
    brand: 'Louis Vuitton',
    type: 'Tote',
    priceNumber: null,
    images: [
      { src: lvNeverfullMonogram, alt: 'Louis Vuitton Neverfull MM Monogram con pochette interior', isReal: true },
    ],
    condition: 'Inmejorable',
    conditionGrade: 10,
    description: 'Un clásico atemporal en lona Monogram con acabados en cuero natural. Espaciosa, liviana y versátil para el día a día. Incluye la pochette interior a juego.',
    material: 'Lona Monogram revestida · cuero Vachetta',
    measurements: '32 × 29 × 17 cm',
    includes: ['Pochette interior a juego'],
    authVerified: true,
  },
  {
    id: '5',
    slug: 'louis-vuitton-neverfull-mm-damier-ebene',
    name: 'Neverfull MM Damier Ebène',
    brand: 'Louis Vuitton',
    type: 'Tote',
    priceNumber: null,
    images: [
      { src: lvNeverfullDamier1, alt: 'Louis Vuitton Neverfull MM Damier Ebène con forro interior rojo', isReal: true },
      { src: lvNeverfullDamier2, alt: 'Louis Vuitton Neverfull MM Damier Ebène – vista alternativa', isReal: true },
    ],
    condition: 'Inmejorable',
    conditionGrade: 10,
    description: 'El bolso icónico de la maison en su versión Damier Ebène con interior a rayas rojas, más resistente al uso diario. Incluye la pochette a juego.',
    material: 'Lona Damier Ebène revestida',
    measurements: '32 × 29 × 17 cm',
    includes: ['Pochette interior a juego'],
    authVerified: true,
  },
  {
    id: '6',
    slug: 'louis-vuitton-totally-mm',
    name: 'Totally MM Monogram',
    brand: 'Louis Vuitton',
    type: 'Tote',
    priceNumber: null,
    images: [
      { src: lvTotallyMM, alt: 'Louis Vuitton Totally MM en lona Monogram con bolsillos laterales', isReal: true },
    ],
    condition: 'Inmejorable',
    conditionGrade: 10,
    description: 'Tote liviano en lona Monogram con bolsillos tipo balde a los lados y asas de cuero Vachetta. Interior amplio, ideal para el uso diario o como cabin bag de viaje.',
    material: 'Lona Monogram revestida · cuero Vachetta',
    measurements: '33 × 30 × 16 cm aprox. (medida de referencia del modelo)',
    includes: [],
    authVerified: true,
  },
];

async function getJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (res.ok) return (await res.json()) as T;
  } catch {
    /* sin servidor (vite dev) u offline → fallback estático */
  }
  return fallback;
}

export const fetchProducts = () => getJson<Product[]>('/api/products', STATIC_PRODUCTS);

export async function fetchProduct(slug: string): Promise<Product | undefined> {
  const all = await fetchProducts();
  return all.find((p) => p.slug === slug);
}

export const CONDITIONS: Condition[] = ['Inmejorable', 'Como nueva', 'Excelente', 'Vintage Muy Bueno'];
