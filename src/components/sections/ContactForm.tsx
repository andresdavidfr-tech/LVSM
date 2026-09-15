import { useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Star, Heart, Percent, Send, CheckCircle2, Loader2, MailWarning } from 'lucide-react';
import { GuaranteeStrip } from '../trust/Trust';
import { track } from '../../lib/analytics';
import { getGoogleFormConfig, buildGoogleFormFields, type LeadFormData } from '../../lib/googleFormSubmit';

const EMPTY: LeadFormData = { name: '', email: '', phone: '', birthday: '', interest: 'Comprar', message: '' };

// Form 100% con el estilo del sitio; por atrás postea directo al endpoint de
// Google Forms (target a un iframe invisible, sin recargar ni redirigir) y
// la respuesta cae sola en la Google Sheet conectada. El usuario nunca ve la
// interfaz de Google. Ver docs/SELECT_CLUB_FORM_SETUP.md para configurarlo.
export function ContactForm() {
  const config = getGoogleFormConfig();
  const [formData, setFormData] = useState<LeadFormData>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const submittedRef = useRef(false);

  const field = (key: keyof LeadFormData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!config) {
      e.preventDefault();
      return;
    }
    // El <form> nativo hace el POST real (target="lvsm_select_club_target"),
    // así que no hace falta preventDefault: dejamos que viaje, solo
    // marcamos que ya arrancó para distinguir la carga inicial del iframe
    // (about:blank) de la respuesta real de Google.
    setStatus('loading');
    submittedRef.current = true;
    track('lead_submit_attempt', { interest: formData.interest });
  };

  const handleIframeLoad = () => {
    if (!submittedRef.current) return; // primera carga del iframe (about:blank), ignorar
    setStatus('success');
    setFormData(EMPTY);
    track('lead_submit', { interest: formData.interest });
  };

  const fields = config ? buildGoogleFormFields(formData, config) : [];

  return (
    <section id="contact" className="py-24 bg-brand-accent text-white overflow-hidden scroll-mt-24">
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

          <div className="bg-white text-brand-ink p-8 md:p-12 rounded-[40px] shadow-2xl">
            {!config ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MailWarning size={28} />
                </div>
                <h3 className="text-xl font-serif mb-3">Formulario pendiente de configurar</h3>
                <p className="text-brand-ink/60 text-sm max-w-xs mx-auto">
                  Faltan las variables <code className="bg-brand-paper px-1.5 py-0.5 rounded text-xs">VITE_GOOGLE_FORM_*</code> — ver docs/SELECT_CLUB_FORM_SETUP.md.
                </p>
              </div>
            ) : status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-serif mb-4">¡Gracias por sumarte!</h3>
                <p className="text-brand-ink/60 mb-8">Ya sos parte de nuestra lista exclusiva. Pronto recibirás novedades.</p>
                <button onClick={() => setStatus('idle')} className="text-xs uppercase tracking-widest font-bold border-b border-brand-ink pb-1">
                  Volver al formulario
                </button>
              </motion.div>
            ) : (
              <form action={config.action} method="POST" target="lvsm_select_club_target" onSubmit={handleSubmit} className="space-y-6">
                {fields.map(([name, value]) => (
                  <input key={name} type="hidden" name={name} value={value} />
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">Nombre Completo</label>
                    <input required type="text" value={formData.name} onChange={field('name')} placeholder="Ej: María García"
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">Email</label>
                    <input required type="email" value={formData.email} onChange={field('email')} placeholder="maria@ejemplo.com"
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">Teléfono (Opcional)</label>
                    <input type="tel" value={formData.phone} onChange={field('phone')} placeholder="+54 9 11 ..."
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">Cumpleaños (Opcional)</label>
                    <input type="date" value={formData.birthday} onChange={field('birthday')}
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Interés Principal</label>
                  <select value={formData.interest} onChange={field('interest')}
                    className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light appearance-none">
                    <option value="Comprar">Quiero Comprar</option>
                    <option value="Vender">Quiero Vender</option>
                    <option value="Ambos">Ambos</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Mensaje o Marca de Interés</label>
                  <textarea rows={3} value={formData.message} onChange={field('message')} placeholder="¿Buscás algún modelo en particular?"
                    className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light resize-none" />
                </div>

                <div className="relative">
                  {status !== 'loading' && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-brand-accent pointer-events-none"
                      animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <button disabled={status === 'loading'} type="submit"
                    className="relative w-full bg-brand-ink text-brand-paper py-4 rounded-full text-xs uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <>Suscribirme <Send size={16} /></>}
                  </button>
                </div>
              </form>
            )}

            {/* Target del POST: iframe invisible, así el submit no navega ni recarga la página. */}
            <iframe name="lvsm_select_club_target" title="" onLoad={handleIframeLoad} style={{ display: 'none' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
