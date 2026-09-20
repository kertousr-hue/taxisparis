import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function HomeExactFooter() {
  return (
    <footer className="exact-site-footer">
      <div className="exact-home-container exact-site-footer-grid">
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

        <div className="exact-site-footer-column">
          <h3>Contact</h3>
          <a href="tel:+33650366491"><Phone size={18} /> <span>06 50 36 64 91</span></a>
          <a href="mailto:contact@taxisparis-conventionnes.fr"><Mail size={18} /> <span>contact@taxisparis-conventionnes.fr</span></a>
          <span className="exact-site-footer-static"><MapPin size={18} /> <span>Paris, Île-de-France</span></span>
        </div>

        <div className="exact-site-footer-column">
          <h3>Zones desservies</h3>
          <Link to="/taxi-conventionne-paris-75">Paris (75)</Link>
          <Link to="/taxi-conventionne-essonne-91">Essonne (91)</Link>
          <Link to="/taxi-conventionne-hauts-de-seine-92">Hauts-de-Seine (92)</Link>
          <Link to="/taxi-conventionne-seine-saint-denis-93">Seine-Saint-Denis (93)</Link>
          <Link to="/taxi-conventionne-val-de-marne-94">Val-de-Marne (94)</Link>
        </div>

        <div className="exact-site-footer-column">
          <h3>Liens utiles</h3>
          <Link to="/qui-sommes-nous">Qui sommes-nous ?</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/conditions-generales-de-vente">Conditions générales de vente</Link>
          <Link to="/conditions-generales">Conditions générales</Link>
        </div>
      </div>

      <div className="exact-home-container exact-site-footer-bottom">
        <span>© {new Date().getFullYear()} Taxis Paris Conventionnés</span>
        <span>Transport médical conventionné · Paris et Île-de-France</span>
      </div>
    </footer>
  );
}
