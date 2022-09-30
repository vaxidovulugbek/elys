import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { get } from "lodash";

import { httpCLient } from "services";
import { GalleryCard } from "components/Cards/GalleryCard";
import { Fancybox } from "components";
import { AddObject } from "components";

export const MultiUpload = ({ field, form, files = null, formData, queryKey = [] }) => {
	const queryClient = useQueryClient();
	const [images, setImages] = useState([]);
	const [imageURLS, setImageURLs] = useState([]);

	const handleFilesUpload = (event) => {
		event.stopPropagation();
		setImages([...event.target.files]);
	};
	const onDelete = (id) => {
		if (files.length) {
			const newIds = [];
			queryClient.setQueryData(queryKey, (old) => {
				const data = get(old, "data", {});
				const filteredFiles = get(data, "files").filter((item) => {
					if (item.id !== id) {
						newIds.push(item.id);
						return true;
					}
					return false;
				});
				return {
					...old,
					data: {
						...data,
						files: filteredFiles,
					},
				};
			});
			form.setFieldValue(field.name, newIds);
		} else {
			const filtredIds = [];
			const filtredImageURLS = imageURLS.filter((item) => {
				if (item.id !== id) {
					filtredIds.push(item.id);
					return true;
				}
				return false;
			});
			setImageURLs(filtredImageURLS);
			form.setFieldValue(field.name, filtredIds);
		}
	};

	useEffect(() => {
		if (images.length) {
			const uploadFiles = async () => {
				const formData = new FormData();
				images.forEach((item) => {
					formData.append("files[]", item);
				});
				const res = await httpCLient.post("file", formData);
				const fetchedFiles = res?.data.map((item) => item.data);
				setImageURLs(fetchedFiles);
				const ids = res?.data.reduce((prev, curr) => [curr.data.id, ...prev], []);
				form.setFieldValue(field.name, ids);
			};

			uploadFiles();
		}
	}, [images]);

	return (
		<>
			<div className="row">
				<Fancybox>
					{imageURLS.map((item, idx) => (
						<div
							className="col-6 mobiles gallery-items-list-box-wrap"
							data-fancybox="gallery"
							data-src={item.thumbnails.thumb}
							key={idx}
						>
							<GalleryCard
								url={item.thumbnails.thumb}
								imageName={item.name}
								item={item}
								onDelete={onDelete}
							/>
						</div>
					))}
					{files?.map((item, idx) => (
						<div
							className="col-6 mobiles gallery-items-list-box-wrap"
							data-fancybox="gallery"
							data-src={item.thumbnails.thumb}
							key={idx}
						>
							<GalleryCard
								url={item.thumbnails.thumb}
								imageName={item.title}
								item={item}
								onDelete={onDelete}
							/>
						</div>
					))}
				</Fancybox>
			</div>
			<div className="row">
				<div className="col-5" style={{ position: "relative" }}>
					<label htmlFor="file">
						<input
							style={{
								width: "100%",
								height: "100%",
								opacity: 0,
								cursor: "pointer",
								position: "absolute",
								inset: 0,
								zIndex: 3,
							}}
							type="file"
							id="file"
							multiple
							accept="image/*"
							onChange={handleFilesUpload}
						/>
						<AddObject
							src={require("assets/images/imageUpload.svg").default}
							imageStyle={{
								maxHeight: "120px",
							}}
							innerText={"Upload images"}
							className={"p-3 mt-4"}
							type="button"
						/>
					</label>
				</div>
			</div>
		</>
	);
};
