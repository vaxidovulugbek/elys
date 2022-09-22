export const queryBuilder = (url, config = {}) => {
	if (Object.keys(config).length <= 0) return url;

	const { sort, limit = 20, page = 1, include = [], extra = {}, filter = {} } = config;
	const queryObj = new URLSearchParams();

	if (include.length) queryObj.set("include", include.toString());

	if (Object.keys(extra).length)
		Object.entries(extra).forEach((item) => {
			if (item[0] && item[1]) queryObj.append(item[0], item[1]);
		});

	if (Object.keys(filter).length)
		Object.entries(filter).forEach((item) => {
			if (item[0] && item[1]) queryObj.append(`filter[${item[0]}]`, item[1]);
		});

	if (sort) queryObj.set("sort", sort);

	if (limit) queryObj.set("per-page", limit);

	queryObj.set("page", page);

	return `${url}?${decodeURIComponent(queryObj.toString())}`;
};
