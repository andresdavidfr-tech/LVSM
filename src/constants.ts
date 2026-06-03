export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  condition: string;
  description: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Neverfull MM Monogram",
    brand: "Louis Vuitton",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800",
    condition: "Excelente",
    description: "Un clásico atemporal en lona monogram con acabados en cuero natural."
  },
  {
    id: "2",
    name: "GG Marmont Small Shoulder Bag",
    brand: "Gucci",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
    condition: "Como nueva",
    description: "Cuero matelassé negro con herrajes dorados."
  },
  {
    id: "3",
    name: "Classic Flap Bag",
    brand: "Chanel",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800",
    condition: "Vintage Muy Bueno",
    description: "Piel de cordero acolchada con cadena entrelazada."
  },
  {
    id: "4",
    name: "Speedy 30 Damier Ebène",
    brand: "Louis Vuitton",
    price: "Consultar",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800",
    condition: "Inmejorable",
    description: "El bolso icónico de la maison en su versión más resistente."
  }
];
