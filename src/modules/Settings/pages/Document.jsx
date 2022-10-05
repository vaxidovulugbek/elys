import React, { useState } from "react";

import { Fields, PageHeading } from "components";
import Containers from "containers";
import { FastField } from "formik";

const Document = () => {
	const [contentLng, setContentLng] = useState("content.en");

	const contentHandleChange = (lng) => {
		setContentLng(lng);
	};
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
						{console.log(values)}
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
									<div className="document__tab">
										<span onClick={() => contentHandleChange("content.en")}>
											en
										</span>
										<span onClick={() => contentHandleChange("content.ru")}>
											ru
										</span>
										<span onClick={() => contentHandleChange("content.uz")}>
											uz
										</span>
									</div>
									<div className="col-12">
										<FastField
											name={contentLng}
											component={Fields.ReactQuillComponent}
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
								</div>
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};

export default Document;
