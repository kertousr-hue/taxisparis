import { HeartHandshake, MapPin, ShieldCheck, Users } from 'lucide-react';

export default function HomePremiumFooter() {
  return (
    <footer className="home2-footer">
      <div className="home2-container home2-footer-strip">
        <div className="home2-footer-brand-compact">
          <img src="/taxi-logo.svg" alt="Taxis Paris Conventionnés" width="320" height="208" />
        </div>
        <div><ShieldCheck size={17} /><span>Transport médical conventionné</span></div>
        <div><Users size={17} /><span>Chauffeurs professionnels</span></div>
        <div><HeartHandshake size={17} /><span>Un accompagnement humain</span></div>
        <div><MapPin size={17} /><span>Dans toute l’Île-de-France</span></div>
      </div>
    </footer>
  );
}
