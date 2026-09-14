import { Star, Heart, Percent, MailWarning } from 'lucide-react';
import { GuaranteeStrip } from '../trust/Trust';
import { track } from '../../lib/analytics';

// Formulario embebido: en vez de un form propio + backend (que en Vercel no
// tiene dónde persistir de forma confiable), se embebe un Google Form ya
// conectado a una Google Sheet — las respuestas quedan ahí solas, sin
// mantener ningún servidor. Ver docs/SELECT_CLUB_FORM_SETUP.md para crear el
// formulario y conseguir esta URL.

export function ContactForm() {
  const googleFormEmbedUrl = import.meta.env.VITE_GOOGLE_FORM_EMBED_URL as string | undefined;

  return (
    <section id="contact" className="py-24 bg-brand-accent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-4 block">The Collective</span>
            <h2 className="text-4xl sm:text-5xl font-serif mb-8">Unite a nuestro <span className="text-amber-300">Select Club</span></h2>
            <p className="text-lg text-white/80 mb-8 font-light leading-relaxed">
              Dejanos tus datos para recibir acceso prioritario a nuestra curaduría, ventas privadas y eventos exclusivos de LVSM.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-accent flex-shrink-0">
                  <Star size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">Acceso Anticipado</h4>
                  <p className="text-sm text-white/70">Enterate antes que nadie cuando llega esa pieza que tanto buscás.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-accent flex-shrink-0">
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">Ventas Privadas</h4>
                  <p className="text-sm text-white/70">Invitaciones exclusivas a showrooms y preventas con precios especiales.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-accent flex-shrink-0">
                  <Percent size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-widest mb-1">Descuentos Exclusivos</h4>
                  <p className="text-sm text-white/70">Promociones exclusivas para miembros y liquidaciones de fin de temporada.</p>
                </div>
              </div>
            </div>

            <GuaranteeStrip dark />
          </div>

          <div className="bg-white text-brand-ink rounded-[40px] shadow-2xl overflow-hidden">
            {googleFormEmbedUrl ? (
              <iframe
                src={googleFormEmbedUrl}
                title="Unite a nuestro Select Club"
                onLoad={() => track('lead_form_view')}
                className="w-full h-[720px] border-0"
                loading="lazy"
              >
                Cargando formulario…
              </iframe>
            ) : (
              <div className="p-8 md:p-12 text-center py-20">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MailWarning size={28} />
                </div>
                <h3 className="text-xl font-serif mb-3">Formulario pendiente de configurar</h3>
                <p className="text-brand-ink/60 text-sm max-w-xs mx-auto">
                  Falta cargar <code className="bg-brand-paper px-1.5 py-0.5 rounded text-xs">VITE_GOOGLE_FORM_EMBED_URL</code> — ver docs/SELECT_CLUB_FORM_SETUP.md.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
