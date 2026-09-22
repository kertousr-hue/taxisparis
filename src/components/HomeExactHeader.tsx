import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Clock, Menu, MapPin, Phone, ShieldCheck, Users, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/#services', label: 'Nos services' },
  { path: '/zones-desservies', label: 'Zones desservies' },
  { path: '/qui-sommes-nous', label: 'À propos' },
  { path: '/blog', label: 'Blog' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
];

export default function HomeExactHeader() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="exact-home-header">
      <div className="exact-home-topbar">
        <div className="exact-home-container exact-home-topbar-inner">
          <span><ShieldCheck size={13} /> Transport médical conventionné en Île-de-France</span>
          <span><Clock size={13} /> Disponible 24h/24 · 7j/7</span>
          <span><Users size={13} /> Une équipe à votre écoute</span>
          <span><MapPin size={13} /> Dans toute l’Île-de-France</span>
        </div>
      </div>

      <div className="exact-home-nav">
        <div className="exact-home-container exact-home-nav-inner">
          <Link to="/" className="exact-home-logo" aria-label="Taxis conventionnés — Paris et Île-de-France — accueil">
            <BrandLogo className="exact-home-brand-image" />
          </Link>

          <nav className="exact-home-desktop-nav" aria-label="Navigation principale">
            {navItems.map((item) => (
              item.path.startsWith('/#')
                ? <a key={item.path} href={item.path}>{item.label}</a>
                : <Link key={item.path} to={item.path}>{item.label}</Link>
            ))}
          </nav>

          <div className="exact-home-nav-actions">
            <a href="tel:+33650366491" className="exact-home-call"><Phone size={15} /> 06 50 36 64 91</a>
            <Link to="/reservation-taxi-vsl" className="exact-home-reserve"><CalendarDays size={15} /> Réserver en ligne</Link>
          </div>

          <button
            ref={menuButton}
            type="button"
            className="exact-home-menu"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-site-menu"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="exact-home-mobile-panel" id="mobile-site-menu">
          <div className="exact-home-container mobile-menu-actions">
            <a href="tel:+33650366491" onClick={() => setOpen(false)}><Phone size={18} aria-hidden="true" /> Appeler</a>
            <Link to="/reservation-taxi-vsl" className="mobile-menu-reserve" onClick={() => setOpen(false)}><CalendarDays size={18} aria-hidden="true" /> Réserver</Link>
          </div>
          <nav className="exact-home-container" aria-label="Navigation mobile">
            {navItems.map((item) => (
              item.path.startsWith('/#')
                ? <a key={item.path} href={item.path} onClick={() => setOpen(false)}>{item.label}</a>
                : <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
