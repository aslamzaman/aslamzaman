"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/ta/Add";
import Edit from "@/components/ta/Edit";
import Delete from "@/components/ta/Delete";
import { fetchAll } from "@/lib/DexieDatabase";


const Ta = () => {
    const [tas, setTas] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const [response, unit] = await Promise.all([
                    fetchAll("ta"),
                    fetchAll("unit")
                ]);
                const data = response.data;
                const unitData = unit.data;

                const joinTa = data.map(t => {
                    const matchUnit = unitData.find(unit => parseInt(unit.id) === parseInt(t.unit_id));
                    return {
                        ...t,
                        unit: matchUnit ? matchUnit.nm_en : "Errot!"
                    }
                })

                const result = joinTa.sort((a, b) => parseInt(b.tk) - parseInt(a.tk));
                setTas(result);
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
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">TA Bill</h1>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tas.length ? tas.map(ta => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={ta.id}>
                                        <td className="text-center py-2 px-4">{ta.unit}</td>
                                        <td className="text-center py-2 px-4">{ta.tk}</td>
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={ta.id} />
                                            <Delete message={messageHandler} id={ta.id} />
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

export default Ta;


