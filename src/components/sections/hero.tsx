"use client";

import {motion, useScroll, useTransform} from "motion/react";
import {Badge} from "../ui/badge";
import {
	CheckCircle,
	ChevronDown,
	ChevronRight,
	Compass,
	MessageSquare,
	Sparkles,
} from "lucide-react";
import {Button} from "../ui/button";
import Image from "next/image";
import {Avatar, AvatarFallback} from "../ui/avatar";

const slideInLeft = {
	hidden: {opacity: 0, x: -50},
	visible: {
		opacity: 1,
		x: 0,
		transition: {duration: 0.6, ease: "easeOut"},
	},
};

const slideInRight = {
	hidden: {opacity: 0, x: 50},
	visible: {
		opacity: 1,
		x: 0,
		transition: {duration: 0.6, ease: "easeOut"},
	},
};

export const HeroSection = () => {
	const {scrollYProgress} = useScroll();
	const y = useTransform(scrollYProgress, [0, 0.5], [0, -150]);

	return (
		<section className="relative min-h-screen pt-24 overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background"></div>
				<motion.div
					className="absolute inset-0 opacity-30"
					style={{
						backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						y,
					}}
				/>
			</div>

			<div className="container mx-auto px-4 py-20">
				<div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
					<motion.div
						variants={slideInLeft}
						initial="hidden"
						animate="visible"
						className="flex flex-col gap-6">
						<Badge className="w-fit" variant="outline">
							<Sparkles className="mr-1 h-3 w-3" />
							Collaborative Whiteboarding Reimagined
						</Badge>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							Bring your ideas to life{" "}
							<span className="text-primary">together</span>
						</h1>
						<p className="text-xl text-muted-foreground">
							The collaborative whiteboard platform that brings teams together
							to create, plan, and innovate—all in real-time.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Button size="lg" className="gap-2">
								Get started for free
								<ChevronRight className="h-4 w-4" />
							</Button>
							<Button size="lg" variant="outline" className="gap-2">
								See it in action
								<Compass className="h-4 w-4" />
							</Button>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<CheckCircle className="h-4 w-4 text-primary" />
							<span>No credit card required</span>
							<span className="mx-2">•</span>
							<CheckCircle className="h-4 w-4 text-primary" />
							<span>Free forever plan available</span>
						</div>
					</motion.div>

					<motion.div
						variants={slideInRight}
						initial="hidden"
						animate="visible"
						className="relative">
						<div className="relative aspect-video overflow-hidden rounded-xl border shadow-xl">
							<Image
								src="/placeholder.svg?height=720&width=1280"
								alt="Whiteboard app interface"
								className="object-cover"
								width={100}
								height={100}
							/>
							<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
						</div>

						<motion.div
							className="absolute -bottom-6 -left-6 rounded-lg bg-background p-3 shadow-lg"
							initial={{opacity: 0, scale: 0.8}}
							animate={{opacity: 1, scale: 1}}
							transition={{delay: 0.6, duration: 0.5}}>
							<div className="flex items-center gap-2">
								<div className="flex -space-x-2">
									{[1, 2, 3].map((i) => (
										<Avatar
											key={i}
											className="border-2 border-background h-8 w-8">
											<AvatarFallback>{`U${i}`}</AvatarFallback>
										</Avatar>
									))}
								</div>
								<span className="text-sm font-medium">3 people editing</span>
							</div>
						</motion.div>

						<motion.div
							className="absolute -top-6 -right-6 rounded-lg bg-background p-3 shadow-lg"
							initial={{opacity: 0, scale: 0.8}}
							animate={{opacity: 1, scale: 1}}
							transition={{delay: 0.8, duration: 0.5}}>
							<div className="flex items-center gap-2">
								<MessageSquare className="h-5 w-5 text-primary" />
								<span className="text-sm font-medium">Real-time comments</span>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
				<motion.div
					animate={{y: [0, 10, 0]}}
					transition={{repeat: Number.POSITIVE_INFINITY, duration: 2}}>
					<ChevronDown className="h-6 w-6 text-muted-foreground" />
				</motion.div>
			</div>
		</section>
	);
};
