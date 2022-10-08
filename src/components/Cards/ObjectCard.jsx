import React from "react";
import { Link } from "react-router-dom";

import { get } from "lodash";

import { useDelete, useFetchList } from "hooks";
import { notifications } from "services";

import { RoundCircle } from "./RoundCircle";
import { Modals } from "components";

import { ReactComponent as TariffIcon } from "assets/images/tariff.svg";
import "./Cards.scss";

export const ObjectCard = ({ data, handleDocument = () => {}, handleViewDocument = () => {} }) => {
	const complex = useFetchList({
		url: "user/complex",
		urlSearchParams: { include: "files" },
		queryOptions: { enabled: false },
	});

	const onSuccess = () => {
		notifications.success("Complex delete success");
		complex.refetch();
	};

	const onError = (err) => {
		notifications.error("Something went wrong");
	};

	const { mutate } = useDelete({
		url: `/complex/${get(data, "id")}`,
		queryOptions: {
			onSuccess,
			onError,
		},
	});

	const receivePermission = () => {
		mutate();
	};

	const deleteObject = (e) => {
		e.stopPropagation();
		Modals.deletePermission({
			title: "Delete a project?",
			icon: "error",
			text: "All data concerning this project will be deleted.",
			receivePermission,
		});
	};

	return (
		<div className="object__card">
			<div className="object__img">
				<img
					src={
						get(data, "files[0].thumbnails.full") ||
						require("assets/images/object-image.jpg")
					}
					alt="object"
				/>
				<RoundCircle title={get(data, "id")} subtitle="complex" />

				<div className="d-flex align-items-center object__btns">
					<Link to={`/crosstab/${get(data, "id")}`} className="object__action bg_purple">
						<svg fill="#fff" width="24" height="24" viewBox="0 0 24 24">
							<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
						</svg>
					</Link>

					<button
						className="object__action bg_blue"
						onClick={() => handleDocument(get(data, "id"))}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
							<path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM111 257.1l26.8 89.2 31.6-90.3c3.4-9.6 12.5-16.1 22.7-16.1s19.3 6.4 22.7 16.1l31.6 90.3L273 257.1c3.8-12.7 17.2-19.9 29.9-16.1s19.9 17.2 16.1 29.9l-48 160c-3 10-12.1 16.9-22.4 17.1s-19.8-6.2-23.2-16.1L192 336.6l-33.3 95.3c-3.4 9.8-12.8 16.3-23.2 16.1s-19.5-7.1-22.4-17.1l-48-160c-3.8-12.7 3.4-26.1 16.1-29.9s26.1 3.4 29.9 16.1z" />
						</svg>
					</button>

					<Link
						to={`complex/update/${get(data, "id")}`}
						className="object__action bg_green"
					>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
						</svg>
					</Link>

					<Link to={`tariff/${get(data, "id")}`} className="object__action bg_orange">
						<TariffIcon fill="#fff" />
					</Link>

					<button className="object__action bg_red" onClick={(e) => deleteObject(e)}>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				</div>
			</div>

			<div className="object__content">
				<Link to={`complex/update/${get(data, "id")}`} className="object__title">
					{get(data, "name.uz", "")}
				</Link>
				<div className="d-flex align-items-center object__address">
					<svg width="17" height="17" viewBox="0 0 17 17">
						<g></g>
						<path d="M8.5 0.5c-3.032 0-5.5 2.467-5.5 5.5 0 4.373 4.913 10.086 5.122 10.328l0.378 0.435 0.378-0.436c0.209-0.241 5.122-5.954 5.122-10.327 0-3.033-2.468-5.5-5.5-5.5zM8.5 15.215c-1.146-1.424-4.5-5.879-4.5-9.215 0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5c0 3.333-3.354 7.791-4.5 9.215zM8.5 3.139c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zM8.5 8.139c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2z" />
					</svg>
					{get(data, "address.uz", "")}
					{/* {get(data, "address." + lngCode, "")} */}
				</div>

				<div className="object__stat">
					<div className="object__stat-head">
						<h4 className="object__stat-title">Sales status</h4>
						<div className="object__tab">
							<div className="object__tab-item">%</div>
							<div className="object__tab-item">pc</div>
						</div>
					</div>
					<div className="object__range d-flex">
						<div className="bg_red" style={{ width: "20%" }}>
							20%
						</div>
						<div className="bg_blue" style={{ width: "30%" }}>
							30%
						</div>
						<div className="bg_orange" style={{ width: "15%" }}>
							15%
						</div>
						<div className="bg_green" style={{ width: "25%" }}>
							25%
						</div>
						<div className="bg_purple" style={{ width: "10%" }}>
							10%
						</div>
					</div>
				</div>

				<div className="object__links d-flex" onClick={(e) => e.stopPropagation()}>
					<Link
						to={`complex/update/${get(data, "id")}`}
						className="btn btn_green btn_small"
					>
						<svg fill="#fff" width="24" height="24" viewBox="0 0 24 24">
							<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
						</svg>
						Edit
					</Link>

					<button
						className="btn btn_outlined btn_small"
						onClick={() => handleViewDocument(get(data, "id"))}
					>
						<svg
							width={16}
							height={16}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
						>
							<path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM111 257.1l26.8 89.2 31.6-90.3c3.4-9.6 12.5-16.1 22.7-16.1s19.3 6.4 22.7 16.1l31.6 90.3L273 257.1c3.8-12.7 17.2-19.9 29.9-16.1s19.9 17.2 16.1 29.9l-48 160c-3 10-12.1 16.9-22.4 17.1s-19.8-6.2-23.2-16.1L192 336.6l-33.3 95.3c-3.4 9.8-12.8 16.3-23.2 16.1s-19.5-7.1-22.4-17.1l-48-160c-3.8-12.7 3.4-26.1 16.1-29.9s26.1 3.4 29.9 16.1z" />
						</svg>
						Sheet
					</button>

					<Link
						to={`/crosstab/${get(data, "id")}`}
						className="btn btn_outlined btn_small"
					>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
						</svg>
						Crosstab
					</Link>
				</div>
			</div>
		</div>
	);
};
