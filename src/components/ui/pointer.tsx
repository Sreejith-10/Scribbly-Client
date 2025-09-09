import { cn } from '@/lib';
import { memo } from 'react';

interface PointerProps {
	x: number;
	y: number;
	color: string;
	username: string;
	className?: string;
}

export const Pointer = memo(
	({ color, username, x, y, className }: PointerProps) => {
		return (
			<div
				className={cn(
					'pointer-events-none absolute z-10 transition-all duration-200 ease-out',
					className,
				)}
				style={{
					left: x,
					top: y,
					transform: 'translate(-2px, -2px)',
				}}
			>
				<div className='relative'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='lucide lucide-mouse-pointer2-icon lucide-mouse-pointer-2 drop-shadow-lg'
					>
						<path
							fill={color}
							stroke='#00000056'
							strokeWidth='2'
							d='M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z'
						/>
					</svg>

					<div
						className='absolute top-4 left-4 rounded px-2 py-1 text-xs font-medium whitespace-nowrap text-white shadow-lg'
						style={{ backgroundColor: color }}
					>
						{username}
					</div>
				</div>

				<div
					className='absolute h-8 w-8 animate-ping rounded-full opacity-20'
					style={{ backgroundColor: color, top: -4, left: -4 }}
				/>
			</div>
		);
	},
);
