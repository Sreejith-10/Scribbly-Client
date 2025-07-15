"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Check,
	Clock,
	Eye,
	Edit,
	Users,
	X,
	Calendar,
	Activity,
	Trash,
} from "lucide-react";
import {useParams} from "next/navigation";
import {useCollaborators} from "@/hooks/query/collaborators";
import {useCollaborationRequest} from "@/hooks/query/collaboraion-request";
import {Skeleton} from "@/components/ui/skeleton";
import {useBoardMetadata} from "@/hooks/query/board";
import {toast} from "sonner";
import {useAcceptRequest} from "@/hooks/mutation/collaboration-request";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {LoadingButton} from "@/components/ui/loading-button";
import {useRemoveCollaboraotr} from "@/hooks/mutation/collaborator";
import {useRef} from "react";

export default function BoardStatusPage() {
	const {id}: {id: string} = useParams();

	return (
		<div className="w-full mx-auto p-6 space-y-6">
			{/* Board Status Header */}
			<BoardInfo id={id.toString()} />

			{/* Board Collaborators Info */}
			<BoardCollaborators id={id.toString()} />

			{/* Board Collaboration Requests */}
			<BoardCollaborationReqeusts id={id.toString()} />
		</div>
	);
}

function BoardInfo({id}: {id: string}) {
	const boardMetadata = useBoardMetadata(id);

	return (
		<Card>
			{boardMetadata.isLoading ? (
				<>
					<CardHeader>
						<CardTitle>
							<Skeleton className="w-1/3 h-14" />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-4 gap-10">
							<Skeleton className="w-full h-8" />
							<Skeleton className="w-full h-8" />
							<Skeleton className="w-full h-8" />
							<Skeleton className="w-full h-8" />
						</div>
					</CardContent>
				</>
			) : (
				<>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="h-5 w-5" />
							{boardMetadata.data?.boardMetadata?.title}
						</CardTitle>
						<CardDescription>
							Board collaboration and status overview
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Created</p>
									<p className="text-sm text-muted-foreground">
										{new Date(
											boardMetadata.data?.boardMetadata?.createdAt ?? ""
										).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Last Updated</p>
									<p className="text-sm text-muted-foreground">
										{new Date(
											boardMetadata.data?.boardMetadata?.updatedAt ?? ""
										).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Active Users</p>
									<p className="text-sm text-muted-foreground">
										{/* {boardInfo.activeCollaborators} of{" "} */}
										{/* {boardInfo.totalCollaborators} */}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Edit className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Updated By</p>
									<p className="text-sm text-muted-foreground">
										{/* {boardInfo.lastUpdatedBy} */}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</>
			)}
		</Card>
	);
}

function BoardCollaborators({id}: {id: string}) {
	const dialogRef = useRef<HTMLButtonElement>(null);
	const {data, isLoading, isFetched} = useCollaborators(id);
	const {mutate, isPending} = useRemoveCollaboraotr();

	const removeCollaborator = (boardId: string, userId: string) => {
		mutate(
			{boardId, userId},
			{
				onSuccess: (data) => {
					toast.success(data.message);
					dialogRef.current?.click();
				},
				onError: (error) => {
					toast.error(error?.message);
				},
			}
		);
	};

	return (
		<Card>
			{isLoading ? (
				<>
					<CardHeader>
						<CardTitle></CardTitle>
						<Skeleton className="w-1/3 h-14" />
					</CardHeader>
					<CardContent className="space-y-2">
						<Skeleton className="w-3/4 h-8" />
						<Skeleton className="w-1/2 h-8" />
					</CardContent>
				</>
			) : (
				<>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-5 w-5" />
							Board Collaborators
							<Badge variant="secondary">
								{isFetched && data?.collaborators
									? data?.collaborators?.length
									: 0}
							</Badge>
						</CardTitle>
						<CardDescription>
							Manage permissions and view collaboration status
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isFetched && data?.collaborators ? (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>User</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Last Active</TableHead>
										<TableHead>Permission</TableHead>
										<TableHead>Remove</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.collaborators?.map((collaborator) => (
										<TableRow key={collaborator.userId}>
											<TableCell>
												<div className="flex items-center gap-3">
													<div className="relative">
														<Avatar className="h-8 w-8">
															<AvatarImage
																src={
																	collaborator.user.avatarUrl ||
																	"/placeholder.svg"
																}
																alt={collaborator.user.username}
															/>
															<AvatarFallback className="text-xs">
																{collaborator.user.username
																	.split(" ")
																	.map((n) => n[0])
																	.join("")}
															</AvatarFallback>
														</Avatar>
													</div>
													<div>
														<p className="font-medium text-sm">
															{collaborator.user.username}
														</p>
														<p className="text-xs text-muted-foreground">
															{collaborator.user.email}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<Badge variant={"secondary"}>{collaborator.role}</Badge>
											</TableCell>
											<TableCell>
												<span
													className={`${
														collaborator.status === "active"
															? "bg-emerald-400"
															: "bg-red-500"
													} p-1 rounded-full text-xs`}>
													{collaborator.status}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-sm text-muted-foreground">
													{collaborator.lastSeen}
												</span>
											</TableCell>
											<TableCell>
												<Select value={collaborator.role}>
													<SelectTrigger className="w-24">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="edit">
															<div className="flex items-center gap-2">
																<Edit className="h-4 w-4" />
																Edit
															</div>
														</SelectItem>
														<SelectItem value="view">
															<div className="flex items-center gap-2">
																<Eye className="h-4 w-4" />
																View
															</div>
														</SelectItem>
													</SelectContent>
												</Select>
											</TableCell>
											<TableCell>
												<Dialog>
													<DialogTrigger ref={dialogRef}>
														<Button variant="destructive">
															<Trash />
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>Remove Collaborator</DialogTitle>
															<DialogDescription>
																By doing this action the collaborate is removed
																from this board session and this action cannot
																be reverted back.
															</DialogDescription>
														</DialogHeader>
														<DialogFooter>
															<LoadingButton
																loading={isPending}
																disabled={isPending}
																className="w-full"
																onClick={() =>
																	removeCollaborator(
																		collaborator.boardId,
																		collaborator.userId
																	)
																}>
																Confirm
															</LoadingButton>
														</DialogFooter>
													</DialogContent>
												</Dialog>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<p>No One to manage</p>
						)}
					</CardContent>
				</>
			)}
		</Card>
	);
}

function BoardCollaborationReqeusts({id}: {id: string}) {
	const {data, isLoading, isFetched} = useCollaborationRequest(id);
	const acceptCollaborationRequet = useAcceptRequest();

	const acceptRequest = (boardId: string, userId: string) => {
		acceptCollaborationRequet.mutate(
			{userId, boardId},
			{
				onSuccess: (data) => {
					toast.success(data.message);
				},
				onError: (error) => {
					toast.error(error.message);
				},
			}
		);
	};

	return (
		<Card>
			{isLoading ? (
				<>
					<CardHeader>
						<CardTitle></CardTitle>
						<Skeleton className="w-1/3 h-14" />
					</CardHeader>
					<CardContent className="space-y-2">
						<Skeleton className="w-3/4 h-8" />
						<Skeleton className="w-1/2 h-8" />
					</CardContent>
				</>
			) : (
				<>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="h-5 w-5" />
							Join Requests
							<Badge variant="secondary">
								{isFetched && data?.requests ? data?.requests?.length : 0}
							</Badge>
						</CardTitle>
						<CardDescription>
							Pending requests to join this board
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isFetched && data?.requests ? (
							<div className="space-y-4">
								{data?.requests?.map((request) => (
									<div
										key={request.userId}
										className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center justify-between p-4 border rounded-lg">
										<div className="flex items-center gap-3">
											<Avatar>
												<AvatarImage
													src={request.user.avatarUrl || "/placeholder.svg"}
													alt={request.user.username}
												/>
												<AvatarFallback>
													{request.user.username
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className="font-medium">{request.user.username}</p>
												<p className="text-sm text-muted-foreground">
													{request.user.email}
												</p>
												<p className="text-xs text-muted-foreground mt-1">
													Requested{" "}
													{new Date(request.requestedAt).toLocaleDateString()}
												</p>
											</div>
										</div>
										<div className="flex gap-2">
											<Button size="sm" variant="outline">
												<X className="h-4 w-4 mr-1" />
												Reject
											</Button>
											<Button
												size="sm"
												onClick={() =>
													acceptRequest(request.boardId, request.userId)
												}>
												<Check className="h-4 w-4 mr-1" />
												Accept
											</Button>
										</div>
									</div>
								))}
							</div>
						) : (
							<p>No requests found</p>
						)}
					</CardContent>
				</>
			)}
		</Card>
	);
}
