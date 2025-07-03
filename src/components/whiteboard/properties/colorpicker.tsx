import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";

export const ColorPicker = ({
	title,
	defaultColor = "#FFFFFFF",
	onChangeHandler,
}: {
	title: string;
	defaultColor?: string;
	onChangeHandler: (color: string) => void;
}) => {
	const [selectedColor, setSelectedColor] = useState<string>(defaultColor);

	const predefinedColors = [
		"#ef4444",
		"#f97316",
		"#f59e0b",
		"#eab308",
		"#84cc16",
		"#22c55e",
		"#10b981",
		"#14b8a6",
		"#06b6d4",
		"#0ea5e9",
		"#3b82f6",
		"#6366f1",
		"#8b5cf6",
		"#a855f7",
		"#d946ef",
		"#ec4899",
		"#f43f5e",
		"#64748b",
		"#6b7280",
		"#374151",
		"#111827",
		"#000000",
		"#ffffff",
		"#0002050",
	];

	const handlePredefinedColorClick = (color: string) => {
		setSelectedColor(color);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div
					className="size-6 rounded border-2 ring-2 ring-offset-1 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
					style={{backgroundColor: selectedColor}}
				/>
			</PopoverTrigger>
			<PopoverContent className="p-0 bg-secondary">
				<div className="flex items-center justify-center z-50 p-2">
					<div className="rounded-lg p-2 max-w-xs w-full">
						<div className="flex justify-between items-center mb-3">
							<h2 className="text-lg font-semibold">{title}</h2>
						</div>
						<div className="grid grid-cols-6 gap-2 mb-3">
							{predefinedColors.map((color, index) => (
								<button
									key={index}
									className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors duration-150 hover:scale-110 t
									ransform cursor-pointer"
									style={{backgroundColor: color}}
									onClick={() => {
										handlePredefinedColorClick(color);
										onChangeHandler(color);
									}}
									title={color}
								/>
							))}
						</div>
						<div className="flex items-center justify-center p-2 rounded">
							<div
								className="w-6 h-6 rounded border border-gray-300 mr-2"
								style={{backgroundColor: selectedColor}}
							/>
							<span className="font-mono text-sm font-semibold">
								{selectedColor.toUpperCase()}
							</span>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
