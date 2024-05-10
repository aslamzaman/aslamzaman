"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/hondahistory/Add";
import Edit from "@/components/hondahistory/Edit";
import Delete from "@/components/hondahistory/Delete";
import { dateDot } from "@/lib/DateDot";


const Hondahistory = () => {
    const [hondahistorys, setHondahistorys] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hondahistory`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                const sortData = data.sort((a, b) => new Date(a.dt) < new Date(b.dt)? -1 : 1);
                console.log(sortData);
                setHondahistorys(sortData);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Honda History</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <div className="p-2 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Staff</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Honda</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Location</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Remarks</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Picurl</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Page No</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {hondahistorys.length ? (
                                hondahistorys.map((hondahistory,i) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={hondahistory._id}>
                                        <td className="text-center py-2 px-4">{i+1}. {dateDot(hondahistory.dt,true)}</td>
                                        <td className="text-center py-2 px-4">{hondahistory.staffId?hondahistory.staffId.nmEn:'null'}-{hondahistory.postId?hondahistory.postId.nmEn:'error'} ({hondahistory.projectId.name})</td>
                                        <td className="text-center py-2 px-4">{hondahistory.hondaId.regNo}</td>
                                        <td className="text-center py-2 px-4">{hondahistory.location}</td>
                                        <td className="text-center py-2 px-4">{hondahistory.remarks}</td>
                                        <td className="text-center py-2 px-4">{/*hondahistory.picUrl*/}</td>
                                        <td className="text-center py-2 px-4">{hondahistory.pageNo}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={hondahistory._id} data={hondahistorys} />
                                            <Delete message={messageHandler} id={hondahistory._id} data={hondahistorys} />
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

export default Hondahistory;


