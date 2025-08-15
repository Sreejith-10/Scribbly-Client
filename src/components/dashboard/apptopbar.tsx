'use client';

import Link from 'next/link';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { ThemeToggle } from '../ui/theme-toggle';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useUser } from '@/hooks/query/user/useUser';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useLogoutUser } from '@/hooks/mutation/auth';

export function Topbar() {
	const router = useRouter();

	const { data } = useUser();
	const logoutMutation = useLogoutUser();

	return (
		<>
			<header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4'>
				<SidebarTrigger className='-ml-1' />
				<Separator orientation='vertical' className='mr-2 h-4' />
				<div className='flex items-center gap-2'>
					<ThemeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className='size-8 cursor-pointer'>
								<AvatarImage src='/placeholder-user.jpg' />
								<AvatarFallback>
									{data?.username
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									logoutMutation.mutate(undefined, {
										onSuccess: () => {
											toast.success('user logged out');
											router.push('/');
										},
									});
								}}
							>
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<div className='flex w-full items-center justify-start gap-3 px-6 py-3 md:hidden'>
				<div className='bg-secondary rounded-md border-2 p-1'>
					<Link href='/dashboard/all'>All</Link>
				</div>
				<div className='bg-secondary rounded-md border-2 p-1'>
					<Link href='/dashboard/recent'>recent</Link>
				</div>
			</div>
		</>
	);
}
