import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CodeHeading } from "@/components/code-heading";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteNav } from "@/components/portfolio/site-nav";

export const metadata: Metadata = {
	title: "Privacy Policy — Mohammad Al Bast",
	description:
		"How the portfolio website of Mohammad Al Bast handles visitor data, analytics and contact details.",
};

const EFFECTIVE_DATE = "2026-11-01";

const effectiveDateLabel = new Intl.DateTimeFormat("en-US", {
	dateStyle: "long",
	timeZone: "UTC",
}).format(new Date(EFFECTIVE_DATE));

const linkClassName =
	"rounded-sm text-primary underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function PolicySection({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<section className="border-t border-border pt-8">
			<h2 className="font-sans text-xl font-medium tracking-tight text-pretty text-foreground md:text-2xl">
				{title}
			</h2>
			<div className="mt-4 space-y-4 font-mono text-sm leading-relaxed text-muted-foreground">
				{children}
			</div>
		</section>
	);
}

export default function PrivacyPolicyPage() {
	return (
		<>
			<SiteNav />
			<main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
				<CodeHeading
					as="h1"
					className="text-4xl text-balance md:text-6xl"
				>
					Privacy Policy
				</CodeHeading>
				<p className="mt-6 font-mono text-xs text-muted-foreground">
					Effective{" "}
					<time dateTime={EFFECTIVE_DATE}>{effectiveDateLabel}</time>
				</p>
				<p className="mt-6 font-mono text-sm leading-relaxed text-muted-foreground">
					This policy explains what happens to your information when
					you visit this portfolio website, which is run by Mohammad
					Al Bast. The site has no accounts, contact forms or
					newsletter, so it collects very little.
				</p>

				<div className="mt-12 space-y-10">
					<PolicySection title="Information You Choose To Share">
						<p>
							If you email or call Mohammad Al Bast using the
							details on this site, your name, contact details and
							whatever you include in your message are received.
							They are used only to reply to you and to discuss any
							work you ask about, and they are not sold.
						</p>
					</PolicySection>

					<PolicySection title="Analytics">
						<p>
							This site uses Vercel Web Analytics to understand how
							it is used, such as which pages are visited, the
							referring site, your browser, operating system and
							device type, and your approximate location at country
							level. It does not use cookies and reports this
							information in aggregate rather than identifying you
							personally.
						</p>
					</PolicySection>

					<PolicySection title="Hosting & Server Logs">
						<p>
							This site is hosted by Vercel. As with most websites,
							the hosting provider may process technical
							information such as your IP address and the time of
							your request in order to deliver the site and keep it
							secure. You can read more in{" "}
							<a
								href="https://vercel.com/legal/privacy-policy"
								target="_blank"
								rel="noopener noreferrer"
								className={linkClassName}
							>
								Vercel’s Privacy Policy
							</a>
							.
						</p>
					</PolicySection>

					<PolicySection title="Cookies">
						<p>
							This site does not set cookies for tracking or
							advertising, so there are no cookie settings to
							manage.
						</p>
					</PolicySection>

					<PolicySection title="Links To Other Websites">
						<p>
							This site may link to other websites, such as GitHub
							and LinkedIn. Those websites have their own privacy
							policies, which apply once you leave this site.
						</p>
					</PolicySection>

					<PolicySection title="Your Choices">
						<p>
							You can ask to see, correct or delete any personal
							information you have shared by getting in touch using
							the email address below.
						</p>
					</PolicySection>

					<PolicySection title="Changes To This Policy">
						<p>
							This policy may be updated if the site changes. The
							effective date at the top of this page shows when it
							was last revised.
						</p>
					</PolicySection>

					<PolicySection title="Contact">
						<p>
							Send questions about this policy to{" "}
							<a
								href="mailto:Mohammadbast4@Gmail.com"
								className={`${linkClassName} break-words`}
							>
								Mohammadbast4@Gmail.com
							</a>
							.
						</p>
					</PolicySection>
				</div>

				<Link href="/" className={`${linkClassName} mt-12 inline-block font-mono text-sm`}>
					Back To Home
				</Link>
			</main>
			<SiteFooter />
		</>
	);
}
