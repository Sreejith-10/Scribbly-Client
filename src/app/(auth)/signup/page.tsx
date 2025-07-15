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
import {signupSchema} from "@/schema/signup.schema";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LuLoaderCircle} from "react-icons/lu";
import {
	Eye,
	EyeClosed,
	GalleryVerticalEnd,
	Lock,
	Mail,
	User,
} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useRegisterUser} from "@/hooks/mutation/auth";

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

	const reigsterMutation = useRegisterUser();

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
		<div className="flex flex-col gap-4 p-6 md:p-10">
			<div className="flex justify-center gap-2 md:justify-start">
				<Link href="/" className="flex items-center gap-2 font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Scribbly
				</Link>
			</div>
			<div className="flex flex-1 items-center justify-center">
				<div className="w-full max-w-xs">
					<Form {...form}>
						<form
							className="flex flex-col gap-6"
							onSubmit={form.handleSubmit(submitHandler)}>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Create new account</h1>
								<p className="text-muted-foreground text-sm text-balance">
									Enter your username and email below to create your account
								</p>
							</div>

							<FormField
								control={form.control}
								name="username"
								render={({field}) => (
									<FormItem>
										<div className="relative flex items-center gap-3 h-10 w-full rounded-md border border-input bg-primary-foreground dark:bg-input/30 px-3 py-1 text-base shadow-xs transition-colors has-[:focus-visible]border-ring has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-[3px]">
											<User
												className={`${
													form.formState.errors?.username
														? "text-destructive"
														: "text-foreground"
												} size-6`}
											/>
											<FormControl>
												<input
													{...field}
													className={`${
														form.formState.errors?.username
															? "text-destructive"
															: "text-foreground"
													} outline-hidden border-none w-full input-area`}
													placeholder=""
												/>
											</FormControl>
											<FormLabel className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none label-text transition-all ease-in delay-100 duration-100">
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
										<div className="relative flex items-center gap-3 h-10 w-full rounded-md border border-input bg-primary-foreground dark:bg-input/30 px-3 py-1 text-base shadow-xs transition-colors has-[:focus-visible]border-ring has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-[3px]">
											<Mail
												className={`${
													form.formState.errors?.email
														? "text-destructive"
														: "text-foreground"
												} size-6`}
											/>
											<FormControl>
												<input
													{...field}
													className={`${
														form.formState.errors?.email
															? "text-destructive"
															: "text-foreground"
													} outline-hidden border-none w-full input-area`}
													placeholder=""
												/>
											</FormControl>
											<FormLabel className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none label-text transition-all ease-in delay-100 duration-100">
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
										<div className="relative flex items-center gap-3 h-10 w-full rounded-md border border-input bg-primary-foreground dark:bg-input/30 px-3 py-1 text-base shadow-xs transition-colors has-[:focus-visible]border-ring has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-[3px]">
											<Lock
												className={`${
													form.formState.errors?.password
														? "text-destructive"
														: "text-foreground"
												} size-6`}
											/>
											<FormControl>
												<input
													{...field}
													className={`${
														form.formState.errors?.password
															? "text-destructive"
															: "text-foreground"
													} outline-hidden border-none w-full input-area`}
													type={showPass ? "text" : "password"}
													placeholder=""
												/>
											</FormControl>
											<FormLabel className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none label-text transition-all ease-in delay-100 duration-100">
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

							<Button
								type="submit"
								className={`w-full`}
								disabled={reigsterMutation.isPending}>
								{reigsterMutation.isPending && (
									<LuLoaderCircle className="animate-spin" />
								)}
								Signup
							</Button>

							<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
								<span className="bg-background text-muted-foreground relative z-10 px-2">
									Or continue with
								</span>
							</div>

							<div>
								<GoogleAuth
									title="Signup with google"
									className="flex gap-4 text-sm items-center cursor-pointer"
								/>
							</div>
							<div>
								<GithubAuth
									title="Signup with github"
									className="flex gap-4 text-sm items-center cursor-pointer"
								/>
							</div>

							<div className="text-center text-sm">
								Already have an account?{" "}
								<Link
									href="/login"
									className="hover:underline hover:text-primary">
									Login
								</Link>
							</div>
						</form>
					</Form>
				</div>
			</div>
			<div>
				<p className="text-xs text-center">Terms and Conditions apply</p>
			</div>
		</div>
	);
}
