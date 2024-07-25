
const months = ["Rvbyqvix", "†deªæqvix", "gvP©", "GwcÖj", "†g", "Ryb", "RyjvB", "AvMó", "†m‡Þ¤^i", "A‡±vei", "b‡f¤^i", "wW‡m¤^i"];
const days = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
];

export const DateBangla = (dt) => {
    const newDate1 = new Date(dt).toISOString().split('T')[0];
    const splitDate = newDate1.split('-');
    const stringYear = splitDate[0].toString();
    const stringMonth = months[parseInt(splitDate[1]) - 1];
    const stringDays = days[ parseInt(splitDate[2])];
    return `${stringDays} ${stringMonth} ${stringYear}`;
}