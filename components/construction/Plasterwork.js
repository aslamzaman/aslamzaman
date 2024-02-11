import React, { useState, useEffect } from "react";
import { Close } from "@/components/Icons";
import { BtnSubmit, TextEn, DropdownEn } from "../Form";
import { fetchOne } from "@/lib/DexieDatabase";


const Plasterwork = () => {
    const [show, setShow] = useState(false);

    // form
    const [w, setW] = useState("100");
    const [cft, setCft] = useState('1');
    const [r1, setR1] = useState('1');
    const [r2, setR2] = useState('4');
    const [depth, setDepth] = useState(1);
    const [depthString, setDepthString] = useState("inch");


    // price
    const [cementPrice, setCementPrice] = useState(0);
    const [sandPrice, setSandPrice] = useState(0);
    const [sandRate, setSandRate] = useState(0);


    // quantity
    const [cementQt, setCementQt] = useState("0");
    const [sandQt, setSandQt] = useState("0");
    const [totalTaka, setTotalTaka] = useState(0);


    useEffect(() => {
        const load = async () => {
            try {
                const [c, s] = await Promise.all([
                    fetchOne("price", 1698059708238),
                    fetchOne("price", 1698059717559)
                ]);
                setCementPrice(c === undefined ? 0 : c.data.rate);
                setSandPrice(s === undefined ? 0 : s.data.rate);
            } catch (error) {
                console.error("Error loading prices:", error);
            }
        };
        load();
    }, [])


    const resultHandler = (e) => {
        e.preventDefault();

        let x = eval(w);
        let cement = 0;
        let sand = 0;
        let st = "";
        let sandR = 0;


        let newW = 0;
        
        let r = parseFloat(r1) + parseFloat(r2);

        if (cft === "1") {
            newW = parseFloat(x) * (depth / 12) * 1.5;
            cement = ((newW / r) * parseFloat(r1)) / 1.25;
            sand = (newW / r) * parseFloat(r2);
            sandR = parseFloat(sandPrice);
            st = "inch";
        }
        else {
            newW = parseFloat(x) * (depth / 1000) * 1.5;
            cement = ((newW / r) * parseFloat(r1) * 35.3147) / 1.25;
            sand = (newW / r) * parseFloat(r2);
            sandR = parseFloat(sandPrice) * 35.3147;
            st = "mm";
        }

        setCementQt(cement.toFixed(2));
        setSandQt(sand.toFixed(2));
        setSandRate(sandR.toFixed(2));
        setDepthString(st);


        const total = (parseFloat(cement) * parseFloat(cementPrice)) + (parseFloat(sand) * parseFloat(sandR));
        setTotalTaka(total);
    }


    const showForm = () => {
        setShow(true);
        setCementQt("0");
        setSandQt("0");
        setDepthString("inch");
        setDepth("1");
        setCft("1");
        setTotalTaka(0);

    }

    const optChangeHandle = (e) => {
        const val = e.target.value;
        setCft(val);
        if (val === "1") {
            setDepthString("inch");
            setDepth("1");
        } else {
            setDepthString("mm");
            setDepth("25.4");
        }
    }



    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">

                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">

                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Plaster Works</h1>
                            <Close Click={() => setShow(false)} Size="w-8 h-8" />
                        </div>

                        <div className="w-full p-4 flex flex-col">
                            <form onSubmit={resultHandler}>
                                <div className="w-full grid grid-cols-1 gap-y-2">

                                    <div className="w-full grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <TextEn Title="Total Works" Id="w" Change={(e) => { setW(e.target.value) }} Value={w} Chr="50" />
                                        </div>
                                        <DropdownEn Title="Option" Id="cft" Change={optChangeHandle} Value={cft}>
                                            <option value="0">M2</option>
                                            <option value="1">SFT</option>
                                        </DropdownEn>
                                    </div>

                                    <div className="w-full grid grid-cols-3 gap-4 pb-4">
                                        <TextEn Title="Ratio-1" Id="r1" Change={(e) => { setR1(e.target.value) }} Value={r1} Chr="10" />
                                        <TextEn Title="Ratio-2" Id="r2" Change={(e) => { setR2(e.target.value) }} Value={r2} Chr="10" />
                                        <TextEn Title={`Depth (${depthString})`} Id="depth" Change={(e) => { setDepth(e.target.value) }} Value={depth} Chr="10" />
                                    </div>

                                </div>
                                <BtnSubmit Title="Calculate" Class="bg-blue-700 hover:bg-blue-900 text-white w-32" />
                            </form>

                            <div className="w-full p-4 my-2 bg-yellow-50 border rounded-md overflow-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2">
                                            <th>Sl</th>
                                            <th className="text-start">Item</th>
                                            <th className="text-end">Quantity</th>
                                            <th className="text-end">Unit</th>
                                            <th className="text-end">Rate</th>
                                            <th className="text-end">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td className="text-center">1</td>
                                            <td>Cement</td>
                                            <td className="text-end">{cementQt}</td>
                                            <td className="text-end">bgs</td>
                                            <td className="text-end">{parseFloat(cementPrice).toFixed(2)}</td>
                                            <td className="text-end">{(parseFloat(cementQt) * parseFloat(cementPrice)).toFixed(2)}</td>
                                        </tr>

                                        <tr>
                                            <td className="text-center">2</td>
                                            <td>Sand</td>
                                            <td className="text-end">{sandQt}</td>
                                            <td className="text-end">{cft === '1' ? 'cft' : 'm3'}</td>
                                            <td className="text-end">{parseFloat(sandRate).toFixed(2)}</td>
                                            <td className="text-end">{(parseFloat(sandQt) * parseFloat(sandRate)).toFixed(2)}</td>
                                        </tr>

                                        <tr className="font-bold border-t-2">
                                            <td></td>
                                            <td>Total</td>
                                            <td className="text-end"></td>
                                            <td className="text-end"></td>
                                            <td className="text-end"></td>
                                            <td className="text-end">{parseFloat(totalTaka).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div >
                </div>
            )}

            <button onClick={showForm} className="px-4 py-2 bg-gray-200 hover:bg-gray-100">Plaster Work</button>
        </>
    );
};

export default Plasterwork;
