import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './theme-toggle';

interface NavItem {
	name: string;
	href: string;
	description: string;
}

interface MobileMenuProps {
	isOpen: boolean;
	navItems: NavItem[];
	onClose: () => void;
}

export function MobileMenu({ isOpen, navItems, onClose }: MobileMenuProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (isOpen) {
			console.log('open');
			document.body.style.overflowY = 'hidden';
		}
		setMounted(true);

		return () => {
			document.body.style.overflowY = 'auto';
		};
	}, [isOpen]);

	if (!mounted) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: '-100%' }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: '-100%' }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className='fixed inset-0 z-50'
				>
					<div className='bg-secondary relative top-0 flex h-dvh flex-col'>
						<div className='flex items-center justify-end px-4 py-3'>
							<X onClick={onClose} />
						</div>
						<div className='flex grow flex-col items-center justify-center space-y-8'>
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className='hover:text-primary text-2xl font-medium text-gray-900'
									onClick={onClose}
								>
									{item.name}
								</Link>
							))}
							<div className='hover:text-primary text-2xl font-medium text-gray-900'>
								More
							</div>
							<div className='space-y-4 text-center'>
								<Link
									href='/help'
									className='hover:text-primary block text-lg text-gray-600'
									onClick={onClose}
								>
									Help Center
								</Link>
								<Link
									href='/blog'
									className='hover:text-primary block text-lg text-gray-600'
									onClick={onClose}
								>
									Blog
								</Link>
								<Link
									href='/community'
									className='hover:text-primary block text-lg text-gray-600'
									onClick={onClose}
								>
									Community
								</Link>
							</div>
							<ThemeToggle />
						</div>
						<div className='border-t border-gray-200 p-4'>
							<div className='mb-4 flex items-center justify-center'>
								<div className='mr-4 h-12 w-12 rounded-full bg-gray-300'></div>
								<div>
									<div className='text-lg font-medium text-gray-900'>
										John Doe
									</div>
									<div className='text-sm text-gray-500'>
										john@example.com
									</div>
								</div>
							</div>
							<div className='flex justify-center space-x-4'>
								<Link
									href='/profile'
									className='hover:text-primary text-gray-600'
									onClick={onClose}
								>
									Profile
								</Link>
								<Link
									href='/settings'
									className='hover:text-primary text-gray-600'
									onClick={onClose}
								>
									Settings
								</Link>
								<button
									className='flex items-center text-red-600 hover:text-red-800'
									onClick={onClose}
								>
									<LogOut className='mr-2 h-5 w-5' />
									Logout
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
