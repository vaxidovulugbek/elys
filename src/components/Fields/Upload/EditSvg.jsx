/* eslint-disable react-hooks/exhaustive-deps */
import { Modals, Button, InfoTooltip } from "components";
import { ModalRoot } from "components/Modal";
import { useFetchList, useOverlay } from "hooks";
import { useModalWithHook } from "hooks/useModalWithHook";
import { find, get } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import { httpCLient } from "services";

import "./Upload.scss";

export const EditSvg = ({ vector, filter, dataAttribute, setSvgID, setVector, link = "" }) => {
	const ref = useRef();
	const pathRef = useRef();
	const [pathId, setPathId] = useState();
	// const pathModal = useOverlay("pathModal");
	const pathModal = useModalWithHook();
	const [pathHoverData, setPathHoverData] = useState();

	const { data } = useFetchList({
		url: link,
		urlSearchParams: {
			filter,
		},
	});

	useEffect(() => {
		if (ref.current) {
			ref.current.innerHTML = vector;

			const paths = ref.current.querySelectorAll("path");

			paths.forEach((path) => {
				path.addEventListener("click", (e) => {
					pathModal.handleOverlayOpen();
					console.log(path, "click");
					pathRef.current = path;
				});
				path?.setAttribute("data-tip", "tooltip");
				path?.setAttribute("id", "happyFace");
				path?.setAttribute("data-for", "happyFace");
				path?.addEventListener("mouseenter", (e) => {
					const pathID = path.getAttribute(`data-${dataAttribute}-id`);
					const activeData = find(data, { id: Number(pathID) });
					setPathHoverData(activeData);
				});
			});
		}
		ReactTooltip.rebuild();
	}, [vector, ref, data]);

	useEffect(() => {
		if (pathId) {
			pathRef.current.setAttribute(`data-${dataAttribute}-id`, pathId);
		}
	}, [pathId, pathRef]);

	const handleUpload = () => {
		const svgEl = ref.current.querySelector("svg");

		// remove image tag in svg
		const svgImage = svgEl?.querySelector("image");
		svgEl?.removeChild(svgImage);
		// make file form svg Tag
		const serialize = new XMLSerializer();
		const svgStr = serialize.serializeToString(svgEl);
		const svgFile = new File([svgStr], `${dataAttribute}.svg`, {
			type: "image/svg+xml",
		});
		// upload file
		const formData = new FormData();
		formData.append("files", svgFile);
		httpCLient.post("file", formData).then((data) => {
			setSvgID(get(data, "data[0].data.id"));
			setVector(null);
		});
	};

	return (
		<>
			<div ref={ref} className="vector_container"></div>
			<InfoTooltip id={"happyFace"} effect="float">
				<span>{get(pathHoverData, "name.uz")}</span>
				<div>ID:{get(pathHoverData, "id")}</div>
			</InfoTooltip>
			<div className="bottom-buttons d-flex align-items-center justify-content-center">
				<Button
					className="btn btn_outlined"
					innerText="Cancel"
					type="reset"
					onClick={() => setVector(null)}
				/>
				<Button
					className="btn btn_green"
					innerText="Save"
					type="button"
					onClick={handleUpload}
				/>
			</div>
			<ModalRoot isOpen={pathModal.isOpen}>
				<Modals.BuildingsPicker
					link={link}
					filter={filter}
					close={pathModal.handleOverlayClose}
					setPathId={setPathId}
				/>
			</ModalRoot>
		</>
	);
};
