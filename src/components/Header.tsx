import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const menuItems = [
  { id: '/', label: 'Accueil' },
  { id: '/#services', label: 'Nos services', anchor: true },
  { id: '/zones-desservies', label: 'Zones' },
  { id: '/qui-sommes-nous', label: 'À propos' },
  { id: '/contact', label: 'Contact' },
];

function Brand() {
  return (
    <div className="taxinea-brand" aria-label="TAXINÉA - Taxis conventionnés Île-de-France">
      <span className="taxinea-brand-mark" aria-hidden="true">
        <Car size={28} strokeWidth={2.2} />
      </span>
      <span className="taxinea-brand-copy">
        <strong>TAXINÉA</strong>
        <small>TAXIS CONVENTIONNÉS IDF</small>
      </span>
    </div>
  );
}

export default function Header({ onNavigate: _onNavigate }: HeaderProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (id: string) => {
    if (id.includes('#')) return false;
    return location.pathname === id;
  };

  return (
    <header className="taxinea-header sticky top-0 z-50 bg-white" role="banner">
      <div className="taxinea-topbar">
        <div className="container mx-auto px-4 flex items-center justify-end gap-5 h-9 text-sm">
          <a href="tel:+33650366491" className="inline-flex items-center gap-1.5 font-semibold" aria-label="Appeler le 06 50 36 64 91">
            <Phone size={13} aria-hidden="true" />
            06 50 36 64 91
          </a>
          <a href="mailto:contact@taxisparis-conventionnes.fr" className="hidden sm:inline-flex items-center gap-1.5 font-medium" aria-label="Envoyer un e-mail">
            <Mail size={13} aria-hidden="true" />
            contact@taxisparis-conventionnes.fr
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="taxinea-header-row flex items-center justify-between gap-4">
          <Link to="/" className="taxinea-logo-link" aria-label="TAXINÉA - retour à l'accueil" onClick={() => setIsMenuOpen(false)}>
            <Brand />
          </Link>

          <nav className="taxinea-desktop-nav hidden lg:flex items-center gap-7" aria-label="Navigation principale">
            {menuItems.map((item) =>
              item.anchor ? (
                <a key={item.id} href={item.id} className="taxinea-nav-link">
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.id}
                  to={item.id}
                  className={`taxinea-nav-link ${isActive(item.id) ? 'is-active' : ''}`}
                  aria-current={isActive(item.id) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center">
            <a href="tel:+33650366491" className="taxinea-header-call" aria-label="Appeler le 06 50 36 64 91">
              <Phone size={17} aria-hidden="true" />
              06 50 36 64 91
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <a href="tel:+33650366491" className="taxinea-mobile-call" aria-label="Appeler TAXINÉA">
              <Phone size={17} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="taxinea-menu-button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="taxinea-mobile-menu"
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="taxinea-mobile-menu" className="taxinea-mobile-menu lg:hidden">
          <nav className="container mx-auto px-4 py-4" aria-label="Navigation mobile">
            <div className="grid gap-2">
              {menuItems.map((item) =>
                item.anchor ? (
                  <a key={item.id} href={item.id} className="taxinea-mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    to={item.id}
                    className={`taxinea-mobile-nav-link ${isActive(item.id) ? 'is-active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              <Link to="/reservation-taxi-vsl" className="taxinea-mobile-reserve" onClick={() => setIsMenuOpen(false)}>
                Réserver un transport
              </Link>
              <a href="tel:+33650366491" className="taxinea-mobile-phone" onClick={() => setIsMenuOpen(false)}>
                <Phone size={16} aria-hidden="true" /> 06 50 36 64 91
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
