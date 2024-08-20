"use client";
import React, { useState, useEffect, useRef } from "react";
import { localStorageGetItem, formatedDateUnicode, convertDigitToUnicode } from "@/lib/utils";
import ReactToPrint from 'react-to-print';
import { Tiro_Bangla } from 'next/font/google';
const trio = Tiro_Bangla({ subsets: ['latin'], weight: "400" });
import Link from "next/link";




const Increment = () => {
    const [names, setNames] = useState([]);
    const [details, setDetails] = useState([]);

    const [yr, setYr] = useState("");
    const [refNo, setRefNo] = useState("");
    const [dt, setDt] = useState("");
    const [subject, setSubject] = useState("");

    const contentRef = useRef();




    useEffect(() => {
        try {
            const { refNo, dt, name, subject, detail } = localStorageGetItem('incrementData');
            setRefNo(refNo);
            setDt(formatedDateUnicode(dt));
            setSubject(subject);
            setNames(name.split(';'));
            setDetails(detail.split(';'));
            const newDate = new Date();
            setYr(newDate.getFullYear());
        } catch (error) {
            console.log(error);
        }
    }, [])

    const pageStyle = `@media print {
        @page {
            size: A4 portrait ;
            margin: 2in 1in 1in 1in;
          }
    }`;




    return (
        <>
            <div className="px-4 lg:px-6">
                <div className="w-full py-6 flex justify-center items-center space-x-4 border-b border-gray-300 rounded-t-md">
                    <Link title="Close" href="/appointment" className="w-16 h-16 p-0.5  flex justify-center items-center border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-200 transition duration-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                    <ReactToPrint trigger={() => <button title="Print" className="w-16 h-16 p-0.5 flex justify-center items-center border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-200 transition duration-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                        </svg>
                    </button>} content={() => contentRef.current} pageStyle={pageStyle} documentTitle="Sales and Payment Details" />

                </div>

               


                <div className="p-6 w-full md:w-9/12 lg:w-1/2 h-[calc(100vw*1.4)] md:h-[calc(100vw*1.05)] lg:h-[calc(100vw*0.7)] mx-auto mt-10 border border-gray-400 rounded-lg shadow-lg drop-shadow-2xl">

                    <div className="w-full h-full overflow-auto">
                        <div ref={contentRef} className={trio.className} >


                            <p className={`${trio.className} leading-5`}>স্মারক নং সিএমইএস/এইচআরডি/{convertDigitToUnicode(yr)}-{convertDigitToUnicode(refNo)}<br />{dt}</p>



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
            </div>

        </>
    );

};

export default Increment;


