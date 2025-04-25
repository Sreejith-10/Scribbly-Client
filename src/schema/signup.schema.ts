import * as z from "zod";

export const signupSchema = z.object({
	name: z.string().min(1, "Provide a name"),
	email: z.string().email(),
	password: z.string().min(6, "Password should be 6 Characters long"),
});
