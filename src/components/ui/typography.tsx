import { cn } from '@/lib';
import type {
  BlockquoteHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  OlHTMLAttributes,
} from 'react';

export function H1({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl',
        'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent',
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 lg:text-4xl',
        'transition-colors hover:text-gray-700',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h4
      {...props}
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl',
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function P({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <p
      {...props}
      className={cn(
        'text-base leading-7 lg:text-lg [&:not(:first-child)]:mt-6',
        'text-gray-700 dark:text-gray-300',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Lead({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <p
      {...props}
      className={cn(
        'text-muted-foreground text-xl lg:text-2xl xl:text-3xl',
        'leading-relaxed font-light',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Large({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'text-lg font-semibold lg:text-xl',
        'text-gray-900 dark:text-gray-100',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Small({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <small
      {...props}
      className={cn(
        'text-sm leading-none font-medium lg:text-base',
        'text-gray-600 dark:text-gray-400',
        className,
      )}
    >
      {children}
    </small>
  );
}

export function Muted({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLHeadingElement
>) {
  return (
    <p
      {...props}
      className={cn(
        'text-muted-foreground text-sm lg:text-base',
        'leading-relaxed',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Code({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <code
      {...props}
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        'lg:px-2 lg:py-1 lg:text-base',
        'border border-gray-200 dark:border-gray-700',
        className,
      )}
    >
      {children}
    </code>
  );
}

export function Pre({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  return (
    <pre
      {...props}
      className={cn(
        'mt-6 mb-4 overflow-x-auto rounded-lg bg-gray-950 p-4 lg:p-6',
        'text-sm lg:text-base',
        'border border-gray-200 dark:border-gray-800',
        className,
      )}
    >
      <code className='font-mono text-gray-100'>{children}</code>
    </pre>
  );
}

export function Blockquote({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  BlockquoteHTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>) {
  return (
    <blockquote
      {...props}
      className={cn(
        'mt-6 border-l-4 border-gray-300 pl-6 text-gray-800 italic',
        'lg:pl-8 lg:text-lg',
        'dark:border-gray-600 dark:text-gray-200',
        "relative before:absolute before:-top-2 before:-left-2 before:text-4xl before:text-gray-400 before:content-['']",
        className,
      )}
    >
      {children}
    </blockquote>
  );
}

export function List({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) {
  return (
    <ul
      {...props}
      className={cn(
        'my-6 ml-6 list-disc [&>li]:mt-2',
        'text-base lg:text-lg',
        'space-y-2 lg:space-y-3',
        className,
      )}
    >
      {children}
    </ul>
  );
}

export function OrderedList({
  className,
  children,
  ...props
}: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) {
  return (
    <ol
      {...props}
      className={cn(
        'my-6 ml-6 list-decimal [&>li]:mt-2',
        'text-base lg:text-lg',
        'space-y-2 lg:space-y-3',
        className,
      )}
    >
      {children}
    </ol>
  );
}

export function Kbd({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <kbd
      {...props}
      className={cn(
        'bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none',
        'lg:h-6 lg:px-2 lg:text-xs',
        'border-gray-300 shadow-sm dark:border-gray-600',
        className,
      )}
    >
      {children}
    </kbd>
  );
}

export function Mark({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <mark
      {...props}
      className={cn(
        'rounded bg-yellow-200 px-1 py-0.5 dark:bg-yellow-800',
        'text-gray-900 dark:text-gray-100',
        className,
      )}
    >
      {children}
    </mark>
  );
}

export function Abbr({
  children,
  title,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  title: string;
}) {
  return (
    <abbr
      {...props}
      title={title}
      className={cn(
        'cursor-help border-b border-dotted border-gray-400',
        'transition-colors hover:border-gray-600',
        className,
      )}
    >
      {children}
    </abbr>
  );
}
