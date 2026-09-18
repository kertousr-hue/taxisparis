import { Link } from 'react-router-dom';
import { HeartHandshake, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function HomePremiumFooter() {
  return (
    <footer className="home2-footer">
      <div className="home2-container home2-footer-main">
        <div className="home2-footer-brand">
          <img src="/taxi-logo.svg" alt="Taxis Paris Conventionnés" width="320" height="208" />
          <p>Le transport médical en toute confiance, partout en Île-de-France.</p>
        </div>

        <div className="home2-footer-values">
          <span><ShieldCheck size={18} /> Transport médical conventionné</span>
          <span><HeartHandshake size={18} /> Un accompagnement humain</span>
          <span><MapPin size={18} /> Dans toute l’Île-de-France</span>
        </div>

        <div className="home2-footer-actions">
          <a href="tel:+33650366491"><Phone size={17} /> 06 50 36 64 91</a>
          <Link to="/reservation-taxi-vsl">Réserver un trajet</Link>
        </div>
      </div>

      <div className="home2-footer-bottom">
        <div className="home2-container">
          <span>© {new Date().getFullYear()} Taxis Paris Conventionnés</span>
          <div>
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/conditions-generales-de-vente">CGV</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
