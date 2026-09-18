import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate: _onNavigate }: FooterProps = {}) {
  return (
    <footer className="mt-0 border-t border-slate-800 bg-[#07111f] text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
          <div>
            <img src="/taxi-logo.svg" alt="Taxis Paris Conventionnés" width="320" height="208" className="h-16 w-44 rounded-xl bg-white object-contain p-1" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Transport médical assis en taxi conventionné à Paris et en Île-de-France. Un service disponible 24h/24 et 7j/7.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-xs font-bold text-cyan-200 ring-1 ring-white/10">
              <Shield size={15} aria-hidden="true" /> CPAM · tiers payant selon prise en charge
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Navigation</h3>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Navigation du pied de page">
              <Link to="/" className="text-slate-300 hover:text-white">Accueil</Link>
              <Link to="/reservation-taxi-vsl" className="text-slate-300 hover:text-white">Réserver</Link>
              <Link to="/zones-desservies" className="text-slate-300 hover:text-white">Zones desservies</Link>
              <Link to="/faq" className="text-slate-300 hover:text-white">FAQ</Link>
              <Link to="/contact" className="text-slate-300 hover:text-white">Contact</Link>
              <Link to="/blog" className="text-slate-300 hover:text-white">Blog</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Zones principales</h3>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Zones principales">
              <Link to="/taxi-conventionne-paris-75" className="text-slate-300 hover:text-white">Paris (75)</Link>
              <Link to="/taxi-conventionne-essonne-91" className="text-slate-300 hover:text-white">Essonne (91)</Link>
              <Link to="/taxi-conventionne-hauts-de-seine-92" className="text-slate-300 hover:text-white">Hauts-de-Seine (92)</Link>
              <Link to="/taxi-conventionne-seine-saint-denis-93" className="text-slate-300 hover:text-white">Seine-Saint-Denis (93)</Link>
              <Link to="/taxi-conventionne-val-de-marne-94" className="text-slate-300 hover:text-white">Val-de-Marne (94)</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <a href="tel:+33650366491" className="flex items-center gap-3 hover:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]"><Phone size={16} /></span>
                06 50 36 64 91
              </a>
              <a href="mailto:contact@taxisparis-conventionnes.fr" className="flex items-start gap-3 hover:text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]"><Mail size={16} /></span>
                <span className="break-all pt-2">contact@taxisparis-conventionnes.fr</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]"><MapPin size={16} /></span>
                Paris & Île-de-France
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]"><Clock size={16} /></span>
                24h/24 · 7j/7
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Taxis Paris Conventionnés. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/mentions-legales" className="hover:text-slate-300">Mentions légales</Link>
            <Link to="/conditions-generales-de-vente" className="hover:text-slate-300">CGV</Link>
            <Link to="/conditions-generales" className="hover:text-slate-300">Conditions générales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
