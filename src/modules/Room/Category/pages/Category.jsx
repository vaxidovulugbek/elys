import React from "react";

import { useDelete, useFetchList, useFetchOneWithId, useOverlay } from "hooks";
import { CategoryCard } from "../components/CategoryCard";
import { AddObject, Modals } from "components";
import Containers from "containers";
import CategoryForm from "../components/CategoryForm";
import { notifications } from "services";

const Category = () => {
	const categoryModal = useOverlay("category");
	const categoryList = useFetchList({ url: "category" });

	const { data, setId } = useFetchOneWithId({
		url: "category",
		queryOptions: {
			enabled: false,
		},
		refetchStatus: categoryModal.isOpen,
	});
	const deleteData = useDelete({
		url: "room",
		queryOptions: { onSuccess: () => roomDeleted() },
	});

	const roomDeleted = () => {
		notifications.success("Category delete success");
		categoryList.refetch();
	};

	const onDelete = (id) => {
		const receivePermission = () => {
			deleteData.mutate(id);
		};
		Modals.deletePermission({
			title: "Delete a category?",
			icon: "error",
			text: "All data concerning this category will be deleted.",
			receivePermission,
		});
	};

	const fetchFormData = (id) => {
		setId(id);
		categoryModal.handleOverlayOpen();
	};
	return (
		<>
			<div className="row">
				<Containers.List url="category">
					{({ data }) => {
						return (
							<>
								{Array.isArray(data) &&
									data.map((item, index) => (
										<CategoryCard
											item={item}
											key={index}
											onDelete={onDelete}
											onClick={fetchFormData}
										/>
									))}
							</>
						);
					}}
				</Containers.List>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
					<AddObject
						onClick={() => {
							setId(null);
							categoryModal.handleOverlayOpen();
						}}
						src={require("assets/images/section-img1.png")}
						innerText="ADD A CATEGORY"
						className={"p-3"}
					/>
				</div>
			</div>
			<CategoryForm {...{ categoryList, categoryModal, data }} />
		</>
	);
};

export default Category;
