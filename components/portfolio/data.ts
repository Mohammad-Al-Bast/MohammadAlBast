/**
 * Single source of truth for all site copy, links and images.
 * Edit content here, not in JSX.
 *
 * Copy is written from Mohammad's real background and GitHub work.
 * Do not name past employers or clients in the copy.
 *
 * Projects are placeholders here — they will come from a database / CMS.
 * Entries marked `// PLACEHOLDER` still need real content.
 */

export const site = {
	name: "Mohammad Al Bast",
	role: "Full-Stack Web Developer & Webflow Expert",
	tagline: "Build Something That Matters",
	location: "Zahlé, Lebanon",
	phone: { label: "+961 3 279 355", href: "tel:+9613279355" },
	email: {
		label: "mohammadbast4@gmail.com",
		href: "mailto:mohammadbast4@gmail.com",
	},
	github: "https://github.com/Mohammad-Al-Bast",
	linkedin: "https://www.linkedin.com/in/mohammad-al-bast",
	portrait: "/images/MB.JPEG",
	// Booking page (e.g. "https://cal.com/your-name/intro"). Leave empty to hide every "Book a call" button.
	booking: "https://cal.com/mohammad-al-bast/intro",
	// CV in /public (e.g. "/cv/Mohammad-Al-Bast-CV.pdf"). Leave empty to hide every CV button.
	cv: "/cv/Mohammad-Al-Bast-CV.pdf",
};

// Shown as icons in the hero and the footer. To add a platform, put its SVG in /public/logos and add a line here.
export const socialLinks = [
	{ label: "GitHub", href: site.github, icon: "/logos/github.svg" },
	{ label: "LinkedIn", href: site.linkedin, icon: "/logos/linkedin.svg" },
];

export const contact = {
	title: "Tell me about your project",
	intro: "A few lines are enough. I reply within one working day.",
	projectTypes: [
		"Webflow site",
		"Web application",
		"Integration or automation",
		"CMS or product catalog",
		"Care plan",
		"Job or agency collaboration",
		"Something else",
	],
	success: "Thanks, your message is on its way. I'll reply within one working day.",
	bookingLabel: "Book a 20-min call",
	cvLabel: "Download CV",
};

export const navLinks = [
	{ label: "EXPERTISE", href: "/#expertise" },
	{ label: "SERVICES", href: "/#services" },
	{ label: "PORTFOLIO", href: "/#portfolio" },
	{ label: "ABOUT ME", href: "/#about" },
];

export const legalLinks = [
	{ label: "Privacy Policy", href: "#" },
	{ label: "Terms Of Service", href: "#" },
	{ label: "Cookies Settings", href: "#" },
];

export const hero = {
	titleStart: "Webflow sites ",
	titleHighlight: "your team can run.",
	titleEnd: " Web apps that hold up.",
	intro: "Freelance full-stack developer and Webflow specialist based in Lebanon. I work in TypeScript, React, Next.js and NestJS.",
	primaryCta: { label: "View My Work", href: "/projects" },
	secondaryCta: { label: "Contact Me", href: "#contact" },
	// Shown by the terminal `status` command.
	status: {
		availability: "freelance, agency and full-time",
		replyTime: "within one working day",
		place: "Zahl\u00e9, Lebanon",
		timeZone: "Asia/Beirut",
	},
	// Shown by the terminal `now` command. Keep to one or two short lines and update them each month.
	now: [
		"Building this portfolio on Next.js and Payload CMS",
		"Webflow client sites with structured CMS collections",
	],
};

export const techLogos = [
	{ src: "/logos/typescript.svg", name: "TypeScript" },
	{ src: "/logos/react.svg", name: "React" },
	{ src: "/logos/nextjs.svg", name: "Next.js" },
	{ src: "/logos/nestjs.svg", name: "NestJS" },
	{ src: "/logos/laravel.svg", name: "Laravel" },
	{ src: "/logos/nodejs.svg", name: "Node.js" },
	{ src: "/logos/postgresql.svg", name: "PostgreSQL" },
	{ src: "/logos/webflow.svg", name: "Webflow" },
];

export const stack = {
	eyebrow: "STACK",
	title: "Technologies That Power The Work",
	intro: "One developer across the whole build: TypeScript front ends, secure APIs, relational databases and Webflow sites your team can actually edit.",
	columns: [
		{
			title: "Frontend",
			description:
				"Type-safe, component-driven TypeScript interfaces that stay fast, accessible and responsive on every screen.",
			tags: [
				"TypeScript",
				"React",
				"Next.js (App Router)",
				"Tailwind CSS & shadcn/ui",
				"TanStack Query & Table",
				"React Hook Form & Zod",
				"HTML5, CSS3, JavaScript (ES6+)",
			],
		},
		{
			title: "Backend & Databases",
			description:
				"Typed REST APIs with authentication, role-based access and well-modelled data behind them.",
			tags: [
				"TypeScript (Node.js)",
				"NestJS & Express",
				"Laravel 12 & PHP",
				"PostgreSQL, MySQL & MongoDB",
				"Prisma ORM",
				"JWT, MFA & RBAC",
				"Swagger / OpenAPI",
			],
		},
		{
			title: "Webflow, AI & Collaboration",
			description:
				"Design-to-build handoff with clean structure, AI-assisted workflows that speed up delivery, and code your team can review.",
			tags: [
				"Webflow Designer, CMS & Interactions",
				"Client-First, GSAP & Finsweet",
				"Claude Code & AI-assisted development",
				"MCP integrations (Webflow, Figma, Notion)",
				"Figma & Adobe XD",
				"Git & GitHub",
				"Postman, Jira & Notion",
			],
		},
	],
};

export const services = {
	title: "Services I Offer",
	intro: "From Webflow builds to full-stack web applications, I take projects from design to deployment and keep them maintainable after launch.",
	bilingualLabel: "EN / AR ready",
	items: [
		{
			number: "01",
			tag: "Webflow",
			titleBefore: "End-to-End ",
			highlight: "Webflow",
			titleAfter: " Implementation",
			description:
				"Client-First Webflow builds with structured CMS collections, reusable components, interactions and custom code, handed off so your team can edit content without breaking the layout.",
			builds: ["Marketing and portfolio sites", "Landing pages built to convert", "Client sites your team edits in the CMS"],
			cta: "Start a Webflow Project",
			visual: "cms" as const,
			contactType: "Webflow site",
			bilingual: true,
		},
		{
			number: "02",
			tag: "Full-Stack",
			titleBefore: "",
			highlight: "Web Application",
			titleAfter: " Development",
			description:
				"Full-stack TypeScript apps with React or Next.js on the front and NestJS or Laravel behind them: authentication, role-based access, PostgreSQL and clean APIs, from schema to deployment.",
			builds: ["Learning platforms and admin suites", "Dashboards with server-driven tables", "Bilingual EN and AR interfaces"],
			cta: "Build a Web App",
			visual: "code" as const,
			contactType: "Web application",
			bilingual: true,
		},
		{
			number: "03",
			tag: "Integrations",
			titleBefore: "",
			highlight: "Integrations",
			titleAfter: " & Automation",
			description:
				"Connect your site to the tools you already run: POS and inventory syncs into Webflow, third-party APIs, CMS bulk imports and AI-assisted workflows that remove manual updates.",
			builds: ["POS and inventory syncs into Webflow", "Third-party API connections", "CMS bulk imports"],
			cta: "Automate a Workflow",
			visual: "integrations" as const,
			contactType: "Integration or automation",
			bilingual: false,
		},
		{
			number: "04",
			tag: "CMS",
			titleBefore: "Scalable ",
			highlight: "CMS & Product Catalogs",
			titleAfter: "",
			description:
				"Product catalogs, brand directories and multi-site CMS schemas with bulk imports, data audits and filtering that stays fast as the content grows.",
			builds: ["Online stores with WhatsApp checkout", "Large catalogs with fast filtering", "Brand directories and multi-site schemas"],
			cta: "Plan a Catalog Build",
			visual: "catalog" as const,
			contactType: "CMS or product catalog",
			bilingual: true,
		},
		{
			number: "05",
			tag: "Retainer",
			titleBefore: "Website ",
			highlight: "Care & Retainers",
			titleAfter: "",
			description:
				"A monthly plan for the site after launch: content and CMS updates, fixes, small features, performance checks and a short report, so you always have a developer on call.",
			builds: ["Content and CMS updates", "Fixes and small features", "Performance checks and a monthly report"],
			cta: "Start a Care Plan",
			visual: "care" as const,
			contactType: "Care plan",
			bilingual: false,
		},
	],
};

export const projectCategories = ["Webflow", "Next.js", "React", "NestJS", "Laravel", "Full-Stack"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

/** Language ids understood by the code highlighter (lib/highlight.ts). */
export const snippetLanguages = ["typescript", "tsx", "javascript", "php", "css", "html", "json", "sql"] as const;
export type SnippetLanguage = (typeof snippetLanguages)[number];

export type CodeSnippet = {
	filename: string;
	language: SnippetLanguage;
	code: string;
};

export type Project = {
	slug: string;
	name: string;
	description: string;
	category: ProjectCategory;
	tags: string[];
	images: string[];
	imageAlts?: string[];
	snippet?: CodeSnippet;
	liveUrl: string;
	codeUrl: string;
	about: string;
	challenges: string;
	solutions: string;
	technologies: string[];
	testimonial?: {
		quote: string;
		name: string;
		handle: string;
		image: string;
	};
};

// PLACEHOLDER — all three projects are dummy content from the Figma
export const projects: Project[] = [
	{
		slug: "project-one",
		name: "Project Name",
		description: "Short description for project goes here",
		category: "Webflow",
		tags: ["React", "Webflow", "Custom animation"],
		images: [
			"/images/project-mockup-set.png",
			"/images/project-laptop-green.png",
			"/images/project-app.png",
		],
		liveUrl: "#",
		codeUrl: "#",
		about: "Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		challenges:
			"Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		solutions:
			"Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		technologies: [
			"Laravel Blade templates",
			"HTML5, CSS3, modern JavaScript (ES6+)",
			"Webflow (Designer & CMS)",
			"React and TypeScript",
		],
	},
	{
		slug: "project-two",
		name: "Project Name",
		description: "Short description for project goes here",
		category: "React",
		tags: ["React", "Webflow", "Custom animation"],
		images: [
			"/images/project-sunglasses.png",
			"/images/project-mockup-set.png",
			"/images/project-app.png",
			"/images/project-laptop-green.png",
		],
		liveUrl: "#",
		codeUrl: "#",
		about: "Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		challenges:
			"Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		solutions:
			"Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		technologies: [
			"React and TypeScript",
			"Node.js and Express (fundamentals)",
		],
	},
	{
		slug: "project-three",
		name: "Project Name",
		description: "Short description for project goes here",
		category: "Laravel",
		tags: ["React", "Webflow", "Custom animation"],
		images: [
			"/images/project-app.png",
			"/images/project-sunglasses.png",
			"/images/project-mockup-set.png",
			"/images/project-laptop-green.png",
		],
		liveUrl: "#",
		codeUrl: "#",
		about: "Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		challenges:
			"Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		solutions:
			"Short paragraph here for 2-3 rows. Short paragraph here for 2-3 rows.",
		technologies: [
			"PHP with basic Laravel",
			"SQL databases and stored procedures",
		],
	},
];

export const projectsPage = {
	// PLACEHOLDER — Figma says "<Heading Here>"
	title: "All Projects",
	intro: "A selection of Webflow builds, TypeScript applications and Laravel projects I have shipped.",
};

export const about = {
	title: "I Turn Ideas And Designs Into Fast, User-Friendly Interfaces.",
	name: "Mohammad Al Bast:",
	paragraphs: [
		"\u201CI started freelancing in 2021 building Webflow sites, and kept going deeper until I was shipping full-stack applications.",
		"Today I build Webflow sites for marketing teams and TypeScript web apps with React, Next.js, NestJS and Laravel. I care about clean structure, honest timelines and code the next person can maintain.\u201D",
	],
	stats: [
		{ value: "5+", label: "Years building for the web" },
		{ value: "10+", label: "Webflow sites delivered" },
		{ value: "10+", label: "Custom-coded apps & sites" },
		{
			value: "100k+",
			label: "Products in the largest catalog I\u2019ve built",
		},
	],
	availability:
		"Open to freelance projects, agency collaborations and full-time roles.",
	details: [
		{ label: "Experience", value: "5+ years, freelancing since 2021" },
		{
			label: "Location",
			value: "Zahlé, Lebanon · available for remote work worldwide",
		},
		{ label: "Role", value: "Full-Stack Web Developer & Webflow Expert" },
		{
			label: "Frontend",
			value: "TypeScript, React, Next.js, Tailwind CSS, shadcn/ui",
		},
		{
			label: "Backend",
			value: "NestJS, Laravel, Node.js / Express, PostgreSQL, MySQL, Prisma",
		},
		{
			label: "Webflow",
			value: "CMS, Client-First, Interactions, GSAP, Finsweet, custom code",
		},
		{
			label: "Education",
			value: "B.E. Computer Engineering, Lebanese International University (2025)",
		},
		{
			label: "AI Workflow",
			value: "Claude Code, custom agent skills, MCP integrations (Webflow, Figma, Notion)",
		},
		{ label: "Languages", value: "Arabic (Native), English (Fluent)" },
	],
};

/**
 * PLACEHOLDER — no real testimonials yet. `enabled: false` hides the section
 * so invented quotes never go live. Add real ones (or load them from the CMS)
 * and flip it to true.
 */
// Keep this false until the three items below are replaced with real, permitted quotes.
export const testimonials = {
	enabled: false,
	title: "Testimonials",
	intro: "What clients and colleagues say about working together.",
	items: [
		{
			name: "Front-End Team Lead",
			handle: "@teamlead",
			quote: "He quickly understands complex requirements and consistently turns our designs into clean, responsive Webflow sites and React apps. His attention to detail is excellent.",
			image: "",
		},
		{
			name: "Name, Backend Developer",
			handle: "@instagramaccount",
			quote: "He was instrumental in optimizing our SQL queries and improving our front-end performance scores. Mohammad provided clear, strategic advice on when to use Webflow and when to opt for custom code.",
			image: "",
		},
		{
			name: "Name, Designer",
			handle: "@instagramaccount",
			quote: "He was the rare developer who respects the design. Pixel-perfect implementation and a real partner throughout the whole build.",
			image: "",
		},
	],
};

export const cta = {
	title: "Ready To Build Something Real?",
	body: "Whether you need a Webflow site your team can run, a full-stack web app, or a second pair of hands on an existing codebase, I'm open to freelance projects and full-time roles. Agencies: I also build white-label, under your brand.",
	button: {
		label: "LET\u2019S TALK",
		href: "mailto:mohammadbast4@gmail.com",
	},
};
