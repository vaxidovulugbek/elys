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
	const [id, setId] = useState(null);

	const { data, refetch, remove } = useFetchOne({
		url: `${url}/${id}`,
		dataKey,
		customQueryFn,
		queryOptions,
		urlSearchParams,
	});

	useEffect(() => {
		refetchStatus && id && refetch();
	}, [refetchStatus]);

	return { data, setId, remove };
};
