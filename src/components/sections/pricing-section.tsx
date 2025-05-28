"use client";

import {useRef, useState} from "react";
import {motion, useInView} from "motion/react";
import {Card, CardContent} from "../ui/card";
import {Button} from "../ui/button";
import {CheckCircle} from "lucide-react";

const staggerContainer = {
	hidden: {opacity: 0},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const staggerItem = {
	hidden: {opacity: 0, y: 20},
	visible: {
		opacity: 1,
		y: 0,
		transition: {duration: 0.5, ease: "easeOut"},
	},
};

export const PricingSection = () => {
	const [billingCycle, setBillingCycle] = useState("monthly");
	const ref = useRef(null);
	const isInView = useInView(ref, {once: true, amount: 0.2});

	const plans = [
		{
			name: "Free",
			description: "For individuals and small teams just getting started",
			price: {monthly: "$0", annually: "$0"},
			features: [
				"Up to 3 boards",
				"Basic templates",
				"Up to 5 collaborators",
				"7-day history",
				"1GB storage",
			],
			cta: "Get started",
			popular: false,
		},
		{
			name: "Pro",
			description: "For growing teams that need more power and flexibility",
			price: {monthly: "$12", annually: "$10"},
			priceDetail: "per user/month",
			features: [
				"Unlimited boards",
				"All templates",
				"Unlimited collaborators",
				"30-day history",
				"10GB storage",
				"Priority support",
				"Custom exports",
			],
			cta: "Start free trial",
			popular: true,
		},
		{
			name: "Enterprise",
			description: "For organizations that need advanced security and control",
			price: {monthly: "Custom", annually: "Custom"},
			features: [
				"Everything in Pro",
				"SSO & advanced security",
				"Admin controls",
				"Unlimited history",
				"Unlimited storage",
				"Dedicated support",
				"Custom integrations",
				"SLA guarantee",
			],
			cta: "Contact sales",
			popular: false,
		},
	];

	return (
		<section className="py-20" id="pricing" ref={ref}>
			<div className="container mx-auto px-4">
				<motion.div
					className="text-center mb-16"
					initial={{opacity: 0, y: 20}}
					animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
					transition={{duration: 0.6}}>
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Simple, transparent pricing
					</h2>
					<p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
						Choose the plan that&apos;s right for your team
					</p>

					<div className="mt-8 flex justify-center">
						<div className="inline-flex items-center rounded-full border p-1 bg-muted/50">
							<button
								className={`rounded-full px-4 py-2 text-sm ${
									billingCycle === "monthly" ? "bg-background shadow-sm" : ""
								}`}
								onClick={() => setBillingCycle("monthly")}>
								Monthly
							</button>
							<button
								className={`rounded-full px-4 py-2 text-sm ${
									billingCycle === "annually" ? "bg-background shadow-sm" : ""
								}`}
								onClick={() => setBillingCycle("annually")}>
								Annually <span className="text-xs text-primary">Save 15%</span>
							</button>
						</div>
					</div>
				</motion.div>

				<motion.div
					className="grid gap-8 md:grid-cols-3"
					variants={staggerContainer}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}>
					{plans.map((plan, i) => (
						<motion.div
							key={i}
							variants={staggerItem}
							className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}>
							<Card
								className={`h-full overflow-hidden transition-all ${
									plan.popular ? "border-primary shadow-lg" : ""
								}`}>
								{plan.popular && (
									<div className="absolute top-0 right-0">
										<div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
											Most Popular
										</div>
									</div>
								)}
								<CardContent className="p-6">
									<h3 className="text-2xl font-bold">{plan.name}</h3>
									<p className="mt-2 text-sm text-muted-foreground h-12">
										{plan.description}
									</p>

									<div className="mt-6 mb-6">
										<div className="flex items-end">
											<span className="text-4xl font-bold">
												{plan.price[billingCycle]}
											</span>
											{plan.priceDetail && (
												<span className="ml-2 text-sm text-muted-foreground">
													{plan.priceDetail}
												</span>
											)}
										</div>
										{billingCycle === "annually" &&
											plan.price.monthly !== plan.price.annually &&
											plan.price.annually !== "Custom" && (
												<p className="mt-1 text-xs text-primary">
													Save 15% with annual billing
												</p>
											)}
									</div>

									<Button
										className={`w-full ${
											plan.popular ? "" : "variant-outline"
										}`}
										variant={plan.popular ? "default" : "outline"}>
										{plan.cta}
									</Button>

									<div className="mt-6">
										<p className="text-sm font-medium mb-2">Includes:</p>
										<ul className="space-y-2">
											{plan.features.map((feature, j) => (
												<li key={j} className="flex items-start gap-2 text-sm">
													<CheckCircle className="h-4 w-4 text-primary mt-0.5" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					className="mt-16 text-center"
					initial={{opacity: 0}}
					animate={isInView ? {opacity: 1} : {opacity: 0}}
					transition={{duration: 0.6, delay: 0.6}}>
					<p className="text-muted-foreground">
						Need a custom plan?{" "}
						<a href="#" className="text-primary font-medium">
							Contact our sales team
						</a>
					</p>
				</motion.div>
			</div>
		</section>
	);
};
