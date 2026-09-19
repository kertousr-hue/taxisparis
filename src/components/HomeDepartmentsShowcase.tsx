import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Building2, MapPin, ShieldCheck, Users } from 'lucide-react';

const departments = [
  { code: '75', name: 'Paris', slug: 'taxi-conventionne-paris-75', sector: '20 arrondissements', villes: '20+', hopitaux: '35+', hex: '#2563eb', tint: '#dbeafe' },
  { code: '91', name: 'Essonne', slug: 'taxi-conventionne-essonne-91', sector: 'Secteur sud', villes: '40+', hopitaux: '25+', hex: '#16a34a', tint: '#dcfce7' },
  { code: '92', name: 'Hauts-de-Seine', slug: 'taxi-conventionne-hauts-de-seine-92', sector: 'Secteur ouest', villes: '35+', hopitaux: '20+', hex: '#d97706', tint: '#fef3c7' },
  { code: '93', name: 'Seine-Saint-Denis', slug: 'taxi-conventionne-seine-saint-denis-93', sector: 'Secteur nord-est', villes: '30+', hopitaux: '15+', hex: '#e11d48', tint: '#ffe4e6' },
  { code: '94', name: 'Val-de-Marne', slug: 'taxi-conventionne-val-de-marne-94', sector: 'Secteur sud-est', villes: '30+', hopitaux: '20+', hex: '#e11d48', tint: '#ffe4e6' },
];

const REAL_DEPARTMENT_PATHS: Record<string, string> = {
  "75": "M71.4 87.9 L41.3 79.1 L34.7 81.8 L36.1 78.8 L27.6 77.8 L26.1 71.7 L10.0 67.1 L10.2 65.4 L14.3 58.3 L22.2 54.1 L27.8 55.3 L29.5 51.8 L41.8 52.8 L45.0 48.3 L65.0 40.2 L101.8 39.5 L107.3 41.5 L110.4 49.8 L117.3 54.3 L119.6 69.6 L117.2 77.9 L122.9 77.2 L122.7 72.3 L131.4 74.3 L133.5 71.4 L145.8 73.4 L150.0 76.8 L146.0 86.8 L142.9 88.0 L131.6 87.3 L126.9 84.2 L116.6 83.4 L111.7 80.8 L89.1 88.5 L71.4 87.9 Z",
  "91": "M75.1 12.7 L76.4 14.8 L79.3 15.9 L83.9 15.7 L84.0 16.6 L85.4 16.8 L87.3 18.7 L85.3 20.3 L86.2 21.8 L90.9 20.1 L91.2 22.4 L93.4 22.2 L94.3 20.9 L93.1 20.6 L93.9 20.1 L93.4 19.6 L96.0 17.9 L98.1 19.8 L102.2 20.6 L103.5 19.0 L104.9 19.0 L105.1 24.4 L110.7 24.2 L111.7 23.1 L113.4 23.2 L114.6 24.2 L114.2 24.9 L119.6 23.3 L121.4 25.5 L121.4 24.0 L122.5 24.3 L122.6 23.4 L123.8 23.6 L125.0 22.4 L125.4 23.0 L127.7 22.8 L133.4 21.1 L135.4 22.6 L135.7 25.3 L138.3 26.9 L138.6 28.6 L139.6 28.4 L139.7 29.2 L140.8 28.6 L142.6 31.0 L147.1 30.3 L149.2 30.8 L148.8 31.4 L150.0 33.0 L146.9 33.8 L147.1 35.1 L146.4 35.5 L143.7 33.6 L142.7 34.9 L141.5 34.6 L139.4 36.5 L140.1 37.0 L139.1 37.5 L142.1 39.1 L140.9 39.8 L140.7 42.7 L137.4 42.5 L135.4 43.4 L137.7 45.0 L137.5 46.7 L140.6 47.1 L141.2 48.6 L140.6 50.7 L135.9 52.7 L136.6 55.0 L138.7 54.9 L138.5 55.5 L136.1 55.7 L136.2 57.3 L132.0 60.8 L134.4 61.3 L131.7 64.6 L131.6 66.7 L133.9 66.8 L134.0 68.6 L135.0 68.3 L135.3 69.0 L134.2 72.7 L132.5 73.5 L133.0 74.6 L132.4 74.9 L133.1 75.7 L132.6 76.1 L133.6 76.6 L132.5 77.2 L133.3 78.4 L131.7 79.2 L133.6 80.5 L132.2 82.7 L133.6 83.2 L133.2 84.9 L135.7 85.4 L141.9 90.8 L136.6 90.1 L132.7 92.6 L131.8 91.8 L128.7 91.7 L126.7 93.2 L128.9 94.6 L125.7 96.1 L122.0 96.4 L121.2 96.9 L121.8 98.0 L120.2 97.5 L117.5 99.1 L120.4 100.1 L119.7 101.3 L118.5 100.7 L117.5 102.0 L118.3 104.8 L116.8 104.2 L111.7 105.1 L109.8 104.5 L109.9 106.4 L111.8 107.7 L110.9 108.1 L111.2 108.8 L108.4 109.6 L105.0 110.2 L104.4 109.5 L102.5 110.3 L101.5 109.0 L99.2 108.5 L97.6 106.3 L96.3 106.5 L96.1 105.1 L95.9 105.8 L93.0 105.6 L89.5 110.3 L83.5 109.0 L80.7 112.0 L79.0 112.4 L79.8 108.6 L77.5 108.6 L79.2 105.5 L75.3 105.8 L74.5 104.4 L72.8 104.9 L71.0 102.6 L70.0 102.7 L70.6 103.2 L70.1 103.9 L67.0 105.3 L67.1 106.2 L65.8 107.0 L66.4 107.6 L65.5 109.6 L63.6 108.7 L63.1 109.4 L59.6 108.7 L60.3 111.1 L61.4 111.1 L62.0 112.3 L50.9 112.7 L51.5 110.5 L50.0 110.4 L45.6 113.3 L38.8 113.0 L38.7 113.9 L36.4 115.3 L35.6 114.5 L33.0 114.3 L29.3 115.2 L22.1 114.5 L22.5 113.5 L24.1 113.0 L20.6 113.0 L19.2 110.6 L22.3 108.7 L23.5 109.4 L23.8 108.1 L22.5 107.2 L24.1 106.1 L21.3 103.4 L22.7 102.7 L22.3 100.4 L25.5 98.8 L23.2 97.7 L24.1 96.4 L23.7 95.7 L20.9 95.2 L23.3 90.7 L12.9 89.9 L13.8 88.9 L12.4 88.5 L12.7 87.8 L13.6 87.8 L13.7 86.9 L15.2 87.1 L15.5 85.9 L14.6 84.9 L15.1 84.0 L14.5 83.9 L15.9 82.6 L13.8 82.4 L13.1 79.3 L10.7 78.5 L10.7 76.8 L10.0 76.7 L10.1 75.7 L12.2 74.2 L13.8 74.4 L14.1 71.2 L16.7 68.1 L16.5 66.6 L20.1 64.4 L23.3 64.9 L23.2 63.4 L21.8 62.4 L21.0 62.7 L21.4 63.6 L14.1 60.4 L14.5 57.6 L21.0 57.7 L23.4 59.1 L24.6 58.1 L27.5 58.8 L31.5 58.3 L31.1 55.9 L32.5 53.6 L35.3 51.8 L34.4 50.7 L35.0 48.3 L39.3 47.8 L39.1 47.1 L40.5 46.2 L37.4 45.0 L36.3 43.0 L35.0 42.8 L35.8 40.9 L31.2 40.9 L31.8 40.1 L29.9 39.4 L30.2 37.0 L33.7 37.5 L34.9 32.9 L36.7 32.8 L37.3 31.2 L41.4 31.4 L42.1 30.6 L44.9 31.6 L46.3 29.0 L48.2 29.8 L48.0 28.0 L50.8 25.6 L50.0 24.6 L51.3 23.8 L48.5 21.5 L49.2 20.7 L52.7 19.8 L56.0 20.8 L57.0 19.8 L56.4 19.1 L59.4 17.2 L61.4 18.2 L64.0 16.5 L67.6 17.1 L68.1 15.1 L66.6 13.5 L67.7 12.9 L69.8 12.8 L69.7 13.5 L71.6 14.2 L75.6 13.9 L75.1 12.7 Z",
  "92": "M104.2 10.0 L121.7 12.7 L125.9 15.0 L126.3 19.1 L124.4 22.0 L115.3 28.0 L118.8 32.6 L118.3 34.6 L101.6 41.4 L98.8 45.3 L88.3 44.4 L86.9 47.4 L82.1 46.3 L75.3 49.9 L71.7 57.5 L85.4 61.4 L86.7 66.6 L94.0 67.5 L92.8 70.0 L98.4 67.7 L124.4 74.7 L121.0 78.9 L117.3 79.5 L121.2 80.3 L117.7 89.4 L120.8 90.2 L121.6 93.9 L112.8 105.3 L118.7 108.5 L115.6 111.2 L116.9 112.4 L114.9 113.7 L117.7 114.3 L115.6 117.5 L112.4 118.0 L110.5 117.9 L109.8 112.4 L98.8 116.4 L96.6 112.9 L101.5 109.2 L97.0 104.7 L93.7 104.2 L93.5 102.1 L82.8 102.7 L75.9 100.0 L74.7 96.3 L71.6 94.4 L72.8 92.5 L71.2 90.4 L64.2 89.6 L65.5 87.8 L61.1 84.4 L51.5 84.9 L53.5 83.2 L51.1 83.3 L51.6 81.0 L47.6 76.2 L41.7 77.5 L36.3 75.3 L33.5 66.0 L35.9 60.2 L40.3 60.4 L35.6 55.3 L39.0 49.6 L34.7 50.2 L42.1 43.0 L44.4 37.2 L62.8 29.5 L89.5 13.7 L104.2 10.0 Z",
  "93": "M127.7 19.6 L134.7 19.0 L135.5 20.5 L132.9 21.4 L137.8 23.8 L140.3 30.2 L138.3 31.0 L139.1 33.2 L131.9 33.4 L144.1 44.7 L146.8 51.2 L150.0 51.7 L149.7 55.4 L143.6 59.1 L143.6 64.2 L145.2 65.0 L141.6 66.9 L143.7 69.0 L142.8 71.1 L130.5 74.4 L135.9 77.4 L134.2 83.6 L136.3 82.7 L143.2 84.6 L140.5 86.9 L141.1 88.2 L137.0 89.1 L142.6 97.8 L142.9 101.5 L144.9 100.6 L146.2 103.4 L147.0 108.0 L145.2 109.6 L135.3 106.2 L136.2 102.3 L125.2 96.8 L121.1 96.5 L122.0 95.4 L119.4 92.7 L116.9 93.4 L115.2 91.0 L110.2 90.6 L106.5 87.4 L102.6 87.9 L102.4 85.9 L90.0 85.9 L89.6 87.7 L80.6 90.1 L75.3 89.2 L72.6 91.2 L66.9 91.0 L65.2 79.1 L59.8 75.6 L58.6 70.8 L55.4 68.0 L24.1 68.2 L24.5 66.3 L21.3 62.2 L29.6 56.7 L31.4 54.0 L31.0 50.3 L27.2 48.2 L11.2 45.8 L10.0 42.5 L14.8 38.9 L29.9 43.7 L34.8 38.1 L39.2 39.2 L41.3 36.1 L44.6 35.5 L52.8 36.8 L63.0 43.5 L67.5 42.0 L86.1 43.9 L89.6 39.8 L95.6 37.4 L98.3 38.5 L100.9 35.3 L102.4 36.1 L105.8 33.1 L110.7 31.8 L109.8 30.2 L112.5 29.4 L118.5 21.6 L126.0 22.6 L127.7 19.6 Z",
  "94": "M20.6 44.8 L34.7 45.2 L52.8 39.1 L56.7 41.2 L65.0 41.8 L68.7 44.2 L78.6 44.7 L83.5 35.8 L81.4 33.8 L72.9 31.7 L69.0 32.2 L68.6 33.9 L61.6 32.3 L61.8 36.2 L57.8 37.1 L59.1 30.1 L65.0 30.3 L67.7 28.2 L73.1 29.2 L82.4 26.7 L82.8 24.8 L95.5 24.8 L95.7 26.9 L99.8 26.4 L103.5 29.6 L108.6 30.1 L110.4 32.6 L113.0 31.9 L115.6 34.6 L114.7 35.7 L118.9 36.1 L130.2 41.7 L129.2 45.7 L141.3 49.7 L139.3 52.7 L142.8 54.8 L140.6 59.4 L136.3 62.3 L136.9 64.6 L139.6 65.7 L146.1 64.2 L150.0 69.7 L141.8 70.5 L144.0 73.6 L136.2 79.1 L140.8 81.5 L140.5 83.6 L133.4 87.8 L131.6 92.3 L128.4 94.1 L129.2 96.6 L134.6 99.3 L121.9 103.5 L116.3 98.1 L113.8 99.5 L113.7 97.8 L111.5 98.3 L110.7 94.5 L105.2 90.9 L104.5 85.0 L100.1 81.9 L87.6 85.5 L82.6 86.0 L81.7 84.7 L79.0 87.3 L76.4 86.9 L76.4 88.8 L73.7 88.2 L73.9 91.4 L70.0 86.6 L58.2 90.0 L58.9 88.6 L56.3 86.4 L52.7 86.0 L50.5 88.5 L38.3 88.9 L37.7 77.1 L34.7 77.1 L31.8 80.7 L25.1 79.7 L18.3 74.8 L16.4 76.2 L10.0 72.9 L18.2 62.2 L17.5 58.8 L14.6 58.0 L17.9 49.5 L14.2 48.7 L17.7 48.2 L20.6 44.8 Z"
};



function DepartmentMap({ code, name, hex, tint }: { code: string; name: string; hex: string; tint: string }) {
  return (
    <div className="exact-zones-map-panel">
      <svg viewBox="0 0 160 128" className="exact-zones-map-svg" role="img" aria-label={`Carte réelle du département ${name} (${code})`}>
        <defs>
          <filter id={`home-shadow-${code}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodOpacity="0.13" />
          </filter>
        </defs>
        <path
          d={REAL_DEPARTMENT_PATHS[code]}
          fill={tint}
          stroke={hex}
          strokeWidth="2.35"
          strokeLinejoin="round"
          fillRule="evenodd"
          filter={`url(#home-shadow-${code})`}
        />
        <circle cx="80" cy="64" r="18" fill="#fff" opacity="0.96" />
        <text x="80" y="69" textAnchor="middle" fill={hex} fontSize="16" fontWeight="800">{code}</text>
      </svg>
    </div>
  );
}

export default function HomeDepartmentsShowcase() {
  return (
    <section className="exact-zones-departments exact-zones-departments-showcase exact-home-departments-showcase" aria-label="Nos départements d’intervention">
      <div className="exact-zones-departments-watermark" aria-hidden="true">
        <svg viewBox="0 0 220 160">
          <path d="M52 24 96 12 130 28 169 21 194 53 184 91 154 119 111 142 72 131 37 145 18 111 26 69Z" />
          <path d="M87 53 125 48 149 68 143 100 114 111 86 93 77 70Z" />
        </svg>
        <span>Au plus près<br />de votre santé</span>
      </div>

      <div className="exact-home-container">
        <div className="exact-zones-departments-head exact-zones-departments-head-showcase">
          <div>
            <span className="exact-zones-departments-kicker">Notre territoire</span>
            <h2>Nos 5 départements d'intervention</h2>
            <p>Couverture CPAM en Île-de-France : réservation rapide, trajets réguliers et accès aux hôpitaux partenaires.</p>
          </div>
          <div className="exact-zones-departments-summary exact-zones-departments-summary-showcase">
            <span className="exact-zones-summary-icon"><MapPin size={22} /></span>
            <div>
              <strong>5 départements desservis</strong>
              <small>en Île-de-France</small>
            </div>
          </div>
        </div>

        <div className="exact-zones-department-grid exact-zones-department-grid-showcase">
          {departments.map((dept) => (
            <article
              key={dept.code}
              className="exact-zones-card-premium exact-zones-card-showcase group"
              style={{ '--dept-accent': dept.hex, '--dept-tint': dept.tint } as CSSProperties}
            >
              <div className="exact-zones-card-top exact-zones-card-top-showcase">
                <div className="exact-zones-card-title">
                  <span className="exact-zones-card-code exact-zones-card-code-showcase">{dept.code}</span>
                  <div><h3>{dept.name}</h3><p>{dept.sector}</p></div>
                </div>
              </div>

              <DepartmentMap {...dept} />

              <div className="exact-zones-card-list">
                <div><Building2 size={17} /><span><strong>{dept.villes}</strong> villes desservies</span></div>
                <div><Users size={17} /><span><strong>{dept.hopitaux}</strong> hôpitaux partenaires</span></div>
              </div>

              <div className="exact-zones-card-cpam exact-zones-card-cpam-showcase">
                <BadgeCheck size={17} /><span>Conventionné CPAM</span>
              </div>

              <Link to={`/${dept.slug}`} className="exact-zones-card-cta exact-zones-card-cta-showcase">
                <span>{dept.code === '75' ? 'Voir Paris' : 'Voir les villes'}</span>
                <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>

        <div className="exact-zones-reassurance-strip">
          <div>
            <span className="exact-zones-reassurance-icon"><Building2 size={22} /></span>
            <div>
              <strong>Des trajets sécurisés vers tous les établissements de santé partenaires</strong>
              <small>Hôpitaux, cliniques, centres de rééducation… dans toute l'Île-de-France.</small>
            </div>
          </div>
          <span className="exact-zones-reassurance-divider" aria-hidden="true" />
          <div>
            <span className="exact-zones-reassurance-icon"><ShieldCheck size={22} /></span>
            <div>
              <strong>Service conventionné CPAM</strong>
              <small>Une prise en charge facilitée pour vos déplacements médicaux.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
