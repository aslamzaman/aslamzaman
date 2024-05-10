import React, { useState } from "react";
import { BtnEn, BtnSubmit, TextDt, DropdownEn } from "@/components/Form";
import { jsPDF } from "jspdf";
import { Close } from "@/components/Icons";

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");



const Bkashbillcreation = ({ doc }, data) => {
    const dt = data.dt;
    const staff = data.staff;
    const datas = data.datas;

    doc.addImage("/images/formats/bkash.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(16);
    //doc.line(20,37,190,37); // horizontal line
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${Lib.util.dateFormat(dt, ".")}`, 100, 55.5, null, null, "left");
    doc.setFontSize(16);

    let y = 85;
    let y1 = y;
    let t = 0;

    doc.line(20, y - 16, 190, y - 16); // horizontal line
    doc.line(20, y - 8, 190, y - 8); // horizontal line
    doc.text("µwgK bs", 32, y - 10, null, null, "center");
    doc.text("BDwbU", 95, y - 10, null, null, "center");
    doc.text("UvKv", 170, y - 10, null, null, "center");

    for (let i = 0; i < datas.length; i++) {
        doc.text(`${i + 1}`, 32, y - 2, null, null, "center");
        doc.text(`${datas[i].unit}`, 95, y - 2, null, null, "center");
        doc.text(`${datas[i].taka}/-`, 170, y - 2, null, null, "center");
        t = t + parseInt(datas[i].taka);
        doc.line(20, y, 190, y); // horizontal line
        y = y + 8;
    }
    doc.line(20, y, 190, y); // horizontal line

    doc.line(20, y1 - 16, 20, y); // vertical line
    doc.line(45, y1 - 16, 45, y); // vertical line
    doc.line(145, y1 - 16, 145, y); // vertical line
    doc.line(190, y1 - 16, 190, y); // vertical line
    doc.setFont("SutonnyMJ", "bold");
    doc.text("†gvU UvKv", 95, y - 2, null, null, "center");
    doc.text(`${t}/-`, 170, y - 2, null, null, "center");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`UvKv K_vqt- ${Lib.util.inword.bn(t)} UvKv gvÎ`, 20, y + 8 - 2, null, null, "left");


    doc.text(`${staff.split(",")[0]}`, 20, y + 42, null, null, "left");
    doc.text(`${staff.split(",")[1]}`, 20, y + 48, null, null, "left");
    doc.text(`wmGgBGm`, 20, y + 54, null, null, "left");
}





const Print = ({ message }) => {
    const [staffs, setStaffs] = useState([]);

    const [staff, setStaff] = useState("");
    const [dt, setDt] = useState("");

    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);


    const showPrintForm = async () => {
        setShow(true);
        message("Ready to print");


        try {
            const [staff, post] = await Promise.all([
                fetchAll("staff"),
                fetchAll("post")
            ]);
            const staffData = staff.data;
            const postData = post.data;

            const joinStaff = staffData.map(staff => {
                const matchPost = postData.find(post => parseInt(post.id) === parseInt(staff.post_id));
                return {
                    ...staff,
                    post: matchPost ? matchPost.nm_bn : "Err!"
                }
            })

            const result = joinStaff.sort((a, b) => (b.nm_en).toUpperCase() > (a.nm_en).toUpperCase() ? -1 : 1);

            setStaffs(result);

            setDt(Lib.util.dateFormat(new Date(), "-"));
            setStaff("Avmjvg Rvgvb,wmwbqi †cÖvMÖvg AM©vbvBRvi");

        } catch (err) {
            console.log(err);
        }
    }


    const closePrintForm = () => {
        setShow(false);
        message("Data ready");
    }


    const printHandler = (e) => {
        e.preventDefault();
        message("Please wait...");
        setMsg("Please wait...");

        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        let datas = [];
        let bkash = localStorage.getItem("bkash");
        if (bkash) {
            datas = JSON.parse(bkash);
        } else {
            message("No data found!");
            setMsg("No data found!");
            setShow(false);
        }

        const data = {
            dt: dt,
            staff: staff,
            datas: datas
        }


        setTimeout(() => {
            Bkashbillcreation({ doc }, data);
            doc.save(new Date().toISOString() + "-Staff.pdf");
            message("PDF create completed.");
            setMsg("PDF create completed.");
            setShow(false);
        }, 0);
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <Close Click={closePrintForm} Size="w-8 h-8" />
                        </div>

                        <div className="px-6 pb-6 text-black">
                            <p>{msg}</p>
                            <form onSubmit={printHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                                    <DropdownEn Title="Staff Name" Id="staff" Change={(e) => { setStaff(e.target.value) }} Value={staff}>
                                        {
                                            staffs.length ? staffs.map((staff, i) => {
                                                let nm = staff.nm_bn + "," + staff.post;
                                                return <option value={nm} key={i}>{staff.nm_en}</option>
                                            }) : null
                                        }
                                    </DropdownEn>
                                </div>

                                <div className="w-full flex justify-start">
                                    <BtnEn Title="Close" Click={closePrintForm} Class="bg-pink-600 hover:bg-pink-800 text-white" />
                                    <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={showPrintForm} className="group px-1 py-1 text-sm font-bold text-blue-900 hover:text-blue-500">
                <div className="flex justify-center items-center space-x-1">
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

