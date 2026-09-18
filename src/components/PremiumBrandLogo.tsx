import { useId } from 'react';

type PremiumBrandLogoProps = {
  variant?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
};

export default function PremiumBrandLogo({
  variant = 'dark',
  compact = false,
  className = '',
}: PremiumBrandLogoProps) {
  const gradientId = useId().replace(/:/g, '');
  const navy = variant === 'light' ? '#ffffff' : '#082f52';
  const muted = variant === 'light' ? 'rgba(255,255,255,.72)' : '#718391';

  return (
    <svg
      className={className}
      viewBox={compact ? '0 0 260 76' : '0 0 340 96'}
      role="img"
      aria-label="Taxis Paris Conventionnés"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9b76d" />
          <stop offset="100%" stopColor="#9b702c" />
        </linearGradient>
      </defs>

      <g transform={compact ? 'translate(6 4) scale(.72)' : 'translate(8 5)'}>
        <path d="M38 2 L49 24 L44 24 L52 44 L47 44 L57 68 L46 68 L40 55 L28 55 L22 68 L11 68 L21 44 L16 44 L24 24 L19 24 L30 2 Z" fill="none" stroke={navy} strokeWidth="3.2" strokeLinejoin="round"/>
        <path d="M26 31 H42 M21 44 H47 M17 57 H51" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round"/>
        <path d="M31 2 L35 2 L34 16 L32 16 Z" fill={`url(#${gradientId})`} />
        <circle cx="34" cy="71" r="3.3" fill={`url(#${gradientId})`} />
      </g>

      <g transform={compact ? 'translate(60 13)' : 'translate(78 17)'}>
        <text x="0" y="24" fill={navy} fontFamily="Georgia, Times New Roman, serif" fontWeight="700" fontSize={compact ? '23' : '29'} letterSpacing=".5">TAXIS PARIS</text>
        <text x="1" y={compact ? '44' : '49'} fill={navy} fontFamily="Arial, sans-serif" fontWeight="700" fontSize={compact ? '10' : '12'} letterSpacing={compact ? '3.2' : '4.3'}>CONVENTIONNÉS</text>
        {!compact && (
          <>
            <line x1="1" y1="58" x2="226" y2="58" stroke={`url(#${gradientId})`} strokeWidth="1.8" />
            <text x="1" y="73" fill={muted} fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8" letterSpacing="2.1">TRANSPORT MÉDICAL · ÎLE-DE-FRANCE</text>
          </>
        )}
      </g>
    </svg>
  );
}
