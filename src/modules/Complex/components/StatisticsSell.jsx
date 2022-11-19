import React from "react";
import MoneyIcon from "../../../assets/images/money.svg";
import Frame2 from "../../../assets/images/Frame2.svg";
import Frame3 from "../../../assets/images/Frame3.svg";
import usericon from "../../../assets/images/user-icon.svg";
import "../styles/InvoiceView.scss";
import { functions } from "services";

const StatisticsSell = ({ data }) => {
	console.log(data);
	return (
		<div className="statisticssell row gap-1">
			<div className="col-4">
				<div className="d-flex flex-column statisticssell__card">
					<img className="statisticssell__img" src={MoneyIcon} alt="" />
					<div className="d-flex mb-2">
						<img className="statisticssell__subimg" src={usericon} alt="" />
						<span className="statisticssell__num">
							{data?.allSales[0].apartment_count}
						</span>
					</div>
					<p className="statisticssell__text">Всего продаж</p>
					<p className="statisticssell__subtext">
						<span className="statisticssell__subtext-sum">
							{functions.toFixed(Number(data?.allSales[0].amount), 2)}
						</span>{" "}
						UZS
					</p>
				</div>
			</div>
			<div className="col-4">
				<div className="statisticssell__card d-flex flex-column">
					<img className="statisticssell__img" src={Frame2} alt="" />
					<div className="d-flex mb-2">
						<img className="statisticssell__subimg" src={usericon} alt="" />
						<span className="statisticssell__num">
							{data?.allArea[0].count_apartment}
						</span>
					</div>
					<p className="statisticssell__text">Объектов продано</p>
					<p className="statisticssell__subtext">
						<span className="statisticssell__subtext-sum">
							{functions.toFixed(Number(data?.allArea[0].sum_area), 2)}
						</span>{" "}
						UZS
					</p>
				</div>
			</div>
			<div className="col-4">
				<div className="statisticssell__card  d-flex flex-column">
					<img className="statisticssell__img" src={Frame3} alt="" />
					<div className="d-flex mb-2">
						<img className="statisticssell__subimg" src={usericon} alt="" />
						<span className="statisticssell__num">12</span>
					</div>
					<p className="statisticssell__text">Средняя цена</p>
					<p className="statisticssell__subtext">
						<span className="statisticssell__subtext-sum">
							{data?.averagePrice[0].avg}
						</span>{" "}
						UZS
					</p>
				</div>
			</div>
		</div>
	);
};

export default StatisticsSell;
