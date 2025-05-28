import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "User dashboard",
};

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
	return <div>{children}</div>;
}
