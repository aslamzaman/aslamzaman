/**
 * 
 * @param {Date} newDate 
 * @param {Boolean} isFullYear
 * @returns 
 */
export const dateDot = (newDate, isFullYear) => {
    const newDate1 = new Date(newDate).toISOString().split('T')[0];
    const splitDate = newDate1.split('-');
    const stringYear = splitDate[0].toString();
    const yearShort = stringYear.substring(stringYear.length - 2, stringYear.length);
    const date1Full = `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`;
    const date1Short = `${splitDate[2]}.${splitDate[1]}.${yearShort}`;
    const retDt = isFullYear ? date1Full : date1Short;
    return retDt;
}