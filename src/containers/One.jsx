// const {meta, queryKey, pageParam, signal} = context
import PropTypes from "prop-types";

import { useFetchOne } from "hooks";

export const One = ({
	url,
	dataKey = "data",
	customQueryFn,
	queryOptions = {},
	urlSearchParams,
	children,
}) => {
	const query = useFetchOne({
		url,
		dataKey,
		customQueryFn,
		queryOptions,
		urlSearchParams,
	});
	return children(query);
};

One.propTypes = {
	url: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	customQueryFn: PropTypes.func,
	queryOptions: PropTypes.object,
	urlSearchParams: PropTypes.object,
	children: PropTypes.node,
};
