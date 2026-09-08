import { Instagram, MessageCircle } from 'lucide-react';
import { Logo } from '../Logo';
import { wa } from '../../lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-brand-paper pt-24 pb-12 border-t border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Logo variant="collective" className="mb-6" />
            <p className="text-brand-ink/60 max-w-sm mb-8 font-light">
              Un colectivo selecto dedicado al intercambio de piezas de lujo con historia. Autenticidad y exclusividad garantizada.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/lv_sanmiguel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-ink/10 flex items-center justify-center hover:bg-brand-ink hover:text-brand-paper transition-all">
                <Instagram size={18} />
              </a>
              <a href={wa('Hola! Quisiera más información sobre LVSM.')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-ink/10 flex items-center justify-center hover:bg-brand-ink hover:text-brand-paper transition-all">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Navegación</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60 font-light">
              <li><a href="/#catalog" className="hover:text-brand-gold transition-colors">Catálogo</a></li>
              <li><a href="/#authenticity" className="hover:text-brand-gold transition-colors">Autenticidad</a></li>
              <li><a href="/#about" className="hover:text-brand-gold transition-colors">Nosotros</a></li>
              <li><a href="/#consignment" className="hover:text-brand-gold transition-colors">Vender</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60 font-light">
              <li>Buenos Aires, Argentina</li>
              <li>WhatsApp: +54 9 11 3404 1112</li>
              <li>@lv_sanmiguel</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-ink/5 flex justify-center items-center">
          <p className="text-xs uppercase tracking-widest opacity-40">
            © {new Date().getFullYear()} LVSM. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
