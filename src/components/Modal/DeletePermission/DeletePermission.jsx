import Swal from "sweetalert2";

export const deletePermission = async ({
	title,
	icon,
	text,
	receivePermission,
	denyButtonText = "Yes, delete",
}) => {
	const result = await Swal.fire({
		title,
		icon,
		text,
		showCancelButton: true,
		showDenyButton: true,
		showConfirmButton: false,
		denyButtonText,
	});
	if (result.isDenied) receivePermission();
};
