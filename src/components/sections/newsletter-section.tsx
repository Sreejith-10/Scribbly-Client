"use client";

import {useRef} from "react";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {motion, useInView} from "motion/react";

export const NewsletterSection = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, {once: true, amount: 0.2});

	return (
		<section className="py-12 bg-background" ref={ref}>
			<div className="container mx-auto px-4">
				<motion.div
					className="max-w-3xl mx-auto text-center"
					initial={{opacity: 0, y: 20}}
					animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
					transition={{duration: 0.6}}>
					<h3 className="text-2xl font-bold mb-4">
						Stay updated with our newsletter
					</h3>
					<p className="text-muted-foreground mb-6">
						Get the latest news, product updates, and tips delivered to your
						inbox.
					</p>
					<div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
						<Input
							placeholder="Enter your email"
							type="email"
							className="flex-1"
						/>
						<Button>Subscribe</Button>
					</div>
					<p className="text-xs text-muted-foreground mt-4">
						By subscribing, you agree to our Privacy Policy and consent to
						receive updates.
					</p>
				</motion.div>
			</div>
		</section>
	);
};
