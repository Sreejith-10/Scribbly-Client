import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
	title: "Board",
	description: "Srcibbly Board",
};

export default function BoardLayout({
	children,
}: Readonly<{children: ReactNode}>) {
	return <>{children}</>;
}
