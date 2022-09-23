import { useEffect, useState } from "react";

import { useFetchOne } from "./useFetchOne";

export const useFetchOneWithId = ({
	url,
	dataKey,
	customQueryFn,
	queryOptions = {},
	urlSearchParams,
	refetchStatus,
}) => {
	const [id, setId] = useState();
	const { data, refetch, remove } = useFetchOne({
		url: `${url}/${id}`,
		dataKey,
		customQueryFn,
		queryOptions,
		urlSearchParams,
	});

	useEffect(() => {
		refetchStatus && refetch();
	}, [refetchStatus]);

	return { data, setId, remove };
};
