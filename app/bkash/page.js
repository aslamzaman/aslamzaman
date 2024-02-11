"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/bkash/Add";
import Edit from "@/components/bkash/Edit";
import Delete from "@/components/bkash/Delete";
import Print from "@/components/bkash/Print";
import { getItems } from "@/lib/LocalDatabase";


const Bkash = () => {
    const [bkashs, setBkashs] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = () => {
            try {
                const response = getItems("bkash");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? -1 : 1);
                setBkashs(result);
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }

    

    return (
        <>
            <div className="w-full my-6 lg:my-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bkash</h1>
            </div>
            <div className="px-4 lg:px-6">
                <div className="w-full px-4 flex justify-between items-center">
                    <p className="w-full text-sm text-red-700">{msg}</p>
                    <Print message={messageHandler} />
                </div>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bkashs.length ? bkashs.map(bkash => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={bkash.id}>
                                        <td className="text-center py-2 px-4 font-sutonny-n">{bkash.unit}</td>
                                        <td className="text-center py-2 px-4">{bkash.taka}</td>
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={bkash.id} />
                                            <Delete message={messageHandler} id={bkash.id} />
                                        </td>
                                    </tr>
                                )
                            })
                                : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default Bkash;


