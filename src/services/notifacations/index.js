import { toast } from "react-toastify";

export const notifications = {
	success: (message) => toast.success(message),
	warning: (message) => toast.warning(message),
	error: (message) => toast.error(message),
};
