import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';
import heroPhoto from '../../assets/hero-puente-mujer.jpeg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-6 block">Moda Circular de Lujo</span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.95] md:leading-[0.9] mb-8">
            El lujo que <br />
            <span className="italic">mereces</span>, <br />
            al alcance.
          </h2>
          <p className="text-lg text-brand-ink/70 max-w-md font-light leading-relaxed">
            Carteras de familias, originales, de las mejores marcas del mundo en inmejorable estado. Sin pagar una fortuna, tenés lo mejor.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
          <div className="aspect-[5/6] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <SmartImage
              src={heroPhoto}
              alt="Modelo con cartera Louis Vuitton Monogram frente al Puente de la Mujer, Buenos Aires"
              priority
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-6 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-brand-ink text-xs uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full shadow-lg">
            <MapPin size={12} className="text-brand-accent" /> Puerto Madero, Buenos Aires
          </div>
        </motion.div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
        <p className="vertical-text text-xs uppercase tracking-[0.5em] opacity-20 whitespace-nowrap">
          LOUIS VUITTON • GUCCI • CHANEL • PRADA • HERMÈS
        </p>
      </div>
    </section>
  );
}
