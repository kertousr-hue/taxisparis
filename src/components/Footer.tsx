import { Link } from 'react-router-dom';
import { Car, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate: _onNavigate }: FooterProps = {}) {
  return (
    <footer className="taxinea-footer" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="taxinea-footer-main">
          <Link to="/" className="taxinea-footer-brand" aria-label="TAXINÉA - accueil">
            <span className="taxinea-footer-mark" aria-hidden="true">
              <Car size={22} />
            </span>
            <span>
              <strong>TAXINÉA</strong>
              <small>TAXIS CONVENTIONNÉS IDF</small>
            </span>
          </Link>

          <nav className="taxinea-footer-nav" aria-label="Navigation du pied de page">
            <Link to="/">Accueil</Link>
            <a href="/#services">Nos services</a>
            <Link to="/zones-desservies">Zones</Link>
            <Link to="/qui-sommes-nous">À propos</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/blog">Blog</Link>
          </nav>

          <a href="tel:+33650366491" className="taxinea-footer-phone" aria-label="Appeler le 06 50 36 64 91">
            <Phone size={16} aria-hidden="true" />
            06 50 36 64 91
          </a>
        </div>

        <div className="taxinea-footer-bottom">
          <p>© {new Date().getFullYear()} TAXINÉA - Tous droits réservés</p>
          <div>
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/conditions-generales-de-vente">Conditions générales de vente</Link>
            <Link to="/conditions-generales">Conditions générales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
