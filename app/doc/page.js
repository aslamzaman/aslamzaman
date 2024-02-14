"use client";
import React, { useState, useEffect } from "react";
import View from "@/components/doc/View";    
import {fetchAll} from "@/lib/DexieDatabase";


const Doc_cat = () => {
    const [doc_cats, setDoc_cats] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetchAll("doc_cat"); 
                const data = response.data;                    
                const result = data.sort((a, b) => (b.name).toUpperCase() > (a.name).toUpperCase() ? -1 : 1);
                setDoc_cats(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Documents Picture</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                           
                            <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>                                
                            <th className="text-left border-b border-gray-200 px-4 py-2">Name</th>                                
                            <th className="w-[100px] font-normal">
                                <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                    {/* <Add message={messageHandler} /> */}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doc_cats.length ? doc_cats.map((doc_cat,i) => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={doc_cat.id}>                                           
                                        <td className="text-center py-2 px-4">{i+1}.</td>                                            
                                        <td className="text-left py-2 px-4">{doc_cat.name}</td>                                            
                                        <td className="flex justify-end items-center mt-1">
                                            <View message={messageHandler} id={doc_cat.id} />
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

export default Doc_cat;


