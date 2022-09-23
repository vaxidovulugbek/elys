import { GalleryCard } from "components/Cards/GalleryCard";
import { Fancybox } from "components";
import { AddObject } from "components";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const LayoutUpdateUpload = ({ field, form, handleOverlayOpen }) => {
	const [images, setImages] = useState([]);
	const [imageURLS, setImageURLs] = useState([]);

	const handleFilesUpload = (event) => {
		form.setFieldValue(field.name, event.target.files);
		setImages([...event.target.files]);
	};

	useEffect(() => {
		if (!images.length) return;
		images.map((image) => {
			return setImageURLs((prev) => [
				...prev,
				{ url: URL.createObjectURL(image), name: image.name },
			]);
		});
	}, [images]);

	return (
		<>
			<div className="row">
				<Fancybox>
					{imageURLS.map((img, idx) => (
						<div
							className="col-6 mobiles gallery-items-list-box-wrap"
							data-fancybox="gallery"
							data-src={img.url}
							key={idx}
						>
							<GalleryCard url={img.url} imageName={img.name} />
						</div>
					))}
				</Fancybox>
			</div>
			<div className="row">
				<div className="col-5">
					<AddObject
						src={require("assets/images/videoIcon.svg").default}
						imageStyle={{ maxHeight: "120px" }}
						innerText={"Add video or 3D tour"}
						className={"p-3 mt-4"}
						onClick={handleOverlayOpen}
					/>
				</div>

				<div className="col-5" style={{ position: "relative" }}>
					<label htmlFor="file">
						<input
							style={{ width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
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
							className={"p-3 pos-a mt-4"}
						/>
					</label>
				</div>
			</div>
		</>
	);
};
