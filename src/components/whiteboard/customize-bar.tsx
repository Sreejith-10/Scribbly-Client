import {ActionType, StrokeWidth} from "@/types/canvas.type";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {Menu} from "lucide-react";
import {Button} from "../ui/button";
import {ToggleGroup} from "@radix-ui/react-toggle-group";
import {ToggleGroupItem} from "../ui/toggle-group";
import {Dispatch, SetStateAction} from "react";
import {Slider} from "../ui/slider";
import {
	LuArrowDown,
	LuArrowDownToLine,
	LuArrowUp,
	LuArrowUpToLine,
} from "react-icons/lu";

const presetColors = ["#000", "#ff0000", "#43A047", "#ffff00", "#1e88e5"];

interface CustomizeBarProps {
	open: boolean;
	action: ActionType;
	stroke: string;
	setStroke: Dispatch<SetStateAction<string>>;
	backgroundColor: string;
	setBackgroundColor: Dispatch<SetStateAction<string>>;
	strokeWidth: StrokeWidth;
	setStrokeWidth: Dispatch<SetStateAction<StrokeWidth>>;
}

export const CustomizeBar = ({
	open,
	action,
	stroke = "#000",
	setStroke,
	backgroundColor,
	setBackgroundColor,
	strokeWidth,
	setStrokeWidth,
}: CustomizeBarProps) => {
	console.log(open, "customize");
	return (
		<div className="absolute top-5 left-5 z-[9999]">
			<Popover>
				<PopoverTrigger>
					<Button variant={"outline"} className="py-5">
						<Menu />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="ml-5 mt-2 w-fit">
					<div className="space-y-4">
						<div className="space-y-2">
							<b>Stroke</b>
							<div className="space-x-3">
								<ToggleGroup
									type="single"
									className="space-x-2"
									onValueChange={(value) => setStroke(value)}>
									{presetColors.map((color) => (
										<ToggleGroupItem
											key={color}
											value={color}
											className={`${
												stroke === color && "ring-[1px] ring-black"
											} inline-grid size-10 hover:border hover:border-slate-200 place-content-center`}>
											<span
												style={{background: `${color}`}}
												className="inline-block size-9 rounded-md"
											/>
										</ToggleGroupItem>
									))}
								</ToggleGroup>
							</div>
						</div>
						<div className="space-y-2">
							<b>Background</b>
							<div className="space-x-3">
								<ToggleGroup type="single" className="space-x-2">
									{presetColors.map((color) => (
										<ToggleGroupItem
											key={color}
											value={color}
											className="inline-grid size-10 hover:border hover:border-slate-200 place-content-center">
											<span
												style={{background: `${color}`}}
												className="inline-block size-9 rounded-md"
											/>
										</ToggleGroupItem>
									))}
								</ToggleGroup>
							</div>
						</div>
						<div className="space-y-2">
							<b>Stroke width</b>
							<div className="space-x-3">
								<ToggleGroup type="single" className="space-x-2">
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<span className="inline-block w-5 h-[2px] rounded-md bg-black" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<span className="inline-block w-5 h-[5px] rounded-md bg-black" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<span className="inline-block w-5 h-[8px] rounded-md bg-black" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
						<div className="space-y-2">
							<b>Stroke style</b>
							<div className="space-x-3">
								<ToggleGroup type="single" className="space-x-2">
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<span className="inline-block w-5 h-[2px] rounded-md border border-black" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<span className="inline-block w-5 h-[2px] rounded-md border border-black border-dashed" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<span className="inline-block w-5 h-[2px] rounded-md border border-black border-dotted" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
						<div className="space-y-2">
							<b>Edges</b>
							<div className="space-x-3">
								<ToggleGroup type="single" className="space-x-2">
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<span className="inline-block size-5 rounded-md border border-l-black  border-dashed" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<span className="inline-block size-5 rounded-md border border-black border-dashed" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
						<div className="space-y-2">
							<b>Opacity</b>
							<div className="space-x-3">
								<Slider defaultValue={[50]} />
							</div>
						</div>
						<div className="space-y-2">
							<b>Layers</b>
							<div className="space-x-3">
								<ToggleGroup type="single" className="space-x-2">
									<ToggleGroupItem
										value={"last"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<LuArrowDownToLine />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"last"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<LuArrowDown />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"last"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<LuArrowUp />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"fisrt"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center">
										<LuArrowUpToLine />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
