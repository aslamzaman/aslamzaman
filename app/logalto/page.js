"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/logalto/Add";
import Edit from "@/components/logalto/Edit";
import Delete from "@/components/logalto/Delete";
import { getItems } from "@/lib/utils/LocalDatabase";
import { BtnEn } from "@/components/Form";


const Logalto = () => {
    const [logaltos, setLogaltos] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const getData = () => {
            setWaitMsg('Please Wait...');
            try {
                const response = getItems('logalto');
                console.log(response.data);
                setLogaltos(response.data);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }



    const ExcelHandlerClick = async (e) => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/logalto`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logaltos)
            };
            const response = await fetch(apiUrl, requestOptions);
            console.log(response);
            if (response.ok) {
                console.log(`Logalto is created`);
            } else {
                throw new Error("Failed to create logalto");
            }
        } catch (error) {
            console.error("Error saving logalto data:", error);
            console.log("Error saving logalto data.");
        }
    }




    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Logalto</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <div className="p-2 overflow-auto">
                    <BtnEn Title="Create Excel" Click={ExcelHandlerClick} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Dob</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Gender</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Disability</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Disabilitytype</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Fathermothername</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Education</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Ismarried</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Religion</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Phone</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Mobile</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Village</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {logaltos.length ? (
                                logaltos.map(logalto => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={logalto.id}>
                                        <td className="text-center py-2 px-4">{logalto.name}</td>
                                        <td className="text-center py-2 px-4">{logalto.dob}</td>
                                        <td className="text-center py-2 px-4">{logalto.gender}</td>
                                        <td className="text-center py-2 px-4">{logalto.disability}</td>
                                        <td className="text-center py-2 px-4">{logalto.disabilityType}</td>
                                        <td className="text-center py-2 px-4">{logalto.fatherMotherName}</td>
                                        <td className="text-center py-2 px-4">{logalto.education}</td>
                                        <td className="text-center py-2 px-4">{logalto.isMarried}</td>
                                        <td className="text-center py-2 px-4">{logalto.religion}</td>
                                        <td className="text-center py-2 px-4">{logalto.phone}</td>
                                        <td className="text-center py-2 px-4">{logalto.mobile}</td>
                                        <td className="text-center py-2 px-4">{logalto.village}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={logalto.id} data={logaltos} />
                                            <Delete message={messageHandler} id={logalto.id} data={logaltos} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={14} className="text-center py-10 px-4">
                                        Data not available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

};

export default Logalto;


