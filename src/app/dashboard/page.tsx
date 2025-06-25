"use client";

import {useState} from "react";
import {Plus, Search, Users, Clock, Grid3X3, List, Filter} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Separator} from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/dashboard/appsidebar";
import {BoardCard} from "@/components/dashboard/board-card";
import {ThemeToggle} from "@/components/ui/theme-toggle";
import {BoardCreation} from "@/components/dashboard/board-creation";
import {useQuery} from "@tanstack/react-query";
import {getBoardMetadata} from "@/controllers/board/board";
import {IBoardMetadata} from "@/types";
import Link from "next/link";

function CreateBoardDialog({onclick}: {onclick: () => void}) {
	return (
		<Card
			onClick={() => onclick()}
			className="group cursor-pointer border-2 border-dashed border-muted-foreground/25 transition-all hover:border-primary hover:bg-muted/50">
			<CardContent className="flex h-48 flex-col items-center justify-center p-6">
				<Plus className="size-8 text-muted-foreground group-hover:text-primary" />
				<h3 className="mt-2 font-medium">Create new board</h3>
				<p className="text-sm text-muted-foreground">
					Start with a blank canvas
				</p>
			</CardContent>
		</Card>
	);
}

export default function Dashboard() {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [openDialog, setOpenDialog] = useState<boolean>(false);

	const {data} = useQuery({
		queryKey: ["board_metadata"],
		queryFn: getBoardMetadata<{boardMetadatas: IBoardMetadata[]}>,
	});

	return (
		<>
			<BoardCreation
				open={openDialog}
				setOpen={(state: boolean) => setOpenDialog(state)}
			/>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<div className="flex flex-1 items-center gap-2">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search boards..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-9"
								/>
							</div>
							<Button
								className="cursor-pointer"
								onClick={() => setOpenDialog(true)}>
								<Plus className="size-4 mr-2" />
								New Board
							</Button>
						</div>
						<div className="flex items-center gap-2">
							<ThemeToggle />
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="icon">
										<Filter className="size-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>All boards</DropdownMenuItem>
									<DropdownMenuItem>My boards</DropdownMenuItem>
									<DropdownMenuItem>Shared boards</DropdownMenuItem>
									<DropdownMenuItem>Starred</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="icon">
										{viewMode === "grid" ? (
											<Grid3X3 className="size-4" />
										) : (
											<List className="size-4" />
										)}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => setViewMode("grid")}>
										<Grid3X3 className="size-4 mr-2" />
										Grid view
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setViewMode("list")}>
										<List className="size-4 mr-2" />
										List view
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className="size-8 cursor-pointer">
										<AvatarImage src="/placeholder-user.jpg" />
										<AvatarFallback>JD</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>Settings</DropdownMenuItem>
									<DropdownMenuItem>Sign out</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4">
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-2xl font-bold">Welcome back, John!</h1>
								<p className="text-muted-foreground">
									Continue working on your boards or start something new
								</p>
							</div>
						</div>
						<Tabs defaultValue="all" className="w-full">
							<TabsList className="grid w-full grid-cols-4">
								<TabsTrigger value="all">All Boards</TabsTrigger>
								<TabsTrigger value="recent">Recent</TabsTrigger>
								<TabsTrigger value="private">Private</TabsTrigger>
								<TabsTrigger value="public">Public</TabsTrigger>
							</TabsList>
							<TabsContent value="all" className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold">All boards</h2>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="sm">
											Sort by
										</Button>
									</div>
								</div>
								<div
									className={`grid gap-4 ${
										viewMode === "grid"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1"
									}`}>
									<CreateBoardDialog onclick={() => setOpenDialog(true)} />
									{data?.boardMetadatas.map((board) => (
										<Link
											href={`/board/${
												board.accessMode === "private" ? "private" : "public"
											}/${board.boardId}`}
											key={board.boardId}>
											<BoardCard board={board} type="recent" />
										</Link>
									))}
								</div>
							</TabsContent>
							<TabsContent value="recent" className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold">Recent boards</h2>
									<Button variant="ghost" size="sm">
										View all
									</Button>
								</div>
								<div
									className={`grid gap-4 ${
										viewMode === "grid"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1"
									}`}>
									<CreateBoardDialog onclick={() => setOpenDialog(true)} />
									{data?.boardMetadatas
										.sort((a, b) => {
											const d1 = new Date(a.createdAt);
											const d2 = new Date(b.createdAt);
											return d1.getTime() - d2.getTime();
										})
										.map((board) => (
											<Link
												href={`/board/${
													board.accessMode === "private" ? "private" : "public"
												}/${board.boardId}`}
												key={board.boardId}>
												<BoardCard board={board} type="recent" />
											</Link>
										))}
								</div>
							</TabsContent>
							<TabsContent value="private" className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold">Private</h2>
									<Button variant="ghost" size="sm">
										View all
									</Button>
								</div>
								<div
									className={`grid gap-4 ${
										viewMode === "grid"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1"
									}`}>
									<CreateBoardDialog onclick={() => setOpenDialog(true)} />
									{data?.boardMetadatas
										.filter((meta) => meta.accessMode === "private")
										.map((board) => (
											<Link
												href={`/board/${
													board.accessMode === "private" ? "private" : "public"
												}/${board.boardId}`}
												key={board.boardId}>
												<BoardCard board={board} type="private" />
											</Link>
										))}
								</div>
							</TabsContent>
							<TabsContent value="public" className="space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold">Public</h2>
									<Button variant="ghost" size="sm">
										View all
									</Button>
								</div>
								<div
									className={`grid gap-4 ${
										viewMode === "grid"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1"
									}`}>
									<CreateBoardDialog onclick={() => setOpenDialog(true)} />
									{data?.boardMetadatas
										.filter((meta) => meta.accessMode === "public")
										.map((board) => (
											<Link
												href={`/board/${
													board.accessMode === "private" ? "private" : "public"
												}/${board.boardId}`}
												key={board.boardId}>
												<BoardCard board={board} type="public" />
											</Link>
										))}
								</div>
							</TabsContent>
						</Tabs>
						<div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Boards
									</CardTitle>
									<Grid3X3 className="size-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">12</div>
									<p className="text-xs text-muted-foreground">
										+2 from last week
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Collaborators
									</CardTitle>
									<Users className="size-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">24</div>
									<p className="text-xs text-muted-foreground">
										+5 from last week
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Active Sessions
									</CardTitle>
									<Clock className="size-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">8</div>
									<p className="text-xs text-muted-foreground">
										Currently active
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
