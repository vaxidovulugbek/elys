// const {meta, queryKey, pageParam = 1, signal} = context

import { useMutation } from "@tanstack/react-query";

import { utils } from "services";

export const useDelete = ({ url, customQueryFn, queryOptions = {} }) => {
	const mutation = useMutation(
		utils.apiHelpers.getQueryKey("DELETE", url),

		utils.apiHelpers.ultimateQueryFn(customQueryFn),

		{
			retry: false,
			...queryOptions,
		}
	);

	return {
		...mutation,
		mutate: (appendUrl) =>
			mutation.mutate({
				queryKey: utils.apiHelpers.getQueryKey(
					"DELETE",
					appendUrl ? `${url}/${appendUrl}` : url
				),
			}),
		mutateAsync: (appendUrl) =>
			mutation.mutateAsync({
				queryKey: utils.apiHelpers.getQueryKey(
					"DELETE",
					appendUrl ? `${url}/${appendUrl}` : url
				),
			}),
	};
};
