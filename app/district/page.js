"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/district/Add";
import Edit from "@/components/district/Edit";
import Delete from "@/components/district/Delete";
import { fetchDataFromAPI } from "@/lib/utils";

const District = () => {
    const [districts, setDistricts] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/district`);
                console.log(data);
                setDistricts(data);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">District</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                
                <div className="p-2 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-start border-b border-gray-200 px-4 py-2">Name English</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Name Bangla</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {districts.length ? (
                                districts.map(district => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={district._id}>
                                        <td className="text-start py-2 px-4">{district.nmEn}</td>
                                        <td className="text-center py-2 px-4">{district.nmBn}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={district._id} data={districts} />
                                            <Delete message={messageHandler} id={district._id} data={districts} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-10 px-4">
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

export default District;


