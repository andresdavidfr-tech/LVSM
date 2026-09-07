import { Camera, Search, ShoppingBag, MessageCircle } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';
import { wa } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';

const steps = [
  { icon: <Camera size={24} />, title: '1. Envía Fotos', desc: 'Envíanos fotos de tu pieza por WhatsApp.' },
  { icon: <Search size={24} />, title: '2. Tasación', desc: 'Evaluamos el estado y proponemos un precio.' },
  { icon: <ShoppingBag size={24} />, title: '3. Venta', desc: 'Lo publicamos en nuestra red y gestionamos la venta.' },
];

export function Consignment() {
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
            {steps.map((step) => (
              <div key={step.title} className="p-6 border border-brand-paper/10 rounded-2xl hover:border-brand-gold transition-colors">
                <div className="text-brand-gold mb-4">{step.icon}</div>
                <h4 className="font-semibold text-sm uppercase tracking-widest mb-2">{step.title}</h4>
                <p className="text-xs text-brand-paper/50">{step.desc}</p>
              </div>
            ))}
          </div>

          <a
            href={wa('Hola! Quisiera tasar mi cartera.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('contact_whatsapp', { where: 'consignment' })}
            className="bg-brand-accent text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-brand-ink transition-all inline-flex items-center gap-3"
          >
            Empezar Tasación <MessageCircle size={18} />
          </a>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 hidden lg:block">
        <SmartImage
          src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=1000"
          alt=""
          wrapperClassName="w-full h-full"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
