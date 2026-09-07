import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WishlistModal } from '../WishlistModal';
import { wa } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';

export function Layout() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <div className="selection:bg-brand-accent selection:text-white">
      <Navbar onOpenWishlist={() => setIsWishlistOpen(true)} />
      <main>
        <Outlet />
      </main>
      <Footer />

      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

      {/* Botón flotante de WhatsApp */}
      <a
        href={wa('Hola! Quisiera más información sobre LVSM.')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('contact_whatsapp', { where: 'floating' })}
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
