import React from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";

import { notifications } from "services";
import { useDelete, useFetchList } from "hooks";

import { RoundCircle } from "./RoundCircle";
import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";
import { Button } from "components";

export const SectionCard = ({ data, onClick = () => {}, complexID }) => {
	const sectionList = useFetchList({
		url: "/section",
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

	const { mutateAsync } = useDelete({
		url: `/section/${get(data, "id")}`,
		queryOptions: {
			onSuccess,
			onError,
		},
	});

	const deleteSection = (e) => {
		e.stopPropagation();
		deletePermission({
			title: "Delete a section?",
			icon: "error",
			text: "All data concerning this section will be deleted.",
			receivePermission: () => mutateAsync().then((res) => sectionList.refetch()),
		});
	};

	return (
		<div className="object__card">
			<div className="object__img">
				<img src={require("assets/images/object-image.jpg")} alt="objectimage" />

				<RoundCircle title="462" subtitle="premises" />

				<div className="d-flex align-items-center object__btns">
					<Button
						className="object__action bg_green"
						onClick={(event) => onClick(event, get(data, "id"))}
						append={
							<svg width="24" height="24" viewBox="0 0 24 24">
								<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
							</svg>
						}
					/>

					<Button
						className="object__action bg_red"
						onClick={deleteSection}
						append={
							<svg width="24" height="24" viewBox="0 0 24 24">
								<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
							</svg>
						}
					/>
				</div>
			</div>

			<div className="object__content">
				<Link
					to={`/complex/${complexID}/section/${get(data, "id")}/floor`}
					className="object__title"
				>
					{get(data, "name.uz", "")}
				</Link>
			</div>
		</div>
	);
};
