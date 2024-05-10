"use client";
import React, { useState } from "react";
import { TextEn, BtnEn } from "@/components/Form";



const Unique = () => {
    const [uniq, setUniq] = useState("");
    const [uniq2, setUniq2] = useState("");


    const uniqHandler = () => {
        setUniq(Date.now());
        setUniq2(new Date().toISOString());
    }


    return (
        <>
            <div className="w-full lg:w-1/2 mx-auto p-4 mt-10 border-2 border-gray-300 rounded-md shadow-md">
                <div className="w-full mt-4">
                    <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-gray-500">Unique</h1>
                </div>

                <div className="w-full overflow-auto">
                    <div className="mt-6 px-2">
                        <div className="grid grid-cols-1 gap-y-4">
                            <TextEn Title="Result" Id="uniq" Change={e => setUniq(e.target.value)} Value={uniq} Chr="100" />
                            <TextEn Title="Result2" Id="uniq2" Change={e => setUniq2(e.target.value)} Value={uniq2} Chr="100" />
                            <BtnEn Title="Unique static" Click={uniqHandler} Class="w-36 bg-gray-600 hover:bg-gray-800 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};
export default Unique;
