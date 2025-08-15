import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Scribbly Signup',
	description: 'Scribbly user signup page',
};

export default function SignupLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<div className='grid min-h-svh lg:grid-cols-2'>
			{children}
			<div className='bg-secondary hidden h-full w-full bg-[radial-gradient(var(--primary),transparent_1px)] [background-size:26px_26px] lg:block' />
		</div>
	);
}
