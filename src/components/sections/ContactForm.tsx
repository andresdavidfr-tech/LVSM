import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Star, Heart, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { GuaranteeStrip } from '../trust/Trust';
import { track } from '../../lib/analytics';

const EMPTY = { name: '', email: '', phone: '', interest: 'Comprar', message: '' };

export function ContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    track('lead_submit_attempt', { interest: formData.interest });
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData(EMPTY);
        track('lead_submit', { interest: formData.interest });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const field = (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

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

            <div className="space-y-6 mb-10">
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

            <GuaranteeStrip />
          </div>

          <div className="bg-brand-paper p-8 md:p-12 rounded-[40px] shadow-sm">
            {status === 'success' ? (
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Nombre Completo</label>
                    <input required type="text" value={formData.name} onChange={field('name')} placeholder="Ej: María García"
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Email</label>
                    <input required type="email" value={formData.email} onChange={field('email')} placeholder="maria@ejemplo.com"
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Teléfono (Opcional)</label>
                    <input type="tel" value={formData.phone} onChange={field('phone')} placeholder="+54 9 11 ..."
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Interés Principal</label>
                    <select value={formData.interest} onChange={field('interest')}
                      className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light appearance-none">
                      <option value="Comprar">Quiero Comprar</option>
                      <option value="Vender">Quiero Vender</option>
                      <option value="Ambos">Ambos</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Mensaje o Marca de Interés</label>
                  <textarea rows={3} value={formData.message} onChange={field('message')} placeholder="¿Buscás algún modelo en particular?"
                    className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:border-brand-gold outline-none transition-colors font-light resize-none" />
                </div>

                <button disabled={status === 'loading'} type="submit"
                  className="w-full bg-brand-ink text-brand-paper py-4 rounded-full text-xs uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                  {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <>Enviar Información <Send size={16} /></>}
                </button>

                {status === 'error' && <p className="text-red-500 text-xs text-center">Hubo un error. Por favor, intentá de nuevo.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
