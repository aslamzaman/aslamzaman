import React, { useState, useEffect } from "react";
import { Close } from "@/components/Icons";
import { BtnSubmit, TextEn, DropdownEn } from "../Form";
import { fetchOne } from "@/lib/DexieDatabase";


const Brickflatsolling = () => {
    const [show, setShow] = useState(false);

    // form
    const [w, setW] = useState("100");
    const [sft, setSft] = useState('1');

    // price
    const [brickPrice, setBrickPrice] = useState(0);
    const [sandPrice, setSandPrice] = useState(0);
    const [sandRate, setSandRate] = useState(0);

    // quantity
    const [brickQt, setBrickQt] = useState("0");
    const [sandQt, setSandQt] = useState("0");
    const [totalTaka, setTotalTaka] = useState(0);


    useEffect(() => {
        const load = async () => {
            try {
                const [b, s] = await Promise.all([
                    fetchOne("price", 1698059596125),
                    fetchOne("price", 1698059717559)
                ]);
                setBrickPrice(b === undefined ? 0 : b.data.rate);
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
        let brick = 0;
        let sand = 0;
        let sandRate = 0;



        if (sft === "1") {
            brick = parseFloat(x) * 3;
            sand = parseFloat(x) * 0.05;
            sandRate = parseFloat(sandPrice);
        }
        else {
            brick = parseFloat(x) * 3 * 10.76;
            sand = (parseFloat(x) * 0.05 * 10.76) / 35.31;
            sandRate = parseFloat(sandPrice) * 35.31;
        }


        setBrickQt(brick.toFixed(2));
        setSandQt(sand.toFixed(2));
        setSandRate(sandRate);

        const total = (parseFloat(brick) * parseFloat(brickPrice)) + (parseFloat(sand) * parseFloat(sandRate));
        setTotalTaka(total);
    }


    const showForm = () => {
        setShow(true);
        setBrickQt("0");
        setSandQt("0");
        setTotalTaka("0");
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">

                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">

                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Brick Flat Solling</h1>
                            <Close Click={() => setShow(false)} Size="w-8 h-8" />
                        </div>

                        <div className="w-full p-4 flex flex-col">
                            <form onSubmit={resultHandler}>
                                <div className="w-full grid grid-cols-1 gap-y-2">

                                    <div className="w-full grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <TextEn Title="Total Works" Id="w" Change={(e) => { setW(e.target.value) }} Value={w} Chr="50" />
                                        </div>
                                        <DropdownEn Title="Option" Id="cft" Change={(e) => { setSft(e.target.value) }} Value={sft}>
                                            <option value="0">M2</option>
                                            <option value="1">SFT</option>
                                        </DropdownEn>
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
                                            <td>Brick</td>
                                            <td className="text-end">{brickQt}</td>
                                            <td className="text-end">nos</td>
                                            <td className="text-end">{parseFloat(brickPrice).toFixed(2)}</td>
                                            <td className="text-end">{(parseFloat(brickQt) * parseFloat(brickPrice)).toFixed(2)}</td>
                                        </tr>

                                        <tr>
                                            <td className="text-center">3</td>
                                            <td>Sand</td>
                                            <td className="text-end">{sandQt}</td>
                                            <td className="text-end">{sft === '1' ? 'cft' : 'm3'}</td>
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

            <button onClick={showForm} className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-100">Brick Flat Solling</button>
        </>
    );
};

export default Brickflatsolling;
