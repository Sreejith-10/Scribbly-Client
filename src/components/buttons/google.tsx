import {cn} from "@/lib";
import {IoLogoGoogle} from "react-icons/io";
import {Button} from "../ui/button";

export const GoogleAuth = ({
	title,
	className,
}: {
	title?: string;
	className?: string;
}) => {
	return (
		<Button
			variant="outline"
			className={cn(
				"w-full h-auto rounded-md grid place-content-center py-2 border shadow-xs hover:bg-accent hover:text-accent-foreground",
				className
			)}>
			<IoLogoGoogle className="size-6" />
			{title}
		</Button>
	);
};
