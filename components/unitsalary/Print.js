import React, { useState } from "react";
import { BtnSubmit, DropdownEn, TextDt } from "../Form";
import { jsPDF } from "jspdf";
import { Close } from "../Icons";
import { fetchAll } from "@/lib/DexieDatabase";
import { mnObject, yrObject, printForm } from "@/app/unitsalary/_lib/list";
import { Lib } from "@/lib/Lib";

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");


const Print = ({ message }) => {
    const [unitsalarys, setUnitsalarys] = useState([]);
    const [show, setShow] = useState(false);

    const [dt, setDt] = useState("");
    const [mnth, setMnth] = useState("");
    const [yr, setYr] = useState("2024");


    const showPrintForm = async () => {
        setShow(true);
        message("Ready to print");
        setDt(Lib.util.dateFormat(new Date(), '-'));

        try {
            const [unitsalarys, staffDatas, postDatas, unitDatas] = await Promise.all([
                fetchAll("unitsalary"),
                fetchAll("staff"),
                fetchAll("post"),
                fetchAll("unit")
            ]);

            const unitsalary = unitsalarys.data;
            const staffData = staffDatas.data;
            const postData = postDatas.data;
            const unitData = unitDatas.data;

            const resultP = unitsalary.map(u => {
                const matchStaff = staffData.find(s => parseInt(s.id) === parseInt(u.staff_id));
                return {
                    ...u,
                    staff: matchStaff
                }
            })

            const result = resultP.map(r => {
                const matchPost = postData.find(p => parseInt(p.id) === parseInt(r.staff.post_id));
                const matchUnit = unitData.find(u => parseInt(u.id) === parseInt(r.staff.unit_id));
                return {
                    ...r,
                    post: matchPost,
                    unit: matchUnit
                }
            });
            // console.log(result);

            setUnitsalarys(result);
        }
        catch (err) {
            console.log(err);
        }
    }


    const closePrintForm = () => {
        setShow(false);
        message("Data ready");
    }


    const printHandler = (e) => {
        e.preventDefault();
        const doc = new jsPDF({
            orientation: "l",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        const data = {
            yr: yr,
            mnth: mnth,
            staff: unitsalarys
        }
        printForm({ doc }, data);
        const mn = mnObject.find(m => m.id === mnth);
        console.log(mn);

        doc.save(new Date().toISOString() + "-" + mn.option + "-Unitsalary.pdf");
        message("Print completed.");
        setShow(false);
    }




    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Print Data</h1>
                            <Close Click={closePrintForm} Size="w-8 h-8" />
                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={printHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">

                                    <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                                    <DropdownEn Title="Months" Id="mnth" Change={(e) => { setMnth(e.target.value) }} Value={mnth}>
                                        {mnObject.map((m, i) => <option value={m.id} key={i}>{m.option}</option>)}
                                    </DropdownEn>
                                    <DropdownEn Title="Year" Id="yr" Change={(e) => { setYr(e.target.value) }} Value={yr}>
                                        {yrObject.map((y, i) => <option value={y.id} key={i}>{y.option}</option>)}
                                    </DropdownEn>
                                </div>
                                <span onClick={closePrintForm} className="text-center mt-3 mx-0.5 px-4 py-2.5 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 bg-red-600 hover:bg-red-800 text-white mr-1 cursor-pointer">Close</span>
                                <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={showPrintForm} className="group px-1 py-1 text-sm font-bold text-blue-900 hover:text-blue-500">
                <div className="flex justify-center items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-blue-900 group-hover:stroke-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                    </svg>
                    <span className="scale-y-125">Print</span>
                </div>
            </button>



        </>
    )
}
export default Print;

