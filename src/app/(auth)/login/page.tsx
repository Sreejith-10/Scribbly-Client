'use client';

import { GithubAuth } from '@/components/buttons/github';
import { GoogleAuth } from '@/components/buttons/google';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LuLoaderCircle } from 'react-icons/lu';
import { loginSchema } from '@/schema/login.schema';
import { useState } from 'react';
import { Eye, EyeClosed, GalleryVerticalEnd, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useLoginUser } from '@/hooks/mutation/auth';

export default function LoginPage() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const loginMutation = useLoginUser();

  const submitHandler = async (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.push('/dashboard/all', { scroll: true });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  console.log(loginMutation.error);

  return (
    <div className='flex flex-col gap-4 p-6 md:p-10'>
      <div className='flex justify-center gap-2 md:justify-start'>
        <Link href='/' className='flex items-center gap-2 font-medium'>
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          Scribbly
        </Link>
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-xs'>
          <Form {...form}>
            <form
              className='flex flex-col gap-6'
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Login to your account</h1>
                <p className='text-muted-foreground text-sm text-balance'>
                  Enter your email below to login to your account
                </p>
              </div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <div className='border-input bg-primary-foreground dark:bg-input/30 has-[:focus-visible]border-ring has-[:focus-visible]:ring-ring/50 relative flex h-10 w-full items-center gap-3 rounded-md border px-3 py-1 text-base shadow-xs transition-colors has-[:focus-visible]:ring-[3px]'>
                      <Mail
                        className={`${
                          form.formState.errors?.email
                            ? 'text-destructive'
                            : 'text-foreground'
                        } size-6`}
                      />
                      <FormControl>
                        <input
                          {...field}
                          className={`${
                            form.formState.errors?.email
                              ? 'text-destructive'
                              : 'text-foreground'
                          } input-area w-full border-none outline-hidden`}
                          placeholder=''
                        />
                      </FormControl>
                      <FormLabel className='label-text pointer-events-none absolute top-1/2 left-12 -translate-y-1/2 transition-all delay-100 duration-100 ease-in'>
                        Email
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={`border-input bg-primary-foreground dark:bg-input/30 has-[:focus-visible]border-ring has-[:focus-visible]:ring-ring/50 relative flex h-10 w-full items-center gap-3 rounded-md border px-3 py-1 text-base shadow-xs transition-colors has-[:focus-visible]:ring-[3px]`}
                    >
                      <Lock
                        className={`${
                          form.formState.errors?.password ||
                          loginMutation.error?.message ===
                            'password does not match'
                            ? 'text-destructive'
                            : 'text-foreground'
                        } size-6`}
                      />
                      <FormControl>
                        <input
                          {...field}
                          className={`${
                            form.formState.errors?.password ||
                            loginMutation.error?.message ===
                              'password does not match'
                              ? 'text-destructive'
                              : 'text-foreground'
                          } input-area w-full border-none outline-hidden`}
                          type={showPass ? 'text' : 'password'}
                          placeholder=''
                        />
                      </FormControl>
                      <FormLabel className='label-text pointer-events-none absolute top-1/2 left-12 -translate-y-1/2 transition-all delay-100 duration-100 ease-in'>
                        Password
                      </FormLabel>
                      {field.value &&
                        (showPass ? (
                          <Eye
                            onClick={() => setShowPass(false)}
                            className='cursor-pointer'
                          />
                        ) : (
                          <EyeClosed
                            onClick={() => setShowPass(true)}
                            className='cursor-pointer'
                          />
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid place-content-end'>
                <Link href='#' className='hover:text-primary hover:underline'>
                  Forgott password?
                </Link>
              </div>

              <Button
                type='submit'
                className={`w-full`}
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending && (
                  <LuLoaderCircle className='animate-spin' />
                )}
                Login
              </Button>

              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-background text-muted-foreground relative z-10 px-2'>
                  Or continue with
                </span>
              </div>

              <div>
                <GoogleAuth
                  title='Login with google'
                  className='flex cursor-pointer items-center gap-4 text-sm'
                />
              </div>
              <div>
                <GithubAuth
                  title='Login with github'
                  className='flex cursor-pointer items-center gap-4 text-sm'
                />
              </div>

              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link
                  href='/signup'
                  className='hover:text-primary hover:underline'
                >
                  Create an account
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div>
        <p className='text-center text-xs'>Terms and Conditions apply</p>
      </div>
    </div>
  );
}
