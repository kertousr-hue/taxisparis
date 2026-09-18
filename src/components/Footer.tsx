import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import BrandMark from './BrandMark';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate: _onNavigate }: FooterProps = {}) {
  return (
    <footer className="refonte-footer" role="contentinfo">
      <div className="refonte-container refonte-footer-grid">
        <div className="refonte-footer-brand">
          <BrandMark light className="refonte-footer-logo" />
          <p>
            Transport médical assis en taxi conventionné à Paris et en Île-de-France,
            avec une prise en charge attentive et professionnelle.
          </p>
          <span className="refonte-footer-badge"><ShieldCheck size={14} /> Conventionné CPAM</span>
        </div>

        <div>
          <h3>Navigation</h3>
          <nav>
            <Link to="/">Accueil</Link>
            <Link to="/reservation-taxi-vsl">Réserver</Link>
            <Link to="/zones-desservies">Zones desservies</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div>
          <h3>Zones principales</h3>
          <nav>
            <Link to="/taxi-conventionne-paris-75">Paris (75)</Link>
            <Link to="/taxi-conventionne-essonne-91">Essonne (91)</Link>
            <Link to="/taxi-conventionne-hauts-de-seine-92">Hauts-de-Seine (92)</Link>
            <Link to="/taxi-conventionne-seine-saint-denis-93">Seine-Saint-Denis (93)</Link>
            <Link to="/taxi-conventionne-val-de-marne-94">Val-de-Marne (94)</Link>
          </nav>
        </div>

        <div>
          <h3>Contact</h3>
          <div className="refonte-footer-contact">
            <a href="tel:+33650366491"><Phone size={15} /> 06 50 36 64 91</a>
            <a href="mailto:contact@taxisparis-conventionnes.fr"><Mail size={15} /> contact@taxisparis-conventionnes.fr</a>
            <span><MapPin size={15} /> Paris & Île-de-France</span>
            <span><Clock size={15} /> 24h/24 · 7j/7</span>
          </div>
        </div>
      </div>

      <div className="refonte-footer-bottom">
        <div className="refonte-container">
          <span>© {new Date().getFullYear()} Taxis Paris Conventionnés</span>
          <div>
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/conditions-generales-de-vente">CGV</Link>
            <Link to="/conditions-generales">Conditions générales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
