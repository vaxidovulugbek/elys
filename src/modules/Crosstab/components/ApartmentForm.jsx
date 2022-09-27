import React from "react";
import { FastField, Field } from "formik";
import cn from "classnames";

import { FormContainer } from "containers/Form";
import { Input } from "components/Fields/Input/Input";

import { ReactComponent as Xbtn } from "assets/images/x.svg";

export const ApartmentForm = ({ boxType, setBoxType }) => {
	return (
		<div className={cn("apartment-form", { active: boxType === "form" })}>
			<button className={cn("close hasApartment")} onClick={() => setBoxType("card")}>
				<Xbtn />
			</button>
			<h3>Заявка</h3>
			<p className="subtitle">Квартира №{111}</p>
			<FormContainer
				fields={[
					{
						name: "name",
						validationType: "string",
						validations: [{ type: "required" }],
					},
					{
						name: "phone",
						validationType: "string",
						validations: [{ type: "required" }],
					},
					{
						name: "email",
					},
					{
						name: "message",
					},
				]}
			>
				{({ values }) => {
					return (
						<>
							<div className="input">
								<FastField
									type="text"
									name="name"
									component={Input}
									label={["Ваше имя ", <span>*</span>]}
								/>
							</div>
							<div className="input">
								<FastField
									type="text"
									name="phone"
									component={Input}
									label={["Телефон ", <span>*</span>]}
								/>
							</div>
							<div className="input">
								<FastField
									type="text"
									name="email"
									component={Input}
									label={["E-mail"]}
								/>
							</div>
							<div className="input">
								<label>
									Сообщение <span>*</span>
								</label>
								<Field name="message" component={TextArea} />
							</div>
							<div className="submit">
								<button className="btn">Отправить</button>
							</div>
							<div className="cencel">
								<button className="btn--cencel" onClick={() => setBoxType("card")}>
									Отменить
								</button>
							</div>
						</>
					);
				}}
			</FormContainer>
		</div>
	);
};

const TextArea = () => {
	return <textarea rows="5"></textarea>;
};
