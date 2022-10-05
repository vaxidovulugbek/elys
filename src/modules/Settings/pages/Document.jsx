import React, { useState } from "react";

import { FastField } from "formik";
import cn from "classnames";

import Containers from "containers";
import { Button, Fields, PageHeading } from "components";

import "./../styles/Document.scss";
import { useNavigate } from "react-router-dom";

const Document = () => {
	const navigate = useNavigate();
	const [contentLng, setContentLng] = useState("en");

	const contentHandleChange = (lng) => {
		setContentLng(lng);
	};

	console.log(contentLng, "lng");

	const tabData = [
		{
			navLabel: "en",
			navValue: "content.en",
		},
		{
			navLabel: "ru",
			navValue: "content.ru",
		},
		{
			navLabel: "uz",
			navValue: "content.uz",
		},
	];
	return (
		<>
			<PageHeading
				title="Complex"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "My complex" },
					{ url: "", name: "Document" },
				]}
			/>

			<Containers.Form
				url="document"
				method="post"
				key={"document"}
				className="row"
				fields={[
					{
						name: "name",
						validationType: "object",
						validations: [{ type: "lng" }],
					},
					{
						name: "content",
						validationType: "object",
						validations: [{ type: "lng" }],
					},
					{
						name: "file_id",
						validationType: "number",
					},
				]}
			>
				{({ values }) => (
					<>
						{console.log(values.content)}
						<div className="col-lg-12">
							<div className="card-box">
								<h5 className="text-muted card-sub">
									<b>Document</b>
								</h5>

								<div className="row g-4">
									<div className="col-12">
										<FastField
											name="name.en"
											component={Fields.Input}
											label={["Document name EN", <span>*</span>]}
											placeholder="Name"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="name.ru"
											component={Fields.Input}
											label={["Document name RU", <span>*</span>]}
											placeholder="Name"
										/>
									</div>

									<div className="col-12">
										<FastField
											name="name.uz"
											component={Fields.Input}
											label={["Document name UZ", <span>*</span>]}
											placeholder="Name"
										/>
									</div>
									<div className="col-12">
										<FastField
											name="file_id"
											component={Fields.Upload}
											label={"Document File"}
											placeholder="Select File (.doc,.docx)"
											btnText="Upload"
											accept={
												".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
											}
										/>
									</div>
									<div className="document__tab">
										{tabData.map((item, index) => (
											<span
												key={index}
												onClick={() => contentHandleChange(item.navLabel)}
												className={cn("document__tab-nav", {
													active: item.navLabel === contentLng,
												})}
											>
												{item.navLabel}
											</span>
										))}
									</div>
									<div className="col-12">
										<FastField
											name={`content.${contentLng}`}
											component={Fields.ReactQuillComponent}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="bottom-buttons">
							<hr />
							<div className="d-flex align-items-center justify-content-center">
								<Button
									className="btn btn_outlined"
									type="reset"
									innerText="Cancel"
									onClick={() => navigate("/", { replace: true })}
								/>
								<Button className="btn btn_green" type="submit" innerText="Add" />
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};

export default Document;
