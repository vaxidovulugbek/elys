import { useInfiniteQuery } from "@tanstack/react-query";
import { utils } from "services";
import { get } from "lodash";

export const useFetchInfinite = ({
	url,
	dataKey = "data",
	metaKey = "meta",
	customQueryFn,
	queryOptions = {},
	urlSearchParams,
}) => {
	let meta;
	const query = useInfiniteQuery(
		utils.apiHelpers.getQueryKey("GET", url, urlSearchParams),

		utils.apiHelpers.ultimateQueryFn(customQueryFn, urlSearchParams),

		{
			retry: false,
			getNextPageParam: (lastPage, allPages) => {
				const currentPage = get(lastPage, "meta.currentPage");
				const totalPages = get(lastPage, "meta.pageCount");
				return currentPage < totalPages ? currentPage + 1 : undefined;
			},
			select: ({ pages, pageParams }) => {
				meta = utils.apiHelpers.metaSelect(pages[pages.length - 1], metaKey);
				return pages.reduce(
					(all, page) => [...all, ...utils.apiHelpers.dataSelect(page, dataKey)],
					[]
				);
			},

			...queryOptions,
		}
	);

	return {
		...query,
		meta,
	};
};
