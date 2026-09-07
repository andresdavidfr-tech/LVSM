import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Settings, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Download, 
  Check, 
  X,
  Image as ImageIcon,
  ExternalLink,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminImages } from './admin/AdminImages';

// Mock Data
// NOTA: imágenes de carteras de lujo seminuevas. Las 3 piezas compartidas con
// el catálogo (constants.ts) usan las mismas URLs para mantener consistencia.
// No verificadas desde el entorno de build (allowlist de red); revisar en vivo.
const MOCK_PRODUCTS = [
  { id: 1, brand: 'Louis Vuitton', model: 'Neverfull MM Monogram', condition: 'Inmejorable', image: 'https://images.unsplash.com/photo-1564422170194-896b89110ef8?auto=format&fit=crop&q=80&w=200' },
  { id: 2, brand: 'Gucci', model: 'GG Marmont Small', condition: 'Excelente', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=200' },
  { id: 3, brand: 'Chanel', model: 'Classic Flap Bag', condition: 'Como nueva', image: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&q=80&w=200' },
  { id: 4, brand: 'Prada', model: 'Galleria Saffiano', condition: 'Vintage', image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=200' },
];

const MOCK_LEADS = [
  { id: 1, name: 'Sofía Rodríguez', email: 'sofia@example.com', phone: '+54 9 11 1234 5678', interest: 'Louis Vuitton', message: 'Busco una Speedy 30', date: '2024-03-08' },
  { id: 2, name: 'Valentina Martínez', email: 'valen@example.com', phone: '+54 9 11 8765 4321', interest: 'Chanel', message: 'Me interesa vender mi Classic Flap', date: '2024-03-07' },
  { id: 3, name: 'Lucía Pérez', email: 'lucia@example.com', phone: '+54 9 11 5555 4444', interest: 'Gucci', message: '¿Tienen la Marmont en beige?', date: '2024-03-05' },
];

const MOCK_REVIEWS = [
  { id: 1, name: 'Sofía R.', text: 'Increíble experiencia. La cartera está impecable.', time: 'Hace 2 días', status: 'approved' },
  { id: 2, name: 'Valentina M.', text: 'Compré mi primera LV aquí y no puedo estar más feliz.', time: 'Hace 1 semana', status: 'approved' },
  { id: 3, name: 'Lucía P.', text: 'Vendí mi cartera y fue súper rápido.', time: 'Hace 2 semanas', status: 'pending' },
];

type View = 'dashboard' | 'catalog' | 'images' | 'crm' | 'reviews' | 'settings';

export const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const SidebarItem = ({ id, icon: Icon, label }: { id: View, icon: any, label: string }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 transition-all ${
        activeView === id 
          ? 'bg-brand-ink text-brand-paper border-r-4 border-brand-gold' 
          : 'text-brand-ink/60 hover:bg-brand-ink/5'
      }`}
    >
      <Icon size={20} />
      <span className="text-xs uppercase tracking-widest font-medium">{label}</span>
    </button>
  );

  const DashboardSummary = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Ventas Mes', value: '$12.4k', change: '+12%' },
          { label: 'Nuevos Miembros', value: '142', change: '+5%' },
          { label: 'Consultas Hoy', value: '28', change: '+18%' },
          { label: 'Stock Activo', value: '45', change: '-2' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-ink/5">
            <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">{stat.label}</p>
            <div className="flex items-end gap-2">
              <h4 className="text-2xl font-serif">{stat.value}</h4>
              <span className={`text-[10px] mb-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-ink/5">
          <h3 className="text-xl font-serif mb-6">Últimas Consultas</h3>
          <div className="space-y-4">
            {MOCK_LEADS.slice(0, 3).map(lead => (
              <div key={lead.id} className="flex items-center justify-between p-4 bg-brand-paper/50 rounded-xl">
                <div>
                  <p className="text-sm font-bold">{lead.name}</p>
                  <p className="text-xs opacity-50">{lead.interest}</p>
                </div>
                <button className="text-brand-accent hover:text-brand-gold transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-ink/5">
          <h3 className="text-xl font-serif mb-6">Reseñas Pendientes</h3>
          <div className="space-y-4">
            {MOCK_REVIEWS.filter(r => r.status === 'pending').map(review => (
              <div key={review.id} className="p-4 bg-brand-paper/50 rounded-xl">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-bold">{review.name}</p>
                  <span className="text-[10px] opacity-40">{review.time}</span>
                </div>
                <p className="text-xs italic mb-4">"{review.text}"</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-brand-ink text-brand-paper py-2 rounded-lg text-[10px] uppercase tracking-widest hover:bg-green-600 transition-colors">Aprobar</button>
                  <button className="flex-1 border border-brand-ink/10 py-2 rounded-lg text-[10px] uppercase tracking-widest hover:bg-red-50 transition-colors">Ocultar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CatalogView = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-brand-ink/5 overflow-hidden">
      <div className="p-8 border-b border-brand-ink/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por marca o modelo..."
            className="w-full pl-12 pr-4 py-3 bg-brand-paper rounded-full text-sm outline-none focus:ring-1 ring-brand-gold transition-all"
          />
        </div>
        <button className="w-full md:w-auto bg-brand-ink text-brand-paper px-8 py-3 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-accent transition-all">
          <Plus size={16} /> Agregar Cartera
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-brand-paper/50 text-[10px] uppercase tracking-widest opacity-50">
              <th className="px-8 py-4">Imagen</th>
              <th className="px-8 py-4">Marca</th>
              <th className="px-8 py-4">Modelo</th>
              <th className="px-8 py-4">Estado</th>
              <th className="px-8 py-4">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-ink/5">
            {MOCK_PRODUCTS.map(product => (
              <tr key={product.id} className="hover:bg-brand-paper/30 transition-colors">
                <td className="px-8 py-4">
                  <img src={product.image} alt={product.model} className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="px-8 py-4 font-medium text-sm">{product.brand}</td>
                <td className="px-8 py-4 text-sm opacity-70">{product.model}</td>
                <td className="px-8 py-4">
                  <span className="px-3 py-1 bg-brand-gold/20 text-brand-accent rounded-full text-[10px] uppercase tracking-widest font-bold">
                    {product.condition}
                  </span>
                </td>
                <td className="px-8 py-4">
                  <div className="flex gap-3">
                    <button className="p-2 hover:bg-brand-ink/5 rounded-lg text-brand-ink/60 hover:text-brand-ink transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CRMView = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-brand-ink/5 overflow-hidden">
      <div className="p-8 border-b border-brand-ink/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..."
            className="w-full pl-12 pr-4 py-3 bg-brand-paper rounded-full text-sm outline-none focus:ring-1 ring-brand-gold transition-all"
          />
        </div>
        <button className="w-full md:w-auto border border-brand-ink/10 px-8 py-3 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-ink hover:text-brand-paper transition-all">
          <Download size={16} /> Exportar Lista
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-brand-paper/50 text-[10px] uppercase tracking-widest opacity-50">
              <th className="px-8 py-4">Nombre</th>
              <th className="px-8 py-4">Email</th>
              <th className="px-8 py-4">Teléfono</th>
              <th className="px-8 py-4">Interés</th>
              <th className="px-8 py-4">Fecha</th>
              <th className="px-8 py-4">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-ink/5">
            {MOCK_LEADS.map(lead => (
              <tr key={lead.id} className="hover:bg-brand-paper/30 transition-colors">
                <td className="px-8 py-4 font-medium text-sm">{lead.name}</td>
                <td className="px-8 py-4 text-sm opacity-70">{lead.email}</td>
                <td className="px-8 py-4 text-sm opacity-70">{lead.phone}</td>
                <td className="px-8 py-4 text-sm">{lead.interest}</td>
                <td className="px-8 py-4 text-xs opacity-50">{lead.date}</td>
                <td className="px-8 py-4">
                  <button className="text-brand-accent hover:text-brand-gold transition-colors">
                    <MessageSquare size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ReviewsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_REVIEWS.map(review => (
        <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-brand-ink/5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                review.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                {review.status === 'approved' ? 'Aprobada' : 'Pendiente'}
              </span>
              <span className="text-[10px] opacity-40">{review.time}</span>
            </div>
            <p className="text-brand-ink/70 italic font-serif mb-6 leading-relaxed">"{review.text}"</p>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-brand-ink/5">
            <span className="text-xs font-bold uppercase tracking-widest">{review.name}</span>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-brand-ink/5 rounded-lg text-brand-ink/60 transition-all">
                <Edit2 size={14} />
              </button>
              {review.status === 'pending' ? (
                <button className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-all">
                  <Check size={14} />
                </button>
              ) : (
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-all">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const SettingsView = () => (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-ink/5">
        <h3 className="text-xl font-serif mb-6">Configuración Hero</h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Título Principal</label>
            <input type="text" defaultValue="MODA CIRCULAR DE LUJO" className="w-full bg-brand-paper px-6 py-3 rounded-xl text-sm outline-none focus:ring-1 ring-brand-gold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Descripción</label>
            <textarea rows={3} defaultValue="El lujo que mereces, al alcance." className="w-full bg-brand-paper px-6 py-3 rounded-xl text-sm outline-none focus:ring-1 ring-brand-gold resize-none" />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-ink/5">
        <h3 className="text-xl font-serif mb-6">Métricas y Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Año de Fundación</label>
            <input type="number" defaultValue="2021" className="w-full bg-brand-paper px-6 py-3 rounded-xl text-sm outline-none focus:ring-1 ring-brand-gold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Miembros del Club</label>
            <input type="text" defaultValue="11k+" className="w-full bg-brand-paper px-6 py-3 rounded-xl text-sm outline-none focus:ring-1 ring-brand-gold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">WhatsApp</label>
            <input type="text" defaultValue="+54 9 11 3404 1112" className="w-full bg-brand-paper px-6 py-3 rounded-xl text-sm outline-none focus:ring-1 ring-brand-gold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Instagram</label>
            <input type="text" defaultValue="@lv_sanmiguel" className="w-full bg-brand-paper px-6 py-3 rounded-xl text-sm outline-none focus:ring-1 ring-brand-gold" />
          </div>
        </div>
        <button className="mt-8 bg-brand-ink text-brand-paper px-10 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-brand-accent transition-all">
          Guardar Cambios
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-paper flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand-ink/5 flex flex-col fixed h-full z-20">
        <div className="p-8 border-b border-brand-ink/5">
          <div className="text-xl font-serif tracking-tighter">LVSM <span className="text-[10px] uppercase tracking-widest opacity-50 block">Admin Panel</span></div>
        </div>
        
        <nav className="flex-grow py-6">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="catalog" icon={ShoppingBag} label="Catálogo" />
          <SidebarItem id="images" icon={ImageIcon} label="Imágenes" />
          <SidebarItem id="crm" icon={Users} label="Select Club" />
          <SidebarItem id="reviews" icon={MessageSquare} label="Reseñas" />
          <SidebarItem id="settings" icon={Settings} label="Configuración" />
        </nav>

        <div className="p-6 border-t border-brand-ink/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={18} />
            <span className="text-xs uppercase tracking-widest font-bold">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold mb-2 block">Administración</span>
            <h2 className="text-4xl font-serif capitalize">
              {activeView === 'crm' ? 'Select Club CRM' : activeView === 'images' ? 'Imágenes' : activeView}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest opacity-40">Lunes, 9 de Marzo 2026</p>
            <p className="text-xs font-medium">Bienvenida, Florencia</p>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'dashboard' && <DashboardSummary />}
            {activeView === 'catalog' && <CatalogView />}
            {activeView === 'images' && <AdminImages />}
            {activeView === 'crm' && <CRMView />}
            {activeView === 'reviews' && <ReviewsView />}
            {activeView === 'settings' && <SettingsView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
