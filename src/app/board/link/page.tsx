'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoadingButton } from '@/components/ui/loading-button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSendRequest } from '@/hooks/mutation/collaboration-request';
import { useBoardMetadata } from '@/hooks/query/board';
import { useRequestStatus } from '@/hooks/query/collaboraion-request';
import { useUser } from '@/hooks/query/user';
import { Globe2, Lock, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const modeIcon = {
  private: <Lock className='size-4' />,
  public: <Globe2 className='size-4' />,
};

export default function BoardLinkPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const boardId = searchParams.get('boardId');

  const metadata = useBoardMetadata(boardId!);
  const user = useUser();
  const userId = user.data?._id;
  const sendRequest = useSendRequest();
  const requestStatus = useRequestStatus(boardId!, userId!);

  const sendCollaborationRequest = () => {
    if (boardId)
      sendRequest.mutate(boardId, {
        onSuccess: (data) => {
          console.log(data.message);
          router.push('/dashboard/requests');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
  };

  return (
    <div className='grid min-h-svh w-full place-items-center'>
      <div className='grid gap-4'>
        <div className='grid place-items-center gap-1'>
          <div className='bg-accent grid size-16 place-content-center rounded-full'>
            <Users className='size-10' />
          </div>
          <h1 className='text-2xl'>Join Board</h1>
          <p>The board information is given below</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Project Scribbly</CardTitle>
            <CardDescription className='line-clamp-1'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Quibusdam soluta tenetur natus provident tempora similique
              doloremque deserunt aliquid facere nesciunt?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex h-min w-auto items-center gap-5'>
              <Avatar className='size-12'>
                <AvatarImage
                  src={metadata.data?.boardMetadata?.owner.avatarUrl ?? ''}
                  alt='avatar'
                />
                <AvatarFallback className='bg-accent'>
                  {metadata.data?.boardMetadata?.owner.username
                    .split(' ')[0][0]
                    .toUpperCase()}
                  {metadata.data?.boardMetadata?.owner.username
                    .split(' ')?.[1]?.[0]
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='h-min'>
                <h4>{metadata.data?.boardMetadata?.owner.username}</h4>
                <span>Session host</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='bg-primary inline-grid size-7 cursor-pointer place-content-center rounded-full transition-all hover:scale-110'>
                    {
                      modeIcon[
                        metadata.data?.boardMetadata.accessMode ?? 'public'
                      ]
                    }
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {metadata.data?.boardMetadata?.accessMode}
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator className='my-2' />
            <div className='space-y-4'>
              <div className='flex w-auto items-center gap-2'>
                <Users />{' '}
                <span>
                  {metadata.data?.boardMetadata?.collaborators.length}{' '}
                  participents
                </span>
              </div>
              <div className='*:data-[slot=avatar]:ring-secondary flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale'>
                {metadata.data?.boardMetadata?.collaborators.map((collab) => (
                  <Avatar key={collab._id} className='size-10'>
                    <AvatarImage src={collab.avatarUrl ?? ''} alt='avatar' />
                    <AvatarFallback className='bg-accent'>
                      {collab.username.split(' ')[0][0].toUpperCase()}
                      {collab.username.split(' ')?.[1]?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
            <Separator />
          </CardContent>
          <CardFooter className='grid grid-cols-1 gap-2'>
            {requestStatus.isFetched && requestStatus.data?.status ? (
              requestStatus.data?.status?.status === 'pending' ? (
                <>
                  <LoadingButton
                    className='w-fit'
                    onClick={sendCollaborationRequest}
                    disabled={sendRequest.isPending}
                    loading={sendRequest.isPending}
                  >
                    Send Request Again
                  </LoadingButton>
                  <p className='text-destructive text-xs'>
                    You have already requested
                  </p>
                </>
              ) : requestStatus.data?.status?.status === 'accepted' ? (
                <>
                  <LoadingButton className='w-fit' disabled={false}>
                    Cannot request
                  </LoadingButton>
                  <p className='text-destructive text-xs'>
                    Your request is accepted
                  </p>
                </>
              ) : (
                <>
                  <LoadingButton
                    className='w-fit'
                    onClick={sendCollaborationRequest}
                    disabled={sendRequest.isPending}
                    loading={sendRequest.isPending}
                  >
                    Send Request Again
                  </LoadingButton>
                  <p className='text-destructive text-xs'>
                    You requested is rejected send again
                  </p>
                </>
              )
            ) : (
              <LoadingButton
                className='w-fit'
                onClick={sendCollaborationRequest}
                disabled={sendRequest.isPending}
                loading={sendRequest.isPending}
              >
                Send Request
              </LoadingButton>
            )}
          </CardFooter>
        </Card>
        <div>
          <p>
            By joining a board you agree to collaborate respectfully with other
            members
          </p>
        </div>
      </div>
    </div>
  );
}
