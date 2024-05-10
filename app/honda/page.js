"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/honda/Add";
import Edit from "@/components/honda/Edit";
import Delete from "@/components/honda/Delete";



const Honda = () => {
    const [hondas, setHondas] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/honda`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                const sortData = data.sort((a,b) => (a.unitId.nmEn).toUpperCase() < (b.unitId.nmEn).toUpperCase()? -1:1)
                console.log(sortData);
                setHondas(sortData);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
                setMsg("Failed to fetch data");
            }
        };
        fetchData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Honda</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <div className="p-2 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Unitid</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Regno</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Regdt</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Chassisno</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Engineno</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Condition</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Projectid</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Remarks</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {hondas.length ? (
                                hondas.map((honda, i) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={honda._id}>
                                        <td className="text-center py-2 px-4">{i+1}</td>
                                        <td className="text-center py-2 px-4">{honda.unitId.nmEn}</td>
                                        <td className="text-center py-2 px-4">{honda.regNo}</td>
                                        <td className="text-center py-2 px-4">{honda.regDt}</td>
                                        <td className="text-center py-2 px-4">{honda.chassisNo}</td>
                                        <td className="text-center py-2 px-4">{honda.engineNo}</td>
                                        <td className="text-center py-2 px-4">{honda.condition}</td>
                                        <td className="text-center py-2 px-4">{honda.projectId.name}</td>
                                        <td className="text-center py-2 px-4">{honda.remarks}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={honda._id} data={hondas} />
                                            <Delete message={messageHandler} id={honda._id} data={hondas} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-10 px-4">
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

export default Honda;


