import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, MapPin, Search, X } from 'lucide-react';

export type DirectoryCity = { name: string; slug: string; postalCode: string };
const normalizeCityQuery = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

export function CityLinks({ cities, departmentSlug }: { cities: DirectoryCity[]; departmentSlug: string }) {
  return <div className="lp-city-grid">{cities.map((city) => <Link key={city.slug} to={`/${departmentSlug}/${city.slug}`} className="lp-city-link"><MapPin size={17} aria-hidden="true" /><span><strong>{city.name}</strong><small>{city.postalCode}</small></span><ArrowRight size={16} aria-hidden="true" /></Link>)}</div>;
}

export default function CityDirectory({ cities, departmentSlug, departmentName, code }: { cities: DirectoryCity[]; departmentSlug: string; departmentName: string; code: string }) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const normalizedQuery = normalizeCityQuery(query);
  const results = normalizedQuery ? cities.filter((city) => normalizeCityQuery(`${city.name} ${city.postalCode}`).includes(normalizedQuery)) : cities;
  const visibleCities = normalizedQuery ? results : cities.slice(0, 12);
  const remaining = cities.slice(12);

  return <section id="villes" className="lp-directory">
    <div className="lp-container">
      <div className="lp-directory-heading"><div><p className="lp-eyebrow">À proximité de chez vous</p><h2>{code === '75' ? 'Les arrondissements' : 'Les villes'} desservis<span>{departmentName} · {code}</span></h2></div><span className="lp-directory-total"><strong>{cities.length}</strong>{code === '75' ? 'arrondissements' : 'villes'}</span></div>
      <div className="lp-search-row"><label className="lp-search"><Search size={20} aria-hidden="true" /><span className="sr-only">Rechercher une ville ou un code postal</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={code === '75' ? 'Un arrondissement, un code postal…' : 'Une ville, un code postal…'} aria-controls="local-city-results" />{query && <button type="button" aria-label="Effacer la recherche" onClick={() => setQuery('')}><X size={17} aria-hidden="true" /></button>}</label><span className="lp-results-count" role="status">{normalizedQuery ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : 'Sélectionnez votre lieu de départ'}</span></div>
      <div id="local-city-results"><CityLinks cities={visibleCities} departmentSlug={departmentSlug} />
        {!results.length && <div className="lp-search-empty"><p>Aucune ville ne correspond à « {query} ».</p><button className="lp-text-link" type="button" onClick={() => setQuery('')}>Afficher toutes les villes <ArrowRight size={16} aria-hidden="true" /></button></div>}
        {remaining.length > 0 && <div id="local-city-more" hidden={!expanded || Boolean(normalizedQuery)}><CityLinks cities={remaining} departmentSlug={departmentSlug} /></div>}
      </div>
      {remaining.length > 0 && !normalizedQuery && <button className="lp-directory-toggle" type="button" aria-expanded={expanded} aria-controls="local-city-more" onClick={() => setExpanded((value) => !value)}>{expanded ? 'Réduire la liste' : `Voir les ${remaining.length} autres ${code === '75' ? 'arrondissements' : 'villes'}`}<ChevronDown size={17} className={expanded ? 'is-expanded' : ''} aria-hidden="true" /></button>}
    </div>
  </section>;
}
