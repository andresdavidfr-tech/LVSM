// Catálogo LVSM — fuente de datos única del frontend.
//
// NOTA sobre imágenes: las URLs de Unsplash NO pudieron verificarse desde el
// entorno de build (la allowlist de red bloquea el host). Reemplazar por fotos
// reales del stock. Para reventa de lujo, cada pieza debería incluir fotos de
// detalle y de los desgastes (transparencia = confianza). Las "vistas" extra
// reusan la imagen base con distinto recorte como placeholder.

export type Condition = 'Inmejorable' | 'Como nueva' | 'Excelente' | 'Vintage Muy Bueno';

export interface ProductImage {
  src: string;
  alt: string;
  caption?: string;   // ej. "Leve roce en esquina inferior"
  isDefect?: boolean; // foto de condición / desgaste
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
      { src: u('photo-1564422170194-896b89110ef8'), alt: 'Louis Vuitton Neverfull MM Monogram' },
      { src: u('photo-1564422170194-896b89110ef8', '&crop=top'), alt: 'Neverfull – herrajes y costuras' },
      { src: u('photo-1564422170194-896b89110ef8', '&crop=bottom'), alt: 'Neverfull – base y esquinas', caption: 'Leve pátina en el cuero Vachetta de las asas, propia del uso.', isDefect: true },
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
      { src: u('photo-1591561954557-26941169b49e'), alt: 'Gucci GG Marmont Small Shoulder Bag' },
      { src: u('photo-1591561954557-26941169b49e', '&crop=top'), alt: 'GG Marmont – herraje Doble G' },
      { src: u('photo-1591561954557-26941169b49e', '&crop=bottom'), alt: 'GG Marmont – matelassé', caption: 'Herrajes con brillo intacto, sin marcas visibles.', isDefect: true },
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
      { src: u('photo-1575032617751-6ddec2089882'), alt: 'Chanel Classic Flap Bag' },
      { src: u('photo-1575032617751-6ddec2089882', '&crop=top'), alt: 'Classic Flap – cierre CC' },
      { src: u('photo-1575032617751-6ddec2089882', '&crop=bottom'), alt: 'Classic Flap – cadena entrelazada', caption: 'Pieza vintage: leve desgaste en el dorado de la cadena.', isDefect: true },
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
      { src: u('photo-1606760227091-3dd870d97f1d'), alt: 'Louis Vuitton Speedy 30 Damier Ebène' },
      { src: u('photo-1606760227091-3dd870d97f1d', '&crop=top'), alt: 'Speedy 30 – cierre y candado' },
      { src: u('photo-1606760227091-3dd870d97f1d', '&crop=bottom'), alt: 'Speedy 30 – base', caption: 'Estructura impecable, sin deformaciones ni manchas.', isDefect: true },
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
