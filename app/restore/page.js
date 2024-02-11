"use client";
import React, { useState } from 'react'
import { BtnEn } from "../../components/Form";
import { recover } from "@/lib/DexieDatabase";


const Restore = () => {
    const [datas, setDatas] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log("Please select a file");
            return;
        }

        try {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const result = JSON.parse(reader.result);
                setDatas(result);
            };
        } catch (error) {
            console.error("Error parsing file:", error);
        }
    };


    const recoverHandler = async () => {
        if (datas.length < 1) {
            setMsg("Invalid input parameter: Please select a file.");
            return false
        }
        try {
            await recover(datas);
            setMsg("Database recover successfully completed.")
        } catch (error) {
            console.error('Error occurred during database recovery:', error)
        }
    }





    return (
        <div className='w-full'>

            <div className='w-[500px] mx-auto mt-16 border-2 shadow-lg'>
                <div className='w-full py-2 border-b-2'>
                    <h1 className='text-xl font-bold text-center'>Database Restore</h1>
                </div>
                <div className='p-4'>
                    <p className="w-full text-sm text-red-700">{msg}</p>
                    <input type="file" onChange={fileChangeHandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" accept="application/json" />
                    <BtnEn Click={recoverHandler} Title="Restore" Class="bg-indigo-500 hover:bg-indigo-800 text-white mb-6" />
                </div>
            </div>
        </div>
    )

}

export default Restore;
