import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

const predefinedColors = [
	'#ef4444',
	'#f97316',
	'#f59e0b',
	'#eab308',
	'#84cc16',
	'#22c55e',
	'#10b981',
	'#14b8a6',
	'#06b6d4',
	'#0ea5e9',
	'#3b82f6',
	'#6366f1',
	'#8b5cf6',
	'#a855f7',
	'#d946ef',
	'#ec4899',
	'#f43f5e',
	'#64748b',
	'#6b7280',
	'#374151',
	'#111827',
	'#000000',
	'#ffffff',
	'#0002050',
];

export const ColorPicker = ({
	title,
	defaultColor = '#FFFFFFF',
	onChangeHandler,
}: {
	title: string;
	defaultColor?: string;
	onChangeHandler: (color: string) => void;
}) => {
	const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
	const [open, setOpen] = useState<boolean>(false);

	const handlePredefinedColorClick = (color: string) => {
		setSelectedColor(color);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={(open) => setOpen(open)}>
			<PopoverTrigger asChild>
				<div
					className='size-6 cursor-pointer rounded border-2 shadow-lg ring-2 ring-offset-1 transition-transform duration-200 hover:scale-110'
					style={{ backgroundColor: selectedColor }}
					onClick={() => setOpen(true)}
				/>
			</PopoverTrigger>
			<PopoverContent className='bg-secondary p-0'>
				<div className='z-50 flex items-center justify-center p-2'>
					<div className='w-full max-w-xs rounded-lg p-2'>
						<div className='mb-3 flex items-center justify-between'>
							<h2 className='text-lg font-semibold'>{title}</h2>
						</div>
						<div className='mb-3 grid grid-cols-6 gap-2'>
							{predefinedColors.map((color, index) => (
								<button
									key={index}
									className='t ransform h-8 w-8 cursor-pointer rounded border-2 border-gray-200 transition-colors duration-150 hover:scale-110 hover:border-gray-400'
									style={{ backgroundColor: color }}
									onClick={() => {
										handlePredefinedColorClick(color);
										onChangeHandler(color);
									}}
									title={color}
								/>
							))}
						</div>
						<div className='flex items-center justify-center rounded p-2'>
							<div
								className='mr-2 h-6 w-6 rounded border border-gray-300'
								style={{ backgroundColor: selectedColor }}
							/>
							<span className='font-mono text-sm font-semibold'>
								{selectedColor.toUpperCase()}
							</span>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
