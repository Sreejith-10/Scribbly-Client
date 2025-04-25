import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Srcibbly dashboard",
};

export default function DashboardLayout({
	children,
}: Readonly<{children: ReactNode}>) {
	return <>{children}</>;
}
