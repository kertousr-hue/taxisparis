import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function HomeExactFooter() {
  return (
    <footer className="exact-home-footer">
      <div className="exact-home-container exact-home-footer-inner">
        <Link to="/" className="exact-home-footer-logo">
          <img src="/taxi-logo.webp" alt="Taxi conventionné Assurance Maladie" width="520" height="240" />
        </Link>
        <nav aria-label="Navigation du pied de page">
          <Link to="/">Accueil</Link>
          <a href="/#services">Nos services</a>
          <Link to="/zones-desservies">Zones desservies</Link>
          <Link to="/qui-sommes-nous">À propos</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="exact-home-footer-social">
          <span>Suivez-nous</span>
          <div>
            <span aria-hidden="true"><Facebook size={15} /></span>
            <span aria-hidden="true"><Instagram size={15} /></span>
            <span aria-hidden="true"><Linkedin size={15} /></span>
          </div>
        </div>
        <div className="exact-home-footer-copy">© {new Date().getFullYear()} Taxis Paris Conventionnés<br />Tous droits réservés</div>
      </div>
    </footer>
  );
}
