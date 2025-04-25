import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {Menu} from "lucide-react";
import {Button} from "../ui/button";
import {ToggleGroup} from "../ui/toggle-group";
import {ToggleGroupItem} from "../ui/toggle-group";
import {Slider} from "../ui/slider";
import {
	LuArrowDown,
	LuArrowDownToLine,
	LuArrowUp,
	LuArrowUpToLine,
} from "react-icons/lu";
import {useToolbarStore} from "@/stores/useToolbarStore";
import {useBoardStore} from "@/stores/useBoardStore";

const presetColors = ["#000", "#ff0000", "#43A047", "#ffff00", "#1e88e5"];
const presetBgColors = ["#ff0000", "#43A047", "#ffff00", "#1e88e5"];

export const CustomizeBar = () => {
	const {action, stroke, setStroke, setStrokeWidth, fill, setFill} =
		useToolbarStore();

	const {currentShapeSelected, updateCurrentShapeSelected} = useBoardStore();

	return (
		<div className="fixed top-5 left-5 z-50">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant={"outline"} className="py-5 cursor-pointer">
						<Menu />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="ml-5 mt-2 w-fit">
					<div className="space-y-4">
						<div>
							<b className="inline-block mb-3">Stroke</b>
							<div className="space-x-3">
								{presetColors.map((value, index) => (
									<button
										key={index}
										style={{background: `${value}`}}
										className={`size-9 rounded-md cursor-pointer ${
											stroke === value && "ring-2 ring-zinc-500 ring-offset-2"
										}`}
										onClick={() => {
											setStroke(value);
											if (currentShapeSelected)
												updateCurrentShapeSelected({stroke: value});
										}}
									/>
								))}
							</div>
						</div>
						{!["line", "arrow", "free"].includes(action) && (
							<div className="space-y-2">
								<b>Background</b>
								<div className="space-x-3">
									<ToggleGroup
										type="single"
										className="space-x-2"
										onValueChange={(value) => {
											setFill(value);
											if (currentShapeSelected)
												updateCurrentShapeSelected({fill: value});
										}}>
										<ToggleGroupItem
											defaultChecked={fill === "ffffff0"}
											key="tr"
											value={"#ffffff0"}
											className={
												"inline-grid size-10 hover:border hover:rounded-md hover:border-slate-200 place-content-center first:rounded-l-md last:rounded-r-md cursor-pointer data-[state=on]:ring-2 data-[state=on]:ring-slate-300 data-[state=on]:rounded-md data-[state=on]:last:rounded-l-md data-[state=on]:last:rounded-r-md"
											}>
											<span className="inline-block size-9 rounded-md bg-gray-100" />
										</ToggleGroupItem>
										{presetBgColors.map((color) => (
											<ToggleGroupItem
												key={color}
												value={color}
												className={
													"inline-grid size-10 hover:border hover:rounded-md hover:border-slate-200 place-content-center first:rounded-l-md last:rounded-r-md cursor-pointer data-[state=on]:ring-2 data-[state=on]:ring-slate-300 data-[state=on]:rounded-md data-[state=on]:last:rounded-l-md data-[state=on]:last:rounded-r-md"
												}>
												<span
													style={{background: `${color}`}}
													className="inline-block size-9 rounded-md"
												/>
											</ToggleGroupItem>
										))}
									</ToggleGroup>
								</div>
							</div>
						)}
						<div className="space-y-2">
							<b>Stroke width</b>
							<div className="space-x-3">
								<ToggleGroup
									type="single"
									className="space-x-2"
									onValueChange={(value) => setStroke(value)}>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<span className="inline-block w-5 h-[2px] rounded-md bg-black" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<span className="inline-block w-5 h-[5px] rounded-md bg-black" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<span className="inline-block w-5 h-[8px] rounded-md bg-black" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
						<div className="space-y-2">
							<b>Stroke style</b>
							<div className="space-x-3">
								<ToggleGroup
									type="single"
									className="space-x-2"
									onValueChange={(stroke) =>
										setStrokeWidth(parseInt(stroke, 10))
									}>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<span className="inline-block w-5 h-[2px] rounded-md border border-black" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content- cursor-pointer">
										<span className="inline-block w-5 h-[2px] rounded-md border border-black border-dashed" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
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
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<span className="inline-block size-5 rounded-md border border-l-black  border-dashed" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"5"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<span className="inline-block size-5 rounded-md border border-black border-dashed" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
						<div className="space-y-3">
							<b>Opacity</b>
							<div>
								<Slider defaultValue={[50]} />
							</div>
						</div>
						<div className="space-y-2">
							<b>Layers</b>
							<div className="space-x-3">
								<ToggleGroup type="single" className="space-x-2">
									<ToggleGroupItem
										value={"last"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<LuArrowDownToLine />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"last"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<LuArrowDown />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"last"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
										<LuArrowUp />
									</ToggleGroupItem>
									<ToggleGroupItem
										value={"fisrt"}
										className="inline-grid size-10 border border-slate-200 rounded-xl hover:border hover:border-slate-200 place-content-center cursor-pointer">
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
