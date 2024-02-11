import { fetchAll } from "@/lib/DexieDatabase";
import { Lib } from "@/lib/Lib";


const titleCase = (str) => {
    return str
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}


export const MonthsObject = [
    { id: "Rvbyqvix", option: "January" },
    { id: "†deªæqvix", option: "February" },
    { id: "gvP©", option: "March" },
    { id: "GwcÖj", option: "April" },
    { id: "†g", option: "May" },
    { id: "Ryb", option: "June" },
    { id: "RyjvB", option: "July" },
    { id: "AvMó", option: "August" },
    { id: "†m‡Þ¤^i", option: "September" },
    { id: "A‡±vei", option: "October" },
    { id: "b‡f¤^i", option: "November" },
    { id: "wW‡m¤^i", option: "December" }
]


export const YearObject = [
    { id: 2023, option: '2023' },
    { id: 2024, option: '2024' },
    { id: 2025, option: '2025' },
    { id: 2026, option: '2026' },
    { id: 2027, option: '2027' },
    { id: 2028, option: '2028' },
    { id: 2029, option: '2029' },
    { id: 2030, option: '2030' },
    { id: 2031, option: '2031' },
    { id: 2032, option: '2032' }
]


export const Data = async (callback) => {
    const [staff, post, project] = await Promise.all([
        fetchAll("staff"),
        fetchAll("post"),
        fetchAll("project")
    ]);
    const staffData = staff.data;
    const postData = post.data;
    const projectData = project.data;

    const joinStaff = staffData.map(staff => {
        const matchPost = postData.find(post => parseInt(post.id) === parseInt(staff.post_id));
        return {
            ...staff,
            post: matchPost ? matchPost.nm_en : 'Error!'
        }
    })
    const filterData = joinStaff.filter(staff => parseInt(staff.place_id) === 1699884047193)
    const result = filterData.sort((a, b) => (b.nm_en).toUpperCase() > (a.nm_en).toUpperCase() ? -1 : 1);
    callback({
        staff: result,
        project: projectData
    });
}


export const Format = ({ doc }, data) => {
    const dt = data.dt;
    const project = data.project;
    const taka = data.taka;
    const months = data.mnth;
    const yr = data.yr;
    const nm = data.staff;

    doc.addImage("/images/formats/electricbill.png", "PNG", 0, 0, 210, 297);
    doc.setFontSize(13);
    doc.setFont("times", "normal");
    doc.text(`${project}`, 100, 48, null, null, "left");
    doc.text(`${Lib.util.dateFormat(dt, ".")}`, 100, 54, null, null, "left");

    doc.text(`Electric bill for the month of ${months} ${yr}`, 47, 77, null, null, "left");
    doc.text(`${taka}/-`, 180, 77, null, null, "right");

    doc.setFont("times", "bold");
    doc.text(`${taka}/-`, 180, 207, null, null, "right");
    let total = parseInt(taka);
    doc.setFont("times", "normal");
    let t = Lib.util.inword.en(total).trim();
    doc.text(`${titleCase(t)} Taka Only`, 45, 215, null, null, "left");

    doc.text(`${nm.split(",")[0]}`, 25, 241, null, null, "left");
    doc.text(`${nm.split(",")[1]}`, 25, 247, null, null, "left");
}

