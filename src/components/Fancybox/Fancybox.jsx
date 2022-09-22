import React, { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";

export const Fancybox = ({ children, options, ...props }) => {
	const delegate = props.delegate || "[data-fancybox]";

	useEffect(() => {
		const opts = options || {};

		NativeFancybox.bind(delegate, opts);

		return () => {
			NativeFancybox.destroy();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};
