import React from "react";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";

import { notifications } from "services";
import { useDelete, useFetchList } from "hooks";

import { RoundCircle } from "./RoundCircle";
import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";

export const SectionCard = ({ data, link = "/building/update", onClick = () => {}, complexID }) => {
	const navigate = useNavigate();
	const sectionList = useFetchList({
		url: "section",
		queryOptions: { enabled: false },
		urlSearchParams: { filter: { complex_id: complexID } },
	});

	const onSuccess = () => {
		notifications.success("Section delete success");
		sectionList.refetch();
	};

	const onError = (err) => {
		notifications.error("Something went wrong");
	};

	const { mutate } = useDelete({
		url: `section/${get(data, "id")}`,
		queryOptions: {
			onSuccess,
			onError,
		},
	});

	const receivePermission = () => {
		mutate();
	};

	const deleteSection = (e) => {
		e.stopPropagation();
		deletePermission({
			title: "Delete a section?",
			icon: "error",
			text: "All data concerning this section will be deleted.",
			receivePermission,
		});
	};

	return (
		<div
			className="object__card"
			onClick={() => navigate(`/complex/${complexID}/section/${get(data, "id")}/floor`)}
		>
			<div className="object__img">
				<img src={require("assets/images/object-image.jpg")} alt="objectimage" />

				<RoundCircle title="462" subtitle="premises" />

				<div className="d-flex align-items-center object__btns">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onClick(e, get(data, "id"));
						}}
						className="object__action bg_green"
					>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
						</svg>
					</button>

					<button className="object__action bg_red" onClick={deleteSection}>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				</div>
			</div>

			<div className="object__content">
				<h3 href="#" className="object__title">
					{get(data, "name.uz", "")}
				</h3>
			</div>
		</div>
	);
};
