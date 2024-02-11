"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, TextEn, TextDt, DropdownEn } from "@/components/Form";
import { Lib } from "@/lib/Lib";
import jsPDF from 'jspdf';

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");

import { MonthData, YearData, RentFormate } from "./_lib/model";


const Rent = () => {
    const [msg, setMsg] = useState("Data ready");

    const [mnth, setMnth] = useState("Rvbyqvix");
    const [dt, setDt] = useState("");
    const [yr, setYr] = useState("2024");


    useEffect(() => {
        const load = () => {
            try {
                setDt(Lib.util.dateFormat(new Date(), "-"));
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);




    const handleCreate = (e) => {
        e.preventDefault();
        setMsg("Please wait...");

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });


        const h_rent = 33600;
        const g_rent = 25458;
        const gas_bill = 1080;
        const vat = 3819;
        const go_tax = 1273;
        const total_tax = 3360;
        setTimeout(() => {
            RentFormate({ doc }, mnth, yr, dt, h_rent, g_rent, gas_bill, vat, go_tax, total_tax);
            doc.save(new Date().toISOString() + "-House rent.pdf");
            setMsg("PDF file Created");
        }, 0);
    }




    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Rent</h1>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="w-full p-4">
                        <p className="w-full text-center text-sm text-red-700">{msg}</p>
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <TextDt Title="Date" Id="dt" Change={(e) => setDt(e.target.value)} Value={dt} />
                                <DropdownEn Title="Select Month" Id="mnth" Change={(e) => { setMnth(e.target.value) }} Value={mnth}>
                                    {MonthData.map((m, i) => <option value={m.id} key={i}>{m.option}</option>)}
                                </DropdownEn>
                                <DropdownEn Title="Select Year" Id="yr" Change={(e) => { setYr(e.target.value) }} Value={yr}>
                                    {YearData.map((y, i) => <option value={y.id} key={i}>{y.option}</option>)}
                                </DropdownEn>
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Create rent" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Rent;


