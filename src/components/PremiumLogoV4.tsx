import { useId } from 'react';

export default function PremiumLogoV4({ inverse = false, compact = false, className = '' }: { inverse?: boolean; compact?: boolean; className?: string }) {
  const id = useId().replace(/:/g,'');
  const navy = inverse ? '#ffffff' : '#082f52';
  return (
    <svg className={className} viewBox={compact ? '0 0 250 72' : '0 0 360 92'} role="img" aria-label="Taxis Paris Conventionnés" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e1bd72"/>
          <stop offset="100%" stopColor="#9d722e"/>
        </linearGradient>
      </defs>
      <g transform={compact ? 'translate(5 4) scale(.72)' : 'translate(7 4)'}>
        <path d="M35 1 47 23h-5l9 20h-6l12 25H44l-9-18-9 18H13l12-25h-6l9-20h-5L35 1Z" fill="none" stroke={navy} strokeWidth="3.1" strokeLinejoin="round"/>
        <path d="M25 31h20M20 44h30M17 57h36" stroke={'url(#'+id+')'} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="35" cy="72" r="3.2" fill={'url(#'+id+')'}/>
      </g>
      <g transform={compact ? 'translate(58 13)' : 'translate(78 14)'}>
        <text x="0" y="27" fill={navy} fontFamily="Georgia,serif" fontWeight="700" fontSize={compact ? '22' : '30'}>TAXIS PARIS</text>
        <text x="1" y={compact ? '47' : '53'} fill={navy} fontFamily="Arial,sans-serif" fontWeight="700" fontSize={compact ? '9.5' : '11.5'} letterSpacing={compact ? '3.2' : '4.2'}>CONVENTIONNÉS</text>
        {!compact && <><line x1="1" y1="61" x2="236" y2="61" stroke={'url(#'+id+')'} strokeWidth="1.6"/><text x="1" y="76" fill={inverse ? 'rgba(255,255,255,.68)' : '#7c8b96'} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" letterSpacing="2">TRANSPORT MÉDICAL · ÎLE-DE-FRANCE</text></>}
      </g>
    </svg>
  );
}
