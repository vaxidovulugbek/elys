import React from "react";
import { isArray } from "lodash";

import { useDelete, useFetchInfinite, useFetchOneWithId, useOverlay, useScroll } from "hooks";
import { notifications } from "services";

import { CategoryCard } from "../components/CategoryCard";
import { AddObject, Modals, PageHeading } from "components";
import CategoryForm from "../components/CategoryForm";

const Category = () => {
	const categoryModal = useOverlay("category");
	const categoryList = useFetchInfinite({ url: "/category" });
	useScroll(document.documentElement, categoryList.fetchNextPage, 100);

	const { data, setId } = useFetchOneWithId({
		url: "/category",
		queryOptions: {
			enabled: false,
		},
		refetchStatus: categoryModal.isOpen,
	});
	const deleteData = useDelete({
		url: "/category",
		queryOptions: { onSuccess: () => roomDeleted() },
	});

	const roomDeleted = () => {
		notifications.success("Category delete success");
		categoryList.refetch();
	};
	const onDelete = (id) => {
		Modals.deletePermission({
			title: "Delete a category?",
			icon: "error",
			text: "All data concerning this category will be deleted.",
			receivePermission: () => deleteData.mutate(id),
		});
	};
	const fetchFormData = (id) => {
		setId(id);
		categoryModal.handleOverlayOpen();
	};

	return (
		<>
			<PageHeading
				title="Categories"
				links={[
					{
						url: "/",
						name: "Complex",
					},
					{
						url: "",
						name: "Category",
					},
				]}
			/>

			<div className="row">
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

				{isArray(categoryList.data) &&
					categoryList.data.map((item, index) => (
						<CategoryCard
							item={item}
							key={index}
							onDelete={onDelete}
							onClick={fetchFormData}
						/>
					))}
			</div>

			<CategoryForm categoryList={categoryList} categoryModal={categoryModal} data={data} />
		</>
	);
};

export default Category;
