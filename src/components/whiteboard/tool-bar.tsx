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
import {ActionType} from "@/types";
import {Hand} from "lucide-react";
import {useToolbarStore} from "@/stores/canvas";

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
			<div className="flex w-full gap-2 cursor-pointer">
				<div
					onClick={() => {
						setAction("move" as ActionType);
						if (!["select", "eraser", "move"].includes("move")) {
							setToolSelected(true);
						} else {
							setToolSelected(false);
						}
					}}
					aria-label={"move"}
					className={`size-8 rounded-md hover:bg-primary/50 flex items-center justify-center ${
						action === "move" ? "bg-primary" : "bg-white"
					}`}>
					<Hand className="size-5" />
				</div>
				{tools.map((tool, index) => (
					<div
						onClick={() => {
							setAction(tool.value as ActionType);
							if (!["select", "eraser", "move"].includes(tool.value)) {
								setToolSelected(true);
							} else {
								setToolSelected(false);
							}
						}}
						aria-label={tool.value}
						key={index}
						className={`size-8 rounded-md hover:bg-primary/50 flex items-center justify-center ${
							action === tool.value ? "bg-primary" : "bg-white"
						}`}>
						{tool.icon}
					</div>
				))}
			</div>
		</div>
	);
};
