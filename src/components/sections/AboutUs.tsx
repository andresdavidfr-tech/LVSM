import { motion } from 'motion/react';
import { SmartImage } from '../ui/SmartImage';
import founderPhoto from '../../assets/founder-florencia.jpeg';

export function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Nuestra Historia</span>
            <h2 className="text-4xl sm:text-5xl font-serif mb-8">Pasión por el Lujo Atemporal</h2>
            <div className="space-y-6 text-brand-ink/70 font-light leading-relaxed">
              <p>
                LVSM nació en septiembre de 2021 de la mano de Florencia, cuya pasión por las marcas de lujo —especialmente Louis Vuitton— la llevó a incursionar en el mundo de la moda circular.
              </p>
              <p>
                Lo que comenzó como una búsqueda personal de piezas únicas se transformó rápidamente en una comunidad de clientes fieles que valoran la autenticidad, el estado impecable y el trato personalizado.
              </p>
              <p className="italic font-serif text-brand-accent">
                &ldquo;Nuestra misión es democratizar el acceso al lujo, promoviendo un consumo consciente y responsable sin sacrificar la exclusividad.&rdquo;
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

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10">
              <SmartImage
                src={founderPhoto}
                alt="Florencia, fundadora de LVSM"
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-brand-gold/10 rounded-full -z-0 blur-3xl" />
            <div className="absolute -top-10 -left-10 p-6 bg-brand-paper rounded-2xl shadow-xl z-20 max-w-[200px]">
              <p className="text-xs font-serif italic">&ldquo;Cada cartera tiene una historia que merece ser continuada.&rdquo;</p>
              <p className="text-[10px] uppercase tracking-widest mt-2 opacity-50">— Florencia, Fundadora</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
