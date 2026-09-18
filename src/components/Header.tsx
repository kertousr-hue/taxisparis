import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, ChevronRight, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import BrandMark from './BrandMark';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/reservation-taxi-vsl', label: 'Réserver' },
  { path: '/zones-desservies', label: 'Zones' },
  { path: '/qui-sommes-nous', label: 'À propos' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
];

export default function Header({ onNavigate: _onNavigate }: HeaderProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <header className="refonte-header">
      <div className="refonte-header-top">
        <div className="refonte-container refonte-header-top-inner">
          <span><ShieldCheck size={14} /> Taxi conventionné CPAM · Paris & Île-de-France</span>
          <span>Disponible 24h/24 · 7j/7</span>
        </div>
      </div>

      <div className="refonte-header-main">
        <div className="refonte-container refonte-header-main-inner">
          <Link to="/" className="refonte-brand" aria-label="Taxis Paris Conventionnés - accueil">
            <BrandMark className="refonte-brandmark" />
          </Link>

          <nav className="refonte-nav" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={isActive(item.path) ? 'is-active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="refonte-header-actions">
            <a href="tel:+33650366491" className="refonte-phone">
              <Phone size={15} />
              <span>06 50 36 64 91</span>
            </a>
            <Link to="/reservation-taxi-vsl" className="refonte-book">
              <Calendar size={15} />
              Réserver
            </Link>
          </div>

          <button
            type="button"
            className="refonte-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="refonte-mobile-menu">
          <nav className="refonte-container" aria-label="Navigation mobile">
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
