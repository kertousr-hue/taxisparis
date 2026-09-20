import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Mail, MapPin, Phone } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import CityDirectory from '../components/CityDirectory';
import { LocalBookingAside, LocalClosing, LocalFAQ, LocalHero, LocalParagraphs, LocalSectionNav, LocalTrust } from '../components/LocalPageUI';
import { departmentsSEO, generateBreadcrumbList, generateJsonLD } from '../utils/seoData';
import citiesData from '../data/cities.json';

interface DepartmentPageProps {
  department: string;
  onNavigate: (page: string) => void;
}

const services = [
  'Transport vers hôpitaux et cliniques',
  'Consultations médicales spécialisées',
  'Dialyse et chimiothérapie',
  'Transport ALD',
  'Chirurgie ambulatoire',
  'Radiothérapie et traitements',
];
const prepositions: Record<string, string> = { '75': 'à', '91': 'en', '92': 'dans les', '93': 'en', '94': 'dans le' };
// Existing local business map embeds are retained for the relevant departments.
const locationMaps: Record<string, string> = {"91": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29813.101969137475!2d2.3407840008219627!3d48.66473972389701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671a730b6ef99%3A0x60e690c6ca8686ce!2zdGF4aSB2c2wgY29udmVudGlvbm7DqSBhZ3LDqcOpIHPDqWN1cml0w6kgc29jaWFsZQ!5e0!3m2!1sfr!2sfr!4v1776620517246!5m2!1sfr!2sfr", "94": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d168280.9689252091!2d2.297381289452775!3d48.77444161404638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67b94662e87b3%3A0x35f4c18f7871832e!2staxi%20%26%20vsl%20conventionn%C3%A9!5e0!3m2!1sfr!2sfr!4v1764499643238!5m2!1sfr!2sfr"};

export default function DepartmentPage({ department }: DepartmentPageProps) {
  const dept = citiesData.departments.find((item) => item.code === department);
  const seo = departmentsSEO[department];

  if (!dept || !seo) return <div className="local-page"><div className="lp-container lp-lower-content"><h1>Département non trouvé</h1><Link className="lp-text-link" to="/zones-desservies">Retrouver nos zones desservies <ArrowRight size={16} /></Link></div></div>;

  const prep = prepositions[department] || 'en';
  const jsonLD = [generateJsonLD(department), generateBreadcrumbList([{ name: 'Accueil', url: '/' }, { name: `Taxi VSL ${dept.name}`, url: `/${dept.slug}` }])];

  return (
    <div className="local-page local-page-department">
      <SEOHead title={seo.metaTitle} description={seo.metaDescription} keywords={seo.keywords} jsonLD={jsonLD} />
      <LocalHero name={dept.name} code={department} preposition={prep} count={dept.cities.length} description={seo.metaDescription} breadcrumbs={[{ label: 'Zones desservies', href: '/zones-desservies' }, { label: `${dept.name} (${department})` }]} />
      <LocalTrust />
      <LocalSectionNav items={[{ id: 'votre-transport', label: 'Votre transport' }, { id: 'etablissements', label: 'Hôpitaux & soins' }, { id: 'villes', label: department === '75' ? 'Les arrondissements' : 'Les villes desservies' }, { id: 'questions', label: 'Vos questions' }]} />

      <div className="lp-container lp-content">
        <div className="lp-main-column">
          <section id="votre-transport" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Votre quotidien, nos trajets</p><h2>Un transport médical<br />près de chez vous.</h2></div>
            <LocalParagraphs text={seo.uniqueParagraph} lead />
            <LocalParagraphs text={seo.content} />
          </section>

          <section id="etablissements" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Vos établissements de santé</p><h2>Nous vous accompagnons<br />jusqu’à vos soins.</h2><p>Les hôpitaux et centres de soins fréquemment desservis {prep} {dept.name}.</p></div>
            <ul className="lp-hospital-list">{seo.hospitals.map((hospital) => <li key={hospital}><Building2 size={18} aria-hidden="true" /><span>{hospital}</span></li>)}</ul>
          </section>

          <section className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Selon votre prescription</p><h2>Un trajet pour chaque soin.</h2></div>
            <div className="lp-service-grid">{services.map((service, index) => <article key={service} className="lp-service-card"><span>{String(index + 1).padStart(2, '0')}</span><h3>{service}</h3></article>)}</div>
          </section>

          <section id="organisation" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Une prise en charge bien préparée</p><h2>{seo.accessTitle}</h2></div>
            <ol className="lp-steps">{seo.accessPoints.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p></li>)}</ol>
          </section>
        </div>
        <LocalBookingAside locality={dept.name} departmentName={dept.name} departmentSlug={dept.slug} />
      </div>

      <CityDirectory key={department} cities={dept.cities} departmentSlug={dept.slug} departmentName={dept.name} code={department} />

      <div className="lp-container lp-lower-content">
        <LocalFAQ title={`Vos questions sur le transport ${prep} ${dept.name}`} items={seo.faq} />
        {locationMaps[department] && <section className="lp-section"><div className="lp-section-heading"><p className="lp-eyebrow">Retrouvez-nous</p><h2>Notre localisation {prep} {dept.name}</h2></div><iframe className="lp-location-frame" src={locationMaps[department]} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" title={`Localisation Taxi conventionné ${dept.name}`} /></section>}
        <section className="lp-section"><p className="lp-eyebrow">Et autour de vous</p><h2>Nos autres départements.</h2><div className="lp-department-links">{citiesData.departments.filter((item) => item.code !== department).map((item) => <Link key={item.code} to={`/${item.slug}`}><span>{item.code}</span>{item.name}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>
      </div>
      <LocalClosing locality={dept.name} />
      <div className="lp-container lp-contact-strip"><a href="tel:+33650366491"><Phone size={15} aria-hidden="true" />06 50 36 64 91</a><a href="mailto:contact@taxisparis-conventionnes.fr"><Mail size={15} aria-hidden="true" />contact@taxisparis-conventionnes.fr</a><span><MapPin size={15} aria-hidden="true" />{dept.name} · {department}</span></div>
    </div>
  );
}
