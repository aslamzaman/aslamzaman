
"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/gender/Add";
import Edit from "@/components/gender/Edit";
import Delete from "@/components/gender/Delete";
import { fetchDataFromAPI } from "@/lib/utils";


const Gender = () => {
    const [genders, setGenders] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gender`);
                setGenders(data);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Gender</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>
            <div className="w-full lg:w-3/4 p-4 mx-auto border-2 shadow-md rounded-md">
                <div className="overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {genders.length ? (
                                genders.map(gender => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={gender._id}>    
                                        <td className="text-center py-2 px-4">{gender.name}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={gender._id} data={genders} />
                                            <Delete message={messageHandler} id={gender._id} data={genders} />
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

export default Gender;

