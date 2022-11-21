import React from "react";

function ObjectsByStatus({ data }) {
	let total = 0;
	data?.soldApartments.map((item) => {
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
				{data?.soldApartments.map((item) => {
					return (
						<div className="col-3">
							{item.status === 1 ? (
								<div className="p-2" style={{ borderLeft: "3px solid #1DDD8D" }}>
									<h3 className="mb-1">{item.count}</h3>
									<p style={{ color: "#1DDD8D", fontWeight: "600" }}>Доступно</p>
								</div>
							) : item.status === 2 ? (
								<div className="p-2" style={{ borderLeft: "3px solid #F765A3" }}>
									<h3 className="mb-1">{item.count}</h3>
									<p style={{ color: "#F765A3", fontWeight: "600" }}>
										Заинтересован
									</p>
								</div>
							) : item.status === 3 ? (
								<div className="p-2" style={{ borderLeft: "3px solid #16BFD6" }}>
									<h3 className="mb-1">{item.count}</h3>
									<p style={{ color: "#16BFD6", fontWeight: "600" }}>Проданные</p>
								</div>
							) : (
								""
							)}
						</div>
					);
				})}
			</div>
			<div className="diagramm mt-4 d-flex align-items-center w-100">
				{data?.soldApartments.map((item) => {
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
									className="purple"
									key={item.status}
									style={{
										backgroundColor: "#F765A3",
										borderRadius: "0px 6px 6px 0px",
										width: `${(item.count * 100) / total}%`,
										height: "70px",
									}}
								></div>
							) : item.status === 3 ? (
								<div
									className="blue"
									key={item.status}
									style={{
										backgroundColor: "#16BFD6",
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
