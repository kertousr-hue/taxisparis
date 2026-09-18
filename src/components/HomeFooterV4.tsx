import { Link } from 'react-router-dom';
import { MapPin, Phone, ShieldCheck } from 'lucide-react';
import PremiumLogoV4 from './PremiumLogoV4';

export default function HomeFooterV4(){
  return <footer className="v4-footer">
    <div className="v4-wrap v4-footer-grid">
      <div><PremiumLogoV4 inverse className="v4-footer-logo"/><p>Transport médical conventionné à Paris et en Île-de-France.</p></div>
      <div><strong>Navigation</strong><Link to="/">Accueil</Link><Link to="/reservation-taxi-vsl">Réserver</Link><Link to="/zones-desservies">Zones</Link><Link to="/faq">FAQ</Link></div>
      <div><strong>Confiance</strong><span><ShieldCheck size={15}/> Conventionné CPAM</span><span><MapPin size={15}/> Île-de-France</span><a href="tel:+33650366491"><Phone size={15}/>06 50 36 64 91</a></div>
    </div>
    <div className="v4-footer-bottom"><div className="v4-wrap">© {new Date().getFullYear()} Taxis Paris Conventionnés</div></div>
  </footer>
}
