
"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/hondahistory/Add";
import Edit from "@/components/hondahistory/Edit";
import Delete from "@/components/hondahistory/Delete";
import { fetchDataFromAPI, formatedDateSlash, localStorageGetItem } from "@/lib/utils";
import { useRouter } from "next/navigation";




const Hondahistory = () => {
    const [hondahistorys, setHondahistorys] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Data ready");
    const router = useRouter();



    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const hondaId = localStorageGetItem('hondaId');

                const data = await fetchDataFromAPI("hondahistory");
                const findData = data.filter(honda => honda.hondaId._id === hondaId);
                console.log(findData)
                setHondahistorys(findData);
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


    const closeHandler = () => {
        router.push('honda');
    }




    return (
        <>
            <div className="w-full lg:w-3/4 mx-auto my-10 px-4 pb-10 border border-gray-300 shadow-lg rounded-lg">
                <div className="w-full mb-3 mt-8">
                    <div className="flex justify-between items-center">
                        <h1 className="w-full text-xl lg:text-3xl font-bold text-start text-blue-700">Honda History</h1>
                        <button onClick={closeHandler} className="w-12 h-12  p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full p-4 mx-auto">
                    <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                    <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
                    <div className="overflow-auto">
                        <table className="w-full border border-gray-200">
                            <thead>
                                <tr className="w-full bg-gray-200">
                                    <th className="text-center border border-gray-600">Date</th>
                                    <th className="text-center border border-gray-600">Staff</th>
                                    <th className="text-center border border-gray-600">Page No</th>
                                    <th className="text-center border border-gray-600">Remarks</th>
                                    <th className="w-[95px] font-normal border border-gray-600">
                                        <div className="w-[90px] h-[45px] flex justify-end space-x-2 p-1">
                                            <Add message={messageHandler} />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {hondahistorys.length ? (
                                    hondahistorys.map(hondahistory => (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={hondahistory._id}>
                                            <td className="text-center border border-gray-600">{formatedDateSlash(hondahistory.dt)}</td>
                                            <td className="text-center border border-gray-600">{hondahistory.staffId.nmEn}-{hondahistory.staffId.empId}</td>
                                            <td className="text-center border border-gray-600">{hondahistory.pageNo}</td>
                                            <td className="text-center border border-gray-600">{hondahistory.remarks}</td>
                                            <td className="text-center border border-gray-600">
                                                <div className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                                    <Edit message={messageHandler} id={hondahistory._id} data={hondahistory} />
                                                    <Delete message={messageHandler} id={hondahistory._id} data={hondahistory} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 px-4">
                                            Data not available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Hondahistory;

