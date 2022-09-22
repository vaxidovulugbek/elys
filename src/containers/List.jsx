// const {meta, queryKey, pageParam, signal} = context
import PropTypes from "prop-types";

import { useFetchList } from "hooks";

export const List = ({
	url,
	dataKey = "data",
	metaKey = "meta",
	customQueryFn,
	queryOptions = {},
	urlSearchParams,
	children,
}) => {
	const query = useFetchList({
		url,
		dataKey,
		metaKey,
		customQueryFn,
		queryOptions,
		urlSearchParams,
	});

	return children(query);
};

List.propTypes = {
	url: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	metaKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	customQueryFn: PropTypes.func,
	queryOptions: PropTypes.object,
	urlSearchParams: PropTypes.object,
	children: PropTypes.node,
};
