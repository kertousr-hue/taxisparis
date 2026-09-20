import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
// Contours simplifiés à 1 km, Etalab 2026. Projection locale équirectangulaire.
// Source : https://etalab-datasets.geo.data.gouv.fr/contours-administratifs/2026/geojson/departements-1000m.geojson
import boundaries from '../data/coverageMap.json';

const departments = [
  { code: '75', name: 'Paris', slug: 'taxi-conventionne-paris-75', places: 'Les 20 arrondissements', x: 345, y: 157, lines: ['Paris'], inside: true },
  { code: '91', name: 'Essonne', slug: 'taxi-conventionne-essonne-91', places: 'Massy, Évry-Courcouronnes, Étampes…', x: 312, y: 304, lines: ['Essonne'], inside: true },
  { code: '92', name: 'Hauts-de-Seine', slug: 'taxi-conventionne-hauts-de-seine-92', places: 'Nanterre, Boulogne-Billancourt, Antony…', x: 122, y: 169, lines: ['Hauts-de-Seine'], leader: 'M263 175H281L296 168' },
  { code: '93', name: 'Seine-Saint-Denis', slug: 'taxi-conventionne-seine-saint-denis-93', places: 'Saint-Denis, Bobigny, Montreuil…', x: 463, y: 118, lines: ['Seine-Saint-Denis'], leader: 'M409 132H432L451 122' },
  { code: '94', name: 'Val-de-Marne', slug: 'taxi-conventionne-val-de-marne-94', places: 'Créteil, Villejuif, Champigny-sur-Marne…', x: 472, y: 224, lines: ['Val-de-Marne'], leader: 'M407 205H437L459 221' },
];

const servedCodes = new Set(departments.map(({ code }) => code));
// Paris is drawn last so the neighbouring borders do not cover its label.
const mapDepartments = [...departments.slice(1), departments[0]];

export default function HomeCoverage() {
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [focusedCode, setFocusedCode] = useState<string | null>(null);
  const activeCode = hoveredCode ?? focusedCode;

  const interactions = (code: string) => ({
    onMouseEnter: () => setHoveredCode(code),
    onMouseLeave: () => setHoveredCode(null),
    onFocus: () => setFocusedCode(code),
    onBlur: () => setFocusedCode(null),
  });

  return (
    <section className="home-coverage" aria-labelledby="home-coverage-heading">
      <div className="exact-home-container home-coverage__layout">
        <div className="home-coverage__intro">
          <p className="home-coverage__eyebrow">PROCHES DE VOUS, EN ÎLE-DE-FRANCE</p>
          <h2 id="home-coverage-heading">Notre zone de<br />couverture</h2>
          <p className="home-coverage__description">
            Retrouvez nos villes de prise en charge dans Paris et quatre départements franciliens,
            pour vos déplacements vers les hôpitaux et centres de soins.
          </p>
        </div>

        <figure className="home-coverage__map">
          <div className="home-coverage__map-heading">
            <span><MapPin size={16} strokeWidth={1.7} /> Nos zones de prise en charge</span>
            <span className="home-coverage__count"><strong>5</strong> départements</span>
          </div>
          <svg className="home-coverage__geography" viewBox="0 0 640 470" role="group" aria-labelledby="coverage-map-title coverage-map-description">
            <title id="coverage-map-title">Nos cinq départements desservis en Île-de-France</title>
            <desc id="coverage-map-description">
              Paris, Essonne, Hauts-de-Seine, Seine-Saint-Denis et Val-de-Marne.
              Chaque zone colorée mène à la page du département. Les départements voisins sont représentés en gris pour vous repérer.
            </desc>
            <defs>
              <pattern id="coverage-map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.75" fill="#d8e1e5" />
              </pattern>
              <linearGradient id="coverage-map-land" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e2edf1" />
                <stop offset="100%" stopColor="#ccdde6" />
              </linearGradient>
            </defs>
            <rect width="640" height="470" fill="#f8faf9" />
            <rect width="640" height="470" fill="url(#coverage-map-grid)" />

            <g className="home-coverage__context" aria-hidden="true">
              {boundaries.filter(({ code }) => !servedCodes.has(code)).map(({ code, path }) => (
                <path key={code} d={path} />
              ))}
              <text x="201" y="67">95 · Val-d’Oise</text>
              <text x="111" y="275">78 · Yvelines</text>
              <text x="462" y="361">77 · Seine-et-Marne</text>
            </g>

            {mapDepartments.map((department) => (
              <a
                key={department.code}
                href={`/${department.slug}`}
                className={`home-coverage__region${department.code === '75' ? ' home-coverage__region--paris' : ''}`}
                data-active={activeCode === department.code}
                aria-label={`${department.name} (${department.code}) — voir les villes desservies`}
                {...interactions(department.code)}
              >
                <title>{department.name} ({department.code}) — voir les villes desservies</title>
                <path className="home-coverage__boundary" d={boundaries.find(({ code }) => code === department.code)?.path} />
                {department.leader && <path className="home-coverage__leader" d={department.leader} />}
                <g className={`home-coverage__label${department.inside ? ' home-coverage__label--inside' : ''}`} transform={`translate(${department.x} ${department.y})`}>
                  <rect x={department.inside ? -17 : 0} y="-22" width="34" height="27" rx="8" />
                  <text className="home-coverage__number" x={department.inside ? 0 : 17} y="-4" textAnchor="middle">{department.code}</text>
                  {department.lines.map((line, index) => (
                    <text key={line} className="home-coverage__name" x="0" y={23 + index * 17} textAnchor={department.inside ? 'middle' : 'start'}>{line}</text>
                  ))}
                </g>
              </a>
            ))}

            <g className="home-coverage__north" transform="translate(595 38)" aria-hidden="true">
              <text y="-14" textAnchor="middle">N</text>
              <path d="M0 -6L5 8L0 5L-5 8Z" />
            </g>
          </svg>
          <figcaption className="home-coverage__caption">
            <span><i aria-hidden="true" /> Départements desservis</span>
            <a href="https://etalab-datasets.geo.data.gouv.fr/contours-administratifs/2026/geojson/">Contours : Etalab</a>
          </figcaption>
        </figure>

        <div className="home-coverage__destinations">
          <p className="home-coverage__instruction">Choisissez votre département</p>
          <nav className="home-coverage__links" aria-label="Départements desservis">
            {departments.map(({ code, name, slug, places }) => (
              <Link key={code} to={`/${slug}`} className="home-coverage__link" data-active={activeCode === code} {...interactions(code)}>
                <span className="home-coverage__link-code">{code}</span>
                <span className="home-coverage__link-copy"><strong>{name}</strong><span>{places}</span></span>
                <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link to="/zones-desservies" className="home-coverage__all">Toutes les villes desservies <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
