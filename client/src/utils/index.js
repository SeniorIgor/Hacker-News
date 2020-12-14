// 

// const formatDate = (number) => {
// 	return new Date(number * 1000).toLocaleString();
// }

function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

function formatDate(number) {
	const date = new Date(number * 1000);
	let dayOfMonth = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let hour = date.getHours();
	let minutes = date.getMinutes();
	let diffMs = new Date() - date;
	let diffSec = Math.round(diffMs / 1000);
	let diffMin = Math.round(diffSec / 60);
	let diffHour = Math.round(diffMin / 60);

	// форматирование
	year = year.toString().slice(-2);
	month = month < 10 ? '0' + month : month;
	dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
	hour = hour < 10 ? '0' + hour : hour;
	minutes = minutes < 10 ? '0' + minutes : minutes;

	if (diffSec < 1) {
		return 'now';
	} else if (diffMin < 1) {
		return `${diffSec} seconds ago`
	} else if (diffHour < 1) {
		return `${diffMin} minutes ago`
	} else if (diffHour < 24) {
		return `${diffHour} hours ago`
	} else {
		return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
	}
}

const formatNumber = (number) => {
	return new Intl.NumberFormat('ru-RU', {
		useGrouping: true,
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	}).format(number);
}

export {
	formatDate,
	formatNumber,
	htmlDecode,
}