"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {H2, H3, P} from "@/components/ui/typography";
import {Globe2, Loader, Lock, UserPlusIcon, Users} from "lucide-react";
import {useParams} from "next/navigation";
import {useBoardMetadata} from "@/hooks/query";

const modeIcon = {
	private: <Lock className="size-4" />,
	public: <Globe2 className="size-4" />,
	request_access: <UserPlusIcon className="size-4" />,
};

const modeButtonTitleAndDescription = {
	private: {
		title: "Private Board",
		description:
			"This ia board is private and does not allow any collaborators",
	},
	public: {
		title: "Join Collaboration",
		description: "Any one can join this board",
	},
	request_access: {
		title: "Request for access",
		description: "Request shoulb accepted by session host to collaborate",
	},
};

export default function InvitationPage() {
	const {id}: {id: string} = useParams();

	const {boardMetadata, boardMetadataLoading} = useBoardMetadata(id);

	return (
		<div className="bg-secondary px-6 py-8 rounded-md shadow border border-accent space-y-4 md:space-y-6">
			<H2 className="border-none">Collaboration Invitation</H2>
			{boardMetadataLoading ? (
				<div className="w-full">
					<Loader className="m-auto animate-spin size-12" />
				</div>
			) : (
				<>
					<div className="flex flex-col md:flex-row md:justify-end gap-5">
						<div className="w-fit">
							<div className="w-fit flex items-center justify-center gap-10">
								<H3 className="m-auto">{boardMetadata?.title}</H3>
								<Tooltip>
									<TooltipTrigger asChild>
										<span className="bg-primary size-7 inline-grid place-content-center rounded-full cursor-pointer hover:scale-110 transition-all">
											{modeIcon[boardMetadata?.accessMode ?? "public"]}
										</span>
									</TooltipTrigger>
									<TooltipContent>{boardMetadata?.accessMode}</TooltipContent>
								</Tooltip>
							</div>
							<P className="w-3/4 line-clamp-3">{boardMetadata?.description}</P>
						</div>
						<div className="flex w-auto h-min items-center gap-5">
							<Avatar className="size-12">
								<AvatarImage
									src={boardMetadata?.owner.avatarUrl ?? ""}
									alt="avatar"
								/>
								<AvatarFallback className="bg-accent">
									{boardMetadata?.owner.username.split(" ")[0][0].toUpperCase()}
									{boardMetadata?.owner.username
										.split(" ")?.[1]?.[0]
										.toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="h-min">
								<h4>{boardMetadata?.owner.username}</h4>
								<span>Session host</span>
							</div>
						</div>
					</div>
					<Separator />
					<div className="space-y-4">
						<div className="w-auto flex items-center gap-2">
							<Users />{" "}
							<span>{boardMetadata?.collaborators.length} participents</span>
						</div>
						<div className="*:data-[slot=avatar]:ring-secondary flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
							{boardMetadata?.collaborators.map((collab) => (
								<Avatar key={collab._id} className="size-10">
									<AvatarImage src={collab.avatarUrl ?? ""} alt="avatar" />
									<AvatarFallback className="bg-accent">
										{collab.username.split(" ")[0][0].toUpperCase()}
										{collab.username.split(" ")?.[1]?.[0].toUpperCase()}
									</AvatarFallback>
								</Avatar>
							))}
						</div>
					</div>
					<Separator />
					<div>
						<Button
							className="w-full"
							disabled={boardMetadata?.accessMode === "private"}>
							{
								modeButtonTitleAndDescription[
									boardMetadata?.accessMode ?? "private"
								].title
							}
						</Button>
						<P className="[&:not(:first-child)]:mt-1 lg:text-xs text-center">
							{
								modeButtonTitleAndDescription[
									boardMetadata?.accessMode ?? "private"
								].description
							}
						</P>
					</div>
				</>
			)}
		</div>
	);
}
