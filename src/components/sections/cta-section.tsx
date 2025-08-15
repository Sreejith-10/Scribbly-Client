'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { ChevronRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export const CTASection = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section className='py-20' id='cta' ref={ref}>
			<div className='container mx-auto px-4'>
				<motion.div
					className='bg-primary/10 relative overflow-hidden rounded-2xl p-8 md:p-12 lg:p-16'
					initial={{ opacity: 0, y: 20 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
					}
					transition={{ duration: 0.6 }}
				>
					<div className='absolute inset-0 -z-10'>
						<div className='from-primary/20 absolute inset-0 bg-gradient-to-br to-transparent'></div>
						<div className='bg-primary/10 absolute right-0 bottom-0 h-1/3 w-1/3 rounded-full blur-3xl'></div>
						<div className='bg-primary/10 absolute top-0 left-0 h-1/4 w-1/4 rounded-full blur-3xl'></div>
					</div>

					<div className='grid items-center gap-8 md:grid-cols-2'>
						<div>
							<motion.h2
								className='text-3xl font-bold tracking-tight sm:text-4xl'
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								Ready to transform how your team collaborates?
							</motion.h2>
							<motion.p
								className='mt-4 text-xl'
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								Join thousands of teams already using our
								platform to bring their ideas to life.
							</motion.p>
							<motion.div
								className='mt-8 flex flex-col gap-4 sm:flex-row'
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<Button size='lg' className='gap-2'>
									Get started for free
									<ChevronRight className='h-4 w-4' />
								</Button>
								<Button
									size='lg'
									variant='outline'
									className='gap-2'
								>
									Schedule a demo
									<Compass className='h-4 w-4' />
								</Button>
							</motion.div>
						</div>

						<motion.div
							className='relative'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={
								isInView
									? { opacity: 1, scale: 1 }
									: { opacity: 0, scale: 0.9 }
							}
							transition={{ duration: 0.6, delay: 0.5 }}
						>
							<div className='aspect-video overflow-hidden rounded-xl border shadow-lg'>
								<Image
									src='/placeholder.svg?height=400&width=600'
									alt='Whiteboard app demo'
									className='h-full w-full object-cover'
									width={100}
									height={100}
								/>
							</div>

							<motion.div
								className='bg-background absolute -bottom-4 -left-4 rounded-lg p-3 shadow-lg'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={
									isInView
										? { opacity: 1, scale: 1 }
										: { opacity: 0, scale: 0.8 }
								}
								transition={{ delay: 0.8, duration: 0.5 }}
							>
								<div className='flex items-center gap-2'>
									<Sparkles className='text-primary h-5 w-5' />
									<span className='text-sm font-medium'>
										Start creating now
									</span>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
