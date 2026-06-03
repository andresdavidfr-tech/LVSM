export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  condition: string;
  description: string;
}

// NOTA: imágenes de carteras de lujo seminuevas (estética vintage/pre-owned).
// Las URLs de Unsplash no pudieron verificarse desde el entorno de build
// (allowlist de red bloquea el host). Revisar que cada foto cargue y calce con
// la pieza en el sitio en vivo; lo ideal es reemplazarlas por fotos reales del stock.
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Neverfull MM Monogram",
    brand: "Louis Vuitton",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?auto=format&fit=crop&q=80&w=800",
    condition: "Excelente",
    description: "Un clásico atemporal en lona monogram con acabados en cuero natural."
  },
  {
    id: "2",
    name: "GG Marmont Small Shoulder Bag",
    brand: "Gucci",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800",
    condition: "Como nueva",
    description: "Cuero matelassé negro con herrajes dorados."
  },
  {
    id: "3",
    name: "Classic Flap Bag",
    brand: "Chanel",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&q=80&w=800",
    condition: "Vintage Muy Bueno",
    description: "Piel de cordero acolchada con cadena entrelazada."
  },
  {
    id: "4",
    name: "Speedy 30 Damier Ebène",
    brand: "Louis Vuitton",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800",
    condition: "Inmejorable",
    description: "El bolso icónico de la maison en su versión más resistente."
  }
];
