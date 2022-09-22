// const {meta, queryKey, pageParam = 1, signal} = context

import { useQuery } from "@tanstack/react-query";

import { utils } from "services";

export const useFetchOne = ({
	url,
	dataKey = "data",
	customQueryFn,
	queryOptions = {},
	urlSearchParams,
}) => {
	return useQuery(
		utils.apiHelpers.getQueryKey("GET", url, urlSearchParams),

		utils.apiHelpers.ultimateQueryFn(customQueryFn, urlSearchParams),

		{
			retry: false,
			select: (data) => utils.apiHelpers.dataSelect(data, dataKey),

			...queryOptions,
		}
	);
};
