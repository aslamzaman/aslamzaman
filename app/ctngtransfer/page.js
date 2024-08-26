"use client";
import React, { useState, useEffect, useRef } from "react";
import { TextDt, BtnSubmit, TextEn, TextNum, DropdownEn } from "@/components/Form";
import { convertDigitToUnicode, dateAdd, formatedDate, formatedDateUnicode, inwordUnicode, numberWithComma } from "@/lib/utils";
import { Tiro_Bangla } from 'next/font/google';
const tiro = Tiro_Bangla({ subsets: ['bengali'], weight: "400" });
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";



const Ctngtransfer = () => {
    const [msg, setMsg] = useState("");
    const pageRef = useRef();

    //-----------------------------------------
    const [refNo, setRefNo] = useState("");
    const [yr, setYr] = useState("");
    const [name, setName] = useState("");
    const [names, setNames] = useState([]);
    const [unit, setUnit] = useState("");
    const [appointmentLetterDate, setAppointmentLetterDate] = useState("");
    const [terminateDate, setTerminateDate] = useState("");
    const [salary, setSalary] = useState("");

    const [option, setOption] = useState("");
    const [main, setMain] = useState("");



    const letterBody = (dt, dt2, unit, taka) => {
        return [
            `গত ${formatedDateUnicode(dt)} তারিখে COL প্রজেক্ট আরটিসি থেকে সরিয়ে অন্য এলাকায় নেয়ার ফলে আপনাকে ${unit} ইউনিটের কেয়ারটেকার-কাম নাইটগার্ড পদ থেকে অব্যাহতি প্রদান করা হয়েছে। ${unit} ইউনিটের সার্বিক নিরাপত্তার জন্য পূর্বের মতো আপনাকে GO খাতে স্থানান্তর করে মাসিক ${convertDigitToUnicode(numberWithComma(taka))}/- (${inwordUnicode(taka)}) টাকা বেতনে পুণরায় নিয়োগ প্রদান করা হলো যা ${formatedDateUnicode(dt2)} তারিখ থেকে কার্যকর করা হয়েছে।`,

            `গত ${formatedDateUnicode(dt)} তারিখে MC প্রজেক্ট আরটিসি থেকে সরিয়ে অন্য এলাকায় নেয়ার ফলে আপনাকে ${unit} ইউনিটের কেয়ারটেকার-কাম নাইটগার্ড পদ থেকে অব্যাহতি প্রদান করা হয়েছে। ${unit} ইউনিটের সার্বিক নিরাপত্তার জন্য পূর্বের মতো আপনাকে GO খাতে স্থানান্তর করে মাসিক ${convertDigitToUnicode(numberWithComma(taka))}/- (${inwordUnicode(taka)}) টাকা বেতনে পুণরায় নিয়োগ প্রদান করা হলো যা ${formatedDateUnicode(dt2)} তারিখ থেকে কার্যকর করা হয়েছে।`,

            `গত ${formatedDateUnicode(dt)} তারিখে COL প্রজেক্ট আরটিসি থেকে পুরোপুরি বন্ধ হওয়ার ফলে আপনাকে ${unit} ইউনিটের কেয়ারটেকার-কাম নাইটগার্ড পদ থেকে অব্যাহতি প্রদান করা হয়েছে। ${unit} ইউনিটের সার্বিক নিরাপত্তার জন্য পূর্বের মতো আপনাকে GO খাতে স্থানান্তর করে মাসিক ${convertDigitToUnicode(numberWithComma(taka))}/- (${inwordUnicode(taka)}) টাকা বেতনে পুণরায় নিয়োগ প্রদান করা হলো যা ${formatedDateUnicode(dt2)} তারিখ থেকে কার্যকর করা হয়েছে।`,

            `গত ${formatedDateUnicode(dt)} তারিখে MC প্রজেক্ট আরটিসি থেকে পুরোপুরি বন্ধ হওয়ার ফলে আপনাকে ${unit} ইউনিটের কেয়ারটেকার-কাম নাইটগার্ড পদ থেকে অব্যাহতি প্রদান করা হয়েছে। ${unit} ইউনিটের সার্বিক নিরাপত্তার জন্য পূর্বের মতো আপনাকে GO খাতে স্থানান্তর করে মাসিক ${convertDigitToUnicode(numberWithComma(taka))}/- (${inwordUnicode(taka)}) টাকা বেতনে পুণরায় নিয়োগ প্রদান করা হলো যা ${formatedDateUnicode(dt2)} তারিখ থেকে কার্যকর করা হয়েছে।`,

            `আপনার আবেদন ও অভিজ্ঞতার ভিত্তিতে আপনাকে ${unit} ইউনিটের কেয়ারটেকার কাম নাইটগার্ড পদে নিয়োগ দেওয়া হলো। এই নিয়োগ ${formatedDateUnicode(dt)} তারিখ থেকে কার্যকর করা হয়েছে। এ পদে আপনার মাসিক ভাতা সর্বসাকুল্যে ${convertDigitToUnicode(numberWithComma(taka))}/- (${inwordUnicode(taka)}) টাকা নির্ধারণ করা হলো।`
        ]
    }



    useEffect(() => {
        setRefNo("");
        setAppointmentLetterDate(formatedDate(new Date()));
        setTerminateDate("");
        setUnit("");
        setSalary('');
        setName("জনাব এনামুর রহমান;পিতাঃ এবাদুর রহমান;গ্রামঃ ভিত্রিখেল উত্তর;ডাকঘরঃ জৈন্তাপুর-3156;জেলাঃ  সিলেট");
    }, []);




    const createHandler = (e) => {
        e.preventDefault();

        setMsg("Please wait...");
        const nm = convertDigitToUnicode(name).split(";");
        setNames(nm);
        const addDate = dateAdd(new Date(terminateDate), 1);

        const getYear = new Date().getFullYear();
        setYr(getYear);

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });

        const bodyMain = letterBody(terminateDate, addDate, unit, salary);
        setMain(bodyMain[parseInt(option)]);


        setTimeout(async () => {
            const canvas = await html2canvas(pageRef.current, {
                scale: 4,
                useCORS: true
            });
            const url = canvas.toDataURL("image/png", 1.0);
            doc.addImage(url, "PNG", 0, 0, 210, 297);
            doc.save("aslam.pdf");
            setMsg("PDF Created successfully");
        }, 0)

    }

    return (
        <>
            <div className="w-full mb-3 mt-10">
                <h1 className="w-full pb-10 text-xl lg:text-3xl font-bold text-center text-blue-700">CTNG Transfer</h1>
                <p className="w-fulltext-center text-blue-700">{msg}</p>
            </div>

            <div className="w-full px-4 lg:px-6">
                <div className="w-full border-2 p-4 shadow-md rounded-md">
                    <form onSubmit={createHandler}>
                        <div className="w-full grid grid-cols-1 gap-4">
                            <div className="flex space-x-4">
                                <TextDt Title="Appointment Letter Date" Id="appointLetterDate" Change={e => setAppointmentLetterDate(e.target.value)} Value={appointmentLetterDate} />
                                <TextDt Title="Terminate Date/ Joining Date" Id="terminateDate" Change={e => setTerminateDate(e.target.value)} Value={terminateDate} />

                                <TextEn Title="Ref No:" Id="refNo" Change={e => setRefNo(e.target.value)} Value={refNo} Chr="250" />
                                <TextNum Title="Salary" Id="salary" Change={e => setSalary(e.target.value)} Value={salary} />
                                <TextEn Title="Unit" Id="unit" Change={e => setUnit(e.target.value)} Value={unit} Chr="250" />
                            </div>
                            <TextEn Title="Name (Separated by ;)" Id="name" Change={e => setName(e.target.value)} Value={name} Chr="250" />

                            <DropdownEn Title="Select Option" id="option" Change={e => setOption(e.target.value)} Value={option}>
                                <option value="0">COL Project Transfer</option>
                                <option value="1">MC Project Transfer</option>
                                <option value="2">COL Project Closed</option>
                                <option value="3">MC Project Closed</option>
                                <option value="4">New Appointment</option>
                            </DropdownEn>
                        </div>
                        <BtnSubmit Title="Create Letter" Class="bg-green-600 hover:bg-green-800 text-white mr-1" />

                    </form>
                </div>
            </div>




            <div className="w-fit h-fit border border-gray-400 mx-auto my-6">

                <div ref={pageRef} className={`w-[595.44px] h-[841.68px] pt-[129.6px] pt-[72px] px-[72px] text-[12.25px] bg-white ${tiro.className}`}>


                    <div className="w-full h-auto">
                        <p className="w-full">
                            স্মারক নং সিএমইএস/এইচআরডি/{convertDigitToUnicode(yr)}-{convertDigitToUnicode(refNo)}<br />
                            {formatedDateUnicode(appointmentLetterDate)}
                        </p>
                        <br />
                        <p className="w-full">{
                            names.length > 0 ? names.map((name, i) => <span key={i}>{name}<br /></span>) : null
                        }</p>
                        <br />
                        <p className="w-full text-justify">বিষয়: {unit} ইউনিটের আরটিসিতে কেয়ার টেকার-কাম নাইটগার্ড হিসেবে নিয়োগ প্রদান প্রসঙ্গে।</p>

                        <br />
                        <p className="w-full text-justify">
                            জনাব,
                            <br />
                            {main}
                        </p>
                        <br />
                        <p className="w-full text-justify">আপনি প্রতিদিন ক্যাম্পাস ঝাড়মোছ করে পরিস্কার রাখবেন এবং রাত্রে উপস্থিত থেকে ইউনিট পাহারা দিবেন। আরটিসির সার্বিক নিরাপত্তার দ্বায়িত্ব পালন করবেন।</p>
                        <br />
                        <p className="w-full text-justify">এক মাসের নোটিশে অথবা সমপরিমান বেতন দিয়ে সিএমইএস অথবা আপনি যেকোন পক্ষ এ নিয়োগের অবসান ঘটাতে পারবেন।</p>

                        <br />
                        <p className="w-full">
                            ধন্যবাদান্তে,
                        </p>
                        <br /><br /><br />
                        <p className="w-full">
                            মো: ওমর ফারুক হায়দার <br />
                            নির্বাহী পরিচালক
                        </p>
                        <br />
                        <p className="w-full">
                            অনুলিপি :<br />
                            ১. এইচ আর ডি / প্রশাসন
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ctngtransfer;