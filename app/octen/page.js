"use client"
import React, { useState } from "react";
import { TextNum, DropdownEn, BtnSubmit } from "@/components/Form";



const Octen = () => {
    const [preBalance, setPreBalance] = useState(156);
    const [octenUse, setOctenUse] = useState(20);
    const [currenMeter, setCurrenMeter] = useState(197);
    const [preMeter, setPreMeter] = useState(95);
    const [opt, setOpt] = useState("microbus");
    const [result, setResult] = useState("Result");
    const [resultColor, setResultColor] = useState({ color: "blue" });



    const calculateHandler = (e) => {
        e.preventDefault();
        let km = 0;
        if (opt === 'microbus') {
            km = 4.5;
        }
        else {
            km = 4.3;
        }

        let ret = preBalance + (octenUse * km) - (currenMeter - preMeter);


        if (currenMeter < preMeter) {
            setResultColor({ color: "red" });
            setResult("Current meter is smaller !");
        }
        else if (ret < 0) {
            setResultColor({ color: "red" });
            setResult("Result is smaller then zero!  [" + ret.toFixed(2) + "]");
        }
        else {
            setResultColor({ color: "blue" });
            setResult(ret.toFixed(2));
        }


    }



    return (
        <div className="w-full p-2 sm:p-6">


            <div className="w-full sm:w-3/4 md:w-7/12 lg:w-1/2 mx-auto mt-12 bg-white border rounded-lg shadow-lg">
                <div className="px-4 lg:px-6 border-b"><h1 className="py-2 text-center text-2xl font-bold text-gray-400">Octen Use Calculator</h1></div>

                <h3 className="py-1 text-lg text-center font-semibold" style={resultColor}>{result}</h3>

                <form onSubmit={calculateHandler}>
                    <div className="p-4 lg:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="w-full col-span-1 md:col-span-2">
                            <DropdownEn Title="Vehicle" Id="opt" Change={(e) => { setOpt(e.target.value) }} Value={opt}>
                                <option value="microbus">Microbus</option>
                                <option value="pajero">Pajero Jeep</option>
                            </DropdownEn>
                        </div>

                        <TextNum Title="Previous Balance (KM):" Id="preBalance" Change={(e) => { setPreBalance(e.target.value) }} Value={preBalance} />
                        <TextNum Title="Octen Used:" Id="octenUse" Change={(e) => { setOctenUse(e.target.value) }} Value={octenUse} />



                        <TextNum Title="Current Meter Reading:" Id="currenMeter" Change={(e) => { setCurrenMeter(e.target.value) }} Value={currenMeter} />
                        <TextNum Title="Previous Meter Reading:" Id="preMeter" Change={(e) => { setPreMeter(e.target.value) }} Value={preMeter} />
                        <div>
                            <BtnSubmit Title="Calculate" Class="bg-indigo-800 hover:bg-indigo-900 text-white" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Octen;