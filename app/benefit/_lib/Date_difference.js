
const daysArray= [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
]


export const date_difference = (d1, d2) =>{
    var d1 = new Date(d1);
    var d2 = new Date(d2);

    let dt1 = d1.getFullYear() + "-" + daysArray[d1.getMonth() + 1] + "-" + daysArray[d1.getDate()];
    let dt2 = d2.getFullYear() + "-" + daysArray[d2.getMonth() + 1] + "-" + daysArray[d2.getDate()];

    let sp1 = dt1.split("-");
    let sp2 = dt2.split("-");

    let extMonth = 0;
    let d = 0;
    let extYrs = 0;
    let m = 0;
    let y = 0;

    // Days 
    if (parseInt(sp2[2]) < parseInt(sp1[2])) {
        extMonth = 1;
        d = ((parseInt(sp2[2]) + 30) - parseInt(sp1[2]));
    } else {
        extMonth = 0;
        d = (parseInt(sp2[2]) - parseInt(sp1[2]));
    }

    // Months 
    if (parseInt(sp2[1]) < (parseInt(sp1[1]) + extMonth)) {
        extYrs = 1;
        m = ((parseInt(sp2[1]) + 12) - (parseInt(sp1[1]) + extMonth));
    } else {
        extYrs = 0;
        m = (parseInt(sp2[1]) - (parseInt(sp1[1]) + extMonth));
    }

    // Years 
    y = (parseInt(sp2[0]) - (parseInt(sp1[0]) + extYrs));

    let result ={
        yrs:y,
        mnths:m,
        days:d
    }
    return result;
}