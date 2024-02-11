"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/unit/Add";
import Edit from "@/components/unit/Edit";    
import Delete from "@/components/unit/Delete";
import {fetchAll} from "@/lib/DexieDatabase";


const Unit = () => {
    const [units, setUnits] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetchAll("unit"); 
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setUnits(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Unit</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                             
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name (English)</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name (Bangla)</th>                                
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            units.length ? units.map(unit => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={unit.id}>                                           
                                        <td className="text-center py-2 px-4">{unit.nm_en}</td>
                                        <td className="text-center py-2 px-4">{unit.nm_bn}</td>                                            
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={unit.id} />
                                            <Delete message={messageHandler} id={unit.id} />
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

export default Unit;


