import { useQuery } from "@tanstack/react-query";

export const useInvoice = (id, queryFn) =>
	useQuery({
		queryKey: ["transaction", id],
		queryFn: () => queryFn(id),
		enabled: !!id,
	});
