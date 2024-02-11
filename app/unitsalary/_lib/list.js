import { Lib } from "@/lib/Lib";
export const mnObject = [
    { id: "Rvbyqvix-†deªæqvix", option: "January-February" },
    { id: "gvP©-GwcÖj", option: "March-April" },
    { id: "†g-Ryb", option: "May-June" },
    { id: "RyjvB-AvMó", option: "July-August" },
    { id: "†m‡Þ¤^i-A‡±vei", option: "September-October" },
    { id: "b‡f¤^i-wW‡m¤^i", option: "November-December" },

]

export const yrObject = [
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


export const printForm = ({ doc }, data) => {
    
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(18);
    doc.text(`†m›Uvi di g¨vm GWz‡Kkb Bb mv‡qÝ (wmGgBGm)`, 149.2, 10, null, null, "center");
    doc.text(`BDwbU óvd‡\`i †eZb mxU`, 149.2, 16, null, null, "center");
    doc.setFontSize(15);
    doc.text(`${data.mnth}-${data.yr}`, 149.2, 22, null, null, "center");

    doc.setLineWidth(0.15);
    doc.line(14, 25, 287, 25);
    doc.line(14, 32, 287, 32);

    doc.setFontSize(13);

    let y = 36;
    doc.setFont("SutonnyMJ", "bold");
    //     µg bs	bvg	c`ex	BDwbU	‡hvM`vb	 Gwiqvi 	 GwcÖj-20 	 ‡g-20 	 ‡gvU 	‡PK bs 

    const sp = data.mnth.split("-");
    doc.text("µg.", 17.8, y - 6, null, null, "center");
    doc.text("bvg	c`ex", 23, y - 6, null, null, "left");
    doc.text("c`ex", 89, y - 6, null, null, "center");
    doc.text("BDwbU", 120.5, y - 6, null, null, "center");
    doc.text("†hvM`vb", 147, y - 6, null, null, "center");
    doc.text("Gwiqvi", 168, y - 6, null, null, "center");
    doc.text(`${sp[0]}-${data.yr.substr(2, 2)}`, 188.5, y - 6, null, null, "center");
    doc.text(`${sp[1]}-${data.yr.substr(2, 2)}`, 209.5, y - 6, null, null, "center");
    doc.text("†gvU UvKv", 230, y - 6, null, null, "center");
    doc.text("gšÍe¨", 265, y - 6, null, null, "center");

    doc.setLineWidth(0.1);
    doc.setFont("SutonnyMJ", "normal");
    let gt = 0;
    let arear_t = 0;
    let s1_t = 0;
    let s2_t = 0;
    const staffs = data.staff;
    for (let i = 0; i < staffs.length; i++) {

        let sl = "000" + (i + 1);
        let sl1 = sl.substr(sl.length - 2, 2);

        let total_taka = parseFloat(staffs[i].arear) + parseFloat(staffs[i].sal1) + parseFloat(staffs[i].sal2);
        doc.text(`${sl1}`, 17.5, y, null, null, "center");
        doc.text(`${staffs[i].staff.nm_bn}`, 23, y, null, null, "left");
        doc.text(`${staffs[i].post.nm_bn}`, 89, y, null, null, "center");
        doc.text(`${staffs[i].unit.nm_bn}`, 120.5, y, null, null, "center");
        doc.text(`${Lib.util.dateFormat(staffs[i].staff.dt, ".")}`, 147, y, null, null, "center");
        doc.text(`${Lib.util.numberWithCommas(staffs[i].arear)}`, 175, y, null, null, "right");
        doc.text(`${Lib.util.numberWithCommas(staffs[i].sal1)}`, 197, y, null, null, "right");
        doc.text(`${Lib.util.numberWithCommas(staffs[i].sal2)}`, 218, y, null, null, "right");
        doc.text(`${Lib.util.numberWithCommas(total_taka)}`, 240, y, null, null, "right");
        doc.text(`${staffs[i].remarks}`, 264.5, y, { maxWidth: 44, align: "center" });
        doc.line(14, y + 1, 287, y + 1);

        arear_t = arear_t + parseFloat(staffs[i].arear);
        s1_t = s1_t + parseFloat(staffs[i].sal1);
        s2_t = s2_t + parseFloat(staffs[i].sal2);

        gt = gt + total_taka;
        y = y + 5;
    }

    doc.setFont("SutonnyMJ", "bold");
    doc.text(`me© †gvU UvKv`, 23, y, null, null, "left");
    doc.text(`${Lib.util.numberWithCommas(arear_t)}`, 175, y, null, null, "right");
    doc.text(`${Lib.util.numberWithCommas(s1_t)}`, 197, y, null, null, "right");
    doc.text(`${Lib.util.numberWithCommas(s2_t)}`, 218, y, null, null, "right");
    doc.text(`${Lib.util.numberWithCommas(gt)}`, 240, y, null, null, "right");

    doc.line(14, y + 1, 287, y + 1);
    doc.line(14, 25, 14, y + 1);
    doc.line(21, 25, 21, y + 1);
    doc.line(73, 25, 73, y + 1);
    doc.line(105, 25, 105, y + 1);
    doc.line(136, 25, 136, y + 1);
    doc.line(158, 25, 158, y + 1);
    doc.line(178, 25, 178, y + 1);
    doc.line(199, 25, 199, y + 1);
    doc.line(220, 25, 220, y + 1);
    doc.line(242, 25, 242, y + 1);
    doc.line(287, 25, 287, y + 1);
    doc.setFont("SutonnyMJ", "normal");

    doc.text("†Pqvig¨vb", 14, y + 22, null, null, "left");
    doc.text("wbe©vnx cwiPvjK", 85, y + 22, null, null, "center");
    doc.text("wWwcwm", 149.2, y + 22, null, null, "center");
    doc.text("G¨vKvD›Um", 220, y + 22, null, null, "center");
    doc.text("cÖkvmb", 280, y + 22, null, null, "center");
} 