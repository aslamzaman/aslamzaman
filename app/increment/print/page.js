"use client";
import React, { useState, useEffect, useRef } from "react";
import { localStorageGetItem, formatedDateUnicode, convertDigitToUnicode, numberWithComma, inwordUnicode } from "@/lib/utils";
import ReactToPrint from 'react-to-print';
import { Tiro_Bangla } from 'next/font/google';
const tiro = Tiro_Bangla({ subsets: ['bengali'], weight: "400" });
import Link from "next/link";




const Increment = () => {
    const [increments, setIncrements] = useState([]);

    const [incomeYr, setIncomeYr] = useState("");
    const [fullyr, setFullyr] = useState("");
    const [dt, setDt] = useState("");
    const [activeDt, setActiveDt] = useState("");

    const contentRef = useRef();


    useEffect(() => {
        try {
            const data = localStorageGetItem('incrementForPrint');
           // console.log(data);
            setIncrements(data.increments);
            setIncomeYr(data.incomeYr);
            setFullyr(data.fullyr);
            setDt(data.dt);
            setActiveDt(data.activeDt);
        } catch (error) {
            console.log(error);
        }
    }, [])


    const pageStyle = `@media print {
        @page {
            size: A4 portrait;
            margin: 2in 1in 1in 1in;
          }
        footer{
            page-break-after: always;
        } 
        #page{
            font-size: 16px;
        }
        #invisible{
            display: none;
        }     
    }`;


    const printButton = () => {
        return (
            <button title="Print" className="w-16 h-16 p-0.5 flex justify-center items-center border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-200 transition duration-500 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
            </button>
        )
    }



    return (
        <>
            <div className="px-4 lg:px-6">
                <div className="w-full py-6 flex justify-center items-center space-x-4 border-b border-gray-300 rounded-t-md">
                    <Link title="Close" href="/increment" className="w-16 h-16 p-0.5  flex justify-center items-center border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-200 transition duration-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                    <ReactToPrint trigger={printButton} content={() => contentRef.current} pageStyle={pageStyle} documentTitle="Staff Increment" />
                </div>


                <div className="w-full p-4 overflow-auto">



                    <div className="w-[730px] h-fit p-[60px] border-2 border-gray-200 mx-auto">
                        <div id="page" ref={contentRef} className={`w-full h-auto bg-white ${tiro.className}`} >

                            {increments.length > 1 ? increments.map(staff => {
                                const staffNameWithPost = staff.name;
                                const nm = staffNameWithPost.split(";");
                                return (
                                    <div className="w-full text-justify" key={staff.id}>
                                        <p>স্মারক নং-সিএমইএস/এইচআরডি/{convertDigitToUnicode(fullyr)}-{convertDigitToUnicode(staff.refNo)}<br />{formatedDateUnicode(dt)}</p>
                                        <br />
                                        <p>জনাব {nm[0]} <br />{nm[1]} <br />সিএমইএস, লালমাটিয়া, ঢাকা </p>
                                        <br />
                                        <p className="text-justify">বিষয় : <span className="font-bold">{convertDigitToUnicode(incomeYr)} অর্থবছরের মূল্যায়নের ভিত্তিতে আপনার বাৎসরিক বেতন ৫% বৃদ্ধির সিদ্ধান্ত গ্রহণ এবং গত {formatedDateUnicode(activeDt)} তারিখ থেকে কার্যকর করা প্রসঙ্গে।</span> </p>
                                        <br />

                                        <p className="text-justify">জনাব,<br />আপনার অবগতির জন্য জানানো যাচ্ছে যে, {convertDigitToUnicode(incomeYr)} অর্থবছরের স্টাফ পারফরমেন্স মূল্যায়নের ভিত্তিতে আপনার বাৎসরিক বেতন ৫% বৃদ্ধি করা হয়েছে।</p>

                                        <br />


                                        <p className="text-justify">এর ফলে, আপনার বর্তমান বেতন সর্বসাকুল্যে {convertDigitToUnicode(numberWithComma(staff.salary))}/-({inwordUnicode(staff.salary)}) টাকায় উন্নীত করা হয়েছে, যা গত {formatedDateUnicode(activeDt)} তারিখ থেকে কার্যকর করা হয়েছে।</p>

                                        <br />
                                        <p>ধন্যবাদান্তে,</p>

                                        <p className="mt-16">মোঃ ওমর ফারুক হায়দার<br />নির্বাহী পরিচালক<br />সিএমইএস</p>
                                        <br />
                                        <p> অনুলিপি:<br />১. এইচআরডি/পিএফ</p>
                                        <footer className=""> </footer>
                                        <div id="invisible" className="w-full h-[2px] bg-gray-400 my-16"></div>
                                    </div>
                                )
                            }) : null}




                        </div>

                    </div>




                </div>
            </div>

        </>
    );

};

export default Increment;

