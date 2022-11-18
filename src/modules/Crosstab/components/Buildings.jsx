/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import { get, find } from "lodash";

import { functions, notifications } from "services";
import { InfoTooltip } from "components";

export const Buildings = ({
	setCurrentStep,
	setActivePathID,
	activePathID,
	step,
	setActiveApartment,
	stepUrls = [],
	data,
	setCount,
	pathData,
}) => {
	const svgWrap = useRef();
	const { t } = useTranslation();
	const [pathHoverData, setPathHoverData] = useState();

	const stringSvg = get(data, "vector");

	useEffect(() => {
		if (svgWrap.current) {
			stringSvg ? (svgWrap.current.innerHTML = stringSvg) : (svgWrap.current.innerHTML = "");
			const paths = svgWrap.current.querySelectorAll("path");
			setCount(paths?.length);
			paths?.forEach((path) => {
				// check for appartment and set color by status
				const appartmentID = path.getAttribute("data-apartment-id");
				const pathID = path.getAttribute(`data-${stepUrls[step]}-id`);
				const appartment = find(get(data, "apartments"), {
					id: Number(appartmentID),
				});
				if (appartmentID) {
					// status colors in the _crosstab-layout.scss file
					path.classList.add(`status-${get(appartment, "status")}`);
				}
				path?.setAttribute("data-tip", "tooltip");
				path?.setAttribute("id", "happyFace");
				path?.setAttribute("data-for", "happyFace");
				path?.addEventListener("click", (e) => {
					// get id from path tag

					if ((pathID, step < 3)) {
						const PathsId = activePathID;
						PathsId[step] = pathID;
						setActivePathID(PathsId);

						setCurrentStep(step + 1);
					} else if (step === 3) {
						// open right side appartment information
						setActiveApartment(appartment);

						appartment || notifications.error(t("This appartment is not available"));
					}
				});
				path?.addEventListener("mouseenter", (e) => {
					if (step === 3) {
						setPathHoverData(appartment);
					} else {
						const activeData = find(pathData, { id: Number(pathID) });
						setPathHoverData(activeData);
					}
				});
			});
		}
		ReactTooltip.rebuild();
	}, [data, svgWrap, stringSvg, pathData]);
	return (
		<>
			<div className="buildings" ref={svgWrap}></div>

			<InfoTooltip id={"happyFace"} effect="float">
				<span>{get(pathHoverData, "name.uz")}</span>
				<div>ID:{get(pathHoverData, "id")}</div>
				{get(pathHoverData, "plan.area") ? (
					<div>
						Area: {get(pathHoverData, "plan.area")} m<sup>2</sup>{" "}
					</div>
				) : (
					""
				)}
				{get(pathHoverData, "price") ? (
					<div>Price: {functions.convertToReadable(get(pathHoverData, "price"))} UZS</div>
				) : (
					""
				)}
			</InfoTooltip>
		</>
	);
};
