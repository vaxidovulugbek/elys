import React, { useState } from "react";
import cn from "classnames";

import { ApartmentCard } from "modules/Crosstab/components/ApartmentCard";

export const Apartment = ({
	setActiveApartment,
	activeApartment,
	setCurrentTab,
	currentTab,
	refetch,
}) => {
	const [boxType, setBoxType] = useState("card");

	const apartmentClass = cn("apartment", { "apartment-closed": !activeApartment });

	return (
		<aside className={apartmentClass} id="apartment">
			<ApartmentCard
				{...{
					refetch,
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
