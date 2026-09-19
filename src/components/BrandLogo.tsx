type BrandLogoProps = {
  className?: string;
  alt?: string;
};

const LOGO_SRC = '/logo-taxi-conventionne-assurance.webp';

export default function BrandLogo({
  className = '',
  alt = 'Taxi conventionné Assurance Maladie',
}: BrandLogoProps) {
  return (
    <img
      className={className}
      src={LOGO_SRC}
      alt={alt}
      width={520}
      height={240}
      loading="eager"
      decoding="async"
    />
  );
}
