"use client";

import {Lock, User, UserPlus} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import {Input} from "../ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {Textarea} from "../ui/textarea";
import {LoadingButton} from "../ui/loading-button";
import {useMutation} from "@tanstack/react-query";
import {AccessMode, IBorad} from "@/types";
import {createBoard} from "@/controllers/board";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {createBoardSchema} from "@/schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {zodResolver} from "@hookform/resolvers/zod";

interface IBoardCreationProps {
	open: boolean;
	setOpen: (state: boolean) => void;
}

export const BoardCreation = ({open, setOpen}: IBoardCreationProps) => {
	const form = useForm<z.infer<typeof createBoardSchema>>({
		resolver: zodResolver(createBoardSchema),
		defaultValues: {title: "", description: "", accessMode: "private"},
	});

	const router = useRouter();

	const {mutate, isPending} = useMutation({
		mutationFn: ({
			title,
			description,
			accessMode,
		}: {
			title: string;
			description?: string;
			accessMode: AccessMode;
		}) =>
			createBoard<{board: IBorad; message: string}>(
				title,
				description,
				accessMode
			),
		onSuccess: (response) => {
			toast.success(response.message);
			router.push(
				`/board/${
					response.board.accessMode === "private" ? "private" : "public"
				}/${response.board._id}`
			);
		},
		onError: (error) => {
			console.log({error});
			toast.error(error.message);
		},
	});

	const submitHandler = (values: z.infer<typeof createBoardSchema>) => {
		mutate({
			title: values.title,
			description: values.description,
			accessMode: values.accessMode,
		});
	};

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogContent className="flex flex-col gap-3">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitHandler)}
						className="space-y-3">
						<DialogHeader>
							<DialogTitle className="text-center">
								Create new board
							</DialogTitle>
							<DialogDescription className="text-center">
								create your new board add collaborate with others
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="title"
								render={({field}) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl {...field}>
											<Input {...field} placeholder="" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({field}) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl {...field}>
											<Textarea
												{...field}
												placeholder=""
												className="resize-none"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="accessMode"
								render={({field}) => (
									<FormItem>
										<FormLabel>Access mode</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="w-full bg-secondary">
													<SelectValue defaultValue="" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="private">
														<Lock />
														Private
													</SelectItem>
													<SelectItem value="request_access">
														<UserPlus />
														Request Access
													</SelectItem>
													<SelectItem value="public">
														<User />
														Public
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="text-center">
							<LoadingButton
								type="submit"
								loading={isPending}
								className="w-full">
								Create
							</LoadingButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
