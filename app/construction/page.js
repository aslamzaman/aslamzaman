"use client";
import React from "react";
import Link from "next/link";
import BrickFlatSolling from "@/components/construction/Brickflatsolling";
import Brickwork from "@/components/construction/Brickwork";
import Ccwork from "@/components/construction/Ccwork";
import Rccwork from "@/components/construction/Rccwork";
import Plasterwork from "@/components/construction/Plasterwork";
import Property from "@/components/construction/Property";

const Construction = () => {


    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Construction</h1>
            </div>
            <div className="w-[calc(100%-20px)] md:w-[600px] mx-auto p-4 md:p-6 lg:px-6 border rounded-md shadow-md">
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-1">
                    <BrickFlatSolling />
                    <Brickwork />
                    <Ccwork />
                    <Rccwork />
                    <Plasterwork />
                    <Property />                    
                </div>
            </div>
        </>
    );

};

export default Construction;


