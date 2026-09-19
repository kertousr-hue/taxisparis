type BrandLogoProps = {
  className?: string;
  alt?: string;
};

export default function BrandLogo({
  className = '',
  alt = 'Taxis Paris Conventionnés - Transport médical agréé Assurance Maladie',
}: BrandLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 760 220"
      role="img"
      aria-label={alt}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{alt}</title>
      <g fill="none" stroke="#073455" strokeLinecap="round" strokeLinejoin="round">
        <path d="M66 174 103 47l37 127M82 115h43M72 149h63M91 83h24" strokeWidth="10" />
        <path d="M83 174h40M72 174h62" strokeWidth="8" />
      </g>

      <g fill="#073455">
        <text x="166" y="82" fontFamily="Georgia, serif" fontSize="46" fontWeight="700">TAXIS PARIS</text>
        <text x="166" y="127" fontFamily="Georgia, serif" fontSize="34" fontWeight="700" letterSpacing="3">CONVENTIONNÉS</text>
        <text x="168" y="160" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700" letterSpacing="2">TRANSPORT MÉDICAL • ASSURANCE MALADIE</text>
      </g>

      <g transform="translate(630 32)">
        <circle cx="58" cy="58" r="54" fill="#fff" stroke="#0e5c9f" strokeWidth="7" />
        <circle cx="58" cy="58" r="42" fill="#eef6fb" stroke="#8dc0e1" strokeWidth="2" />
        <text x="58" y="72" textAnchor="middle" fill="#0e5c9f" fontFamily="Georgia, serif" fontSize="48" fontWeight="700">C</text>
        <text x="58" y="126" textAnchor="middle" fill="#073455" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="800">CPAM</text>
      </g>
    </svg>
  );
}
