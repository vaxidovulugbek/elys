import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { get, isEmpty, uniqBy } from "lodash";

import { useFetchList, useFetchOneWithId } from "hooks";
import { ListPagination, Modals, PageHeading } from "components";
import { InvoiceTable } from "../components/InvoiceTable";
import { constants, functions, httpCLient, notifications, time } from "services";
import { complex_functions } from "../functions";
import { InvoiceForm } from "../components/InvoiceForm";
import { InvoiceFilter } from "../components/InvoiceFilter";
import { useModalWithHook } from "hooks/useModalWithHook";
import { InvoiceView } from "../components/InvoiceView";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Invoice = () => {
	const { search } = useLocation();
	const invoiceModal = useModalWithHook();
	const invoiceViewModal = useModalWithHook();
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const [apartmentOption, setApartmentOption] = useState({ value: null, label: "All" });
	const [clientOption, setClientOption] = useState({ value: null, label: "All" });
	const [statusOption, setStatusOption] = useState({ value: null, label: "All" });
	const [paymentTypeOption, setPaymentTypeOption] = useState({ value: null, label: "All" });
	const [rangeDate, setRangeDate] = useState(null);

	const invoice = useFetchOneWithId({
		url: "/transaction",
		urlSearchParams: { include: "apartment,client,complex,contract" },
		queryOptions: { enabled: false },
		refetchStatus: true,
	});

	const invoices = useFetchList({
		url: "/transaction",
		urlSearchParams: {
			page,
			include: "contract,client,apartment",
			filter: {
				contract_id: new URLSearchParams(search).get("contract_id"),
				apartment_id: Number(apartmentOption.value),
				status: Number(statusOption.value),
				payment_type: Number(paymentTypeOption.value),
				from: rangeDate && Number(time.toTimestamp(rangeDate[0])),
				to: rangeDate && Number(time.toTimestamp(rangeDate[1])),
			},
		},
	});

	const payed = useMutation({
		mutationFn: (id, payment_type) => {
			return httpCLient.post(`/transaction/${id}/payed`, { payment_type });
		},
		onSuccess: () => {
			notifications.success("status changed to payed");
			invoices.refetch();
		},
	});

	const canceled = useMutation({
		mutationFn: (id) => {
			return httpCLient.post(`/transaction/${id}/canceled`);
		},
		onSuccess: () => {
			notifications.success("status changed to canceled");
			invoices.refetch();
		},
	});

	const apartments = [
		{ value: null, label: "All" },
		...uniqBy(
			complex_functions.getOptions(invoices, "apartment.name.uz", "apartment.id"),
			"value"
		),
	];
	const clients = [
		{ value: null, label: "All" },
		...uniqBy(
			complex_functions.getOptions(invoices, "client.first_name", "client.id"),
			"value"
		),
	];

	const onEdit = (row) => {
		invoice.setId(row.id);
		invoiceModal.handleOverlayOpen();
	};

	const onChecked = (id, payment_type) => {
		Modals.deletePermission({
			title: "Change payed status?",
			icon: "error",
			text: "Status this transaction will be changed to payed",
			denyButtonText: "Yes,change",
			receivePermission: () => payed.mutate(id, payment_type),
		});
	};

	const onCancel = (id) => {
		Modals.deletePermission({
			title: "Change payed status?",
			icon: "error",
			text: "Status this transaction will be changed to canceled",
			denyButtonText: "Yes,change",
			receivePermission: () => canceled.mutate(id),
		});
	};

	const onView = (row) => {
		invoice.setId(row.id);
		invoiceViewModal.handleOverlayOpen();
	};

	return (
		<>
			<PageHeading
				title="Transactions"
				links={[
					{ name: "Control panel", url: "/" },
					{ name: "Transactions", url: "/" },
				]}
			/>
			<InvoiceFilter
				{...{
					apartments,
					clients,
					setApartmentOption,
					setClientOption,
					setPaymentTypeOption,
					setStatusOption,
					apartmentOption,
					clientOption,
					statusOption,
					paymentTypeOption,
					rangeDate,
					setRangeDate,
				}}
			/>

			<InvoiceTable
				items={get(invoices, "data", [])}
				modal={invoiceModal}
				editAction={onEdit}
				viewAction={onView}
				checkAction={onChecked}
				cancelAction={onCancel}
				columns={[
					{
						title: "ID",
						dataKey: "id",
						render: (value) => value,
					},
					{
						title: t("Complex"),
						dataKey: "complex_id",
						render: (value) => value,
					},
					{
						title: t("Apartment"),
						dataKey: "apartment_id",
						render: (value) => value,
					},
					{
						title: t("Status"),
						dataKey: "status",
						render: (value) =>
							constants.payedStatusOptions.find((item) => item.value === value).label,
					},
					{
						title: t("Created at"),
						dataKey: "created_at",
						render: (value) => time.to(value),
					},
					{
						title: t("Payment type"),
						dataKey: "payment_type",
						render: (value) => value,
					},
					{
						title: t("Date"),
						dataKey: "date",
						render: (value) => time.to(value),
					},
					{
						title: t("Amount"),
						dataKey: "amount",
						render: (value) => functions.toFixed(value, 2),
					},
				]}
			/>

			<InvoiceForm modal={invoiceModal} data={get(invoice, "data")} invoices={invoices} />
			<InvoiceView data={get(invoice, "data")} modal={invoiceViewModal} />
			<ListPagination
				pageCount={get(invoices, "meta.pageCount")}
				onPageChange={(page) => {
					setPage(page + 1);
				}}
			/>
		</>
	);
};

export default Invoice;
