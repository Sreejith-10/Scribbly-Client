"use client";

import {useEffect, useState} from "react";
import {motion} from "motion/react";
import {Compass, Lock, Share2, Sparkles} from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./navigation-menu";
import {Button} from "./button";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
				scrolled
					? "bg-background/80 backdrop-blur-md shadow-sm"
					: "bg-transparent"
			}`}
			initial={{y: -100}}
			animate={{y: 0}}
			transition={{duration: 0.5, ease: "easeOut"}}>
			<div className="container mx-auto flex items-center justify-between">
				<motion.div
					className="flex items-center gap-2"
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 0.5, delay: 0.2}}>
					<div className="flex h-9 w-9 items-center justify-center">
						<Image src="/icons/icon.png" alt="logo" width={100} height={100} />
					</div>
					<span className="text-xl font-bold">Scribbly</span>
				</motion.div>

				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="bg-transparent hover:bg-transparent cursor-pointer">
								Features
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{[
										{
											icon: Sparkles,
											title: "Real-time Collaboration",
											description: "Work together in real-time with your team",
										},
										{
											icon: Compass,
											title: "Infinite Canvas",
											description:
												"Unlimited space for your ideas and projects",
										},
										{
											icon: Share2,
											title: "Easy Sharing",
											description: "Share your boards with anyone, anywhere",
										},
										{
											icon: Lock,
											title: "Secure",
											description: "Enterprise-grade security for your content",
										},
									].map((item, i) => (
										<li key={i}>
											<NavigationMenuLink asChild>
												<a className="flex select-none items-center gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
													<item.icon className="h-5 w-5" />
													<div>
														<div className="text-sm font-medium leading-none">
															{item.title}
														</div>
														<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
															{item.description}
														</p>
													</div>
												</a>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								className={(navigationMenuTriggerStyle(), "bg-transparent")}>
								Pricing
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								className={(navigationMenuTriggerStyle(), "bg-transparent")}>
								Resources
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="flex items-center gap-2">
					<Button variant="ghost" className="hidden md:inline-flex">
						<Link href="/login">Log in</Link>
					</Button>
					<Button>
						<Link href="/register">Sign up free</Link>
					</Button>
				</div>
			</div>
		</motion.header>
	);
};
