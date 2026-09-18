type BrandMarkProps = {
  light?: boolean;
  compact?: boolean;
  className?: string;
};

export default function BrandMark({ light = false, compact = false, className = '' }: BrandMarkProps) {
  const ink = light ? '#ffffff' : '#0b2239';
  const muted = light ? 'rgba(255,255,255,.72)' : '#657887';
  const gold = '#b88a52';

  return (
    <svg
      className={className}
      viewBox={compact ? '0 0 250 70' : '0 0 330 88'}
      role="img"
      aria-label="Taxis Paris Conventionnés"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={compact ? 'translate(6 6) scale(.72)' : 'translate(7 6)'}>
        <path d="M34 0 L43 20 L39 20 L47 39 L43 39 L53 62 H43 L36 49 H25 L19 62 H9 L19 39 H15 L23 20 H19 L28 0 Z" fill="none" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <path d="M23 28 H40 M18 40 H45 M14 52 H49" stroke={gold} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="31" cy="66" r="3.2" fill={gold} />
      </g>

      <g transform={compact ? 'translate(55 13)' : 'translate(73 14)'}>
        <text x="0" y="23" fill={ink} fontFamily="Georgia, Times New Roman, serif" fontWeight="700" fontSize={compact ? '22' : '28'} letterSpacing=".35">TAXIS PARIS</text>
        <text x="1" y={compact ? '43' : '48'} fill={ink} fontFamily="Arial, sans-serif" fontWeight="700" fontSize={compact ? '9.5' : '11.5'} letterSpacing={compact ? '3.1' : '3.9'}>CONVENTIONNÉS</text>
        {!compact && (
          <>
            <line x1="1" y1="57" x2="212" y2="57" stroke={gold} strokeWidth="1.5" />
            <text x="1" y="71" fill={muted} fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7.5" letterSpacing="1.8">TRANSPORT MÉDICAL · ÎLE-DE-FRANCE</text>
          </>
        )}
      </g>
    </svg>
  );
}
