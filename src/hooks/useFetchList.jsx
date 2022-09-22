import { useQuery } from "@tanstack/react-query";

import { utils } from "services";

export const useFetchList = ({
	url,
	dataKey = "data",
	metaKey = "meta",
	customQueryFn,
	queryOptions = {},
	urlSearchParams,
}) => {
	let meta;
	const query = useQuery(
		utils.apiHelpers.getQueryKey("GET", url, urlSearchParams),

		utils.apiHelpers.ultimateQueryFn(customQueryFn, urlSearchParams),

		{
			retry: false,
			select: (responseData) => {
				meta = utils.apiHelpers.metaSelect(responseData, metaKey);
				return utils.apiHelpers.dataSelect(responseData, dataKey);
			},

			...queryOptions,
		}
	);

	return {
		...query,
		meta,
	};
};
