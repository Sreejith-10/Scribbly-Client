import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Users} from "lucide-react";
import {IBoardMetadata} from "@/types";

interface IBoardCardProps {
	board: IBoardMetadata;
	type: string;
}

export function BoardCard({board, type = "recent"}: IBoardCardProps) {
	return (
		<Card className="h-72 group cursor-pointer transition-all hover:shadow-md py-0">
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
