"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/honda/Add";
import Edit from "@/components/honda/Edit";
import Delete from "@/components/honda/Delete";
import { fetchDataFromAPI, localStorageSetItem } from "@/lib/utils";
import { useRouter } from "next/navigation";


const Honda = () => {
    const [hondas, setHondas] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setWaitMsg('Please Wait...');
            try {

                const data = await fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/honda`);
                const sortData = data.sort((a, b) => (a.unitId.nmEn).toUpperCase() < (b.unitId.nmEn).toUpperCase() ? -1 : 1)
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


    const goToDetail = (id) => {
        localStorageSetItem('hondaId', id);
        router.push('hondahistory')
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
                                <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Regno</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Regdt</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Chassis No</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Engine No</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Condition</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Project</th>
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
                                        <td className="text-center py-2 px-4">{i + 1}</td>
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

                                            <button title="Detail" onClick={() => goToDetail(honda._id)} className="w-7 h-7 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full p-[1px] stroke-black">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </button>
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


