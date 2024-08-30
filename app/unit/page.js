"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/unit/Add";
import Edit from "@/components/unit/Edit";
import Delete from "@/components/unit/Delete";
import Print from "@/components/unit/Print";
import { fetchDataFromAPI } from "@/lib/utils";
import { Tiro_Bangla } from 'next/font/google';
const tiro = Tiro_Bangla({ subsets: ['bengali'], weight: "400" });



const Unit = () => {
    const [units, setUnits] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unit`);
                console.log(data)
                setUnits(data);
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

   


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Unit</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>
            <div className="w-full lg:w-3/4 p-4 mx-auto border-2 shadow-md rounded-md">
                <div className="overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                                <th className="pl-4 text-start border-b border-gray-200 px-4 py-2">Name English</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Name SutonnyMJ</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Name Unicode</th>
                                <th className="w-[95px] font-normal">
                                    <div className="w-[90px] h-[45px] flex justify-end space-x-2 p-1">
                                        <Print data={units} />
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {units.length ? (
                                units.map((unit,i) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={unit._id}>
                                        <td className="text-center py-2 px-4">{i+1}</td>
                                        <td className="pl-4 text-start py-2 px-4">{unit.nmEn}</td>
                                        <td className="text-center py-2 px-4 font-sutonnyN ">{unit.nmBn}</td>
                                        <td className={`text-center py-2 px-4 ${tiro.className}`}>{unit.nmUn}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={unit._id} data={units} />
                                            <Delete message={messageHandler} id={unit._id} data={units} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 px-4">
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

export default Unit;

