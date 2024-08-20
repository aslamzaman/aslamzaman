"use client";
import React, { useState, useEffect, useRef } from "react";
import { TextDt, BtnSubmit, TextEn, TextareaEn } from "@/components/Form";
import { formatedDate, localStorageSetItem } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Increment = () => {

    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Ready");

    const [refNo, setRefNo] = useState("23");

    const [dt, setDt] = useState("");
    const [name, setName] = useState("আলী রায়হানের ছোট ভাই; রানা ইসলাম (২১) বাদী হয়ে ;নগরের বোয়ালিয়া থানায়; মামলাটি করেন।");

    const [subject, setSubject] = useState("শিবির নেতা নিহতের ঘটনায় সাবেক মেয়র লিটনসহ ১২০০ জনের বিরুদ্ধে মামলা লিটনসহ ১২০০ জনের বিরুদ্ধে মামলা");
    const [detail, setDetail] = useState("মামলায় এজাহারভুক্ত আসামিদের মধ্যে রাজশাহী মহানগর আওয়ামী লীগের সাধারণ সম্পাদক ডাবলু সরকার, তাঁর ভাই জেডু সরকার; নগর যুবলীগের সাধারণ সম্পাদক তৌরিদ আল মাসুদ, যুবলীগ কর্মী জহিরুল হক, নগর ছাত্রলীগের সাবেক সভাপতি রকি কুমার ঘোষ ও শফিকুজ্জামান শফিক, সাবেক সাধারণ সম্পাদক মাহমুদুল হাসান, বর্তমান সাধারণ সম্পাদক সিরাজুম মুবীন প্রমুখের নাম আছে।");


    const router = useRouter();

    useEffect(() => {
        setDt(formatedDate(new Date()));
    }, [])




    const createHandler = (e) => {
        e.preventDefault();
        const data = {
            refNo: refNo,
            dt: dt,
            name: name,
            subject: subject,
            detail: detail
        }
        localStorageSetItem('incrementData', data);
        router.push('/appointment/print');
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
                                <TextEn Title="Ref. No:" Id="refNo" Change={e=>setRefNo(e.target.value)} Value={refNo} Chr="150" />
                                <TextDt Title="Date" Id="dt" Change={e=>setDt(e.target.value)} Value={dt} />
                            </div>
                            <TextEn Title="Name. (For new line use semiclone ';')" Id="name" Change={e=>setName(e.target.value)} Value={name} Chr="250" />
                            <TextEn Title="Subject" Id="subject" Change={e=>setSubject(e.target.value)} Value={subject} Chr="250" />
                            <TextareaEn Title="Detail" Id="detail" Rows="4" Change={e=>setDetail(e.target.value)} Value={detail} Chr="250" />
                        </div>
                        <BtnSubmit Title="Create Letter" Class="bg-green-600 hover:bg-green-800 text-white mr-1" />
                    </form>
                </div>
            </div>
        </>
    );

};

export default Increment;


