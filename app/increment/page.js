"use client";
import React, { useState, useEffect, useRef } from "react";
import { TextDt, TextBn, BtnSubmit, DropdownEn, TextEn } from "@/components/Form";
import { jsPDF } from "jspdf";
import { formatedDateBangla, fetchDataFromAPI, numberWithComma, inwordBangla, convertDigitToUnicode, formatedDateUnicode, localStorageGetItem, formatedDate, inwordEnglish, inwordUnicode } from "@/lib/utils";
import ReactToPrint from "react-to-print";
import { Tiro_Bangla } from 'next/font/google';
const trio = Tiro_Bangla({ subsets: ['latin'], weight: "400" });


import Add from "@/components/increment/Add";
import Edit from "@/components/increment/Edit";
import Delete from "@/components/increment/Delete";





const Increment = () => {
    const [increments, setIncrements] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");

    const [incomeYr, setIncomeYr] = useState("");
    const [fullyr, setFullyr] = useState("");
    const [dt, setDt] = useState("");
    const [activeDt, setActiveDt] = useState("");

    const letterRef = useRef(null);

    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = localStorageGetItem("increment");
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                setIncrements(result);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        setIncomeYr("2023-2024");
        setFullyr(new Date().getFullYear());
        setDt(formatedDate(new Date()));
        setActiveDt(formatedDate(new Date()));
    }, [msg])


    const messageHandler = (data) => {
        setMsg(data);
    }


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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Increment</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="px-4 grid grid-cols-4 gap-4">

                <div className="p-2 overflow-auto">
                    <form onSubmit={createLetter}>
                        <div className="w-full grid grid-cols-1 gap-4">
                            <TextEn Title="Income Year" Id="incomeYr" Change={(e) => { setIncomeYr(e.target.value) }} Value={incomeYr} Chr="150" />
                            <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                            <TextDt Title="Active Date" Id="activeDt" Change={(e) => { setActiveDt(e.target.value) }} Value={activeDt} />
                        </div>
                        <BtnSubmit Title="Submit" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                    </form>
                </div>

                <div className="col-span-3 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">Refno</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Salary</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                increments.length ? increments.map(increment => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={increment.id}>
                                            <td className="text-center py-2 px-4">{increment.refNo}</td>
                                            <td className="text-center py-2 px-4">{increment.name}</td>
                                            <td className="text-center py-2 px-4">{increment.salary}</td>
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={increment.id} data={increments} />
                                                <Delete message={messageHandler} id={increment.id} data={increments} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>


            </div>

            <ReactToPrint trigger={() => <button>Print</button>} content={() => letterRef.current} pageStyle={`@media print{@page{size: A4 portrait;margin:2in 1in 1in 1in;}footer {page-break-after: always;}}`} />
            <div className="overflow-auto hidden">
                <div ref={letterRef} className={trio.className}>
                    {increments.length ? increments.map((increment,i) => {
                        const nm = increment.name.split(';');
                        return (
                            <div key={i}>
                                <p>স্মারক নং-সিএমইএস/এইচআরডি/{convertDigitToUnicode(fullyr)}-{convertDigitToUnicode(increment.refNo)}<br />{formatedDateUnicode(dt)}</p>

                                <p className="mt-5">জনাব {nm[0]} <br />{nm[0]} <br />সিএমইএস, লালমাটিয়া, ঢাকা </p>

                                <p className="mt-5 text-justify">বিষয় : <span className="font-bold">{convertDigitToUnicode(incomeYr)} অর্থ বছরের মূল্যায়নের ভিত্তিতে গত {formatedDateUnicode(activeDt)} তারিখ থেকে আপনার  বাৎসরিক বেতন ৫% বৃদ্ধি করণ প্রসঙ্গে।</span> </p>
                                <p className="mt-5 text-justify">জনাব,<br />{convertDigitToUnicode(incomeYr)} অর্থ বছরের স্টাফ পারফরমেন্স মূল্যায়নের ভিত্তিতে আপনার বাৎসরিক বেতন ৫% বৃদ্ধির পর বর্তমান {convertDigitToUnicode(numberWithComma(increment.salary))}/-({inwordUnicode(increment.salary)}) টাকায় উন্নীত করে গত {formatedDateUnicode(activeDt)} তারিখ থেকে কার্যকর করা হয়েছে। </p>

                                <p className="mt-5">ধন্যবাদান্তে,</p>

                                <p className="mt-16">মোঃ ওমর ফারুক হায়দার<br />নির্বাহী পরিচালক<br />সিএমইএস</p>
                                <p className="mt-5"> অনুলিপি:<br />১. এইচআরডি/পিএফ</p>
                                <footer className=""> </footer>
                            </div>
                        )
                    }) : null}
                </div>
            </div>

        </>
    );

};

export default Increment;


