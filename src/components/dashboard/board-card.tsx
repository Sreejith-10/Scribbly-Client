import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Link, MoreVertical, Users} from "lucide-react";
import {IBoardMetadata} from "@/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface IBoardCardProps {
	board: IBoardMetadata;
	type: string;
}

export function BoardCard({board, type = "recent"}: IBoardCardProps) {
	return (
		<Card className="h-72 group cursor-pointer transition-all hover:shadow-md py-0 relative">
			<div className="absolute top-2 right-2 z-10 cursor-pointer">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<MoreVertical />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={(e) => {
								e.preventDefault();
								const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
								if (!clientUrl) return;
								navigator.clipboard.writeText(
									`${clientUrl}/board/invitation/${board.boardId}`
								);
								return;
							}}>
							<Link />
							Copy link
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<CardHeader className="p-0">
				<div className="relative">
					<Image
						src={board.boardThumbnail || "/assets/board-thumbnail.png"}
						alt={board.title}
						className="h-48 w-full rounded-t-lg object-fill										"
						width={100}
						height={100}
					/>
				</div>
			</CardHeader>
			<CardContent className="">
				<CardTitle className="text-sm font-medium">{board.title}</CardTitle>
				<div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
					<div className="flex items-center gap-1">
						<Users className="size-3" />
						<span>
							{board.collaborators.length > 0 ? board.collaborators.length : 0}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
