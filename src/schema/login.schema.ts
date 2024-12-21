import * as z from "zod"

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6,"Password should be 6 characters long")
})