import { Metadata } from 'next';
import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/appsidebar';
import { Topbar } from '@/components/dashboard/apptopbar';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'User dashboard',
};

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<Topbar />
					{children}
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
