"use client";
import React, { useState, useEffect, useRef } from "react";
import { TextDt, TextBn, BtnSubmit, DropdownEn, TextUn, TextEn, TextareaEn } from "@/components/Form";
import { formatedDateBangla, fetchDataFromAPI, numberWithComma, inwordBangla, printPageSetup, formatedDateUnicode, formatedDate, convertDigitToUnicode } from "@/lib/utils";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { Tiro_Bangla } from 'next/font/google';

const trio = Tiro_Bangla({ subsets: ['latin'], weight: "400" });



const Increment = () => {
    const [staffData, setStaffData] = useState([]);

    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Ready");

    const [refNo, setRefNo] = useState("23");
    const [yr, setYr] = useState("");
    const [dt, setDt] = useState("");
    const [name, setName] = useState("");
    const [names, setNames] = useState([]);

    const [subject, setSubject] = useState("");
    const [detail, setDetail] = useState("");
    const [details, setDetails] = useState([]);

    const [isShowPrintButton, setIsShowPrintButton] = useState(false);

    const contentRef = useRef();


    useEffect(() => {
        setDt(formatedDate(new Date()));
        setYr(new Date().getFullYear());
        printPageSetup('p', 2, 1, 1, 1);
    }, [msg])



    const refChangeHandler = (e) => {
        const value = e.target.value;
        setRefNo(value);
        setIsShowPrintButton(false);
    }

    const dtChangeHandler = (e) => {
        const value = e.target.value;
        setDt(value);
        setIsShowPrintButton(false);
    } 

    const nmChangeHandler = (e) => {
        const value = e.target.value;
        setName(value);
        const x = value.split(";");
        setNames(x);
        setIsShowPrintButton(false);
    }

    const subjectChangeHandler = (e) => {
        const value = e.target.value;
        setSubject(value);
        setIsShowPrintButton(false);
    }

    const bodyChangeHandler = (e) => {
        const value = e.target.value;
        setDetail(value);
        const x = value.split(";");
        setDetails(x);
        setIsShowPrintButton(false);
    }


    const createHandler = (e) => {
        e.preventDefault();
        setIsShowPrintButton(true);
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Staff Appointment</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-center text-pink-300">&nbsp;{msg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <div className="p-2 overflow-auto">
                    <form onSubmit={createHandler}>
                        <div className="w-full grid grid-cols-1 gap-4">
                            <div className="flex space-x-4">
                            <TextEn Title="Ref. No:" Id="refNo" Change={refChangeHandler} Value={refNo} Chr="150" />
                            <TextDt Title="Date" Id="dt" Change={dtChangeHandler} Value={dt} />
                            </div>
                            <TextEn Title="Name. (For new line use semiclone ';')" Id="name" Change={nmChangeHandler} Value={name} Chr="250" />
                            <TextEn Title="Subject" Id="subject" Change={subjectChangeHandler} Value={subject} Chr="250" />
                            <TextareaEn Title="Detail" Id="detail" Rows="4" Change={bodyChangeHandler} Value={detail} Chr="250" />
                        </div>
                        <BtnSubmit Title="Create Letter" Class="bg-green-600 hover:bg-green-800 text-white mr-1" />
                        {isShowPrintButton ? <ReactToPrint trigger={() => <button className="text-center mt-3 mx-0.5 px-4 py-2 text-sm font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 text-white bg-blue-600 hover:bg-blue-800 text-white">Print Appointment</button>} content={() => contentRef.current} documentTitle="Appointment Letter" /> : null}
                    </form>
                </div>


                <div className="hidden">
                    <div ref={contentRef} className={trio.className} >
                        <p className={`${trio.className} leading-5`}>স্মারক নং সিএমইএস/এইচআরডি/{convertDigitToUnicode(yr)}-{convertDigitToUnicode(refNo)}<br />{formatedDateUnicode(dt)}</p>


                        <p className="mt-7 leading-5">
                            {names.length ? names.map((n, i) => (<span key={i}>{convertDigitToUnicode(n)}<br /></span>)) : null}
                        </p>


                        <p className="mt-7 leading-5 text-justify">
                            বিষয়: <span className="font-bold">{convertDigitToUnicode(subject)}</span>
                        </p>

                        <p className="mt-7 leading-5 text-justify"> <span>জনাব,</span><br />
                            {details.length ? details.map((d, i) => (<span key={i}>{convertDigitToUnicode(d)}<br /><br /></span>)) : null}

                        </p>


                        <p className="leading-5 text-justify">
                            এই নিয়োগ প্রতিষ্ঠানের মানব সম্পদ নীতিমালা অনুযায়ী পরিচালিত হবে এবং যেকোন সময়ে এক মাসের নোটিশে অথবা সমপরিমান বেতন দিয়ে সিএমইএস অথবা আপনি যে কোন পক্ষ এ নিয়োগের অবসান ঘটাতে পারবেন।
                        </p>
                        <p className="mt-7 leading-5"> ধন্যবাদান্তে,</p>


                        <p className="mt-20 leading-5">
                            মো: ওমর ফারুক হায়দার <br />
                            নির্বাহী পরিচালক
                        </p>

                        <p className="mt-7 leading-5">
                            অনুলিপি :<br />
                            ১. এইচ আর ডি / প্রশাসন
                        </p>


                    </div>
                </div>
            </div>

        </>
    );

};

export default Increment;


