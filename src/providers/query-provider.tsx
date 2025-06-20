"use client";

import {RTK_STALE_TIME} from "@/constant";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

const query = new QueryClient({
	// defaultOptions: {queries: {staleTime: RTK_STALE_TIME}},
});

export const QueryProvider = ({children}: {children: ReactNode}) => {
	return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};
