"use client";
import React, { useState, useEffect } from "react";
import { TextNum, BtnSubmit, DropdownEn } from "@/components/Form";


const Octen = () => {
    const [preBalance, setPreBalance] = useState(156);
    const [octenUse, setOctenUse] = useState(20);
    const [currenMeter, setCurrenMeter] = useState(197);
    const [preMeter, setPreMeter] = useState(95);
    const [opt, setOpt] = useState("microbus");
    const [result, setResult] = useState("");
    const [resultColor, setResultColor] = useState({ color: "blue" });


    useEffect(() => {
        setResult("Result");
    }, [])

    const calculateHandler = (e) => {
        e.preventDefault();
        let km = 0;
        if (opt === 'microbus') {
            km = 4.5;
        }
        else {
            km = 4.3;
        }

        let ret = (parseFloat(preBalance) + (parseFloat(octenUse) * km)) - (parseFloat(currenMeter) - parseFloat(preMeter));


        if (parseFloat(currenMeter) < parseFloat(preMeter)) {
            setResultColor("text-red-400" );
            setResult("Current meter is smaller !");
        }
        else if (parseFloat(ret) < 0) {
            setResultColor("text-red-400");
            setResult("Result is smaller !  [" + ret.toFixed(2) + "]");
        }
        else {
            setResultColor("text-blue-400");
            setResult(ret.toFixed(2));
        }


    }

    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Octen</h1>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="w-full p-4">
                        <p className={`w-full text-center text-xl text-red-700 ${resultColor}`}>{result}</p>
                        <form onSubmit={calculateHandler}>
                            <div className="grid grid-cols-2 gap-4 my-2">
                                <div className="col-span-2">
                                <DropdownEn Title="Vehicle" Id="opt" Change={(e) => { setOpt(e.target.value) }} Value={opt}>
                                    <option value="microbus">Microbus</option>
                                    <option value="pajero">Pajero Jeep</option>
                                </DropdownEn>
                                </div>
                                <TextNum Title="Previous Balance (KM):" Id="preBalance" Change={e => setPreBalance(e.target.value)} Value={preBalance} />
                                <TextNum Title="Octen Used:" Id="octenUse" Change={e => setOctenUse(e.target.value)} Value={octenUse} />
                                <TextNum Title="Current Meter Reading:" Id="currenMeter" Change={(e) => { setCurrenMeter(e.target.value) }} Value={currenMeter} />
                                <TextNum Title="Previous Meter Reading:" Id="preMeter" Change={e => setPreMeter(e.target.value)} Value={preMeter} />
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Create Pdf" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
};
export default Octen;

