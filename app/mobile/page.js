"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/mobile/Add";
 // import Edit from "@/components/mobile/Edit";    
// import Delete from "@/components/mobile/Delete";
import {fetchAll} from "@/lib/DexieDatabase";


const Mobile = () => {
    const [mobiles, setMobiles] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetchAll("mobile"); 
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setMobiles(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Mobile</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                             
                            <th className="text-start border-b border-gray-200 px-4 py-2">Sl</th>
                            <th className="text-start border-b border-gray-200 px-4 py-2">Name</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Mobile</th>                                
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mobiles.length ? mobiles.map((mobile, i) => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={mobile.id}>                                           
                                        <td className="text-start py-2 px-4">{i+1}</td>
                                        <td className="text-start py-2 px-4">{mobile.name}</td>
                                        <td className="text-center py-2 px-4">{mobile.mobile}</td>                                            
                                        <td className="flex justify-end items-center mt-1">
                                           {/* <Edit message={messageHandler} id={mobile.id} />
                                             <Delete message={messageHandler} id={mobile.id} /> */}
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

export default Mobile;


