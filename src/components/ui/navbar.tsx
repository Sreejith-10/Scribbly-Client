"use client";

import {useState} from "react";
import Link from "next/link";
import {Menu, X, ChevronDown, LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {MobileMenu} from "./mobile-menu";
import Image from "next/image";

const navItems = [
	{
		name: "Dashboard",
		href: "/dashboard",
		description: "View your personal dashboard and recent activities.",
	},
	{
		name: "My Boards",
		href: "/boards",
		description: "Access and manage your whiteboard projects.",
	},
	{
		name: "Templates",
		href: "/templates",
		description: "Explore and use pre-designed whiteboard templates.",
	},
];

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="shrink-0 flex items-center">
						<Link href="/" className="text-2xl font-bold text-primary">
							<Image
								src={"/icons/icon.png"}
								alt="logo"
								width={50}
								height={50}
							/>
						</Link>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuLink className="font-medium text-sm" href="/dashboard">
										Dashboard
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
											<ListItem href="/" title="Docs">
												Read documentation for more information
											</ListItem>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger>More</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
											<li className="row-span-3">
												<NavigationMenuLink asChild>
													<Link
														className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
														href="/">
														<div className="mb-2 mt-4 text-lg font-medium">
															Scribbly Pro
														</div>
														<p className="text-sm leading-tight text-muted-foreground">
															Upgrade to Scribbly Pro for advanced features and
															unlimited boards.
														</p>
													</Link>
												</NavigationMenuLink>
											</li>
											<ListItem href="/help" title="Help Center">
												Get assistance and answers to common questions.
											</ListItem>
											<ListItem href="/blog" title="Blog">
												Read the latest news and tips about whiteboarding.
											</ListItem>
											<ListItem href="/community" title="Community">
												Join our community of whiteboard enthusiasts.
											</ListItem>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="text-sm font-medium text-gray-500 hover:text-gray-700">
									John Doe
									<ChevronDown className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<Link href="/profile" className="w-full">
										Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href="/settings" className="w-full">
										Settings
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<button className="w-full text-left flex items-center text-red-600">
										<LogOut className="mr-2 h-4 w-4" />
										Logout
									</button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="-mr-2 flex items-center sm:hidden">
						<Button
							variant="ghost"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-primary z-50"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
							<span className="sr-only">Open main menu</span>
							{mobileMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</Button>
					</div>
				</div>
			</div>
			<MobileMenu
				isOpen={mobileMenuOpen}
				navItems={navItems}
				onClose={() => setMobileMenuOpen(false)}
			/>
		</nav>
	);
}

const ListItem = ({
	className,
	title,
	children,
	...props
}: React.ComponentPropsWithoutRef<"a"> & {title: string}) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
					{...props}>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
};
