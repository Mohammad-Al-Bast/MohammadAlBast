import { faq, seo, services, site, socialLinks, stack } from '@/components/portfolio/data'
import type { Project } from '@/components/portfolio/data'
import { absoluteUrl, siteUrl } from '@/lib/seo'

const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`

/** Person + ProfessionalService (services and areas served) + WebSite + FAQPage for the home page. */
export function homeStructuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': personId,
      name: site.name,
      url: siteUrl,
      image: absoluteUrl(site.portrait),
      jobTitle: site.role,
      description: seo.description,
      email: site.email.label,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.location.split(',')[0].trim(),
        addressCountry: 'LB',
      },
      sameAs: socialLinks.map((l) => l.href),
      knowsAbout: stack.columns.flatMap((c) => c.tags),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: `${site.name} — ${site.role}`,
      url: siteUrl,
      image: absoluteUrl(site.portrait),
      description: seo.description,
      email: site.email.label,
      telephone: site.phone.label.replace(/\s+/g, ''),
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.location.split(',')[0].trim(),
        addressCountry: 'LB',
      },
      areaServed: seo.areaServed,
      founder: { '@id': personId },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: services.title,
        itemListElement: services.items.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `${s.titleBefore}${s.highlight}${s.titleAfter}`.trim(),
            description: s.description,
            provider: { '@id': personId },
          },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      name: site.name,
      url: siteUrl,
      description: seo.description,
      inLanguage: 'en',
      author: { '@id': personId },
      publisher: { '@id': personId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      url: `${siteUrl}/#faq`,
      inLanguage: 'en',
      isPartOf: { '@id': websiteId },
      mainEntity: faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** CollectionPage listing every project, plus breadcrumbs, for /projects. */
export function projectsStructuredData(projects: Project[]) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: seo.projectsTitle,
      description: seo.projectsDescription,
      url: absoluteUrl('/projects'),
      isPartOf: { '@id': websiteId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absoluteUrl(`/projects/${p.slug}`),
          name: p.name,
        })),
      },
    },
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name: seo.projectsTitle, path: '/projects' },
    ]),
  ]
}

/** CreativeWork for one case study, plus breadcrumbs. */
export function projectStructuredData(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${url}#work`,
      name: project.name,
      headline: project.name,
      description: project.description,
      url,
      image: project.images.slice(0, 3).map(absoluteUrl),
      genre: project.category,
      keywords: [...project.tags, ...project.technologies].join(', '),
      author: { '@id': personId },
      creator: { '@id': personId },
      isPartOf: { '@id': websiteId },
      ...(project.updatedAt ? { dateModified: project.updatedAt } : {}),
      ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    },
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name: seo.projectsTitle, path: '/projects' },
      { name: project.name, path: `/projects/${project.slug}` },
    ]),
  ]
}
