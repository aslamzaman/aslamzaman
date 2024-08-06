"use client";
import React, { useState, useEffect } from "react";
import { TextDt, TextBn, BtnSubmit, DropdownEn } from "@/components/Form";
import { jsPDF } from "jspdf";
import { formatedDateBangla, fetchDataFromAPI, numberWithComma } from "@/lib/utils";

require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib/fonts/SUTOM_MJ-bold");





const Increment = () => {
    const [staffData, setStaffData] = useState([]);

    const [waitMsg, setWaitMsg] = useState("");
    const [refNo, setRefNo] = useState("2024-208");
    const [dt, setDt] = useState("");
    const [nm, setNm] = useState("†gv: ûgvqyb Kwei");
    const [yr, setYr] = useState("2023-2024");
    const [dt2, setDt2] = useState("");
    const [taka, setTaka] = useState("40000");


    useEffect(() => {
        const getData = async () => {
            try {
                const staff = await fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`);
                const scStaff = staff.filter(staf => staf.placeId._id === "660ae2d4825d0610471e272d");
                console.log(scStaff)
                setStaffData(scStaff);
                setWaitMsg('');
            } catch (err) {
                console.log(err);
            }
        }
        getData();

        setDt(localStorage.getItem("incrDt") ? localStorage.getItem("incrDt") : "");
        setDt2(localStorage.getItem("incrDt2") ? localStorage.getItem("incrDt2") : "");
        setYr(localStorage.getItem("incrYr") ? localStorage.getItem("incrYr") : "");
        setRefNo(localStorage.getItem("incrRef") ? localStorage.getItem("incrRef") : "");

    }, [waitMsg])


    const createLetter = (e) => {
        e.preventDefault();

        localStorage.setItem("incrDt", dt);
        localStorage.setItem("incrDt2", dt2);
        localStorage.setItem("incrYr", yr);
        localStorage.setItem("incrRef", refNo);

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });
        const splitName = nm.split(";");
        const tk = eval(taka);

        const st = `<div style="width:160px; margin-left:25px; margin-top:50px; line-height: normal; font-family:SutonnyMJ;font-size:5px">
        <p style="width:100%; ">¯§viK bs-wmGgBGm/GBPAviwW/${new Date().getFullYear()}-${refNo}<br />${formatedDateBangla(dt)}</p>
        <p style="margin-top:8px;">Rbve ${splitName[0]}<br />${splitName[1]}<br />wmGgBGm, jvjgvwUqv, XvKv-1207 </p>
       

        <p id="subject" style="max-width: 160px; margin-top:8px;text-align:justify; word-break: normal;font-weight:700;">welq: ${yr} A_© eQ‡ii g~j¨vq‡bi wfwË‡Z ${formatedDateBangla(dt2)} ZvwiL †_‡K Avcbvi  evrmwiK †eZb 5% e„w× KiY cÖm‡½|</p>
       

        <p id="letterBody" style="max-width: 160px; margin-top:8px;text-align:justify; word-break: normal;">Rbve,<br />${yr} A_© eQ‡ii ÷vd cvidi‡gÝ g~j¨vq‡bi wfwË‡Z Avcbvi evrmwiK †eZb 5% e„w×i ci eZ©gvb †eZb ${numberWithComma(tk)}/-(${inwordBangla(tk)}) UvKvq DbœxZ K‡i\ ${formatedDateBangla(dt2)} ZvwiL †_‡K Kvh©Ki Kiv n‡q‡Q|</p>

        <p style="margin-top:10px;">ab¨ev\`v‡šÍ</p>

        <p style="margin-top:20px;">†gv: Igi dviæK nvq\`vi<br />wbe©vnx cwiPvjK<br />wmGgBGm</p>

        <p style="margin-top:16px;">Abywjwc:<br />1. GBPAviwW/wcGd</p>

        </div>`



        doc.html(st, {
            callback: function (dc) {
                dc.save(new Date().toISOString() + "-5_Percent_Increment.pdf");
            }
        })


        setNm("");
        setTaka("");
        setWaitMsg(`Ok: ${Date.now}`);
    }

    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Staff Increment</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
           
            <div className="px-4 lg:px-6">

                <div className="p-2 overflow-auto">
                    <form onSubmit={createLetter}>
                        <div className="w-full grid grid-cols-2 gap-4">
                            <TextBn Title="Ref. No:" Id="refNo" Change={(e) => { setRefNo(e.target.value) }} Value={refNo} Chr="150" />
                            <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                            <TextBn Title="Year" Id="yr" Change={(e) => { setYr(e.target.value) }} Value={yr} Chr="150" />
                            <TextDt Title="Effective Date" Id="dt2" Change={(e) => { setDt2(e.target.value) }} Value={dt2} />
                            <DropdownEn Title="Name" Id="nm" Change={e => setNm(e.target.value)} Value={nm}>
                                {staffData ? staffData.map(staff => {
                                    const vl = `${staff.nmBn};${staff.postId.nmBn}`;
                                    return (
                                        <option value={vl} key={staff._id}>{staff.nmEn}</option>
                                    )

                                }) : null}
                            </DropdownEn>
                            <TextBn Title="Taka" Id="taka" Change={(e) => { setTaka(e.target.value) }} Value={taka} Chr="150" />
                        </div>
                        <BtnSubmit Title="Submit" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                    </form>
                </div>
            </div>
        </>
    );

};

export default Increment;


