import { registerUser } from '@/controllers/auth';
import { signupSchema } from '@/schema';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (values: z.infer<typeof signupSchema>) =>
      registerUser<{ message: string }>(values),
  });
};
