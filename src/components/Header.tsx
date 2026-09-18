import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, ChevronRight, Heart, Menu, Phone, Shield, Users, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/services-transport-medical', label: 'Nos services' },
  { path: '/zones-desservies', label: 'Zones' },
  { path: '/qui-sommes-nous', label: 'À propos' },
  { path: '/faq', label: 'FAQ' },
];

export default function Header({ onNavigate: _onNavigate }: HeaderProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <header className="maquette-header sticky top-0 z-50">
      <div className="maquette-trust-strip">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6 lg:px-8">
          <p className="hidden text-sm font-semibold italic tracking-wide text-slate-700 md:block">
            Le transport médical en toute confiance
          </p>
          <div className="ml-auto flex items-center gap-4 text-[11px] font-bold text-slate-600 sm:gap-6">
            <span className="hidden items-center gap-1.5 sm:inline-flex"><Shield size={14} /> Conventionné CPAM</span>
            <span className="hidden items-center gap-1.5 md:inline-flex"><Heart size={14} /> Accompagnement humain</span>
            <span className="inline-flex items-center gap-1.5"><Users size={14} /> Paris · Île-de-France</span>
          </div>
        </div>
      </div>

      <div className="maquette-nav">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center gap-3 px-3 sm:h-[76px] sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex shrink-0 items-center rounded-lg focus:outline-none focus:ring-4 focus:ring-white/20"
            aria-label="Taxis Paris Conventionnés - accueil"
          >
            <img
              src="/taxi-logo.svg"
              alt="Taxis Paris Conventionnés"
              width="320"
              height="208"
              className="h-12 w-[128px] rounded-md bg-white object-contain p-1 sm:h-14 sm:w-[160px]"
              loading="eager"
              decoding="async"
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={"maquette-nav-link " + (isActive(item.path) ? 'is-active' : '')}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 xl:flex">
            <a
              href="tel:+33650366491"
              className="maquette-phone-button"
              aria-label="Appeler le 06 50 36 64 91"
            >
              <Phone size={16} aria-hidden="true" />
              06 50 36 64 91
            </a>
            <Link to="/reservation-taxi-vsl" className="maquette-gold-button">
              <Calendar size={16} aria-hidden="true" />
              Réserver
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <a
              href="tel:+33650366491"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white"
              aria-label="Appeler le 06 50 36 64 91"
            >
              <Phone size={18} aria-hidden="true" />
            </a>
            <Link
              to="/reservation-taxi-vsl"
              className="hidden min-h-[44px] items-center gap-1.5 rounded-lg bg-[#b68a3a] px-3.5 text-xs font-extrabold text-white shadow-sm sm:inline-flex"
            >
              <Calendar size={15} aria-hidden="true" />
              Réserver
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#062b4c] lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4" aria-label="Navigation mobile">
            <div className="grid gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={"flex min-h-[48px] items-center justify-between rounded-lg px-4 py-3 text-sm font-extrabold " + (
                    isActive(item.path) ? 'bg-white text-[#0a3356]' : 'bg-white/10 text-white'
                  )}
                >
                  {item.label}
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <a
              href="tel:+33650366491"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-[50px] items-center justify-center gap-2 rounded-lg bg-[#b68a3a] px-4 py-3 font-extrabold text-white"
            >
              <Phone size={17} aria-hidden="true" />
              06 50 36 64 91
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
