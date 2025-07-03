import {Button} from "@/components/ui/button";
import {
	LuArrowDown,
	LuArrowDownToLine,
	LuArrowUp,
	LuArrowUpToLine,
} from "react-icons/lu";

export const LayerButtons = () => {
	return (
		<div className="space-x-3 h-full">
			<Button
				variant={"outline"}
				className="inline-grid h-full border border-slate-200 rounded-md hover:border hover:border-slate-200 place-content-center cursor-pointer">
				<LuArrowDown />
			</Button>
			<Button
				variant={"outline"}
				className="inline-grid h-full border border-slate-200 rounded-md hover:border hover:border-slate-200 place-content-center cursor-pointer">
				<LuArrowUp />
			</Button>
			<Button
				variant={"outline"}
				className="inline-grid h-full border border-slate-200 rounded-md hover:border hover:border-slate-200 place-content-center cursor-pointer">
				<LuArrowDownToLine />
			</Button>
			<Button
				variant={"outline"}
				className="inline-grid h-full border border-slate-200 rounded-md hover:border hover:border-slate-200 place-content-center cursor-pointer">
				<LuArrowUpToLine />
			</Button>
		</div>
	);
};
