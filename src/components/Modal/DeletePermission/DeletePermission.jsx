import Swal from "sweetalert2";

export const deletePermission = async ({ title, icon, text, receivePermission }) => {
	const result = await Swal.fire({
		title,
		icon,
		text,
		showCancelButton: true,
		showDenyButton: true,
		showConfirmButton: false,
		denyButtonText: "Yes, delete",
	});
	if (result.isDenied) receivePermission();
};
