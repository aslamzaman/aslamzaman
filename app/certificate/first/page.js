"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
require("@/lib/fonts/Lobster-Regular-normal");
require("@/lib/fonts/OpenSansCondensed-Light-normal");
import { BtnSubmit } from "@/components/Form";


const Certificate = () => {
    const [stdData, setStdData] = useState([]);
    const [msg, setMsg] = useState("Seclect an excel file");


    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const bufferObj = await file.arrayBuffer();

            const workbook = XLSX.read(bufferObj, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: ["sl", "name", "trade", "reg", "period", "dt"] });
            console.log(json);
            setStdData(json);
        } else {
            setMsg("Seclect an excel file");
        }
    }


    const doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or "smart", default is 16
    });


    const createPdfHanler = (e) => {
        e.preventDefault();
        if (stdData.length < 1) {
            setMsg("Please select xlxs file");
            return false;
        }

        setMsg("Please wait...");
        console.log(stdData);


        setTimeout(() => {
            for (let i = 0; i < stdData.length; i++) {
                if (i > 0) {
                    doc.addImage("/images/certificate/Cirtificate_COL3.jpg", "JPG", 0, 0, 297, 210);

                    doc.setFont("Lobster-Regular", "normal");
                    doc.setFontSize(24);
                    doc.text(`${stdData[i].name}`, 148, 82, null, null, "center");

                    doc.setFont("OpenSansCondensed-Light", "normal");
                    doc.setFontSize(14);
                    doc.text("Registration No: " + stdData[i].reg, 148, 89, null, null, "center");

                    doc.setFont("Lobster-Regular", "normal");
                    doc.setFontSize(18);
                    doc.text(`${stdData[i].trade}`, 142, 102, null, null, "center");
                    doc.setFontSize(16)
                    doc.setFont("Lobster-Regular", "normal");

                    doc.text(`${stdData[i].period}`, 78, 111, null, null, "center");

                    doc.setFontSize(12);
                    doc.text(`${stdData[i].sl}`, 66, 182);
                    doc.text(`${stdData[i].dt}`, 196, 182);

                    doc.addPage("a4", "l");
                }
            }
            doc.deletePage((stdData.length));
            setMsg("PDF file Created");
            doc.save(Date.now() + ".pdf");
        }, 0);

    }

    return (

        <>

            <div className="p-6">

                <div className="w-11/12 md:w-8/12 mx-auto my-[50px] flex flex-col items-center border border-gray-200 rounded-lg shadow-md bg-white z-50">
                    <div className="w-full bg-gray-100 border-b rounded-t-lg">
                        <h1 className="py-2.5 text-center font-semibold text-[calc(1.40rem+0.3vw)]">Certificate COL - 1st Phase</h1>
                    </div>
                    <p className="py-1.5 text-start text-xs font-bold">{msg}</p>
                    <form onSubmit={createPdfHanler} className="w-full p-6">
                        <input type="file" onChange={fileChangeHandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300 cursor-pointer" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                        <BtnSubmit Title="Create PDF" Class="bg-indigo-700 hover:bg-indigo-900 text-white" />
                    </form>
                    <a href="/images/certificate/certificate.xlsx" className="text-2xl py-4 underline">Format Download</a>
                </div>
            </div>
        </>
    )
}

export default Certificate;