import {DotsBackground} from "@/components/ui/dots-bg";
import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
	title: "Invitation Page",
	description: "Scribbly board invitation page",
};

export default function InvitationLayout({
	children,
}: Readonly<{children: ReactNode}>) {
	return (
		<div className="w-full h-screen grid place-content-center relative select-none">
			<DotsBackground />
			{children}
		</div>
	);
}
