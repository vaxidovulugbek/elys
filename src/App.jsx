import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFetchOne } from "hooks";
import { auth } from "store/actions";

export const App = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getMeQuery = useFetchOne({
		url: "/user/get-me",
		queryOptions: {
			enabled: false,
			onSuccess: (user) => dispatch(auth.success(user)),
			onError: (error) => {
				navigate("/login");
				dispatch(auth.failure(error));
			},
		},
	});

	useEffect(() => {
		getMeQuery.refetch();
	}, []);

	return children(getMeQuery);
};
