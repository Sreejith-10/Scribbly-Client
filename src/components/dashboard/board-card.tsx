import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Star, Users} from "lucide-react";
import {Badge} from "../ui/badge";

export function BoardCard({
	board,
	type = "recent",
}: {
	board: any;
	type?: string;
}) {
	return (
		<Card className="group cursor-pointer transition-all hover:shadow-md">
			<CardHeader className="p-0">
				<div className="relative">
					<Image
						src={board.thumbnail || "/placeholder.svg"}
						alt={board.title}
						className="h-32 w-full rounded-t-lg object-cover"
						width={100}
						height={100}
					/>
					{type === "recent" && board.isStarred && (
						<Star className="absolute right-2 top-2 size-4 fill-yellow-400 text-yellow-400" />
					)}
					{type === "shared" && (
						<Badge className="absolute right-2 top-2" variant="secondary">
							{board.role}
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<CardTitle className="text-sm font-medium">{board.title}</CardTitle>
				<div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
					{type === "recent" ? (
						<>
							<span>{board.lastModified}</span>
							<div className="flex items-center gap-1">
								<Users className="size-3" />
								<span>{board.collaborators}</span>
							</div>
						</>
					) : type === "shared" ? (
						<>
							<span>by {board.owner}</span>
							<div className="flex items-center gap-1">
								<Users className="size-3" />
								<span>{board.collaborators}</span>
							</div>
						</>
					) : (
						<span>{board.description}</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
