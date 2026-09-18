import { HeartHandshake, MapPin, ShieldCheck, Users } from 'lucide-react';
import PremiumBrandLogo from './PremiumBrandLogo';

export default function HomePremiumFooter() {
  return (
    <footer className="home2-footer">
      <div className="home2-container home2-footer-strip">
        <div className="home2-footer-brand-compact">
          <PremiumBrandLogo compact variant="light" className="home2-premium-logo home2-premium-logo--footer" />
        </div>
        <div><ShieldCheck size={17} /><span>Transport médical conventionné</span></div>
        <div><Users size={17} /><span>Chauffeurs professionnels</span></div>
        <div><HeartHandshake size={17} /><span>Un accompagnement humain</span></div>
        <div><MapPin size={17} /><span>Dans toute l’Île-de-France</span></div>
      </div>
    </footer>
  );
}
