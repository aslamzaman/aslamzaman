export const lastDayInMonth = (yyyy, m) => {
	// example (2021, 0) = 31 ; (2021, 1) = 28;
	let dt = new Date(yyyy, (parseInt(m) + 1), 0);
	return dt.getDate();
};