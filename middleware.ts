import citiesData from './src/data/cities.json';

type City = { slug: string };
type Department = { slug: string; cities: City[] };

const staticPaths = new Set([
  '/',
  '/reservation-taxi-vsl',
  '/zones-desservies',
  '/taxis-aeroports-parisiens',
  '/taxis-gares-parisiennes',
  '/qui-sommes-nous',
  '/blog',
  '/faq',
  '/contact',
  '/mentions-legales',
  '/conditions-generales-de-vente',
  '/conditions-generales',
  '/stations',
]);

const departments = (citiesData.departments || []) as Department[];
const departmentPaths = departments.map((department) => `/${department.slug}`);
const cityPaths = departments.flatMap((department) =>
  department.cities.map((city) => `/${department.slug}/${city.slug}`),
);
const validPaths = new Set([...staticPaths, ...departmentPaths, ...cityPaths]);

function shouldBypass(pathname: string) {
  return (
    pathname === '/api' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/zones/')
  );
}

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.replace(/\/+$/g, '');
    return Response.redirect(url, 308);
  }

  if (shouldBypass(pathname) || validPaths.has(pathname)) {
    return;
  }

  return new Response('Page introuvable', {
    status: 404,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'public, max-age=300',
    },
  });
}

export const config = {
  matcher: ['/((?!.*\\..*).*)'],
};
