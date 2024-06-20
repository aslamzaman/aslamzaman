import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Close } from "@/components/Icons";

import { DropdownEn, BtnSubmit } from "@/components/Form";

import { numberWithComma } from "@/lib/NumberWithComma";
require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib/fonts/SUTOM_MJ-bold");
const date_format = dt => new Date(dt).toISOString().split('T')[0];
const shortDt = (dt) => {
    const d = new Date(dt);
    const d1 = date_format(d);
    const spltDt = d1.split('-');
    const fullYear = d.getFullYear();
    const strYear = fullYear.toString();
    const twoDigit = strYear.substring(strYear.length - 2, strYear.length);
    return spltDt[2] + "." + spltDt[1] + "." + twoDigit;
}


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


const Print = ({ data, message }) => {
    const [mnth, setMnth] = useState("");
    const [yr, setYr] = useState("2024");

    const [show, setShow] = useState(false);
    const [staffs, setStaffs] = useState([]);

    
    const printShow = async () => {
        setShow(true);
        message("Ready to print");
       // console.log(data);
        setStaffs(data);

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
        doc.text("c`ex", 76, y - 6, null, null, "center"); 
        doc.text("BDwbU", 101, y - 6, null, null, "center");
        doc.text("†hvM`vb", 125, y - 6, null, null, "center"); // join
        doc.text("Gwiqvi", 146, y - 6, null, null, "center");
        doc.text(`${sp[0]}-${yr.substring(yr.length - 2, yr.length)}`, 168, y - 6, null, null, "center");
        doc.text(`${sp[1]}-${yr.substring(yr.length - 2, yr.length)}`, 190, y - 6, null, null, "center");
        doc.text("†gvU UvKv", 212, y - 6, null, null, "center");
        doc.text("gšÍe¨", 255, y - 6, null, null, "center");

        doc.setLineWidth(0.1);
        doc.setFont("SutonnyMJ", "normal");
        let gt = 0;
        let arear_t = 0;
        let s1_t = 0;
        let s2_t = 0;

        for (let i = 0; i < staffs.length; i++) {

            let sl = "000" + (i + 1);
            let sl1 = sl.substring(sl.length - 2, sl.length);


            let total_taka = parseFloat(staffs[i].arear) + parseFloat(staffs[i].sal1) + parseFloat(staffs[i].sal2);
            doc.text(`${sl1}`, 17.5, y, null, null, "center");
            doc.text(`${staffs[i].staffId.nmBn}`, 23, y, null, null, "left"); 
            doc.text(`${staffs[i].post.nmBn}`, 76, y, null, null, "center"); // correction
            doc.text(`${staffs[i].unit.nmBn}`, 101, y, null, null, "center");
            doc.text(`${shortDt(staffs[i].staffId.joinDt)}`, 125, y, null, null, "center");
            doc.text(`${numberWithComma(staffs[i].arear)}`, 154, y, null, null, "right");
            doc.text(`${numberWithComma(staffs[i].sal1)}`, 176, y, null, null, "right");
            doc.text(`${numberWithComma(staffs[i].sal2)}`, 198, y, null, null, "right");
            doc.text(`${numberWithComma(total_taka)}`, 220, y, null, null, "right");
            doc.text(`${staffs[i].remarks}`, 255, y, { maxWidth: 62, align: "center" });
            doc.line(14, y + 1, 287, y + 1);

            arear_t = arear_t + parseFloat(staffs[i].arear);
            s1_t = s1_t + parseFloat(staffs[i].sal1);
            s2_t = s2_t + parseFloat(staffs[i].sal2);

            gt = gt + total_taka;
            y = y + 5;
        }
        doc.setFont("SutonnyMJ", "bold");
        doc.text(`me© †gvU UvKv`, 23, y, null, null, "left");
        doc.text(`${numberWithComma(arear_t)}`, 154, y, null, null, "right");
        doc.text(`${numberWithComma(s1_t)}`, 176, y, null, null, "right");
        doc.text(`${numberWithComma(s2_t)}`, 198, y, null, null, "right");
        doc.text(`${numberWithComma(gt)}`, 220, y, null, null, "right");

        doc.line(14, y + 1, 287, y + 1); // Horizontal line
        doc.line(14, 25, 14, y + 1);
        doc.line(21, 25, 21, y + 1);
        doc.line(63, 25, 63, y + 1); 
        doc.line(90, 25, 90, y + 1);
        doc.line(113, 25, 113, y + 1);
        doc.line(136, 25, 136, y + 1);
        doc.line(158, 25, 158, y + 1); // correction
        doc.line(180, 25, 180, y + 1);
        doc.line(202, 25, 202, y + 1);
        doc.line(224, 25, 224, y + 1);
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
                        <Close Click={() => { setShow(false); message("Data ready") }} Size="w-8 h-8" />
                    </div>

                    <div className="px-6 pb-6 text-black">
                        <form onSubmit={printHandler}>
                            <div className="grid grid-cols-1 gap-4 my-4">
                                <DropdownEn Title="Months" Id="mnth" Change={(e) => { setMnth(e.target.value) }} Value={mnth}>
                                    {MonthData.map((m, i) => <option value={m.id} key={i}>{m.option}</option>)}
                                </DropdownEn>
                                <DropdownEn Title="Year" Id="yr" Change={(e) => { setYr(e.target.value) }} Value={yr}>
                                    {YearData.map((y, i) => <option value={y.id} key={i}>{y.option}</option>)}
                                </DropdownEn>
                            </div>
                            <div className="flex justify-start space-x-2">
                                <span onClick={() => { setShow(false); message("Data ready") }} className="text-center mt-3 mx-0.5 px-4 py-2.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-red-600 hover:bg-red-800 text-white mr-1 cursor-pointer">Close</span>
                                <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button onClick={printShow} className="px-1 py-1 bg-pink-500 hover:bg-pink-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
            </button>
        </>
    )
}
export default Print;
