import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isArray } from "lodash";

import { useFetchInfinite, useOverlay, useScroll } from "hooks";

import { AddObject, ObjectCard, PageHeading } from "components";
import { SearchForm } from "./../components/SearchForm";
import { DocumentForm } from "../components/DocumentForm";

const List = () => {
	const navigate = useNavigate();
	const documentModal = useOverlay("documentModal");
	const [filterByComplexName, setFilterByComplexName] = useState("");

	const handleFilter = (searchText) => {
		setFilterByComplexName(searchText);
	};

	const onKeyDown = (e, searchText) => {
		if (e.key === "Enter") handleFilter(searchText);
	};

	const complexList = useFetchInfinite({
		url: "/user/complex",
		urlSearchParams: {
			include: "files,apartments",
			filter: { name: filterByComplexName },
		},
	});
	useScroll(document.documentElement, complexList.refetch, 100);

	const [complexId, setComplexId] = useState();

	const handleDocument = (id) => {
		setComplexId(id);
		documentModal.handleOverlayOpen();
	};

	const handleViewDocument = (id) => {
		navigate(`/complex/${id}/document`);
	};

	return (
		<>
			<PageHeading
				title="My complexes"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "My complexes" },
				]}
			/>

			<SearchForm
				onSearch={handleFilter}
				onAdd={() => navigate("/complex/create")}
				onKeyDown={onKeyDown}
			/>

			<div className="row">
				<div className="col-4">
					<AddObject
						onClick={() => navigate("/complex/create")}
						src={require("assets/images/object-add.png")}
					/>
				</div>

				{isArray(complexList.data) &&
					complexList.data.map((item, index) => {
						return (
							<div className="col-4" style={{ marginBottom: "20px" }} key={index}>
								<ObjectCard
									data={item}
									key={index}
									complexRefetch={complexList.refetch}
									handleDocument={handleDocument}
									handleViewDocument={handleViewDocument}
								/>
							</div>
						);
					})}
			</div>

			<DocumentForm documentModal={documentModal} complexId={complexId} />
		</>
	);
};

export default List;
