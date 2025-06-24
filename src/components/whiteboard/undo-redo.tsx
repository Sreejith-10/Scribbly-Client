import {useCanvasStore} from "@/stores/canvas/useCanvasStore";
import {Minus, Plus} from "lucide-react";
import {BiRedo, BiUndo} from "react-icons/bi";
import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip";

export const UndoRedo = () => {
	const zoom = useCanvasStore((state) => state.zoom);
	const setZoom = useCanvasStore((state) => state.setZoom);

	return (
		<div className="w-max h-auto flex gap-3 px-4 py-2 rounded-lg shadow-md absolute bg-secondary cursor-pointer z-9999">
			<div className="flex gap-2">
				<Tooltip>
					<TooltipContent>undo</TooltipContent>
					<TooltipTrigger>
						<BiUndo className="size-6 cursor-pointer" />
					</TooltipTrigger>
				</Tooltip>
				<Tooltip>
					<TooltipContent>redo</TooltipContent>
					<TooltipTrigger>
						<BiRedo className="size-6 cursor-pointer" />
					</TooltipTrigger>
				</Tooltip>
			</div>
			<div className="flex gap-2">
				<Plus
					className="active:bg-slate-200 active:rounded-full"
					onClick={() => {
						if (zoom < 200) setZoom(zoom + 10);
					}}
				/>
				<span className="inline-block font-bold pointer-events-none">
					{zoom}%
				</span>
				<Minus
					className="active:bg-slate-200 active:rounded-full"
					onClick={() => {
						if (zoom > 10) setZoom(zoom - 10);
					}}
				/>
			</div>
		</div>
	);
};
