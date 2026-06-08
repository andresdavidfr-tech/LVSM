// Catálogo LVSM — fuente de datos única del frontend.
//
// Imágenes: cada una declara un `storageKey` (object key en el bucket de S3) y
// una `src` de fallback (Unsplash). Si S3 está configurado (ver src/lib/images.ts)
// y la imagen existe en el bucket, se sirve desde S3; si no, cae al fallback.
// Subir las fotos reales al bucket en esos keys y luego setear las VITE_S3_*.

export type Condition = 'Inmejorable' | 'Como nueva' | 'Excelente' | 'Vintage Muy Bueno';

export interface ProductImage {
  src: string;            // URL de fallback (Unsplash, sin verificar)
  storageKey?: string;    // object key en S3, ej. "catalogo/<slug>/1.jpg"
  alt: string;
  caption?: string;       // ej. "Leve roce en esquina inferior"
  isDefect?: boolean;     // foto de condición / desgaste
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

const u = (id: string, crop = '', w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${w}${crop}`;

export const STATIC_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'louis-vuitton-neverfull-mm-monogram',
    name: 'Neverfull MM Monogram',
    brand: 'Louis Vuitton',
    type: 'Tote',
    priceNumber: null,
    images: [
      { src: u('photo-1564422170194-896b89110ef8'), storageKey: 'catalogo/louis-vuitton-neverfull-mm-monogram/1.jpg', alt: 'Louis Vuitton Neverfull MM Monogram' },
      { src: u('photo-1564422170194-896b89110ef8', '&crop=top'), storageKey: 'catalogo/louis-vuitton-neverfull-mm-monogram/2.jpg', alt: 'Neverfull – herrajes y costuras' },
      { src: u('photo-1564422170194-896b89110ef8', '&crop=bottom'), storageKey: 'catalogo/louis-vuitton-neverfull-mm-monogram/detalle.jpg', alt: 'Neverfull – base y esquinas', caption: 'Leve pátina en el cuero Vachetta de las asas, propia del uso.', isDefect: true },
    ],
    condition: 'Excelente',
    conditionGrade: 8,
    description: 'Un clásico atemporal en lona Monogram con acabados en cuero natural. Espaciosa, liviana y versátil para el día a día.',
    material: 'Lona Monogram revestida · cuero Vachetta',
    measurements: '32 × 29 × 17 cm',
    includes: ['Dustbag original', 'Pochette interior'],
    authVerified: true,
    serial: 'SD••••',
  },
  {
    id: '2',
    slug: 'gucci-gg-marmont-small-shoulder',
    name: 'GG Marmont Small Shoulder Bag',
    brand: 'Gucci',
    type: 'Shoulder',
    priceNumber: null,
    images: [
      { src: u('photo-1591561954557-26941169b49e'), storageKey: 'catalogo/gucci-gg-marmont-small-shoulder/1.jpg', alt: 'Gucci GG Marmont Small Shoulder Bag' },
      { src: u('photo-1591561954557-26941169b49e', '&crop=top'), storageKey: 'catalogo/gucci-gg-marmont-small-shoulder/2.jpg', alt: 'GG Marmont – herraje Doble G' },
      { src: u('photo-1591561954557-26941169b49e', '&crop=bottom'), storageKey: 'catalogo/gucci-gg-marmont-small-shoulder/detalle.jpg', alt: 'GG Marmont – matelassé', caption: 'Herrajes con brillo intacto, sin marcas visibles.', isDefect: true },
    ],
    condition: 'Como nueva',
    conditionGrade: 9,
    description: 'Cuero matelassé negro con el icónico herraje Doble G en tono dorado envejecido. Cadena ajustable para llevar al hombro o cruzada.',
    material: 'Cuero matelassé chevron',
    measurements: '26 × 15 × 7 cm',
    includes: ['Dustbag original', 'Tarjeta de autenticidad'],
    authVerified: true,
    serial: '4470••••',
  },
  {
    id: '3',
    slug: 'chanel-classic-flap-bag',
    name: 'Classic Flap Bag',
    brand: 'Chanel',
    type: 'Shoulder',
    priceNumber: null,
    images: [
      { src: u('photo-1575032617751-6ddec2089882'), storageKey: 'catalogo/chanel-classic-flap-bag/1.jpg', alt: 'Chanel Classic Flap Bag' },
      { src: u('photo-1575032617751-6ddec2089882', '&crop=top'), storageKey: 'catalogo/chanel-classic-flap-bag/2.jpg', alt: 'Classic Flap – cierre CC' },
      { src: u('photo-1575032617751-6ddec2089882', '&crop=bottom'), storageKey: 'catalogo/chanel-classic-flap-bag/detalle.jpg', alt: 'Classic Flap – cadena entrelazada', caption: 'Pieza vintage: leve desgaste en el dorado de la cadena.', isDefect: true },
    ],
    condition: 'Vintage Muy Bueno',
    conditionGrade: 7,
    description: 'Piel de cordero acolchada con la inconfundible cadena entrelazada en cuero. Una inversión atemporal con carácter vintage.',
    material: 'Piel de cordero (lambskin) acolchada',
    measurements: '25 × 15 × 7 cm',
    includes: ['Dustbag', 'Sticker de serie'],
    authVerified: true,
    serial: '12••••••',
  },
  {
    id: '4',
    slug: 'louis-vuitton-speedy-30-damier-ebene',
    name: 'Speedy 30 Damier Ebène',
    brand: 'Louis Vuitton',
    type: 'Handbag',
    priceNumber: null,
    images: [
      { src: u('photo-1606760227091-3dd870d97f1d'), storageKey: 'catalogo/louis-vuitton-speedy-30-damier-ebene/1.jpg', alt: 'Louis Vuitton Speedy 30 Damier Ebène' },
      { src: u('photo-1606760227091-3dd870d97f1d', '&crop=top'), storageKey: 'catalogo/louis-vuitton-speedy-30-damier-ebene/2.jpg', alt: 'Speedy 30 – cierre y candado' },
      { src: u('photo-1606760227091-3dd870d97f1d', '&crop=bottom'), storageKey: 'catalogo/louis-vuitton-speedy-30-damier-ebene/detalle.jpg', alt: 'Speedy 30 – base', caption: 'Estructura impecable, sin deformaciones ni manchas.', isDefect: true },
    ],
    condition: 'Inmejorable',
    conditionGrade: 10,
    description: 'El bolso icónico de la maison en su versión Damier Ebène, más resistente al uso diario. Estado impecable.',
    material: 'Lona Damier Ebène revestida',
    measurements: '30 × 21 × 17 cm',
    includes: ['Candado y llaves', 'Dustbag original'],
    authVerified: true,
    serial: 'DU••••',
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
