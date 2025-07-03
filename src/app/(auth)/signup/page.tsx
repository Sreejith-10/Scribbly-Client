"use client";

import {GithubAuth} from "@/components/buttons/github";
import {GoogleAuth} from "@/components/buttons/google";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {H1, P} from "@/components/ui/typography";
import {signupSchema} from "@/schema/signup.schema";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {FaUser, FaLock} from "react-icons/fa";
import {IoMdMail} from "react-icons/io";
import Link from "next/link";
import {LuLoaderCircle} from "react-icons/lu";
import {Eye, EyeClosed} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useAuthMutations} from "@/hooks/mutation/useAuthMutations";

export default function SignupPage() {
	const [showPass, setShowPass] = useState(false);
	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const router = useRouter();

	const {reigsterMutation} = useAuthMutations();

	const submitHandler = async (values: z.infer<typeof signupSchema>) =>
		reigsterMutation.mutate(values, {
			onSuccess: (data) => {
				toast.success(data.message);
				router.push("/login");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});

	return (
		<div className="w-auto h-fit bg-white px-10 py-16 rounded-md border border-slate-200 border-opacity-50 shadow-lg shadow-slate-200 space-y-4">
			<div>
				<H1>Create an Account</H1>
				<P className="text-slate-600">
					Enter your email below to create your account
				</P>
			</div>

			<div className="flex gap-3">
				<GoogleAuth />
				<GithubAuth />
			</div>

			<div className="w-full h-auto flex items-center justify-center gap-3">
				<span className="w-full h-[2px] bg-zinc-200" />
				<span className="p-1 border border-zinc-300 rounded-full text-sm text-slate-500">
					OR
				</span>
				<span className="w-full h-[2px] bg-zinc-200" />
			</div>

			<div>
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(submitHandler)}>
						<FormField
							control={form.control}
							name="username"
							render={({field}) => (
								<FormItem>
									<div className="relative flex items-center gap-5 h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
										<FaUser
											className={`${
												form.formState.errors?.username
													? "text-destructive"
													: "text-black"
											} size-5`}
										/>
										<FormControl>
											<input
												{...field}
												className="outline-hidden border-none w-full input-area"
												placeholder=""
											/>
										</FormControl>
										<FormLabel className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none label-text transition-all">
											Username
										</FormLabel>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({field}) => (
								<FormItem>
									<div className="relative flex items-center gap-3 h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
										<IoMdMail
											className={`${
												form.formState.errors?.email
													? "text-destructive"
													: "text-black"
											} size-6`}
										/>
										<FormControl>
											<input
												{...field}
												className="outline-hidden border-none w-full input-area"
												placeholder=""
											/>
										</FormControl>
										<FormLabel className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none label-text transition-all">
											Email
										</FormLabel>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({field}) => (
								<FormItem>
									<div className="relative flex items-center gap-3 h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
										<FaLock
											className={`${
												form.formState.errors?.password
													? "text-destructive"
													: "text-black"
											} size-5`}
										/>
										<FormControl>
											<input
												{...field}
												className="outline-hidden border-none w-full input-area"
												type={showPass ? "text" : "password"}
												placeholder=""
											/>
										</FormControl>
										<FormLabel className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none label-text transition-all">
											Password
										</FormLabel>
										{field.value &&
											(showPass ? (
												<Eye
													onClick={() => setShowPass(false)}
													className="cursor-pointer"
												/>
											) : (
												<EyeClosed
													onClick={() => setShowPass(true)}
													className="cursor-pointer"
												/>
											))}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Link
							href="/login"
							className="hover:underline inline-block float-right">
							Already have an account
						</Link>
						<Button
							type="submit"
							className="w-full"
							disabled={reigsterMutation.isPending}>
							{reigsterMutation.isPending && (
								<LuLoaderCircle className="animate-spin" />
							)}
							Signup
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
