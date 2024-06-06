"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
require("@/lib/fonts/Lobster-Regular-normal");
require("@/lib/fonts/OpenSansCondensed-Light-normal");
import { BtnSubmit, TextDt } from "@/components/Form";
const date_format = dt => new Date(dt).toISOString().split('T')[0];

const dateBarFormat = (dt)=>{
    const d1 = date_format(dt);
    const splitDt= d1.split("-");
    const result = splitDt[2]+"/"+splitDt[1]+"/"+splitDt[0];
    return result;
}

const Certificate = () => {
    const [stdData, setStdData] = useState([]);
    const [dt, setDt] = useState([]);
    const [msg, setMsg] = useState("Seclect an excel file");
    const [periodStart, setPeriodStart] = useState("");
    const [periodEnd, setPeriodEnd] = useState("");






    useEffect(() => {
        setDt(date_format(new Date()));
        const pStart = localStorage.getItem('periodStart');
        const pEnd = localStorage.getItem('periodEnd');
        setPeriodStart(pStart ? date_format(pStart) : date_format(new Date()));
        setPeriodEnd(pEnd ? date_format(pEnd) : date_format(new Date()));
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
        const period = `${dateBarFormat(periodStart)} to ${dateBarFormat(periodEnd)}`;
        console.log(period);
        let i = 0;
        const myTimer = setInterval(() => {

            if (i > 0) {
                doc.addImage("/images/certificate/Col_EWG_2023_2024_Yr_1.png", "PNG", 0, 0, 297, 210);

                doc.setFont("Lobster-Regular", "normal");
                doc.setFontSize(24);
                doc.text(`${stdData[i].name}`, 148, 77, null, null, "center");

                doc.setFont("OpenSansCondensed-Light", "normal");
                doc.setFontSize(14);
                doc.text("Registration no: " + stdData[i].reg, 148, 84, null, null, "center");

                doc.setFont("Lobster-Regular", "normal");
                doc.setFontSize(17);
                doc.text(`${stdData[i].trade}`, 162, 103, null, null, "center");
                doc.text(`${period}`, 84, 110.5, null, null, "center");
                doc.setFontSize(16)
                doc.setFont("Lobster-Regular", "normal");

                doc.setFontSize(12);
                doc.text(`${stdData[i].sl}`, 66, 182);
                doc.text(`${dateBarFormat(dt)}`, 196, 182);

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

                <div className="w-11/12 md:w-8/12 mx-auto my-[50px] flex flex-col items-center border border-gray-200 rounded-lg shadow-md bg-white z-50">
                    <div className="w-full bg-gray-100 border-b rounded-t-lg">
                        <h1 className="py-2.5 text-center font-semibold text-[calc(1.40rem+0.3vw)]">Certificate COL - 1st Phase</h1>
                    </div>
                    <p className="py-1.5 text-start text-xs font-bold">{msg}</p>
                    <form onSubmit={createPdfHanler} className="w-9/12 p-6 mx-auto">
                        <div className="flex items-center space-x-4">
                            <div className="w-1/2 mt-5">
                                <input type="file" onChange={fileChangeHandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300 cursor-pointer" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                            </div>
                            <div className="w-1/2">
                                <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                            </div>
                        </div>
                        <label className='text-xs font-semibold mb-1 opacity-50'>Period</label>
                        <div className="flex items-center space-x-4">
                            <input onChange={e => setPeriodStart(e.target.value)} value={periodStart} type="date" id="periodStart" name="periodStart" required className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                            <input onChange={e => setPeriodEnd(e.target.value)} value={periodEnd} type="date" id="periodEnd" name="periodEnd" required className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
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