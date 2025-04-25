import React from "react";
import {twMerge} from "tailwind-merge";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
}

export function H1({className, ...props}: TypographyProps) {
	return (
		<h1
			className={twMerge(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
				className
			)}
			{...props}
		/>
	);
}

export function H2({className, ...props}: TypographyProps) {
	return (
		<h2
			className={twMerge(
				"mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
				className
			)}
			{...props}
		/>
	);
}

export function H3({className, ...props}: TypographyProps) {
	return (
		<h3
			className={twMerge(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className
			)}
			{...props}
		/>
	);
}

export function P({className, ...props}: TypographyProps) {
	return (
		<p
			className={twMerge("leading-7 not-first:mt-6", className)}
			{...props}
		/>
	);
}

export function Blockquote({className, ...props}: TypographyProps) {
	return (
		<blockquote
			className={twMerge("mt-6 border-l-2 pl-6 italic", className)}
			{...props}
		/>
	);
}

export function InlineLink({className, ...props}: TypographyProps) {
	return (
		<a
			className={twMerge(
				"font-medium text-primary underline underline-offset-4",
				className
			)}
			{...props}
		/>
	);
}
