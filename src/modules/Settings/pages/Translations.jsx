import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FastField } from "formik";
import { get } from "lodash";

import { useFetchList } from "hooks";
import { notifications } from "services";

import Containers from "containers";
import { Button, ListPagination, PageHeading, Table, Fields } from "components";

const Translations = () => {
	const navigate = useNavigate();
	const { i18n } = useTranslation();
	const lngCode = useSelector((state) => state.system.lngCode);

	const [page, setPage] = useState(1);
	const translations = useFetchList({
		url: "/message",
		urlSearchParams: {
			page,
		},
	});

	return (
		<>
			<PageHeading
				title="Translations"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Translations" },
				]}
			/>

			<Containers.Form
				url="/message"
				method="post"
				normalizeFormData={(formData) =>
					formData.translations.map((item, index) => {
						const { category, message, ...other } = item;
						return other;
					})
				}
				onSuccess={(response, formHelpers) => {
					formHelpers.setSubmitting(false);
					notifications.success("Success");
					translations.refetch().then((res) => i18n.changeLanguage(lngCode));
				}}
				onError={(error) => notifications.error("Failure")}
				fields={[
					{
						name: "translations",
						validationType: "array",
						value: translations.data,
					},
				]}
			>
				{({ isSubmitting, values }) => (
					<>
						<Table
							columns={[
								{
									title: "ID",
									dataKey: "id",
									render: (value) => value,
								},
								{
									title: "Message",
									dataKey: "message",
									render: (value) => value,
								},
								{
									title: "Uz",
									dataKey: "translate.uz",
									render: (value, values, index) => (
										<FastField
											name={`translations.${index}.translate.uz`}
											component={Fields.Input}
										/>
									),
								},
								{
									title: "Ru",
									dataKey: "translate.ru",
									render: (value, values, index) => (
										<FastField
											name={`translations.${index}.translate.ru`}
											component={Fields.Input}
										/>
									),
								},
								{
									title: "En",
									dataKey: "translate.en",
									render: (value, values, index) => (
										<FastField
											name={`translations.${index}.translate.en`}
											component={Fields.Input}
										/>
									),
								},
							]}
							items={translations.data}
						/>

						<ListPagination
							pageCount={get(translations, "meta.pageCount")}
							onPageChange={(page) => {
								setPage(page + 1);
							}}
						/>

						<div className="bottom-buttons">
							<hr />
							<div className="d-flex align-items-center justify-content-center">
								<Button
									className="btn btn_outlined"
									type="reset"
									innerText="Cancel"
									onClick={() => navigate("/", { replace: true })}
								/>

								<Button
									className="btn btn_green"
									type="submit"
									innerText="Save"
									isLoading={isSubmitting}
								/>
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};

export default Translations;
