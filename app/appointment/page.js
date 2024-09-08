"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TextDt, BtnSubmit, TextEn, TextareaEn, BtnInput } from "@/components/Form";
import { formatedDate, localStorageGetItem, localStorageSetItem } from "@/lib/utils";




const initialName = `মো: আলাউদ্দিন আলী;পিতা: ফজল আহমেদ;গ্রাম: বদুর বাড়ি, পলিয়া পাড়া;ডাকঘর: সাতবাড়িয়া-৪৩৮৩;থানা: চন্দনাইশ,জেলা: চট্টগ্রাম`;
const initialSubject = `সাতবাড়িয়া ইউনিটের কেয়ারটেকার কাম নাইটগার্ড হিসাবে নিয়োগ প্রদান প্রসঙ্গে।`;
const initialDetail = `আপনার আবেদন ও অভিজ্ঞতার ভিত্তিতে আপনাকে সাতবাড়িয়া ইউনিটের কেয়ারটেকার কাম নাইটগার্ড পদে নিয়োগ দেয়া হলো। এ নিয়োগ গত ০১/০৯/২০২২ তারিখ থেকে কার্যকর করা হলো। এ পদে সম্মানী ভাতা হবে মাসিক সর্বসাকুল্যে ৪,০০০/- (চার হাজার) টাকা।; আপনি প্রতিদিন সকালে ক্যাম্পাস ঝাড়মোছ করে পরিস্কার রাখবেন। রাতে উপস্থিত থেকে পাহারা দিবেন। আরটিসির নিরাপত্তার সার্বিক দায়িত্ব পালন করবেন। `;



const Appointment = () => {
    const [refNo, setRefNo] = useState("");
    const [dt, setDt] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [detail, setDetail] = useState("");
  
    const router = useRouter();


    useEffect(() => {
        const getData = localStorageGetItem('appointmentData');
        if (getData) {
            setRefNo(getData.refNo);
            setDt(formatedDate(getData.dt));
            setName(getData.name);
            setSubject(getData.subject);
            setDetail(getData.detail);
        } else {
            setRefNo("");
            setDt(formatedDate(new Date()));
            setName("");
            setSubject("সাতবাড়িয়া ইউনিটের কেয়ারটেকার কাম নাইটগার্ড হিসাবে নিয়োগ প্রদান প্রসঙ্গে।");
            setDetail("");
        }
    }, []);



    const createHandler = async (e) => {
        e.preventDefault();
        try {
            const data = {
                refNo: refNo,
                dt: dt,
                name: name,
                subject: subject,
                detail: detail
            }
            const msg = localStorageSetItem('appointmentData', data);
            console.log(msg);
            router.push("/appointment/print");
        } catch (error) {
            console.log(error);
        }
    }

    const getInitialValue = () => {
        setRefNo('2021-77');
        setDt(formatedDate(new Date()));
        setName(initialName);
        setSubject(initialSubject);
        setDetail(initialDetail);
    }


    return (
        <>
            <div className="w-full mb-3 mt-10">
                <h1 className="w-full pb-10 text-xl lg:text-3xl font-bold text-center text-blue-700">Appointment</h1>
            </div>

            <div className="w-full px-4 lg:px-6">
                <div className="w-full border-2 p-4 shadow-md rounded-md">
                    <form onSubmit={createHandler}>
                        <div className="w-full grid grid-cols-1 gap-4">
                            <div className="flex space-x-4">
                                <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />

                                <TextEn Title="Ref No:" Id="refNo" Change={e => setRefNo(e.target.value)} Value={refNo} Chr="250" />
                            </div>
                            <TextEn Title="Name (Separated by ;)" Id="name" Change={e => setName(e.target.value)} Value={name} Chr="250" />
                            <TextEn Title="Subject" Id="subject" Change={e => setSubject(e.target.value)} Value={subject} Chr="250" />
                            <TextareaEn Title="Detail (Separated by ;)" Id="detail" Rows="6" Change={e => setDetail(e.target.value)} Value={detail} Chr="250" />
                        </div>
                        <BtnSubmit Title="Create Letter" Class="bg-green-600 hover:bg-green-800 text-white mr-1" />
                        <BtnInput Title="Get Initial Value" Click={getInitialValue} Class="bg-blue-600 hover:bg-blue-800 text-white mr-1" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Appointment;