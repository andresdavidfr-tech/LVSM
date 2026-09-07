import { motion } from 'motion/react';
import { Star, ShieldCheck } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';
import heroPhoto from '../../assets/hero-puente-mujer.jpeg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Moda Circular de Lujo</span>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif leading-[0.95] md:leading-[0.9] mb-8">
            El lujo que <br />
            <span className="italic">mereces</span>, <br />
            al alcance.
          </h2>
          <p className="text-lg text-brand-ink/70 max-w-md mb-8 font-light leading-relaxed">
            Carteras de familias, originales, de las mejores marcas del mundo en inmejorable estado. Sin pagar una fortuna, tenés lo mejor.
          </p>

          {/* Micro-copy de confianza */}
          <div className="flex flex-wrap gap-4 mb-10 text-xs text-brand-ink/60">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-gold" /> Autenticidad garantizada</span>
            <span className="inline-flex items-center gap-1.5"><Star size={14} className="text-brand-gold" /> +11k clientas en la comunidad</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#catalog" className="bg-brand-ink text-brand-paper px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-brand-accent transition-all text-center">
              Ver Catálogo
            </a>
            <a href="#consignment" className="border border-brand-ink px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-brand-ink hover:text-brand-paper transition-all text-center">
              Vender mi Cartera
            </a>
          </div>
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
        </motion.div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
        <p className="vertical-text text-[10px] uppercase tracking-[0.5em] opacity-20 whitespace-nowrap">
          LOUIS VUITTON • GUCCI • CHANEL • PRADA • HERMÈS
        </p>
      </div>
    </section>
  );
}
