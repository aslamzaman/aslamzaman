"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, DropdownEn, TextDt, TextEn, TextNum } from "@/components/Form";
import Add from "@/components/bkash/Add";
import Edit from "@/components/bkash/Edit";
import Delete from "@/components/bkash/Delete";
import { jsPDF } from "jspdf";
import { getItems } from "@/lib/utils/LocalDatabase";
import { fetchData } from "@/lib/utils/FetchData";
import { inwordBn } from "@/lib/InwordBn";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");



const Bkash = () => {

    const [tk, setTk] = useState("1000");
    const [charge, setCharge] = useState("18.5");
    const [msg, setMsg] = useState("");
    const [msg1, setMsg1] = useState("");


    const handleCreate = async (e) => {
        e.preventDefault();
        const bkashCharge = charge / 1000;
        const taka = parseFloat(tk) * bkashCharge;
        const fifth = Math.floor(taka / 5); // 25
        const restTaka = taka % 5; // 2.9

        let x = 0;
        if (restTaka > 0) {
            x = 5;
        } else {
            x = 0;
        }

        const finalTaka = (fifth * 5) + x + 5;
        let bkashResult = 0;
        if (taka === 0) {
            bkashResult = 0;
        } else {
            bkashResult = finalTaka;
        }
        console.log(taka, fifth, restTaka, x, bkashResult);
        const st = `${parseFloat(taka).toFixed(2)}, Sending charge = 5.00; Total = ${(parseFloat(taka)+5).toFixed(2)}`;
        setMsg(st);
        setMsg1(bkashResult.toFixed(2));
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-gray-400">Send Money Bkash Charge</h1>
                <p className="text-center text-md md:text-xl font-bold text-blue-700 mt-4">{msg} &#9871; {msg1}</p>
            </div>

            <div className="px-4 lg:px-6">

                <div className="w-full md:w-8/12 mx-auto border-2 p-4 shadow-md rounded-md">
                    <form onSubmit={handleCreate}>
                        <div className="grid grid-cols-1 gap-2 my-2 gap-4">
                            <TextNum Title="Taka" Id="tk" Change={e => setTk(e.target.value)} Value={tk} />
                            <TextNum Title="Charge (per thousand)" Id="charge" Change={e => setCharge(e.target.value)} Value={charge} />
                        </div>
                        <div className="w-full flex justify-start">
                            <BtnSubmit Title="Calculate" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
};

export default Bkash;



