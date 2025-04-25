import {ToggleGroup, ToggleGroupItem} from "../ui/toggle-group";
import {
	LuDiamond,
	LuMousePointer2,
	LuPencil,
	LuTextCursor,
} from "react-icons/lu";
import {FaRegSquare, FaRegCircle} from "react-icons/fa";
import {FaArrowRight} from "react-icons/fa6";
import {GoDash} from "react-icons/go";
import {IoImageOutline} from "react-icons/io5";
import {BiEraser} from "react-icons/bi";
import {ReactNode} from "react";
import {ActionType} from "@/types/canvas.types";
import {Hand} from "lucide-react";
import {useToolbarStore} from "@/stores/useToolbarStore";

interface Tools {
	icon: ReactNode;
	value: ActionType;
}

const tools = [
	{
		icon: <LuMousePointer2 />,
		value: ActionType.SELECT,
	},
	{
		icon: <FaRegSquare />,
		value: ActionType.RECTANGLE,
	},
	{
		icon: <FaRegCircle />,
		value: ActionType.CIRCLE,
	},
	{
		icon: <LuDiamond />,
		value: ActionType.DIAMOND,
	},
	{
		icon: <FaArrowRight />,
		value: ActionType.ARROW,
	},
	{
		icon: <GoDash />,
		value: ActionType.LINE,
	},
	{
		icon: <LuPencil />,
		value: ActionType.FREE,
	},
	{
		icon: <LuTextCursor />,
		value: ActionType.TEXT,
	},
	{
		icon: <IoImageOutline />,
		value: ActionType.IMAGE,
	},
	{
		icon: <BiEraser />,
		value: ActionType.ERASER,
	},
] satisfies Tools[];

export const ToolBar = () => {
	const {action, setAction, setToolSelected} = useToolbarStore();

	return (
		<div className="w-fit h-auto p-2 rounded-lg shadow-md bg-white border border-zinc-300 border-opacity-30 fixed top-5 left-1/2 -translate-x-1/2 z-9">
			<ToggleGroup
				type="single"
				onValueChange={(value) => {
					if (value) {
						setAction(value as ActionType);
						if (!["select", "eraser", "move"].includes(value)) {
							setToolSelected(true);
						} else {
							setToolSelected(false);
						}
					}
				}}>
				<ToggleGroupItem
					value="move"
					aria-label="move"
					className={`hover:bg-blue-100 cursor-pointer ${
						action === "move" && "bg-blue-300 text-blue-600"
					} data-[state=on]:bg-blue-300 data-[state=on]:text-blue-600`}>
					<Hand />
				</ToggleGroupItem>
				{tools.map((t, index) => (
					<ToggleGroupItem
						value={t.value}
						key={index}
						aria-label={t.value}
						className={`hover:bg-blue-100 cursor-pointer ${
							action === t.value && "bg-blue-300 text-blue-600"
						} data-[state=on]:bg-blue-300 data-[state=on]:text-blue-600`}>
						{t.icon}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
};
