import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

const zones = [
  { to: '/taxi-conventionne-paris-75', label: 'Paris (75)' },
  { to: '/taxi-conventionne-essonne-91', label: 'Essonne (91)' },
  { to: '/taxi-conventionne-hauts-de-seine-92', label: 'Hauts-de-Seine (92)' },
  { to: '/taxi-conventionne-seine-saint-denis-93', label: 'Seine-Saint-Denis (93)' },
  { to: '/taxi-conventionne-val-de-marne-94', label: 'Val-de-Marne (94)' },
];
const usefulLinks = [
  { to: '/qui-sommes-nous', label: 'Qui sommes-nous ?' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/conditions-generales-de-vente', label: 'Conditions générales de vente' },
  { to: '/conditions-generales', label: 'Conditions générales' },
];

function FooterLinks({ title, area, links }: { title: string; area: string; links: typeof zones }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const compact = window.matchMedia('(max-width: 800px)');
    const sync = () => setOpen(!compact.matches);
    sync();
    compact.addEventListener('change', sync);
    return () => compact.removeEventListener('change', sync);
  }, []);

  return (
    <details className={`exact-site-footer-links exact-site-footer-${area}`} open={open}>
      <summary><h3>{title}</h3><ChevronDown size={18} aria-hidden="true" /></summary>
      <nav className="footer-section-links" aria-label={title}>
        {links.map(link => <Link key={link.to} to={link.to}>{link.label}</Link>)}
      </nav>
    </details>
  );
}

export default function HomeExactFooter() {
  return (
    <footer className="exact-site-footer">
      <div className="exact-home-container exact-site-footer-grid">
        <div className="exact-site-footer-column exact-site-footer-contact">
          <h3>Contact</h3>
          <a href="tel:+33650366491"><Phone size={18} aria-hidden="true" /> <span>06 50 36 64 91</span></a>
          <a href="mailto:contact@taxisparis-conventionnes.fr"><Mail size={18} aria-hidden="true" /> <span>contact@taxisparis-conventionnes.fr</span></a>
          <span className="exact-site-footer-static"><MapPin size={18} aria-hidden="true" /> <span>Paris, Île-de-France</span></span>
        </div>

        <div className="exact-site-footer-brand">
          <Link to="/" className="exact-site-footer-logo" aria-label="Accueil Taxis conventionnés — Paris et Île-de-France">
            <BrandLogo className="exact-site-footer-brand-image" />
          </Link>
          <h2>Taxis conventionnés et VSL</h2>
          <p>
            Service de taxis conventionnés et de VSL agréés par la Sécurité sociale en Île-de-France.
            Disponible 24 h/24 et 7 j/7.
          </p>
        </div>

        <FooterLinks title="Zones desservies" area="zones" links={zones} />
        <FooterLinks title="Liens utiles" area="useful" links={usefulLinks} />
      </div>

      <div className="exact-home-container exact-site-footer-bottom">
        <span>© {new Date().getFullYear()} Taxis Paris Conventionnés</span>
        <span>Transport médical conventionné · Paris et Île-de-France</span>
      </div>
    </footer>
  );
}
