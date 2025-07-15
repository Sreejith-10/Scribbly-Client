import {cn} from "@/lib";
import {IoLogoGithub} from "react-icons/io";
import {Button} from "../ui/button";

export const GithubAuth = ({
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
			<IoLogoGithub className="size-6" />
			{title}
		</Button>
	);
};
