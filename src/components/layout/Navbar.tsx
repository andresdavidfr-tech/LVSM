import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Menu, X, Instagram } from 'lucide-react';
import { Logo } from '../Logo';
import { useWishlist } from '../../hooks/useWishlist';
import { wa } from '../../lib/whatsapp';

const links = [
  { href: '/#catalog', label: 'Catálogo' },
  { href: '/#authenticity', label: 'Autenticidad' },
  { href: '/#about', label: 'Nosotros' },
  { href: '/#consignment', label: 'Vender' },
  { href: '/#contact', label: 'Unite al Club' },
];

export function Navbar({ onOpenWishlist }: { onOpenWishlist: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useWishlist();

  const WishButton = ({ className = '' }: { className?: string }) => (
    <button onClick={onOpenWishlist} aria-label="Abrir wishlist" className={`relative p-2 hover:text-brand-gold transition-colors ${className}`}>
      <Heart size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-paper/80 backdrop-blur-md border-b border-brand-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <Logo variant="crest" />
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors">
                {l.label}
              </a>
            ))}
            <WishButton />
            <a href="https://instagram.com/lv_sanmiguel" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-brand-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a
              href={wa('Hola! Quisiera más información sobre LVSM.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-ink text-brand-paper px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors"
            >
              Contacto
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <WishButton />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Menú">
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
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-widest">
                {l.label}
              </a>
            ))}
            <div className="pt-4">
              <a
                href={wa('Hola! Quisiera más información sobre LVSM.')}
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
}
