import { useId, useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import citiesData from '../data/cities.json';
import mapData from '../data/localMaps.json';
import './LocalAreaMap.css';

type MapArea = { slug: string; path: string; x: number; y: number; number?: number };
type DepartmentMap = { code: string; outline: string; areas: MapArea[] };

export default function LocalAreaMap({ code, citySlug }: { code: string; citySlug?: string }) {
  const id = useId().replace(/:/g, '');
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const department = citiesData.departments.find((item) => item.code === code);
  const geography = (mapData as DepartmentMap[]).find((item) => item.code === code);
  if (!department || !geography) return null;

  const city = department.cities.find((item) => item.slug === citySlug);
  const activeSlug = hovered ?? focused ?? citySlug;
  const activeArea = geography.areas.find((area) => area.slug === activeSlug);
  const activeCity = department.cities.find((item) => item.slug === activeSlug);
  const isParis = code === '75';
  const places = isParis ? 'arrondissements' : 'villes';
  const directoryHref = citySlug ? `/${department.slug}` : '#villes';

  return (
    <figure className="local-map" aria-labelledby={`${id}-heading`}>
      <div className="local-map__heading">
        <div>
          <p><MapPin size={14} aria-hidden="true" /> {city ? 'Votre lieu de départ' : 'Notre zone de prise en charge'}</p>
          <h2 id={`${id}-heading`}>{city?.name ?? department.name}</h2>
          <span>{city ? `${department.name} · Île-de-France` : `${department.cities.length} ${places} desservis`}</span>
        </div>
        <span className="local-map__code">{city?.postalCode ?? code}<small>{city ? 'code postal' : 'département'}</small></span>
      </div>

      <div className="local-map__canvas">
        <svg viewBox="0 0 480 340" role="group" aria-labelledby={`${id}-title ${id}-description`}>
          <title id={`${id}-title`}>{city ? `${city.name} dans le département ${department.name}` : `Carte des ${places} desservis : ${department.name}`}</title>
          <desc id={`${id}-description`}>Chaque secteur coloré mène à sa page. {city ? `${city.name} est repéré en doré.` : `Choisissez l’un des ${department.cities.length} ${places} desservis.`}</desc>
          <defs>
            <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#d3ddd9" /></pattern>
          </defs>
          <rect width="480" height="340" fill={`url(#${id}-grid)`} />
          <g className="local-map__north" transform="translate(449 28)" aria-hidden="true"><text y="-9" textAnchor="middle">N</text><path d="M0 -2L4 9L0 6L-4 9Z" /></g>
          <path className="local-map__outline" d={geography.outline} fillRule="evenodd" />
          {geography.areas.map((area) => {
            const place = department.cities.find((item) => item.slug === area.slug);
            if (!place) return null;
            const active = area.slug === activeSlug;
            return (
              <a
                key={area.slug}
                href={`/${department.slug}/${area.slug}`}
                className="local-map__place"
                data-active={active}
                aria-label={`${place.name} (${place.postalCode}) — découvrir le service`}
                aria-current={area.slug === citySlug ? 'page' : undefined}
                onMouseEnter={() => setHovered(area.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setFocused(area.slug)}
                onBlur={() => setFocused(null)}
              >
                <title>{place.name} · {place.postalCode}</title>
                <path d={area.path} fillRule="evenodd" />
                {isParis && <text x={area.x} y={area.y + 3.5} textAnchor="middle" aria-hidden="true">{area.number}</text>}
              </a>
            );
          })}
          {activeArea && <g className="local-map__selection" aria-hidden="true" pointerEvents="none">
            <path d={activeArea.path} fillRule="evenodd" />
            {!isParis && <><circle className="local-map__halo" cx={activeArea.x} cy={activeArea.y} r="13" /><circle className="local-map__pin" cx={activeArea.x} cy={activeArea.y} r="5" /></>}
          </g>}
        </svg>
        <div className="local-map__legend"><i data-selected={Boolean(activeCity)} aria-hidden="true" /><span>{activeCity?.name ?? (isParis ? 'Les 20 arrondissements de Paris' : 'Nos villes de prise en charge')}</span>{activeCity && <small>{activeCity.postalCode}</small>}</div>
      </div>

      <figcaption className="local-map__footer">
        <a href={directoryHref} className="local-map__directory"><span>{city ? `Explorer les ${places}` : `Choisir ${isParis ? 'mon arrondissement' : 'ma ville'}`}</span><ArrowRight size={17} aria-hidden="true" /></a>
        <p>Sélectionnez un secteur sur la carte.<a href="https://geo.api.gouv.fr/decoupage-administratif" target="_blank" rel="noopener noreferrer">Contours : Etalab</a></p>
      </figcaption>
    </figure>
  );
}
