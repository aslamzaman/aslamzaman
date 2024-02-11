"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/doc/Add";
import Edit from "@/components/doc/Edit";
import Delete from "@/components/doc/Delete";
import Picture from "@/components/doc/Picture";
import { fetchAll } from "@/lib/DexieDatabase";



const Doc = () => {
    const [docs, setDocs] = useState([]);
    const [msg, setMsg] = useState("Data ready");



    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetchAll("doc");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                console.log(result)
                setDocs(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Doc</h1>
            </div>

            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Picurl</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Cat_id</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Dt</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">url</th>
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            docs.length ? docs.map((doc, i) => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={doc.id}>

                                        <td className="text-center py-2 px-4">
                                        <Picture message={messageHandler} id={doc.id}>
                                                <img src={`/images/doc/${doc.id}.jpg`} alt="Picture" />
                                            </Picture>   
                                        </td>
                                        <td className="text-center py-2 px-4">{i}. {doc.cat_id}</td>
                                        <td className="text-center py-2 px-4">{doc.dt}</td>
                                        <td className="text-center py-2 px-4">{doc.unit}</td>
                                        <td className="text-center py-2 px-4">{doc.picurl}</td>

                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={doc.id} />
                                            <Delete message={messageHandler} id={doc.id} />
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

export default Doc;


