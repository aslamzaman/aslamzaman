/**
 * 
 * @param {Date} firstDate
 * @param {Date} secondDate
 * @param {Boolean} isWithFirstDay 
 * @returns 
 */
export const dateDifference = (firstDate, secondDate, isWithFirstDay) => {
    const dt1 = new Date(firstDate);
    const dt2 = new Date(secondDate);
    const date1Time = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), 12, 0, 0, 0).getTime();
    const date2Time = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate(), 12, 0, 0, 0).getTime();
    const diff = isWithFirstDay ? (((date2Time - date1Time) + 86400000) / 86400000) : ((date2Time - date1Time) / 86400000);
    return diff;
}