import { useEffect, useState, type ChangeEvent } from 'react';
import { UploadCloud, Check, AlertCircle, Loader2 } from 'lucide-react';
import { fetchProducts, type Product, type ProductImage } from '../../data/products';
import { uploadImage } from '../../lib/upload';

type SlotState = 'idle' | 'uploading' | 'done' | 'error';

function UploadSlot({ image }: { image: ProductImage }) {
  const [state, setState] = useState<SlotState>('idle');
  const [msg, setMsg] = useState('');

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !image.storageKey) return;
    setState('uploading');
    setMsg('');
    try {
      await uploadImage(file, image.storageKey);
      setState('done');
    } catch (err) {
      setState('error');
      setMsg(err instanceof Error ? err.message : 'Error');
    }
  };

  const border =
    state === 'done' ? 'border-emerald-400' : state === 'error' ? 'border-red-400' : 'border-brand-ink/15';

  return (
    <label className={`flex flex-col gap-2 p-4 rounded-2xl border-2 border-dashed cursor-pointer hover:border-brand-gold transition-colors ${border}`}>
      <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
        {state === 'uploading' && <Loader2 size={16} className="animate-spin" />}
        {state === 'done' && <Check size={16} className="text-emerald-600" />}
        {state === 'error' && <AlertCircle size={16} className="text-red-500" />}
        {state === 'idle' && <UploadCloud size={16} className="text-brand-ink/50" />}
        {state === 'done' ? 'Subida' : state === 'error' ? 'Error' : state === 'uploading' ? 'Subiendo…' : 'Subir'}
      </div>
      <code className="text-[10px] text-brand-ink/50 truncate">{image.storageKey}</code>
      {state === 'error' && <span className="text-[10px] text-red-500">{msg}</span>}
    </label>
  );
}

export function AdminImages() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  if (!products) return <p className="text-sm text-brand-ink/50">Cargando catálogo…</p>;

  return (
    <div className="space-y-8">
      <p className="text-sm text-brand-ink/60 max-w-2xl">
        Subí las fotos reales de cada pieza a Amazon S3. Cada archivo se guarda en el <code>key</code> indicado
        y, una vez configuradas las variables <code>VITE_S3_*</code>, reemplaza automáticamente al placeholder.
      </p>

      {products.map((p) => (
        <div key={p.id} className="bg-white p-6 rounded-3xl shadow-sm border border-brand-ink/5">
          <h3 className="font-serif text-lg mb-1">{p.name}</h3>
          <p className="text-[10px] uppercase tracking-widest text-brand-accent mb-4">{p.brand}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {p.images.map((img, i) => (
              <UploadSlot key={i} image={img} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
