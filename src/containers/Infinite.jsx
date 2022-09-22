// const {meta, queryKey, pageParam, signal} = context
import PropTypes from "prop-types";

import { useFetchInfinite } from "hooks";

export const Infinite = ({
	url,
	dataKey = "data",
	metaKey = "meta",
	customQueryFn,
	queryOptions = {},
	urlSearchParams,
	children,
}) => {
	const query = useFetchInfinite({
		url,
		dataKey,
		metaKey,
		customQueryFn,
		queryOptions,
		urlSearchParams,
	});

	return children(query);
};

Infinite.propTypes = {
	url: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	metaKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	customQueryFn: PropTypes.func,
	queryOptions: PropTypes.object,
	urlSearchParams: PropTypes.object,
	children: PropTypes.node,
};
