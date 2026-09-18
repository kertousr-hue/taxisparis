import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, Heart, Menu, Phone, ShieldCheck, Users, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/reservation-taxi-vsl', label: 'Réserver' },
  { path: '/zones-desservies', label: 'Zones' },
  { path: '/qui-sommes-nous', label: 'À propos' },
  { path: '/faq', label: 'FAQ' },
];

export default function HomePremiumHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="home2-header">
      <div className="home2-topline">
        <div className="home2-container home2-topline-inner">
          <p>Plus qu’un transport, <strong>une présence à vos côtés</strong></p>
          <div className="home2-topline-trust">
            <span><ShieldCheck size={15} /> Conventionné CPAM</span>
            <span><Heart size={15} /> Accompagnement humain</span>
            <span><Users size={15} /> Proximité en Île-de-France</span>
          </div>
        </div>
      </div>

      <div className="home2-nav">
        <div className="home2-container home2-nav-inner">
          <Link to="/" className="home2-logo" aria-label="Taxis Paris Conventionnés - accueil">
            <img src="/taxi-logo.svg" alt="Taxis Paris Conventionnés" width="320" height="208" />
          </Link>

          <nav className="home2-desktop-nav" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>{item.label}</Link>
            ))}
          </nav>

          <div className="home2-nav-actions">
            <a href="tel:+33650366491" className="home2-phone">
              <Phone size={16} />
              <span>06 50 36 64 91</span>
            </a>
            <Link to="/reservation-taxi-vsl" className="home2-gold-btn">
              <CalendarDays size={16} />
              Réserver
            </Link>
          </div>

          <button
            type="button"
            className="home2-mobile-menu"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="home2-mobile-panel">
          <nav className="home2-container" aria-label="Navigation mobile">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
                {item.label}<ChevronRight size={16} />
              </Link>
            ))}
            <a href="tel:+33650366491" onClick={() => setOpen(false)}>
              <Phone size={16} /> 06 50 36 64 91
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
