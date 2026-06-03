import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  MessageCircle, 
  Instagram, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  Camera,
  Heart,
  Search,
  ArrowRight,
  Send,
  CheckCircle2,
  Loader2,
  Lock
} from 'lucide-react';
import { Logo } from './components/Logo';
import { AdminDashboard } from './components/AdminDashboard';
import { SAMPLE_PRODUCTS, Product } from './constants';

const Navbar = ({ wishlistCount, onOpenWishlist }: { wishlistCount: number, onOpenWishlist: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-paper/80 backdrop-blur-md border-b border-brand-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Logo variant="crest" />
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#catalog" className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors">Catálogo</a>
            <a href="#authenticity" className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors">Autenticidad</a>
            <a href="#about" className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors">Nosotros</a>
            <a href="#consignment" className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors">Vender</a>
            <a href="#contact" className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors">Inner Circle</a>
            <button 
              onClick={onOpenWishlist}
              className="relative p-2 hover:text-brand-gold transition-colors"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <a href="https://instagram.com/lv_sanmiguel" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-brand-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a 
              href="https://wa.me/5491134041112" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-ink text-brand-paper px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors"
            >
              Contacto
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onOpenWishlist}
              className="relative p-2"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-brand-paper border-b border-brand-ink/10 px-4 pt-2 pb-6 space-y-4"
          >
            <a href="#catalog" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-widest">Catálogo</a>
            <a href="#authenticity" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-widest">Autenticidad</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-widest">Nosotros</a>
            <a href="#consignment" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-widest">Vender</a>
            <div className="pt-4">
              <a 
                href="https://wa.me/5491134041112" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-brand-ink text-brand-paper px-6 py-3 rounded-full text-xs uppercase tracking-widest text-center"
              >
                Contacto WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Moda Circular de Lujo</span>
          <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8">
            El lujo que <br />
            <span className="italic">mereces</span>, <br />
            al alcance.
          </h2>
          <p className="text-lg text-brand-ink/70 max-w-md mb-10 font-light leading-relaxed">
            Carteras de familias, originales, de las mejores marcas del mundo en inmejorable estado. Sin pagar una fortuna, tenés lo mejor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#catalog" className="bg-brand-ink text-brand-paper px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-brand-accent transition-all text-center">
              Ver Catálogo
            </a>
            <a href="#consignment" className="border border-brand-ink px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-brand-ink hover:text-brand-paper transition-all text-center">
              Vender mi Cartera
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[100px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1200" 
              alt="Louis Vuitton Neverfull MM Monogram - Iconic Luxury" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl hidden lg:block max-w-xs">
            <div className="flex items-center gap-2 mb-2 text-brand-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-sm italic font-serif">"La atención de Florencia es impecable. Mi cartera llegó en estado inmejorable, tal cual las fotos."</p>
            <p className="text-[10px] uppercase tracking-widest mt-4 opacity-50">— María G., Clienta Fiel</p>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
        <p className="vertical-text text-[10px] uppercase tracking-[0.5em] opacity-20 whitespace-nowrap">
          LOUIS VUITTON • GUCCI • CHANEL • PRADA • HERMÈS
        </p>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWishlisted, 
  onToggleWishlist 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full transition-colors ${
              isWishlisted ? 'bg-brand-accent text-white' : 'bg-white/80 backdrop-blur-sm hover:bg-brand-gold hover:text-white'
            }`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <a 
            href={`https://wa.me/5491134041112?text=Hola! Me interesa el producto: ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white text-brand-ink py-3 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          >
            Consultar por WhatsApp <MessageCircle size={14} />
          </a>
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-widest text-brand-accent mb-1">{product.brand}</p>
      <h3 className="text-xl font-serif mb-1">{product.name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-sm font-light opacity-60">Estado: {product.condition}</p>
        <p className="font-medium">{product.price}</p>
      </div>
    </motion.div>
  );
};

const Catalog = ({ 
  wishlist, 
  onToggleWishlist 
}: { 
  wishlist: Product[]; 
  onToggleWishlist: (product: Product) => void;
}) => {
  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Nuestra Colección</span>
            <h2 className="text-5xl font-serif">Piezas Seleccionadas</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
            {['Todos', 'Louis Vuitton', 'Gucci', 'Chanel', 'Prada'].map((brand) => (
              <button key={brand} className="whitespace-nowrap px-6 py-2 rounded-full border border-brand-ink/10 text-xs uppercase tracking-widest hover:border-brand-ink transition-colors">
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isWishlisted={wishlist.some(item => item.id === product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold border-b border-brand-ink pb-2 hover:text-brand-gold hover:border-brand-gold transition-all">
            Ver colección completa en Instagram <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Authenticity = () => {
  return (
    <section id="authenticity" className="py-24 bg-brand-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden border-[20px] border-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000" 
                  alt="Luxury Manual Authentication" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-brand-gold text-white p-6 rounded-2xl shadow-lg">
                <ShieldCheck size={40} />
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Confianza Total</span>
            <h2 className="text-5xl font-serif mb-8">Autenticidad Garantizada</h2>
            <p className="text-lg text-brand-ink/70 mb-8 font-light leading-relaxed">
              Sabemos que la mayor preocupación al comprar lujo pre-owned es la originalidad. En LVSM, cada pieza pasa por un riguroso proceso de verificación manual y tecnológica.
            </p>
            
            <ul className="space-y-6">
              {[
                { title: "Inspección Manual", desc: "Revisamos costuras, herrajes, códigos de fecha y materiales." },
                { title: "Tecnología de Punta", desc: "Utilizamos sistemas de verificación digital para confirmar la autenticidad." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <ChevronRight size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-sm text-brand-ink/60">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Nuestra Historia</span>
            <h2 className="text-5xl font-serif mb-8">Pasión por el Lujo Atemporal</h2>
            <div className="space-y-6 text-brand-ink/70 font-light leading-relaxed">
              <p>
                LVSM nació en septiembre de 2021 de la mano de Florencia, cuya pasión por las marcas de lujo —especialmente Louis Vuitton— la llevó a incursionar en el mundo de la moda circular.
              </p>
              <p>
                Lo que comenzó como una búsqueda personal de piezas únicas se transformó rápidamente en una comunidad de clientes fieles que valoran la autenticidad, el estado impecable y el trato personalizado.
              </p>
              <p className="italic font-serif text-brand-accent">
                "Nuestra misión es democratizar el acceso al lujo, promoviendo un consumo consciente y responsable sin sacrificar la exclusividad."
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-serif text-brand-ink mb-2">2021</h4>
                <p className="text-[10px] uppercase tracking-widest opacity-50">Año de Fundación</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-brand-ink mb-2">11k+</h4>
                <p className="text-[10px] uppercase tracking-widest opacity-50">Miembros del Club</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&q=80&w=1000" 
                alt="LVSM Founder Vision" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-brand-gold/10 rounded-full -z-0 blur-3xl" />
            <div className="absolute -top-10 -left-10 p-6 bg-brand-paper rounded-2xl shadow-xl z-20 max-w-[200px]">
              <p className="text-xs font-serif italic">"Cada cartera tiene una historia que merece ser continuada."</p>
              <p className="text-[8px] uppercase tracking-widest mt-2 opacity-50">— Florencia, Fundadora</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Consignment = () => {
  return (
    <section id="consignment" className="py-24 bg-brand-ink text-brand-paper overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Vende con Nosotros</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8">Dale una nueva vida a tu cartera</h2>
          <p className="text-xl text-brand-paper/70 mb-12 font-light leading-relaxed">
            ¿Tenés un bolso de lujo que ya no usas? Nosotros nos encargamos de encontrarle un nuevo hogar de forma segura, profesional y confidencial.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Camera size={24} />, title: "1. Envía Fotos", desc: "Envíanos fotos de tu pieza por WhatsApp." },
              { icon: <Search size={24} />, title: "2. Tasación", desc: "Evaluamos el estado y proponemos un precio." },
              { icon: <ShoppingBag size={24} />, title: "3. Venta", desc: "Lo publicamos en nuestra red y gestionamos la venta." }
            ].map((step, i) => (
              <div key={i} className="p-6 border border-brand-paper/10 rounded-2xl hover:border-brand-gold transition-colors">
                <div className="text-brand-gold mb-4">{step.icon}</div>
                <h4 className="font-semibold text-sm uppercase tracking-widest mb-2">{step.title}</h4>
                <p className="text-xs text-brand-paper/50">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <a 
            href="https://wa.me/5491134041112?text=Hola! Quisiera tasar mi cartera."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-accent text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-brand-ink transition-all inline-flex items-center gap-3"
          >
            Empezar Tasación <MessageCircle size={18} />
          </a>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1000" 
          alt="Luxury background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
};

const ReviewWall = () => {
  const reviews = [
    { name: "Sofía R.", text: "Increíble experiencia. La cartera está impecable, parece nueva. La atención de Florencia fue de 10.", date: "Hace 2 días" },
    { name: "Valentina M.", text: "Compré mi primera Louis Vuitton aquí y no puedo estar más feliz. Autenticidad total.", date: "Hace 1 semana" },
    { name: "Lucía P.", text: "Vendí mi cartera en consignación y fue súper rápido y profesional. Muy recomendadas.", date: "Hace 2 semanas" },
    { name: "Martina S.", text: "El packaging y el cuidado en el envío es de otro nivel. Se nota el amor por el lujo.", date: "Hace 1 mes" },
    { name: "Camila B.", text: "Excelente curaduría. Siempre encuentro piezas únicas que no se ven en otros lados.", date: "Hace 1 mes" },
    { name: "Elena F.", text: "Transparencia y confianza. Es difícil encontrar lugares así en Argentina.", date: "Hace 2 meses" }
  ];

  return (
    <section className="py-24 bg-brand-paper/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Experiencias LVSM</span>
          <h2 className="text-5xl font-serif">Muro de Reseñas</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-brand-ink/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4 text-brand-gold">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                </div>
                <p className="text-brand-ink/70 italic font-serif mb-6 leading-relaxed">"{review.text}"</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-brand-ink/5">
                <span className="text-xs font-bold uppercase tracking-widest">{review.name}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://wa.me/5491134041112?text=Hola! Quisiera dejar mi reseña."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold border-b border-brand-ink pb-2 hover:text-brand-gold hover:border-brand-gold transition-all"
          >
            Dejanos tu experiencia <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => {
  return (
    <footer className="bg-brand-paper pt-24 pb-12 border-t border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Logo variant="collective" className="mb-6" />
            <p className="text-brand-ink/60 max-w-sm mb-8 font-light">
              Un colectivo selecto dedicado a la curaduría y el intercambio de piezas de lujo con historia. Autenticidad y exclusividad garantizada.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/lv_sanmiguel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-ink/10 flex items-center justify-center hover:bg-brand-ink hover:text-brand-paper transition-all">
                <Instagram size={18} />
              </a>
              <a 
                href="https://wa.me/5491134041112" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-ink/10 flex items-center justify-center hover:bg-brand-ink hover:text-brand-paper transition-all"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Navegación</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60 font-light">
              <li><a href="#catalog" className="hover:text-brand-gold transition-colors">Catálogo</a></li>
              <li><a href="#authenticity" className="hover:text-brand-gold transition-colors">Autenticidad</a></li>
              <li><a href="#about" className="hover:text-brand-gold transition-colors">Nosotros</a></li>
              <li><a href="#consignment" className="hover:text-brand-gold transition-colors">Vender</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60 font-light">
              <li>Buenos Aires, Argentina</li>
              <li>Showroom con cita previa</li>
              <li>WhatsApp: +54 9 11 3404 1112</li>
              <li>@lv_sanmiguel</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-ink/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest opacity-40">
            © {new Date().getFullYear()} LVSM. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40 items-center">
            <a href="#" className="hover:opacity-100">Privacidad</a>
            <a href="#" className="hover:opacity-100">Términos</a>
            <button 
              onClick={onAdminClick}
              className="hover:opacity-100 flex items-center gap-1"
            >
              <Lock size={10} /> Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Comprar',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: 'Comprar', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">The Collective</span>
            <h2 className="text-5xl font-serif mb-8">Unite a nuestro Select Club</h2>
            <p className="text-lg text-brand-ink/70 mb-8 font-light leading-relaxed">
              Dejanos tus datos para recibir acceso prioritario a nuestra curaduría, ventas privadas y eventos exclusivos de LVSM.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-paper flex items-center justify-center text-brand-accent flex-shrink-0">
                  <Star size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">Acceso Anticipado</h4>
                  <p className="text-sm text-brand-ink/60">Enterate antes que nadie cuando llega esa pieza que tanto buscás.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-paper flex items-center justify-center text-brand-accent flex-shrink-0">
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">Ventas Privadas</h4>
                  <p className="text-sm text-brand-ink/60">Invitaciones exclusivas a showrooms y preventas con precios especiales.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-paper p-8 md:p-12 rounded-[40px] shadow-sm">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-serif mb-4">¡Gracias por sumarte!</h3>
                <p className="text-brand-ink/60 mb-8">Ya sos parte de nuestra lista exclusiva. Pronto recibirás novedades.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-xs uppercase tracking-widest font-bold border-b border-brand-ink pb-1"
                >
                  Volver al formulario
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light"
                      placeholder="Ej: María García"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light"
                      placeholder="maria@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Teléfono (Opcional)</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light"
                      placeholder="+54 9 11 ..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Interés Principal</label>
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light appearance-none"
                    >
                      <option value="Comprar">Quiero Comprar</option>
                      <option value="Vender">Quiero Vender</option>
                      <option value="Ambos">Ambos</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Mensaje o Marca de Interés</label>
                  <textarea 
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light resize-none"
                    placeholder="¿Buscás algún modelo en particular?"
                  />
                </div>

                <button 
                  disabled={status === 'loading'}
                  type="submit"
                  className="w-full bg-brand-ink text-brand-paper py-4 rounded-full text-xs uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>Enviar Información <Send size={16} /></>
                  )}
                </button>
                
                {status === 'error' && (
                  <p className="text-red-500 text-xs text-center">Hubo un error. Por favor, intentá de nuevo.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const WishlistModal = ({ 
  isOpen, 
  onClose, 
  wishlist, 
  onToggleWishlist 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-brand-paper rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-brand-ink/5 flex justify-between items-center">
              <h2 className="text-3xl font-serif">Mi Wishlist</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-brand-ink/60 font-light">Tu wishlist está vacía. ¡Explorá nuestro catálogo!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlist.map((product) => (
                    <div key={product.id} className="flex items-center gap-6 group">
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-[10px] uppercase tracking-widest text-brand-accent">{product.brand}</p>
                        <h4 className="text-lg font-serif">{product.name}</h4>
                        <p className="text-sm font-light opacity-60">{product.price}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <a 
                          href={`https://wa.me/5491134041112?text=Hola! Me interesa este producto de mi wishlist: ${product.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-widest font-bold border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                        >
                          Consultar
                        </a>
                        <button 
                          onClick={() => onToggleWishlist(product)}
                          className="p-2 text-brand-accent hover:bg-brand-accent/10 rounded-full transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-8 bg-brand-ink text-brand-paper">
              <button 
                onClick={onClose}
                className="w-full py-4 rounded-full text-xs uppercase tracking-widest border border-brand-paper/20 hover:bg-brand-paper hover:text-brand-ink transition-all"
              >
                Continuar Explorando
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('lvsm_wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading wishlist", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lvsm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  if (isAdmin) {
    return <AdminDashboard onLogout={() => setIsAdmin(false)} />;
  }

  return (
    <div className="selection:bg-brand-accent selection:text-white">
      <Navbar 
        wishlistCount={wishlist.length} 
        onOpenWishlist={() => setIsWishlistOpen(true)} 
      />
      <main>
        <Hero />
        <Catalog wishlist={wishlist} onToggleWishlist={toggleWishlist} />
        <Authenticity />
        <AboutUs />
        <Consignment />
        <ReviewWall />
        <ContactForm />
      </main>
      <Footer onAdminClick={() => setIsAdmin(true)} />
      
      <WishlistModal 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5491134041112" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
