import React, { useState } from "react";
import cn from "classnames";

import { ApartmentCard } from "modules/Crosstab/components/ApartmentCard";

export const Apartment = ({ setActiveApartment, activeApartment, setCurrentTab, currentTab }) => {
	const [boxType, setBoxType] = useState("card");

	const apartmentClass = cn("apartment", { "apartment-closed": !activeApartment });
	return (
		<aside className={apartmentClass} id="apartment">
			<ApartmentCard
				{...{
					setActiveApartment,
					setCurrentTab,
					currentTab,
					activeApartment,
					boxType,
					setBoxType,
				}}
			/>
		</aside>
	);
};
