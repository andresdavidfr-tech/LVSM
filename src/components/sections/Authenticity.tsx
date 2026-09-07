import { ShieldCheck, ChevronRight } from 'lucide-react';
import authenticityVideo from '../../assets/authenticity-video.mp4';

const steps = [
  { title: 'Inspección Manual', desc: 'Revisamos costuras, herrajes, códigos de fecha y materiales.' },
  { title: 'Experiencia de 15+ Años', desc: 'Cada pieza pasa por ojos entrenados durante más de 15 años en el mercado de lujo pre-owned.' },
  { title: 'Referencias Cruzadas', desc: 'Consultamos con profesionales especializados de las marcas ante cualquier duda.' },
  { title: 'Investigación de Origen', desc: 'Rastreamos la procedencia de cada pieza antes de aceptarla en consignación.' },
];

export function Authenticity() {
  return (
    <section id="authenticity" className="py-24 bg-brand-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden border-[20px] border-white shadow-2xl bg-brand-ink/5">
                <video
                  src={authenticityVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Proceso de autenticación de carteras de lujo LVSM"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-brand-gold text-white p-6 rounded-2xl shadow-lg">
                <ShieldCheck size={40} />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-4 block">Confianza Total</span>
            <h2 className="text-4xl sm:text-5xl font-serif mb-8">Autenticidad Garantizada</h2>
            <p className="text-lg text-brand-ink/70 mb-8 font-light leading-relaxed">
              Sabemos que la mayor preocupación al comprar lujo pre-owned es la originalidad. En LVSM, cada pieza pasa por un riguroso proceso de verificación basado en experiencia real, no en promesas de tecnología.
            </p>

            <ul className="space-y-6">
              {steps.map((item) => (
                <li key={item.title} className="flex gap-4">
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
}
