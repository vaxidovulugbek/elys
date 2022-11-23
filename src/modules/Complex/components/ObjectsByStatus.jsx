import { get } from "lodash";
import React from "react";

function ObjectsByStatus({ data }) {
	let total = 0;
	get(data, "soldApartments", []).map((item) => {
		total = total + item.count;
	});

	return (
		<div
			className="objects-by-status p-4 mt-4"
			style={{
				backgroundColor: "#fff",
				boxShadow: "4px 8px 100px rgba(0, 0, 0, 0.04)",
				borderRadius: "12px",
			}}
		>
			<div className="heading">
				<h3 className="mb-3">Объекты по статусам</h3>
			</div>
			<div className="row d-flex">
				{get(data, "soldApartments", []).map((item) => {
					return (
						<div className="col-3" key={item.status}>
							{item.status === 1 ? (
								<div className="p-2" style={{ borderLeft: "3px solid #1ddd8d" }}>
									<h3 className="mb-1">{item.count}</h3>
									<p style={{ color: "#1ddd8d", fontWeight: "600" }}>Доступно</p>
								</div>
							) : item.status === 2 ? (
								<div className="p-2" style={{ borderLeft: "3px solid #ffb400" }}>
									<h3 className="mb-1">{item.count}</h3>
									<p style={{ color: "#ffb400", fontWeight: "600" }}>
										Заинтересован
									</p>
								</div>
							) : item.status === 3 ? (
								<div className="p-2" style={{ borderLeft: "3px solid #ec6372" }}>
									<h3 className="mb-1">{item.count}</h3>
									<p style={{ color: "#ec6372", fontWeight: "600" }}>Проданные</p>
								</div>
							) : item.status === 4 ? (
								<div className="p-2" style={{ borderLeft: "3px solid #5b8ec3" }}>
									<h3 className="mb-1">{item.count}</h3>
									<p style={{ color: "#5b8ec3", fontWeight: "600" }}>
										не для продажи
									</p>
								</div>
							) : (
								""
							)}
						</div>
					);
				})}
			</div>
			<div className="diagramm mt-4 d-flex align-items-center w-100">
				{get(data, "soldApartments", []).map((item) => {
					return (
						<>
							{item.status === 1 ? (
								<div
									key={item.status}
									className="green"
									style={{
										backgroundColor: "#1DDD8D",
										borderRadius: "6px 0px 0px 6px",
										width: `${(item.count * 100) / total}%`,
										height: "70px",
									}}
								></div>
							) : item.status === 2 ? (
								<div
									className="orange"
									key={item.status}
									style={{
										backgroundColor: "#F2C94C",
										borderRadius: "0px 6px 6px 0px",
										width: `${(item.count * 100) / total}%`,
										height: "70px",
									}}
								></div>
							) : item.status === 3 ? (
								<div
									className="red"
									key={item.status}
									style={{
										backgroundColor: "#EB5757",
										width: `${(item.count * 100) / total}%`,
										height: "70px",
									}}
								></div>
							) : item.status === 4 ? (
								<div
									className="blue"
									key={item.status}
									style={{
										backgroundColor: "#5b8ec3",
										width: `${(item.count * 100) / total}%`,
										height: "70px",
									}}
								></div>
							) : (
								""
							)}
						</>
					);
				})}
			</div>
		</div>
	);
}

export default ObjectsByStatus;
