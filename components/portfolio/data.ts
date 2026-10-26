/**
 * Single source of truth for all site copy, links and images.
 * Edit content here, not in JSX.
 *
 * TODO(content): every entry marked `// PLACEHOLDER` is still dummy copy from
 * the Figma and must be replaced with real work before the site goes live.
 */

export const site = {
  name: 'Mohammad Al Bast',
  role: 'Front-End & Webflow Developer',
  phone: { label: '00961-(0)-3279355', href: 'tel:+9613279355' },
  email: { label: 'Mohammadbast4@Gmail.com', href: 'mailto:mohammadbast4@gmail.com' },
  // PLACEHOLDER — add your real profile URLs
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  portrait: '/images/portrait.png', // PLACEHOLDER — replace with your real photo
}

export const navLinks = [
  { label: 'EXPERTISE', href: '/#expertise' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'PORTFOLIO', href: '/#portfolio' },
  { label: 'ABOUT ME', href: '/#about' },
]

export const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms Of Service', href: '#' },
  { label: 'Cookies Settings', href: '#' },
]

export const hero = {
  titleStart: 'Build ',
  titleHighlight: 'Something',
  titleEnd: ' That Matters',
  greeting: '<HI, I’M MOHAMMAD AL BAST/>',
  intro:
    'Front-End & Webflow Web Developer, specializing in React, Laravel Blade, Webflow & JavaScript.',
  primaryCta: { label: 'View My Work', href: '/projects' },
  secondaryCta: { label: 'Contact Me', href: '#contact' },
}

// PLACEHOLDER — slide titles/subtitles
export const heroSlides = [
  { image: '/images/project-laptop-green.png', title: 'Project name', subtitle: 'Fast and clean code' },
  { image: '/images/project-mockup-set.png', title: 'New mockup set', subtitle: 'Pixel-perfect layouts' },
  { image: '/images/project-sunglasses.png', title: 'Editorial site', subtitle: 'Bold and expressive' },
  { image: '/images/project-app.png', title: 'Service app', subtitle: 'Friendly and responsive' },
]

export const techLogos = [
  { src: '/logos/react.svg', name: 'React' },
  { src: '/logos/laravel.svg', name: 'Laravel' },
  { src: '/logos/html5.svg', name: 'HTML5' },
  { src: '/logos/webflow.svg', name: 'Webflow' },
]

export const stack = {
  eyebrow: 'STACK',
  title: 'Technologies That Power The Work',
  intro:
    'I work with a focused, modern stack so your Webflow site or web app stays maintainable and easy to extend.',
  columns: [
    {
      title: 'Frontend',
      description:
        'Component-based UIs, responsive layouts, & accessible front-end code built for modern performance standards.',
      tags: [
        'Laravel Blade templates',
        'HTML5, CSS3, modern JavaScript (ES6+)',
        'Webflow (Designer & CMS)',
        'React and TypeScript',
      ],
    },
    {
      title: 'Backend & Databases',
      description:
        'Simple APIs and well-structured queries that support fast front ends and ensure data integrity.',
      tags: [
        'PHP with basic Laravel',
        'Node.js and Express (fundamentals)',
        'SQL databases and stored procedures',
      ],
    },
    {
      title: 'Design & Collaboration',
      description: 'Smooth handoff from design to Webflow or code with clear communication.',
      tags: ['Figma, Adobe XD, Photoshop, Illustrator', 'Git & GitHub', 'Slack, Jira, Notion'],
    },
  ],
}

export const services = {
  title: 'Services I Offer',
  intro:
    'From Webflow builds to custom React applications, I provide end-to-end front-end development solutions built for speed and maintainability.',
  items: [
    {
      number: '01',
      tag: 'Webflow',
      titleBefore: 'End-to-End ',
      highlight: 'Webflow',
      titleAfter: ' Implementation',
      description:
        'Thoughtful Webflow builds with structured CMS, reusable components, smart custom code, empowering marketing teams with clarity, control, & expert support.',
      cta: 'Start a Webflow Project',
      image: '/images/project-mockup-set.png',
    },
    {
      number: '02',
      tag: 'React',
      titleBefore: '',
      highlight: 'Web application',
      titleAfter: ' development',
      description:
        'Complex applications that handle real workloads. Scalable architecture & clean interfaces that users love.',
      cta: 'Build a website',
      image: '/images/project-laptop-green.png',
    },
    {
      number: '03',
      tag: 'Landing',
      titleBefore: 'High-Converting ',
      highlight: 'Landing Pages',
      titleAfter: '',
      description:
        'Conversion-focused pages with sharp messaging, fast performance and a clear path to action.',
      cta: 'Launch a Landing Page',
      image: '/images/project-sunglasses.png',
    },
    {
      number: '04',
      tag: 'Apps',
      titleBefore: 'Mobile-First ',
      highlight: 'Product Sites',
      titleAfter: '',
      description:
        'Friendly, responsive product experiences designed mobile-first and polished across every screen.',
      cta: 'Start a Product Site',
      image: '/images/project-app.png',
    },
  ],
}

/** `icon` maps to a lucide icon in what-i-build.tsx */
export const buildItems = [
  {
    icon: 'webflow',
    title: 'Production-Ready Webflow Development',
    description:
      'Hand-off ready Webflow builds with structured CMS, reusable components and clean, maintainable structure.',
  },
  {
    icon: 'site',
    title: 'Modern Marketing & Portfolio Sites',
    description:
      'Modern, fast-loading websites built with React or Laravel Blade. Designed to clearly present your product or brand, with clean code & SEO baked in from day one.',
  },
  {
    icon: 'landing',
    title: 'High-Converting Landing Pages',
    description:
      'Focused landing pages engineered for conversion, with crisp copy hierarchy and quick load times.',
  },
  {
    icon: 'frontend',
    title: 'Custom Web Applications (Front-End)',
    description:
      'Component-based front-ends for complex products, wired up to your APIs with predictable state.',
  },
  {
    // NOTE: same title as the item above in the Figma — rename to something distinct
    icon: 'scale',
    title: 'Scalable Web Applications',
    description:
      'Scalable interfaces that handle real workloads while staying clean and a pleasure to use.',
  },
  {
    icon: 'dashboard',
    title: 'Data Dashboards & Admin Tools',
    description:
      'Readable dashboards and admin panels that turn dense data into clear, actionable views.',
  },
] as const

export const projectCategories = ['Webflow', 'React', 'Laravel'] as const
export type ProjectCategory = (typeof projectCategories)[number]

export type Project = {
  slug: string
  name: string
  description: string
  category: ProjectCategory
  tags: string[]
  images: string[]
  liveUrl: string
  codeUrl: string
  about: string
  challenges: string
  solutions: string
  technologies: string[]
  testimonial?: { quote: string; name: string; handle: string; image: string }
}

// PLACEHOLDER — all three projects are dummy content from the Figma
export const projects: Project[] = [
  {
    slug: 'project-one',
    name: 'Project Name',
    description: 'Short description for project goes here',
    category: 'Webflow',
    tags: ['React', 'Webflow', 'Custom animation'],
    images: ['/images/project-mockup-set.png', '/images/project-laptop-green.png', '/images/project-app.png'],
    liveUrl: '#',
    codeUrl: '#',
    about:
      'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    challenges:
      'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    solutions:
      'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    technologies: ['Laravel Blade templates', 'HTML5, CSS3, modern JavaScript (ES6+)', 'Webflow (Designer & CMS)', 'React and TypeScript'],
  },
  {
    slug: 'project-two',
    name: 'Project Name',
    description: 'Short description for project goes here',
    category: 'React',
    tags: ['React', 'Webflow', 'Custom animation'],
    images: ['/images/project-sunglasses.png', '/images/project-mockup-set.png', '/images/project-app.png', '/images/project-laptop-green.png'],
    liveUrl: '#',
    codeUrl: '#',
    about: 'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    challenges: 'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    solutions: 'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    technologies: ['React and TypeScript', 'Node.js and Express (fundamentals)'],
  },
  {
    slug: 'project-three',
    name: 'Project Name',
    description: 'Short description for project goes here',
    category: 'Laravel',
    tags: ['React', 'Webflow', 'Custom animation'],
    images: ['/images/project-app.png', '/images/project-sunglasses.png', '/images/project-mockup-set.png', '/images/project-laptop-green.png'],
    liveUrl: '#',
    codeUrl: '#',
    about: 'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    challenges: 'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    solutions: 'Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.',
    technologies: ['PHP with basic Laravel', 'SQL databases and stored procedures'],
  },
]

export const projectsPage = {
  // PLACEHOLDER — Figma says "<Heading Here>"
  title: 'All Projects',
  intro: 'A selection of Webflow builds, React applications and Laravel projects I have shipped.',
}

export const about = {
  title: 'I Turn Ideas And Designs Into Fast, User-Friendly Interfaces.',
  name: 'Mohammad Al Bast:',
  paragraphs: [
    '“I turn Figma or Adobe XD designs into fast, user-friendly websites & Webflow builds.',
    'Everything is responsive, polished, and reliably connected to APIs or SQL databases, making it easy to manage.”',
  ],
  details: [
    { label: 'Expertise', value: '5+ years' },
    { label: 'Location', value: 'Available for remote projects worldwide' },
    { label: 'Role', value: 'Front-End & Webflow Developer' },
    { label: 'Focus', value: 'React, TypeScript, Laravel Blade, Webflow' },
    { label: 'Backend', value: 'PHP (Laravel basics), Node.js/ Express (Fundamentals), SQL Databases' },
    { label: 'Tools', value: 'Figma, Adobe XD, Git & GitHub, Project Management Tools (Slack, Jira)' },
    { label: 'Languages', value: 'Arabic (Native), English (Fluent), French & Spanish (Basic)' },
  ],
}

// PLACEHOLDER — names/handles are not real people; replace with real testimonials or remove
export const testimonials = {
  title: 'Testimonials',
  intro: 'What clients and colleagues say about working together.',
  items: [
    {
      name: 'Front-End Team Lead',
      handle: '@teamlead',
      quote:
        'He quickly understands complex requirements and consistently turns our designs into clean, responsive Webflow sites and React apps. His attention to detail is excellent.',
      image: '',
    },
    {
      name: 'Name, Backend Developer',
      handle: '@instagramaccount',
      quote:
        'He was instrumental in optimizing our SQL queries and improving our front-end performance scores. Mohammad provided clear, strategic advice on when to use Webflow and when to opt for custom code.',
      image: '/images/portrait.png',
    },
    {
      name: 'Name, Designer',
      handle: '@instagramaccount',
      quote:
        'He was the rare developer who respects the design. Pixel-perfect implementation and a real partner throughout the whole build.',
      image: '',
    },
  ],
}

export const cta = {
  title: 'Ready To Build Something Real?',
  body: "If you're looking for a reliable Webflow specialist or a versatile React front-end developer to build a new high-performance site, execute a design-to-code project, or improve an existing application's structure and speed, let's connect today.",
  button: { label: "LET'S TALK", href: 'mailto:mohammadbast4@gmail.com' },
}
