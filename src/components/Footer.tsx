import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate: _onNavigate }: FooterProps = {}) {
  return (
    <footer className="mt-0 border-t border-white/10 bg-[#051f35] text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
          <div>
            <div className="inline-flex rounded-lg bg-white p-2 shadow-sm">
              <img src="/taxi-logo.svg" alt="Taxis Paris Conventionnés" width="320" height="208" className="h-14 w-44 object-contain" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              Transport médical assis en taxi conventionné à Paris et en Île-de-France. Un accompagnement professionnel disponible 24h/24 et 7j/7.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#d7b76d]/25 bg-[#d7b76d]/10 px-3 py-2 text-xs font-bold text-[#efd18a]">
              <ShieldCheck size={15} /> CPAM · tiers payant selon prise en charge
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#efd18a]">Navigation</h3>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Navigation du pied de page">
              <Link to="/" className="text-white/65 hover:text-white">Accueil</Link>
              <Link to="/reservation-taxi-vsl" className="text-white/65 hover:text-white">Réserver</Link>
              <Link to="/zones-desservies" className="text-white/65 hover:text-white">Zones desservies</Link>
              <Link to="/qui-sommes-nous" className="text-white/65 hover:text-white">À propos</Link>
              <Link to="/faq" className="text-white/65 hover:text-white">FAQ</Link>
              <Link to="/contact" className="text-white/65 hover:text-white">Contact</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#efd18a]">Zones principales</h3>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Zones principales">
              <Link to="/taxi-conventionne-paris-75" className="text-white/65 hover:text-white">Paris (75)</Link>
              <Link to="/taxi-conventionne-essonne-91" className="text-white/65 hover:text-white">Essonne (91)</Link>
              <Link to="/taxi-conventionne-hauts-de-seine-92" className="text-white/65 hover:text-white">Hauts-de-Seine (92)</Link>
              <Link to="/taxi-conventionne-seine-saint-denis-93" className="text-white/65 hover:text-white">Seine-Saint-Denis (93)</Link>
              <Link to="/taxi-conventionne-val-de-marne-94" className="text-white/65 hover:text-white">Val-de-Marne (94)</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#efd18a]">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-white/65">
              <a href="tel:+33650366491" className="flex items-center gap-3 hover:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-[#efd18a]"><Phone size={16} /></span>
                06 50 36 64 91
              </a>
              <a href="mailto:contact@taxisparis-conventionnes.fr" className="flex items-start gap-3 hover:text-white">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#efd18a]"><Mail size={16} /></span>
                <span className="break-all pt-2">contact@taxisparis-conventionnes.fr</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-[#efd18a]"><MapPin size={16} /></span>
                Paris & Île-de-France
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-[#efd18a]"><Clock size={16} /></span>
                24h/24 · 7j/7
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Taxis Paris Conventionnés. Tous droits réservés.</p>
          <p className="font-serif text-base italic text-[#efd18a]">Transport médical, autrement.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/mentions-legales" className="hover:text-white/70">Mentions légales</Link>
            <Link to="/conditions-generales-de-vente" className="hover:text-white/70">CGV</Link>
            <Link to="/conditions-generales" className="hover:text-white/70">Conditions générales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
