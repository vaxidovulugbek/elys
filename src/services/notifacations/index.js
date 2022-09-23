const { toast } = require("react-toastify");

const notifications = {
	success: (message) => toast.success(message),
	warning: (message) => toast.warning(message),
	error: (message) => toast.error(message),
};
