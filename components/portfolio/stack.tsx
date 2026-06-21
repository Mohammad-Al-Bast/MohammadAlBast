import { CodeHeading } from "@/components/code-heading";
import { Tag } from "@/components/primitives";
import { stackColumns } from "./data";
import { LogoMarquee } from "./logo-marquee";

export function Stack() {
	return (
		<section className="py-20 md:py-28">
			<div className="mb-16">
				<LogoMarquee />
			</div>
			<div className="mx-auto max-w-7xl px-5 md:px-8">
				<div className="text-center">
					<p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
						Stack
					</p>
					<CodeHeading className="mx-auto mt-4 max-w-3xl text-3xl md:text-5xl">
						Technologies That Power The Work
					</CodeHeading>
					<p className="mx-auto mt-5 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
						I work with a focused, modern stack so your Webflow site
						or web app stays maintainable and easy to extend.
					</p>
				</div>

				<div className="mt-14 grid gap-5 md:grid-cols-3">
					{stackColumns.map((col) => (
						<div
							key={col.title}
							className="flex flex-col rounded-2xl border border-border bg-card/40 p-7 text-center"
						>
							<h3 className="font-sans text-lg font-semibold text-foreground">
								{col.title}
							</h3>
							<p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
								{col.description}
							</p>
							<div className="mt-auto flex flex-wrap justify-center gap-2 pt-10">
								{col.tags.map((tag) => (
									<Tag key={tag}>{tag}</Tag>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
