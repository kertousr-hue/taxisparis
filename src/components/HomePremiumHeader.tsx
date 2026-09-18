import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, Heart, Menu, Phone, ShieldCheck, Users, X } from 'lucide-react';
import PremiumBrandLogo from './PremiumBrandLogo';

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/#services', label: 'Nos services' },
  { path: '/zones-desservies', label: 'Zones' },
  { path: '/qui-sommes-nous', label: 'À propos' },
  { path: '/faq', label: 'FAQ' },
];

export default function HomePremiumHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="home2-header">
      <div className="home2-brandbar">
        <div className="home2-container home2-brandbar-inner">
          <Link to="/" className="home2-brandbar-logo" aria-label="Taxis Paris Conventionnés - accueil">
            <PremiumBrandLogo className="home2-premium-logo" />
          </Link>

          <div className="home2-brandbar-message">
            <strong>Plus qu’un transport,</strong>
            <span>une présence à vos côtés</span>
            <small>PARIS · ÎLE-DE-FRANCE · TOUJOURS À VOS CÔTÉS</small>
          </div>

          <div className="home2-brandbar-values">
            <div><ShieldCheck size={22} /><span><strong>Conventionné</strong><small>CPAM</small></span></div>
            <div><Heart size={22} /><span><strong>Accompagnement</strong><small>humain</small></span></div>
            <div><Users size={22} /><span><strong>Proximité</strong><small>Île-de-France</small></span></div>
          </div>
        </div>
      </div>

      <div className="home2-nav">
        <div className="home2-container home2-nav-inner">
          <Link to="/" className="home2-nav-logo" aria-label="Taxis Paris Conventionnés">
            <PremiumBrandLogo compact variant="light" className="home2-premium-logo home2-premium-logo--compact" />
          </Link>

          <nav className="home2-desktop-nav" aria-label="Navigation principale">
            {navItems.map((item) => (
              item.path.startsWith('/#')
                ? <a key={item.path} href={item.path.slice(1)}>{item.label}</a>
                : <Link key={item.path} to={item.path}>{item.label}</Link>
            ))}
          </nav>

          <div className="home2-nav-actions">
            <a href="tel:+33650366491" className="home2-phone">
              <Phone size={15} />
              <span>06 50 36 64 91</span>
            </a>
            <Link to="/reservation-taxi-vsl" className="home2-gold-btn">
              <CalendarDays size={15} />
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
              item.path.startsWith('/#')
                ? <a key={item.path} href={item.path.slice(1)} onClick={() => setOpen(false)}>{item.label}<ChevronRight size={16} /></a>
                : <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>{item.label}<ChevronRight size={16} /></Link>
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
