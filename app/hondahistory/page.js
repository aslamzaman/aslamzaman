"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/hondahistory/Add";
import Edit from "@/components/hondahistory/Edit";
import Delete from "@/components/hondahistory/Delete";
// import Print from "@/components/hondahistory/Print";
import { fetchDataFromAPI, formatedDate, sessionStorageGetItem } from "@/lib/utils";


const Hondahistory = () => {
    const [hondahistorys, setHondahistorys] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const sessionStorageHondaId = sessionStorageGetItem('hondaId');

                const data = await fetchDataFromAPI("hondahistory");

                const result = data.filter(honda => honda.hondaId._id === sessionStorageHondaId);
                console.log(sessionStorageHondaId, data, result)
                setHondahistorys(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Hondahistory</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>
            <div className="px-4 lg:px-6">
                <div className="p-4 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-1">Dt</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Name</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Mobile</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Post</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Unit</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Project</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Hondaid</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Regcertificate</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Helmet</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Taxcertificate</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Insurance</th>
                                <th className="text-center border-b border-gray-200 px-4 py-1">Remarks</th>
                                <th className="w-[95px] border-b border-gray-200 px-4 py-2">
                                    <div className="w-[90px] h-[45px] flex justify-end space-x-2 p-1 font-normal">
                                        {/* <Print data={hondahistorys} /> */}
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {hondahistorys.length ? (
                                hondahistorys.map(hondahistory => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={hondahistory._id}>
                                        <td className="text-center py-1 px-4">{formatedDate(hondahistory.dt)}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.name}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.mobile}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.post}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.unit}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.project}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.hondaId.regNo}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.regCertificate}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.helmet}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.taxCertificate}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.insurance}</td>
                                        <td className="text-center py-1 px-4">{hondahistory.remarks}</td>
                                        <td className="text-center py-2">
                                            <div className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                                <Edit message={messageHandler} id={hondahistory._id} data={hondahistory} />
                                                <Delete message={messageHandler} id={hondahistory._id} data={hondahistory} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={13} className="text-center py-10 px-4">
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

