import { isFunction, get } from "lodash";

import { queryBuilder } from "../querBuilder";
import { httpCLient } from "../api";

const ultimateQueryFn = (customQueryFn, urlSearchParams) =>
	customQueryFn ? customQueryFn : (context) => queryFn(context, urlSearchParams);

const dataSelect = (data = {}, dataKey) =>
	isFunction(dataKey) ? dataKey(data) : get(data, dataKey);

const metaSelect = (data = {}, metaKey) =>
	isFunction(metaKey) ? metaKey(data) : get(data, metaKey);

const getQueryKey = (method, url, urlSearchParams) => {
	return urlSearchParams ? [method, url, urlSearchParams] : [method, url];
};

const queryFn = async (context, urlSearchParams = {}) => {
	const { queryKey, signal, pageParam } = context;
	if (pageParam) urlSearchParams.page = pageParam;
	if (queryKey[2] && queryKey[2].id) queryKey[1] = `${queryKey[1]}/${queryKey[2].id}`;
	const url = queryBuilder(queryKey[1], urlSearchParams);
	const { data } = await httpCLient.request({
		method: queryKey[0],
		url,
		signal,
	});
	return data;
};

export const apiHelpers = {
	ultimateQueryFn,
	dataSelect,
	metaSelect,
	getQueryKey,
};
