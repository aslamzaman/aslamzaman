"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/mobile/Add";
import Edit from "@/components/mobile/Edit";    
import Delete from "@/components/mobile/Delete";
import Image from "next/image";
import mobileImage from "@/public/images/mobile/Mobile_Sim_BTRC.jpg";
import { fetchDataFromAPI } from "@/lib/utils";


const Mobile = () => {
    const [mobiles, setMobiles] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await fetchDataFromAPI("mobile");
                console.log(data);
                setMobiles(data);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Mobile</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>  
                <div className="p-2 overflow-auto">  
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">                           
                                  <th className="text-start border-b border-gray-200 px-4 py-2">Registereduser</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Presentuser</th>
                                  <th className="text-center border-b border-gray-200 px-4 py-2">Mobileno</th>                                
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mobiles.length ?(
                                mobiles.map((mobile,i) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={mobile._id}>                                           
                                          <td className="text-start py-2 px-4">{i+1}. {mobile.registeredUser}</td>
                                          <td className="text-center py-2 px-4">{mobile.presentUser}</td>
                                          <td className="text-center py-2 px-4">{mobile.mobileNo}</td>                                            
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={mobile._id} data={mobile} />
                                            <Delete message={messageHandler} id={mobile._id} data={mobile} />
                                        </td>
                                    </tr>
                                ))
                            ): (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 px-4">
                                        Data not available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                </div>
                <div>
                    <Image className="w-full md:w-1/2 h-auto mx-auto mt-10" src={mobileImage} alt="Mobile SIM" width={1491} height={2157} priority={true} />
                </div>
            </div>
        </>
    );

};

export default Mobile;


