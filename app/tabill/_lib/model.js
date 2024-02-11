import { fetchAll } from "@/lib/DexieDatabase";
import { Lib } from "@/lib/Lib";

const daysArray = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
]

const dateShortFormat = (dt) => {
    const d = new Date(dt);
    const fyr = d.getFullYear().toString();
    const yr = fyr.substr(2, 2);
    return daysArray[d.getDate()] + "." + daysArray[d.getMonth() + 1] + "." + yr;
}


const startDateDay = (dt, tm) => {
    const newDate = new Date(dt);
    const splitTm = tm.split(":");
    const fullDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), parseInt(splitTm[0]), parseInt(splitTm[1])).getTime();
    const fixedDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 12, 0).getTime();
    const result = fixedDate - fullDate;
    return result > 0 ? 1 : 0.5;
}


const endDateDay = (dt, tm) => {
    const newDate = new Date(dt);
    const splitTm = tm.split(":");
    const fullDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), parseInt(splitTm[0]), parseInt(splitTm[1])).getTime();
    const fixedDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 20, 0).getTime();
    const result = fullDate - fixedDate;
    console.log(result)
    return result >= 0 ? 1 : 0.5;
}


const findDaTaka = (das, postId) => {
    const findStaffDa = das.find(da => parseInt(da.post_id) === parseInt(postId));
    return findStaffDa === undefined ? 0 : findStaffDa.tk;
}


export const pdfCreation = ({ doc }, data) => {
    const tabills = data.tabills;
    const tas = data.tas;
    const das = data.das;
    const staff = data.staff;
    const unit = data.unit;
    const project = data.project;
    const dt = data.dt;

    const nm = staff.split(",");
    doc.addImage("/images/formats/tabill.png", "PNG", 0, 0, 210, 297);
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(`${nm[2]}`, 84, 64.5, null, null, "center");
    doc.text(`${project}`, 172, 64.5, null, null, "center");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${nm[0]}`, 80, 56.5, null, null, "center");
    doc.text(`${nm[1]}`, 170, 56.5, null, null, "center");
    doc.setFontSize(12);

    let y = 84;
    let total = 0;
    for (let i = 0; i < tabills.length; i++) {
        let expanse = 0;
        if (tabills[i].vehicle === "wba©vwiZ") {
            const taMatch = tas.find(t => parseInt(t.unit_id) === parseInt(unit));
            expanse = taMatch === undefined ? 0 : parseInt(taMatch.tk);
        } else {
            expanse = parseFloat(tabills[i].taka)
        }

        doc.text(`${dateShortFormat(tabills[i].dt)}`, 19.8, y, null, null, "center");
        doc.text(`${tabills[i].place1}`, 37.5, y, null, null, "center");
        doc.text(`${tabills[i].tm1}`, 53.7, y, null, null, "center");
        doc.text(`${tabills[i].place2}`, 69.7, y, null, null, "center");
        doc.text(`${tabills[i].tm2}`, 86.2, y, null, null, "center");
        doc.text(`${tabills[i].cause}`, 121.2, y, null, null, "center");
        doc.text(`${tabills[i].vehicle}`, 156.5, y, null, null, "center");
        doc.text(`${expanse.toFixed(2)}`, 180, y, null, null, "right");
        total = total + expanse;
        y = y + 5;
    }



    const startDate = new Date(tabills[0].dt).getTime();
    const endDate = new Date(tabills[tabills.length - 1].dt).getTime();
    const localAreaWorkingDays = ((endDate - startDate) / 86400000) - 1; // Days between the start and end dates

    const StartDay = startDateDay(tabills[0].dt, tabills[0].tm1);
    const EndDay = endDateDay(tabills[tabills.length - 1].dt, tabills[tabills.length - 1].tm2);

    const totalWorkingDay = StartDay + localAreaWorkingDays + EndDay;

    const da = findDaTaka(das, nm[3]);
    const totalDa = da * totalWorkingDay;
    const gt = totalDa + total;

    doc.text(`${dateShortFormat(startDate, ".")} †_‡K ${dateShortFormat(endDate, ".")} ZvwiL = ${totalWorkingDay} w\`b * ${da} `, 68, 228, null, null, "left");

    doc.text(`${totalDa.toFixed(2)}`, 180, 228, null, null, "right");

    doc.text(`${gt.toFixed(2)}`, 180, 235, null, null, "right");
    // let t = parseInt(total).toString();
    doc.text(`${Lib.util.inword.bn(gt)} UvKv gvÎ`, 50, 235, null, null, "left");
    doc.text(`${dateShortFormat(dt)}`, 179, 271.5, null, null, "left");


}




export const fetchData = async (callback) => {
    try {
        const [staff, post, project, place, unit, ta, da] = await Promise.all([
            fetchAll("staff"),
            fetchAll("post"),
            fetchAll("project"),
            fetchAll("place"),
            fetchAll("unit"),
            fetchAll("ta"),
            fetchAll("da")
        ]);

        callback({
            staff: staff.data,
            post: post.data,
            project: project.data,
            place: place.data,
            unit: unit.data,
            ta: ta.data,
            da: da.data
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};