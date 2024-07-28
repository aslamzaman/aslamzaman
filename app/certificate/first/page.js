"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
require("@/lib/fonts/Lobster-Regular-normal");
require("@/lib/fonts/OpenSansCondensed-Light-normal");
import { BtnSubmit, TextDt } from "@/components/Form";
import { formatedDateSlash, formatedDate } from "@/lib/utils";



const Certificate = () => {
    const [stdData, setStdData] = useState([]);
    const [dt, setDt] = useState([]);
    const [msg, setMsg] = useState("Seclect an excel file");
    const [periodStart, setPeriodStart] = useState("");
    const [periodEnd, setPeriodEnd] = useState("");


    useEffect(() => {
        setDt(formatedDate(new Date()));
        const pStart = localStorage.getItem('periodStart');
        const pEnd = localStorage.getItem('periodEnd');
        setPeriodStart(pStart ? formatedDate(pStart) : formatedDate(new Date()));
        setPeriodEnd(pEnd ? formatedDate(pEnd) : formatedDate(new Date()));
    }, [])

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const bufferObj = await file.arrayBuffer();

            const workbook = XLSX.read(bufferObj, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: ["sl", "name", "trade", "reg"] });
            console.log(json);
            setStdData(json);
        } else {
            setMsg("Seclect an excel file");
        }
    }




    const createPdfHanler = (e) => {
        e.preventDefault();
        localStorage.setItem('periodStart', periodStart);
        localStorage.setItem('periodEnd', periodEnd);


        if (stdData.length < 1) {
            setMsg("Please select xlxs file");
            return false;
        }

        const doc = new jsPDF({
            orientation: 'l',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });

        setMsg("Please wait...");
        //  console.log(stdData);
        const period = `${formatedDateSlash(periodStart)} to ${formatedDateSlash(periodEnd)}`;
        console.log(period);
        let i = 0;
        const myTimer = setInterval(() => {

            if (i > 0) {
                doc.addImage("/images/certificate/Col_EWG_2023_2024_Yr_1.png", "PNG", 0, 0, 297, 210);

                doc.setFont("Lobster-Regular", "normal");
                doc.setFontSize(24);
                doc.text(`${stdData[i].name}`, 148, 77.5, null, null, "center");

                doc.setFont("OpenSansCondensed-Light", "normal");
                doc.setFontSize(14);
                doc.text("Registration no: " + stdData[i].reg, 148, 84, null, null, "center");

                doc.setFont("Lobster-Regular", "normal");
                doc.setFontSize(17);
                doc.text(`${stdData[i].trade}`, 162, 113, null, null, "center");
                // doc.text(`${period}`, 84, 110.5, null, null, "center");
                doc.setFontSize(16)
                doc.setFont("Lobster-Regular", "normal");

                doc.setFontSize(12);
                doc.text(`${stdData[i].sl}`, 66, 183);
                doc.text(`${formatedDateSlash(dt)}`, 196, 183);

                doc.addPage("a4", "l");
                setMsg("Page Created: " + i);

            }

            i = i + 1;
            if (i >= stdData.length) {
                clearInterval(myTimer);

                doc.deletePage((stdData.length));
                doc.save(Date.now() + ".pdf");
            }
        }, 500)


    }

    return (

        <>

            <div className="p-6">

                <div className="w-full md:w-8/12 mx-auto my-[50px] flex flex-col items-center border border-gray-200 rounded-lg shadow-md bg-white z-50">
                    <div className="w-full bg-gray-100 border-b rounded-t-lg">
                        <h1 className="py-2.5 text-center font-semibold text-[calc(1.40rem+0.3vw)]">Certificate COL - 1st Phase</h1>
                    </div>
                    <p className="py-1.5 text-start text-xs font-bold">{msg}</p>
                    <form onSubmit={createPdfHanler}>
                        <div className="flex items-center space-x-4">
                            <div className="mt-5">
                                <input type="file" onChange={fileChangeHandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300 cursor-pointer" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                            </div>
                            <div>
                                <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                            </div>
                        </div>
                        <BtnSubmit Title="Create PDF" Class="bg-indigo-700 hover:bg-indigo-900 text-white" />
                    </form>
                    <a href="/images/certificate/certificate.xlsx" className="text-2xl py-4 underline">Format Download</a>
                </div>
            </div>
        </>
    )
}

export default Certificate;