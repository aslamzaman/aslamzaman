import * as XLSX from 'xlsx';



/**
 * 
 * @param {string} str 
 * @returns {string}
 */
export const titleCase = (str) => {
    return str.split(" ")
        .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
        .join(" ");
}



/**
 * 
 * @param {string} str
 * @returns {string} 
 */
export const titleCamelCase = (str) => {
    return str.split(" ")
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join(" ");
}



/**
 * 
 * @param {Number} number 
 * @returns {string}
 */
export const inwordBangla = (number) => {
    try {
        const num = Math.round(number);
        const num_to_bd = [
            'k~b¨', 'GK', '`yB', 'wZb', 'Pvi', 'cvuP', 'Qq', 'mvZ', 'AvU', 'bq',
            '`k', 'GMvi', 'evi', '†Zi', '†PŠÏ', 'c‡bi', '†lvj', 'm‡Zi', 'AvVvi', 'Ewbk',
            'wek', 'GKyk', 'evBk', '†ZBk', 'PweŸk', 'cuwPk', 'QvweŸk', 'mvZvk', 'AvVvk',
            'EbwÎk', 'wÎk', 'GKwÎk', 'ewÎk', '†ZwÎk', '†PŠwÎk', 'cuh়wÎk', 'QwÎk',
            'mvuBwÎk', 'AvUwÎk', 'EbPwjøk', 'Pwjøk', 'GKPwjøk', 'weqvwjøk', '†ZZvwjøk',
            'Pyqvwjøk', 'cuqZvwjøk', '†QPwjøk', 'mvZPwjøk', 'AvUPwjøk', 'EbcÂvk', 'cÂvk',
            'GKvbœ', 'evqvbœ', 'wZàvbœ', 'Pyqvbœ', 'cÂvbœ', 'Qvàvbœ', 'mvZvbœ', 'AvUvbœ',
            'EblvU', 'lvU', 'GKlwÆ', 'evlwÆ', '†ZlwÆ', '†PŠlwÆ', 'cuqlwÆ', '†QlwÆ', 'mvZlwÆ',
            'AvUlwÆ', 'EbmËi', 'mËi', 'GKvËi', 'evnvËi', 'wZqvËi', 'PyqvËi', 'cuPvËi', 'wQqvËi',
            'mvZvËi', 'AvUvËi', 'EbAvwk', 'Avwk', 'GKvwk', 'weivwk', 'wZivwk', 'Pyivwk', 'cuPvwk',
            'wQqvwk', 'mvZvwk', 'AvUvwk', 'EbbeŸB', 'beŸB', 'GKvbeŸB', 'weivbeŸB', 'wZivbeŸB',
            'PyivbeŸB', 'cuPvbeŸB', 'wQqvbeŸB', 'mvZvbeŸB', 'AvUvbeŸB', 'wbivbeŸB'
        ];
        /* ----------------- Initial validation chek   ---------------- */
        if (num.toString().length > 9) {
            return "9 wWwR‡Ui g‡a¨ ivLyb";
        }

        if (num === 0) {
            return num_to_bd[0];
        }
        if (!num) {
            return "msL¨v wVK bvB";
        }
        /* ----------------- /Initial validation chek   ---------------- */

        const ss = "0000000000" + num.toString();
        const nineDigit = ss.substring(ss.length - 9, ss.length);
        //console.log(nineDigit);

        let str = '';
        //------------------------------------
        const crore = nineDigit.substring(0, 2);
        parseInt(crore) !== 0 ? str += `${num_to_bd[parseInt(crore)]} †KvwU ` : str;

        //------------------------------------
        const lakh = nineDigit.substring(2, 4);
        parseInt(lakh) !== 0 ? str += `${num_to_bd[parseInt(lakh)]} j¶ ` : str;


        //------------------------------------
        const hajar = nineDigit.substring(4, 6);
        parseInt(hajar) !== 0 ? str += `${num_to_bd[parseInt(hajar)]} nvRvi ` : str;

        //------------------------------------
        const soto = nineDigit.substring(6, 7);
        parseInt(soto) !== 0 ? str += `${num_to_bd[parseInt(soto)]}kZ ` : str;

        //------------------------------------
        const dosok = nineDigit.substring(7, 9);
        parseInt(dosok) !== 0 ? str += `${num_to_bd[parseInt(dosok)]} ` : str;

        const deductBlank = str.substring(0, str.length - 1);
        return deductBlank;

    } catch (err) {
        return 'bv¤^vi wVK bvB';
    }
};



/**
 * 
 * @param {Number} number 
 * @returns {string}
 */
export const inwordEnglish = (number) => {
    try {
        const num = Math.round(number);
        let a = [
            "",
            "one ",
            "two ",
            "three ",
            "four ",
            "five ",
            "six ",
            "seven ",
            "eight ",
            "nine ",
            "ten ",
            "eleven ",
            "twelve ",
            "thirteen ",
            "fourteen ",
            "fifteen ",
            "sixteen ",
            "seventeen ",
            "eighteen ",
            "nineteen ",
        ];
        let b = [
            "",
            "",
            "twenty",
            "thirty",
            "forty",
            "fifty",
            "sixty",
            "seventy",
            "eighty",
            "ninety",
        ];
        /* ----------------- Initial validation chek   ---------------- */
        if (num.toString().length > 9) {
            return "Over the nine digit";
        }

        if (num === 0) {
            return a[0];
        }
        
        if (!num) {
            return "No data!";
        }
        /* ----------------- /Initial validation chek   ---------------- */

        const ss = "0000000000" + num.toString();
        const nineDigit = ss.substring(ss.length - 9, ss.length);
       // console.log(nineDigit);


        // 58,96,41,357
        let str = '';
        //------------------------------------

        const fn = (n) => {
            const num = parseInt(n);
            if (num < 20) {
                return a[num];
            } else {
                const tens = Math.floor(num / 10);
                const ones = num % 10;
                return b[tens] + ' ' + a[ones];
            }
        }


        const crore = nineDigit.substring(0, 2);
        parseInt(crore) !== 0 ? str += `${fn(crore)}crore ` : str;
        //------------------------------------
        const lakh = nineDigit.substring(2, 4);
        parseInt(lakh) !== 0 ? str += `${fn(lakh)}lac ` : str;
        //------------------------------------
        const hajar = nineDigit.substring(4, 6);
        parseInt(hajar) !== 0 ? str += `${fn(hajar)}thousand ` : str;

        //------------------------------------
        const soto = nineDigit.substring(6, 7);
        parseInt(soto) !== 0 ? str += `${fn(soto)}hundred ` : str;

        //------------------------------------
        const dosok = nineDigit.substring(7, 9);
        parseInt(dosok) !== 0 ? str += `${fn(dosok)}` : str;

        //------------------------------------
        const deductBlank = str.substring(0, str.length - 1);
        return deductBlank;

    } catch (err) {
        return 'bv¤^vi wVK bvB';
    }
};



/**
 * 
 * @param {string} file From input file
 * @param {[]} headerArray 
 * @param {Function} callBack 
 * @returns {[]}
 */
export const jsonDataFromExcelSheet = (file, headerArray, callBack) => {
    try {
        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: headerArray });
            callBack(jsonData.slice(1));
        }
        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.error("Upload handler error:", error);
    }
}



/**
 * 
 * @param {[]} jsonData 
 * @param {String} sheetName 
 * @param {String} fileName 
 * @returns 
 */
export const excelSheetFromJsonData = (jsonData, sheetName, fileName) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}



/**
 * 
 * @param {String} url 
 * @returns {[]}
 */
export const fetchDataFromApi = async (url) => {
    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url} `);
    }
    return response.json();
};



/**
 * 
 * @param {*} key 
 * @returns {[]}
 */
export const localStorageGetItem = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
}



/**
 * 
 * @param {*} key 
 * @param {{}} item 
 * @returns {string}
 */
export const localStorageAddItem = (key, item) => {
    try {
        const value = localStorage.getItem(key);
        const data = value ? JSON.parse(value) : [];
        data.push(item);
        localStorage.setItem(key, JSON.stringify(data));
        return `Data saved successfully.New Id: ${item.id} `;
    } catch (error) {
        console.error("Error adding item to localStorage:", error);
        return "Failed to save data.";
    }
}



/**
 * 
 * @param {*} key 
 * @param {Number} id 
 * @param {{}} item 
 * @returns {string} 
 */
export const localStorageUpdateItem = (key, id, item) => {
    try {
        const value = localStorage.getItem(key);
        const data = value ? JSON.parse(value) : [];
        const indexOfItem = data.findIndex(t => parseInt(t.id) === parseInt(id));
        if (indexOfItem === -1) {
            return "Data did not match.";
        }
        data[indexOfItem] = item;
        localStorage.setItem(key, JSON.stringify(data));
        return `Data updated successfully.Updated Id: ${id} `;
    } catch (error) {
        console.error('Error data updating to local storage.');
        return 'Failed to update data.';
    }
}



/**
 * 
 * @param {*} key 
 * @param {Number} id 
 * @returns {string}
 */
export const localStorageDeleteItem = (key, id) => {
    try {
        const value = localStorage.getItem(key);
        const data = value ? JSON.parse(value) : [];
        const updatedItems = data.filter(item => parseInt(item.id) !== parseInt(id));

        if (updatedItems.length === data.length) {
            return 'Data does not match for deletion';
        }
        localStorage.setItem(key, JSON.stringify(updatedItems));
        return `Data deleted successfully. Deleted Id: ${id} `;
    } catch (error) {
        console.error('Error to deleting data to localstorage.');
        return 'Failed to delete data.';
    }
};



/**
 * 
 * @param {Date} dt 
 * @returns {String}
 */
export const formatedDate = (dt) => {
    const timestamp = Date.parse(dt);
    const initialDate = !isNaN(timestamp);
    const days = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ];
    const newDate = new Date(dt);
    const fullYear = newDate.getFullYear();
    const monthIndex = newDate.getMonth();
    const date = newDate.getDate();
    return initialDate ? `${fullYear}-${days[monthIndex + 1]}-${days[date]}` : '1970-01-01';
}


/**
 * 
 * @param {Date} dt 
 * @returns {String}
 */
export const formatedDateSlash = (dt) => {
    const timestamp = Date.parse(dt);
    const initialDate = !isNaN(timestamp);
    const days = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ];
    const newDate = new Date(dt);
    const fullYear = newDate.getFullYear();
    const monthIndex = newDate.getMonth();
    const date = newDate.getDate();
    return initialDate ? `${days[date]}/${days[monthIndex + 1]}/${fullYear}` : '1/1/1970';
}



/**
 * 
 * @param {Date} dt 
 * @param {Boolean} isFullYear 
 * @returns {String}
 */
export const formatedDateDot = (dt, isFullYear) => {
    const days = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ];
    const newDate = new Date(dt);
    const fullYear = newDate.getFullYear();
    const monthIndex = newDate.getMonth();
    const date = newDate.getDate();
    const shortYear = fullYear.toString().substring(2, 4);
    const shortDate = `${days[date]}.${days[monthIndex + 1]}.${shortYear}`;
    const fullDate = `${days[date]}.${days[monthIndex + 1]}.${fullYear}`;
    const retDt = isFullYear ? fullDate : shortDate;
    return retDt;
}



/**
 * 
 * @param {Date} dt 
 * @returns {String}
 */
export const formatedDateBangla = (dt) => {
    const months = ["Rvbyqvix", "†deªæqvix", "gvP©", "GwcÖj", "†g", "Ryb", "RyjvB", "AvMó", "†m‡Þ¤^i", "A‡±vei", "b‡f¤^i", "wW‡m¤^i"];
    const days = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ];

    const fullYear = new Date(dt).getFullYear();
    const monthIndex = new Date(dt).getMonth();
    const date = new Date(dt).getDate();
    return `${days[date]} ${months[monthIndex]} ${fullYear} `;
}



/**
 * 
 * @param {Date} dt1 
 * @param {Date} dt2 
 * @param {Boolean} isLastDate 
 * @returns {Number}
 */
export const dateDifferenceInDays = (dt1, dt2, isLastDate) => {
    const daysDifferance = Math.round((Date.parse(dt2) - Date.parse(dt1)) / 86400000);
    return isLastDate ? daysDifferance + 1 : daysDifferance;
}



/**
 * 
 * @param {Date} dt 
 * @returns {Boolean}
 */
export const isDate = (dt) => {
    const timestamp = Date.parse(dt);
    return isNaN(timestamp) ? false : true;
}



/**
 * 
 * @param {Number} num 
 * @param {Boolean} isDecimalPart 
 * @returns {String}
 */
export const numberWithComma = (num, isDecimalPart) => {
    let st = '';
    if (isDecimalPart) {
        let [integerPart, decimalPart] = parseFloat(num).toFixed(2).split('.');
        const formattedInteger = parseInt(integerPart).toLocaleString('en-IN');
        st = `${formattedInteger}.${decimalPart} `;
    } else {
        let roundNumber = Math.round(num);
        const formattedNumber = roundNumber.toLocaleString('en-IN');
        st = `${formattedNumber} `;
    }
    return st;
};