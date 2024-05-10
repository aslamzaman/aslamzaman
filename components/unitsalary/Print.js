import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Close } from "@/components/Icons";

import { TextDt, DropdownEn, BtnSubmit } from "@/components/Form";


require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib/fonts/SUTOM_MJ-bold");



const MonthData = [
    { id: "Rvbyqvix-†deªæqvix", option: "January-February" },
    { id: "gvP©-GwcÖj", option: "March-April" },
    { id: "†g-Ryb", option: "May-June" },
    { id: "RyjvB-AvMó", option: "July-August" },
    { id: "†m‡Þ¤^i-A‡±vei", option: "September-October" },
    { id: "b‡f¤^i-wW‡m¤^i", option: "November-December" },

]

const YearData = [
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


const Print = ({ Msg }) => {
    const [dt, setDt] = useState("");
    const [mnth, setMnth] = useState("");
    const [yr, setYr] = useState("2024");

    const [show, setShow] = useState(false);

    const [staffs, setStaffs] = useState([]);


    const printShow = async () => {
        setShow(true);
        Msg("Ready to print");
        setDt(Lib.util.dateFormat(new Date(), "-"));

        try {
            const [unitsalary, staffData, postDate, unitDate] = await Promise.all([fetchAll("unitsalary"), fetchAll("staff"), fetchAll("post"), fetchAll("unit")]);
            const resultP = unitsalary.map(u => {
                const matchStaff = staffData.find(s => parseInt(s.id) === parseInt(u.staff_id));
                return {
                    ...u,
                    staff: matchStaff
                }
            })
            const result = resultP.map(r => {
                const matchPost = postDate.find(p => parseInt(p.id) === parseInt(r.staff.post_id));
                const matchUnit = unitDate.find(u => parseInt(u.id) === parseInt(r.staff.unit_id));
                return {
                    ...r,
                    post: matchPost,
                    unit: matchUnit
                }
            });
            console.log(result);
            setStaffs(result ? result : []);
        }
        catch (err) {
            console.log(err);
        }
    }



    const printHandler = async (e) => {
        e.preventDefault();
        const doc = new jsPDF({
            orientation: "l",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        console.log(staffs)
        doc.setFont("SutonnyMJ", "normal");
        doc.setFontSize(18);
        doc.text(`†m›Uvi di g¨vm GWz‡Kkb Bb mv‡qÝ (wmGgBGm)`, 149.2, 10, null, null, "center");
        doc.text(`BDwbU óvd‡\`i †eZb mxU`, 149.2, 16, null, null, "center");
        doc.setFontSize(15);
        doc.text(`${mnth}-${yr}`, 149.2, 22, null, null, "center");

        doc.setLineWidth(0.15);
        doc.line(14, 25, 287, 25);
        doc.line(14, 32, 287, 32);
        
        doc.setFontSize(13);

        let y = 36;
        doc.setFont("SutonnyMJ", "bold");
        //     µg bs	bvg	c`ex	BDwbU	‡hvM`vb	 Gwiqvi 	 GwcÖj-20 	 ‡g-20 	 ‡gvU 	‡PK bs 

        const sp = mnth.split("-");
        doc.text("µg.", 17.8, y - 6, null, null, "center");
        doc.text("bvg	c`ex", 23, y - 6, null, null, "left");
        doc.text("c`ex", 89, y - 6, null, null, "center");
        doc.text("BDwbU", 120.5, y - 6, null, null, "center");
        doc.text("†hvM`vb", 147, y - 6, null, null, "center");
        doc.text("Gwiqvi", 168, y - 6, null, null, "center");
        doc.text(`${sp[0]}-${yr.substr(2, 2)}`, 188.5, y - 6, null, null, "center");
        doc.text(`${sp[1]}-${yr.substr(2, 2)}`, 209.5, y - 6, null, null, "center");
        doc.text("†gvU UvKv", 230, y - 6, null, null, "center");
        doc.text("gšÍe¨", 265, y - 6, null, null, "center");

        doc.setLineWidth(0.1);
        doc.setFont("SutonnyMJ", "normal");
        let gt = 0;
        let arear_t = 0;
        let s1_t = 0;
        let s2_t = 0;
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

            arear_t =  arear_t + parseFloat(staffs[i].arear) ;
            s1_t = s1_t+ parseFloat(staffs[i].sal1) ;
            s2_t = s2_t+ parseFloat(staffs[i].sal2) ;

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
        doc.save(new Date().toISOString() + "-Unit-Salary.pdf");  
       
        
    }


    return (
        <>
            <div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto`}>
                <div className="w-11/12 md:w-8/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Print File</h1>
                        <Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-8 h-8" />
                    </div>

                    <div className="w-full p-6 text-black">
                        <p className="text-left text-md text-red-400">Print File</p>
                    </div>


                    <div className="px-6 pb-6 text-black">
                        <form onSubmit={printHandler}>
                            <div className="grid grid-cols-1 gap-4 my-4">

                                <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                                <DropdownEn Title="Months" Id="mnth" Change={(e) => { setMnth(e.target.value) }} Value={mnth}>
                                    {MonthData.map((m, i) => <option value={m.id} key={i}>{m.option}</option>)}
                                </DropdownEn>
                                <DropdownEn Title="Year" Id="yr" Change={(e) => { setYr(e.target.value) }} Value={yr}>
                                    {YearData.map((y, i) => <option value={y.id} key={i}>{y.option}</option>)}
                                </DropdownEn>
                            </div>
                            <span onClick={() => { setShow(false); Msg("Data ready") }} className="text-center mt-3 mx-0.5 px-4 py-2.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-red-600 hover:bg-red-800 text-white mr-1 cursor-pointer">Close</span>
                            <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                        </form>
                    </div>
                </div>
            </div>
            <button onClick={printShow} title="Print" className="w-8 h-8 rounded-full hover:bg-gray-50 mr-1 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
            </button>
        </>
    )
}
export default Print;
