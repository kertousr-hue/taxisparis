import { CalendarDays, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileQuickActions() {
  const { pathname } = useLocation();
  return (
    <nav className="mobile-quick-actions" aria-label="Actions rapides">
      <a className="mobile-quick-actions__call" href="tel:+33650366491">
        <Phone size={20} aria-hidden="true" /> Appeler
      </a>
      {pathname === '/reservation-taxi-vsl' ? (
        <a className="mobile-quick-actions__reserve" href="#reservation-form">
          <CalendarDays size={20} aria-hidden="true" /> Réserver
        </a>
      ) : (
        <Link className="mobile-quick-actions__reserve" to="/reservation-taxi-vsl">
          <CalendarDays size={20} aria-hidden="true" /> Réserver
        </Link>
      )}
    </nav>
  );
}
