import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'crest' | 'minimal' | 'collective';
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 40, variant = 'crest' }) => {
  const colors = {
    accent: 'var(--color-brand-accent)',
    gold: 'var(--color-brand-gold)',
    ink: 'var(--color-brand-ink)',
  };

  if (variant === 'crest') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield Shape */}
          <path d="M50 10 L85 25 V55 C85 75 50 90 50 90 C50 90 15 75 15 55 V25 L50 10Z" stroke={colors.accent} strokeWidth="2" />
          <path d="M50 15 L80 28 V53 C80 70 50 83 50 83 C50 83 20 70 20 53 V28 L50 15Z" stroke={colors.gold} strokeWidth="0.5" opacity="0.5" />
          
          <text
            x="50%"
            y="48%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="font-serif"
            fill={colors.accent}
            style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '0.05em' }}
          >
            LV
          </text>
          <text
            x="50%"
            y="68%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="font-serif"
            fill={colors.accent}
            style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '0.05em' }}
          >
            SM
          </text>
          
          {/* Decorative horizontal line */}
          <line x1="35" y1="55" x2="65" y2="55" stroke={colors.gold} strokeWidth="1" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-serif tracking-[0.2em] uppercase">LVSM</span>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">The Collective</span>
        </div>
      </div>
    );
  }

  if (variant === 'collective') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Interlocking Circles */}
          <circle cx="50" cy="50" r="45" stroke={colors.accent} strokeWidth="1" />
          <circle cx="50" cy="50" r="40" stroke={colors.gold} strokeWidth="0.5" strokeDasharray="2 2" />
          
          <text
            x="50%"
            y="52%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="font-serif"
            fill={colors.accent}
            style={{ fontSize: '20px', letterSpacing: '0.2em' }}
          >
            LVSM
          </text>
          
          {/* EST 2021 curved text path placeholder (simplified) */}
          <path id="curve" d="M30 80 Q50 90 70 80" fill="transparent" />
          <text fill={colors.gold} style={{ fontSize: '6px', letterSpacing: '0.1em' }}>
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              EST. 2021
            </textPath>
          </text>
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-serif tracking-[0.2em] uppercase">LVSM</span>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">Select Club</span>
        </div>
      </div>
    );
  }

  // Default Minimal
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="absolute inset-0 border border-brand-accent/20 rounded-full animate-pulse" />
        <span className="font-serif text-brand-accent text-xl tracking-tighter">LV</span>
        <span className="font-serif text-brand-gold text-xl tracking-tighter -ml-1">SM</span>
      </div>
      <span className="text-xl font-serif tracking-[0.4em] uppercase">LVSM</span>
    </div>
  );
};
