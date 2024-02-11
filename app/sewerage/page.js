"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { BtnSubmit, TextDt, TextNum, DropdownEn } from "@/components/Form";
import { Lib } from "@/lib/Lib";
import { MonthData, YearData, SewerageFormat } from "./_lib/model";

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");



const Sewerage = () => {
    const [msg, setMsg] = useState("Data ready");

    const [tk, setTk] = useState("1673");
    const [mnth, setMnth] = useState("Rvbyqvix");
    const [yr, setYr] = useState("2024");
    const [dt, setDt] = useState("");


    useEffect(() => {
        const load = () => {
            try {
                setDt(Lib.util.dateFormat(new Date(), '-'));
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);




    const handleCreate = async (e) => {
        e.preventDefault();
        setMsg("Please wait...");

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });
        setTimeout(() => {
            SewerageFormat.Page1({ doc }, mnth, yr, tk, dt);
            doc.addPage("a4", "p");
            SewerageFormat.Page2({ doc }, mnth, yr, tk, dt);
            doc.addPage("a4", "p");
            SewerageFormat.Go({ doc }, mnth, yr, tk, dt);
            setMsg("PDF file Created");
            doc.save(new Date().toISOString() + "_Sewerage_Bill.pdf");
        }, 0);
    }


    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Sewerage</h1>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="w-full p-4">
                        <p className="w-full text-center text-sm text-red-700">{msg}</p>
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                <TextNum Title="Taka" Id="tk" Change={e => setTk(e.target.value)} Value={tk} />
                                <DropdownEn Title="Select Month" Id="mnth" Change={e => setMnth(e.target.value)} Value={mnth}>
                                    {MonthData.map((m, i) => <option value={m.id} key={i}>{m.option}</option>)}
                                </DropdownEn>

                                <DropdownEn Title="Select Year" Id="yr" Change={e => setYr(e.target.value)} Value={yr}>
                                    {YearData.map((y, i) => <option value={y.id} key={i}>{y.option}</option>)}
                                </DropdownEn>
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Create sewerage" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Sewerage;


