import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, ChevronRight, Menu, Phone, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/reservation-taxi-vsl', label: 'Réserver' },
  { path: '/zones-desservies', label: 'Zones' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
];

export default function Header({ onNavigate: _onNavigate }: HeaderProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <header style={{ position: 'sticky', top: 0 }} className="z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-3 sm:h-[78px] sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100"
          aria-label="Taxis Paris Conventionnés - accueil"
        >
          <img
            src="/taxi-logo.svg"
            alt="Taxis Paris Conventionnés"
            width="320"
            height="208"
            className="h-12 w-[116px] object-contain sm:h-14 sm:w-[155px] lg:w-[175px]"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={'rounded-xl px-3.5 py-2.5 text-sm font-extrabold transition ' + (
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-800'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href="tel:+33650366491"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-blue-900 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
            aria-label="Appeler le 06 50 36 64 91"
          >
            <Phone size={16} className="text-blue-700" aria-hidden="true" />
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">24h/24 · 7j/7</span>
              <span className="block leading-tight">06 50 36 64 91</span>
            </span>
          </a>
          <Link
            to="/reservation-taxi-vsl"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-2xl bg-blue-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(29,78,216,0.22)] transition hover:bg-blue-800"
          >
            <Calendar size={16} aria-hidden="true" /> Réserver
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+33650366491"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700"
            aria-label="Appeler le 06 50 36 64 91"
          >
            <Phone size={18} aria-hidden="true" />
          </a>
          <Link
            to="/reservation-taxi-vsl"
            className="hidden min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-700 px-3.5 text-xs font-extrabold text-white shadow-sm sm:inline-flex"
          >
            <Calendar size={15} aria-hidden="true" /> Réserver
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-slate-100 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4" aria-label="Navigation mobile">
            <div className="grid gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={'flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-sm font-extrabold ' + (
                    isActive(item.path) ? 'bg-blue-50 text-blue-800' : 'bg-slate-50 text-slate-800'
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
              className="mt-3 flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-extrabold text-white"
            >
              <Phone size={17} aria-hidden="true" /> 06 50 36 64 91
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
