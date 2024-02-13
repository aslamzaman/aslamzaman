"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/doc/Add";
import Edit from "@/components/doc/Edit";
import Delete from "@/components/doc/Delete";
import { fetchAll } from "@/lib/DexieDatabase";


const Doc = () => {
    const [docs, setDocs] = useState([]);
    const [msg, setMsg] = useState("Data ready");

    const fetchData = async (callback) => {
        try {
            const [docResponse, doc_catResponse] = await Promise.all([
                fetchAll("doc"),
                fetchAll("doc_cat")
            ]);

            callback({
                doc: docResponse.data,
                doc_cat: doc_catResponse.data
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    useEffect(() => {
        const getData = async () => {
            try {
                await fetchData(data => {
                    const docData = data.doc;
                    const doc_catData = data.doc_cat;
                    const joinData = docData.map(doc => {
                        const matchDoc_cat = doc_catData.find(cat => parseInt(cat.id) === parseInt(doc.doc_cat_id));
                        return {
                            ...doc,
                            doc_cat: matchDoc_cat ? matchDoc_cat.title : 'Error!'
                        }
                    })
                    const result = joinData.sort((a, b) => (b.doc_cat).toUpperCase() > (a.doc_cat).toUpperCase() ? -1 : 1);
                    setDocs(result);
                   
                    //  setDocs(data.doc);
                    //  setDoc_cats(data.doc_cat);
                   
                });
            } catch (error) {
                console.log(error);
            };
        };
        getData();


        const load = async () => {
            try {
                const response = await fetchAll("doc");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                setDocs(result);
            } catch (error) {
                console.log(error);
            }
        };
        //load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full my-6 lg:my-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Doc</h1>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Doc_cat_id</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Dt</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Picurl</th>
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            docs.length ? docs.map(doc => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={doc.id}>
                                        <td className="text-center py-2 px-4">{doc.doc_cat}</td>
                                        <td className="text-center py-2 px-4">{doc.dt}</td>
                                        <td className="text-center py-2 px-4">{doc.unit}</td>
                                        <td className="text-center py-2 px-4">{`doc.picurl`}</td>
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


