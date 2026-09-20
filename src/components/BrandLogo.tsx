type BrandLogoProps = {
  className?: string;
  alt?: string;
};

export default function BrandLogo({
  className = '',
  alt = 'Taxis conventionnés — Paris et Île-de-France',
}: BrandLogoProps) {
  return (
    <img
      className={className}
      src="/taxis-conventionnes-paris-ile-de-france.png"
      alt={alt}
      width={2078}
      height={757}
      decoding="async"
    />
  );
}
