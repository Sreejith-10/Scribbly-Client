import {useToolbarStore} from "@/stores/canvas/useToolbarStore";
import {Minus, Plus} from "lucide-react";
import {BiRedo, BiUndo} from "react-icons/bi";

export const UndoRedo = () => {
	const zoom = useToolbarStore((state) => state.zoom);
	const setZoom = useToolbarStore((state) => state.setZoom);

	return (
		<div className="w-auto h-auto flex gap-3 px-4 py-2 rounded-lg shadow-md absolute bg-white border border-zinc-300 border-opacity-30 cursor-pointer z-9999">
			<div className="flex gap-2">
				<BiUndo className="size-6" />
				<BiRedo className="size-6" />
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
						if (zoom > 100) setZoom(zoom - 10);
					}}
				/>
			</div>
		</div>
	);
};
