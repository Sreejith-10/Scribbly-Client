'use client';

import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { useState, useRef } from 'react';
import { CheckCircle, Lightbulb, Share2, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';

export const HowItWorksSection = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });
	const [activeTab, setActiveTab] = useState('create');

	const steps = [
		{
			id: 'create',
			title: 'Create',
			description:
				'Start with a blank canvas or choose from dozens of templates',
			image: '/placeholder.svg?height=600&width=800',
			icon: Lightbulb,
		},
		{
			id: 'collaborate',
			title: 'Collaborate',
			description:
				'Invite your team to join and work together in real-time',
			image: '/placeholder.svg?height=600&width=800',
			icon: Users,
		},
		{
			id: 'share',
			title: 'Share',
			description:
				'Share your work with stakeholders or export to other formats',
			image: '/placeholder.svg?height=600&width=800',
			icon: Share2,
		},
	];

	return (
		<section className='py-20' id='how-it-works' ref={ref}>
			<div className='container mx-auto px-4'>
				<motion.div
					className='mb-16 text-center'
					initial={{ opacity: 0, y: 20 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
					}
					transition={{ duration: 0.6 }}
				>
					<h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
						How it works
					</h2>
					<p className='text-muted-foreground mx-auto mt-4 max-w-3xl text-xl'>
						Get started in minutes and transform how your team
						collaborates
					</p>
				</motion.div>

				<div className='mt-12'>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'
					>
						<TabsList className='mb-12 grid h-auto w-full grid-cols-3 bg-inherit'>
							{steps.map((step) => (
								<TabsTrigger
									key={step.id}
									value={step.id}
									className='data-[state=active]:border-transperent relative bg-inherit py-3'
								>
									<div className='flex flex-col items-center gap-2'>
										<step.icon className='h-5 w-5' />
										<span>{step.title}</span>
									</div>
									{activeTab === step.id && (
										<motion.div
											className='bg-primary/20 absolute right-0 bottom-0 left-0 h-0.5'
											layoutId='activeTabIndicator'
											transition={{
												type: 'spring',
												stiffness: 300,
												damping: 30,
											}}
										/>
									)}
								</TabsTrigger>
							))}
						</TabsList>

						{steps.map((step) => (
							<TabsContent
								key={step.id}
								value={step.id}
								className='mt-0'
							>
								<div className='grid items-center gap-8 md:grid-cols-2'>
									<motion.div
										initial={{ opacity: 0, x: -30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5 }}
									>
										<h3 className='mb-4 text-2xl font-bold'>
											{step.title}
										</h3>
										<p className='text-muted-foreground mb-6 text-lg'>
											{step.description}
										</p>
										<ul className='space-y-3'>
											{[1, 2, 3].map((i) => (
												<li
													key={i}
													className='flex items-start gap-3'
												>
													<CheckCircle className='text-primary mt-0.5 h-5 w-5' />
													<span>
														Feature point about{' '}
														{step.title.toLowerCase()}{' '}
														functionality
													</span>
												</li>
											))}
										</ul>
										<Button className='mt-8'>
											Learn more
										</Button>
									</motion.div>

									<motion.div
										className='overflow-hidden rounded-xl border shadow-lg'
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.5,
											delay: 0.2,
										}}
									>
										<Image
											src={
												step.image || '/placeholder.svg'
											}
											alt={step.title}
											className='h-auto w-full'
											width={100}
											height={100}
										/>
									</motion.div>
								</div>
							</TabsContent>
						))}
					</Tabs>
				</div>
			</div>
		</section>
	);
};
