"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

const query = new QueryClient();

export const QueryProvider = ({children}: {children: ReactNode}) => {
	return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};
