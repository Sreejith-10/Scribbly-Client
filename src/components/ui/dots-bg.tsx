import {cn} from "@/lib/utils";

export const DotsBackground = ({className}: Readonly<{className?: string}>) => {
	return (
		<div
			className={cn(
				className,
				(className =
					"absolute inset-0 -z-10 h-full w-full bg-secondary bg-[radial-gradient(var(--primary),transparent_1px)] [background-size:26px_26px]")
			)}
		/>
	);
};
