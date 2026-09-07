import { useState, type FormEvent, type ReactNode } from 'react';
import { Lock } from 'lucide-react';

// Freno temporal de acceso al panel admin, mientras no exista autenticación
// real del lado del servidor. IMPORTANTE: esto NO es seguridad — la
// contraseña viaja en el bundle del navegador y cualquiera con conocimientos
// técnicos puede sortearla (view-source / devtools). Solo frena el acceso
// casual (alguien que encuentra /admin googleando o probando la URL).
// Reemplazar por auth real (sesión de servidor) antes de manejar datos
// sensibles de verdad en este panel.
const SESSION_KEY = 'lvsm_admin_unlocked';

function checkPassword(value: string): boolean {
  const expected = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
  if (!expected) return false; // sin contraseña configurada: nadie entra
  return value === expected;
}

export function AdminGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (checkPassword(value)) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-ink px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl text-center">
        <div className="w-14 h-14 rounded-full bg-brand-paper flex items-center justify-center text-brand-accent mx-auto mb-6">
          <Lock size={24} />
        </div>
        <h1 className="text-xl font-serif mb-2">Acceso restringido</h1>
        <p className="text-sm text-brand-ink/60 mb-6">Este panel es solo para el equipo de LVSM.</p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Contraseña"
          className="w-full bg-brand-paper border border-brand-ink/10 rounded-full px-5 py-3 text-center outline-none focus:border-brand-gold transition-colors mb-4"
        />
        {error && <p className="text-red-500 text-xs mb-4">Contraseña incorrecta.</p>}
        <button type="submit" className="w-full bg-brand-ink text-brand-paper py-3 rounded-full text-xs uppercase tracking-widest hover:bg-brand-accent transition-all">
          Ingresar
        </button>
      </form>
    </div>
  );
}
