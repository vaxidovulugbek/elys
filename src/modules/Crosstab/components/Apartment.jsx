import React, { useState } from "react";
import cn from "classnames";

import { ApartmentCard } from "modules/Crosstab/components/ApartmentCard";

export const Apartment = ({ setHasApartment, hasApartment, setCurrentTab }) => {
	const [boxType, setBoxType] = useState("card");

	const apartmentClass = cn("apartment", { "apartment-closed": !hasApartment });
	return (
		<aside className={apartmentClass} id="apartment">
			<ApartmentCard
				{...{ setHasApartment, setCurrentTab, hasApartment, boxType, setBoxType }}
			/>
		</aside>
	);
};
