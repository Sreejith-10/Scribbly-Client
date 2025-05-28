import {Layers} from "lucide-react";

export const Footer = () => {
	return (
		<footer className="bg-muted/50 py-12 md:py-16">
			<div className="container mx-auto px-4">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<div className="flex items-center gap-2 mb-6">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
								<Layers className="h-5 w-5 text-primary-foreground" />
							</div>
							<span className="text-xl font-bold">Whiteboard</span>
						</div>
						<p className="text-muted-foreground mb-6">
							The collaborative whiteboard platform that brings teams together.
						</p>
						<div className="flex gap-4">
							{["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social, i) => (
								<a
									key={i}
									href="#"
									className="text-muted-foreground hover:text-foreground transition-colors">
									{social}
								</a>
							))}
						</div>
					</div>

					{[
						{
							title: "Product",
							links: [
								"Features",
								"Templates",
								"Integrations",
								"Pricing",
								"What's New",
							],
						},
						{
							title: "Resources",
							links: ["Blog", "Guides", "Help Center", "Webinars", "API Docs"],
						},
						{
							title: "Company",
							links: ["About Us", "Careers", "Contact", "Privacy", "Terms"],
						},
					].map((column, i) => (
						<div key={i}>
							<h3 className="font-medium mb-4">{column.title}</h3>
							<ul className="space-y-3">
								{column.links.map((link, j) => (
									<li key={j}>
										<a
											href="#"
											className="text-muted-foreground hover:text-foreground transition-colors">
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Whiteboard. All rights reserved.
					</p>
					<div className="flex gap-6">
						<a
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Privacy Policy
						</a>
						<a
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Terms of Service
						</a>
						<a
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Cookies
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
