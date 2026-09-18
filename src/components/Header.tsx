import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, ChevronRight, Menu, Phone, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/#services', label: 'Nos services' },
  { path: '/zones-desservies', label: 'Zones' },
  { path: '/qui-sommes-nous', label: 'À propos' },
  { path: '/faq', label: 'FAQ' },
];

export default function Header({ onNavigate: _onNavigate }: HeaderProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path.includes('#')) return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#062b49] text-white shadow-[0_8px_30px_rgba(0,0,0,0.16)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-3 sm:h-[76px] sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center rounded-lg focus:outline-none focus:ring-4 focus:ring-[#d7b76d]/30"
          aria-label="Taxis Paris Conventionnés - accueil"
        >
          <img
            src="/taxi-logo.svg"
            alt="Taxis Paris Conventionnés"
            width="320"
            height="208"
            className="h-12 w-[132px] rounded-md bg-white object-contain px-2 py-1 sm:h-13 sm:w-[160px] lg:w-[176px]"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={
                'rounded-lg px-3.5 py-2.5 text-[13px] font-bold transition ' +
                (isActive(item.path)
                  ? 'bg-white/10 text-[#efd18a]'
                  : 'text-white/80 hover:bg-white/[0.07] hover:text-white')
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href="tel:+33650366491"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-white/[0.08]"
            aria-label="Appeler le 06 50 36 64 91"
          >
            <Phone size={16} className="text-[#efd18a]" />
            <span>
              <span className="block text-[9px] font-bold uppercase tracking-wide text-white/45">24h/24 · 7j/7</span>
              <span className="block leading-tight">06 50 36 64 91</span>
            </span>
          </a>
          <Link
            to="/reservation-taxi-vsl"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#c9a352] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition hover:bg-[#b9903e]"
          >
            <Calendar size={16} /> Réserver
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+33650366491"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-[#efd18a]"
            aria-label="Appeler le 06 50 36 64 91"
          >
            <Phone size={18} />
          </a>
          <Link
            to="/reservation-taxi-vsl"
            className="hidden min-h-[44px] items-center gap-1.5 rounded-lg bg-[#c9a352] px-3.5 text-xs font-extrabold text-white sm:inline-flex"
          >
            <Calendar size={15} /> Réserver
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#082f4f] lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4" aria-label="Navigation mobile">
            <div className="grid gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={
                    'flex min-h-[48px] items-center justify-between rounded-lg px-4 py-3 text-sm font-extrabold ' +
                    (isActive(item.path) ? 'bg-[#c9a352] text-white' : 'bg-white/[0.06] text-white')
                  }
                >
                  {item.label}
                  <ChevronRight size={16} />
                </Link>
              ))}
            </div>
            <a
              href="tel:+33650366491"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-[50px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 font-extrabold text-white"
            >
              <Phone size={17} /> 06 50 36 64 91
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
