import React from "react";
import { useNavigate } from "react-router-dom";
import { get, isArray } from "lodash";

import { useDelete, useFetchInfinite, useScroll } from "hooks";

import { SectionCard, Typography } from "components";
import { deletePermission } from "components/Modal/DeletePermission/DeletePermission";
import { useTranslation } from "react-i18next";

export const SectionList = ({ complexID }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const sectionList = useFetchInfinite({
		url: "/section",
		urlSearchParams: {
			filter: { complex_id: complexID },
		},
	});
	useScroll(document.documentElement, sectionList.fetchNextPage, 200);

	const { mutate } = useDelete({
		url: "/section",
		queryOptions: {
			onSuccess: () => {
				sectionList.refetch();
			},
		},
	});

	const onDelete = (id) => {
		deletePermission({
			title: "Delete a Section?",
			icon: "error",
			text: "All data concerning this section will be deleted.",
			receivePermission: () => mutate(id),
		});
	};

	const createSection = () => {
		navigate(`/complex/update/${complexID}/section/create`);
	};

	return (
		<>
			<div className="card-box transparent">
				<Typography Type="h5" className="text-muted card-sub">
					{() => <b>{t("Sections")}</b>}
				</Typography>

				<div className="row" style={{ rowGap: "20px" }}>
					<div className="col-lg-3 col-xl-2 col-md-4 col-sm-4 col-6 building-card">
						<button
							className="object__add"
							onClick={createSection}
							style={{
								width: "236px",
								height: "197px",
								display: "flex",
								justifyContent: "center",
							}}
						>
							ADD SECTION
						</button>
					</div>

					{isArray(sectionList.data) &&
						sectionList.data.map((item, index) => (
							<div
								className="col-lg-3 col-xl-2 col-md-4 col-sm-4 col-6 building-card"
								key={index}
							>
								<SectionCard
									key={index}
									complexID={complexID}
									data={item}
									onDelete={onDelete}
									onClick={() =>
										navigate(
											`/complex/update/${complexID}/section/${get(
												item,
												"id"
											)}/update`
										)
									}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	);
};
