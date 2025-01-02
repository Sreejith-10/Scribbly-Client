import {BiRedo, BiUndo} from "react-icons/bi";

export const UndoRedo = () => {
	return (
		<div className="flex w-fit h-auto px-4 py-2 rounded-lg shadow-md absolute border border-slate-500 border-opacity-30 cursor-pointer z-[9999]">
			<BiUndo className="size-6"/>
			<BiRedo />
		</div>
	);
};
