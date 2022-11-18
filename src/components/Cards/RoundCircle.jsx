import React from "react";
import { useTranslation } from "react-i18next";

export const RoundCircle = ({ title, subtitle }) => {
	const { t } = useTranslation();
	return (
		<div className="object__accommodation">
			<p>{t(title)}</p>
			<p>{t(subtitle)}</p>
		</div>
	);
};
