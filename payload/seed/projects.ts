type SeedProject = {
  name: string
  description: string
  category: 'Webflow' | 'React' | 'Laravel'
  tags: string[]
  technologies: string[]
  liveUrl?: string
  codeUrl?: string
  about: string
  challenges: string
  solutions: string
  featured: boolean
  order: number
}

export const seedProjects: SeedProject[] = [
  {
    name: 'Brain Learning Center',
    description:
      'Learning management platform: a NestJS API and a bilingual Next.js admin dashboard with four roles, two-factor sign-in, and course, lesson and review tools.',
    category: 'React',
    tags: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL'],
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'NestJS 11',
      'Prisma',
      'PostgreSQL',
      'TanStack Query',
      'TanStack Table',
      'Tailwind CSS 4',
      'shadcn/ui',
      'next-intl',
      'Docker',
    ],
    about:
      'An online school platform built in two parts: a REST API and an admin dashboard. Administrators, instructors and students each get their own view of courses, lessons, enrollments, progress and reviews. It is a self-initiated build, used to work through role-based access, authentication and a bilingual English and Arabic interface from the database to the screen.',
    challenges:
      'Four roles (super admin, admin, instructor and student) need different permissions on the same data, and the rules have to hold on the server, not only in the interface. Sign-in had to be safe by default: short-lived access tokens, refresh tokens that scripts cannot read, and two-factor authentication. The dashboard also had to work in Arabic, which means a right-to-left layout and not only translated text.',
    solutions:
      'The API is NestJS with Prisma and PostgreSQL, split into nine modules: auth, admin, categories, courses, lessons, enrollments, progress, reviews and mailer. Role guards and ownership checks enforce access on every route. Access tokens last five minutes in the default setup, refresh tokens rotate and travel in an httpOnly cookie, and sign-in supports email codes and authenticator apps, with one-time-code password reset. Every response uses one envelope with a request ID on errors, lists use cursor pagination, and the API is documented with Swagger. The dashboard is Next.js 16 with TanStack Query and Table for server-driven lists (search, sort, filter, pagination), React Hook Form with Zod for forms, and next-intl with a direction switch for English and Arabic.',
    featured: true,
    order: 1,
  },
  {
    name: 'EDUadmin',
    description:
      'University administration suite for grade change forms, course registration and drop requests, with PDF reports and emailed copies.',
    category: 'Laravel',
    tags: ['Laravel', 'React', 'TypeScript'],
    technologies: [
      'Laravel 12',
      'PHP 8.4',
      'React 19',
      'TypeScript',
      'Vite',
      'Redux Toolkit',
      'TanStack Table',
      'Tailwind CSS 4',
      'jsPDF',
    ],
    codeUrl: 'https://github.com/Mohammad-Al-Bast/EDUadmin-frontend',
    about:
      'EDUadmin is an administration suite for university academic operations. Staff submit and process grade change forms and course registration and drop requests for students across campuses, and administrators manage the users, courses and student records behind them. It is a Laravel API with a separate React single-page app.',
    challenges:
      'Grade change and course registration requests carry a lot of structured detail: the student, the course sections, the semester and the reason. Each submission has to be validated, kept as history, and turned into a document staff can print or send. Student and course data also has to be loaded in bulk, not one record at a time.',
    solutions:
      'The Laravel 12 backend models forms, students, courses and registered and dropped courses, with an import controller for bulk loading and admin routes that require a verified account. Forms can be emailed as reports. The React frontend validates submissions with React Hook Form and Zod, keeps state with Redux Toolkit, lists records in TanStack Table, and generates branded PDF reports in the browser with jsPDF. It has light and dark themes and a command palette for fast navigation.',
    featured: true,
    order: 2,
  },
  {
    name: 'Reactive Store',
    description:
      'Online store for a Lebanese medical and rehabilitation supplies retailer, with a catalog, cart and checkout that sends the order to the store on WhatsApp.',
    category: 'React',
    tags: ['Next.js', 'Tailwind CSS', 'shadcn/ui', 'TypeScript'],
    technologies: ['Next.js 16', 'React', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Radix UI'],
    codeUrl: 'https://github.com/Mohammad-Al-Bast/reactive-store',
    about:
      'A store website for Reactive Store, a seller of medical, rehabilitation and healthcare supplies in Lebanon. The brief was a site that looks credible to people buying equipment for care at home or in a clinic: browsable departments, product pages with real specifications, and a simple way to order. Version 1 is built and waiting on the store for final prices, photos and contact details.',
    challenges:
      'Buyers of medical equipment want specifications and reassurance before they order, not a flash-sale layout. The store had no payment gateway or order backend, and the team confirms totals and delivery with each customer by phone, so the site needed a way to collect orders without a server or database.',
    solutions:
      'Next.js 16 with Tailwind CSS and shadcn/ui. Products, departments, specifications, prices and stock live in one typed data file, and contact details, hours, delivery and warranty in another, so the owner changes data and never components. The shop has search, filters, sort and department pages. The cart is kept in the browser, and checkout collects delivery details and a payment method, then opens WhatsApp with the full order written out for the customer to send. Products without a price show "Price on request". Moving to online orders later means replacing one submit handler.',
    featured: true,
    order: 3,
  },
]
