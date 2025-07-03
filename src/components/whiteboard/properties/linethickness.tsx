import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {StrokeWidth} from "@/types";

export const LineThickness = ({thickness = 5}: {thickness?: number}) => {
	return (
		<Popover>
			<PopoverTrigger>
				<div className="size-6 rounded border-2 ring-2 ring-offset-1 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 grid place-content-center">
					<span className="inline-block w-5 h-[2px] rounded-md border border-black" />
				</div>
			</PopoverTrigger>
			<PopoverContent className="mb-4 flex gap-1 w-auto items-center flex-col">
				<div className="flex justify-between items-center mb-3 text-center">
					<h2 className="text-lg font-semibold">Stroke thickenss</h2>
				</div>
				<div className="flex gap-2">
					{Object.values(StrokeWidth)
						.filter((stroke) => Number(stroke))
						.map((stroke) => (
							<Button
								key={stroke}
								variant="outline"
								className="inline-grid size-10 border border-slate-200 rounded-md hover:border hover:border-slate-200 place-content-center cursor-pointer">
								<span
									className="inline-block w-5 rounded-md bg-black"
									style={{height: `${stroke}px`}}
								/>
							</Button>
						))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
