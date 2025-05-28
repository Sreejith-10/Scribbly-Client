import {Menu, Monitor, Moon, Save, Sun, Trash2} from "lucide-react";
import {Button} from "../ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {ToggleGroup, ToggleGroupItem} from "../ui/toggle-group";
import {ReactNode} from "react";
import {useTheme} from "next-themes";

interface ICanvasMenu {}

const themeIcons: {icon: ReactNode; value: string}[] = [
	{
		icon: <Sun />,
		value: "light",
	},
	{
		icon: <Moon />,
		value: "dark",
	},
	{
		icon: <Monitor />,
		value: "system",
	},
];

export const CanvasMenu = ({}: ICanvasMenu) => {
	const {theme, setTheme, systemTheme} = useTheme();
	return (
		<div className="fixed top-5 left-5 z-50">
			<Popover>
				<PopoverTrigger>
					<Button className="cursor-pointer" variant={"outline"}>
						<Menu />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="ml-5 mt-2 flex flex-col gap-5">
					<button className="flex items-center gap-5 font-semibold">
						<Save className="size-5" />
						Save
					</button>
					<button className="flex items-center gap-5 font-semibold">
						<Trash2 className="size-5" />
						Clear canvas
					</button>
					<div className="flex items-center justify-between">
						<span>
							<h1 className="font-semibold">Theme</h1>
						</span>
						<ToggleGroup
							type="single"
							onValueChange={(value) => {
								if (value === "system") {
									setTheme(systemTheme === "light" ? "light" : "dark");
								} else {
									setTheme(value);
								}
							}}
							defaultValue={theme === systemTheme ? "system" : theme}>
							{themeIcons.map((item, index) => (
								<ToggleGroupItem
									key={index}
									aria-label={item.value}
									value={item.value}
									className="cursor-pointer hover:bg-blue-100 data-[state=on]:bg-blue-300">
									{item.icon}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
