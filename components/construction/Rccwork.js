import React, { useState, useEffect } from "react";
import { Close } from "@/components/Icons";
import { BtnSubmit, TextEn, DropdownEn } from "../Form";
import { fetchOne } from "@/lib/DexieDatabase";


const Rccwork = () => {
    const [show, setShow] = useState(false);

    // form
    const [w, setW] = useState("100");
    const [cft, setCft] = useState('1');
    const [r1, setR1] = useState('1');
    const [r2, setR2] = useState('2');
    const [r3, setR3] = useState('4');
    const [rod, setRod] = useState('1.5');

    // price
    const [cementPrice, setCementPrice] = useState(0);
    const [sandPrice, setSandPrice] = useState(0);
    const [khoaPrice, setKhoaPrice] = useState(0);
    const [rodPrice, setRodPrice] = useState(0);
    const [khoaRate, setKhoaRate] = useState(0);
    const [sandRate, setSandRate] = useState(0);


    // quantity
    const [cementQt, setCementQt] = useState("0");
    const [khoaQt, setKhoaQt] = useState("0");
    const [sandQt, setSandQt] = useState("0");
    const [rodQt, setRodQt] = useState("0");
    const [totalTaka, setTotalTaka] = useState(0);


    useEffect(() => {
        const load = async () => {
            try {
                const [c, s, k, r] = await Promise.all([
                    fetchOne("price", 1698059708238),
                    fetchOne("price", 1698059717559),
                    fetchOne("price", 1698059725302),
                    fetchOne("price", 1698059734238)
                ]);
                setCementPrice(c === undefined ? 0 : c.data.rate);
                setSandPrice(s === undefined ? 0 : s.data.rate);
                setKhoaPrice(k === undefined ? 0 : k.data.rate);
                setRodPrice(r === undefined ? 0 : r.data.rate);

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
        let khoa = 0;
        let rd = 0;
        let khoaR = 0;
        let sandR = 0;


        let newW = parseFloat(x) * 1.5;
        let r = parseFloat(r1) + parseFloat(r2);

        if (cft === "1") {
            cement = ((newW / r) * parseFloat(r1)) / 1.25;
            sand = (newW / r) * parseFloat(r2);
            khoa = (newW / r) * parseFloat(r3);
            sandR = parseFloat(sandPrice);
            khoaR = parseFloat(khoaPrice);
            rd = x * (parseFloat(rod) / 100) * 222.5056689342404;
        }
        else {
            cement = ((newW / r) * parseFloat(r1) * 35.3147) / 1.25;
            sand = (newW / r) * parseFloat(r2);
            khoa = (newW / r) * parseFloat(r3);
            sandR = parseFloat(sandPrice) * 35.3147;
            khoaR = parseFloat(khoaPrice) * 35.3147;
            rd = x * (parseFloat(rod) / 100) * 7850;
        }

        setCementQt(cement.toFixed(2));
        setSandQt(sand.toFixed(2));
        setKhoaQt(khoa.toFixed(2));
        setRodQt(rd.toFixed(2));
        setSandRate(sandR.toFixed(2));
        setKhoaRate(khoaR.toFixed(2));

        const total = (parseFloat(cement) * parseFloat(cementPrice)) + (parseFloat(sand) * parseFloat(sandR)) + (parseFloat(khoa) * parseFloat(khoaR)) + (parseFloat(rd) * parseFloat(rodPrice));
        setTotalTaka(total);
    }


    const showForm = () => {
        setShow(true);
        setCementQt("0");
        setSandQt("0");
        setKhoaQt("0");
        setRodQt("0");
        setTotalTaka(0);
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">

                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">

                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">RCC Works</h1>
                            <Close Click={() => setShow(false)} Size="w-8 h-8" />
                        </div>

                        <div className="w-full p-4 flex flex-col">
                            <form onSubmit={resultHandler}>
                                <div className="w-full grid grid-cols-1 gap-y-2">

                                    <div className="w-full grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <TextEn Title="Total Works" Id="w" Change={(e) => { setW(e.target.value) }} Value={w} Chr="50" />
                                        </div>
                                        <DropdownEn Title="Option" Id="cft" Change={(e) => { setCft(e.target.value) }} Value={cft}>
                                            <option value="0">M3</option>
                                            <option value="1">CFT</option>
                                        </DropdownEn>
                                    </div>

                                    <div className="w-full grid grid-cols-4 gap-4 pb-4">
                                        <TextEn Title="Ratio-1" Id="r1" Change={(e) => { setR1(e.target.value) }} Value={r1} Chr="10" />
                                        <TextEn Title="Ratio-2" Id="r2" Change={(e) => { setR2(e.target.value) }} Value={r2} Chr="10" />
                                        <TextEn Title="Ratio-3" Id="r3" Change={(e) => { setR3(e.target.value) }} Value={r3} Chr="10" />
                                        <TextEn Title="Rod %" Id="rod" Change={e => { setRod(e.target.value); }} Value={rod} Chr="10" />
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

                                        <tr>
                                            <td className="text-center">3</td>
                                            <td>Khoa</td>
                                            <td className="text-end">{khoaQt}</td>
                                            <td className="text-end">{cft === '1' ? 'cft' : 'm3'}</td>
                                            <td className="text-end">{parseFloat(khoaRate).toFixed(2)}</td>
                                            <td className="text-end">{(parseFloat(khoaQt) * parseFloat(khoaRate)).toFixed(2)}</td>
                                        </tr>

                                        <tr>
                                            <td className="text-center">4</td>
                                            <td>Rod</td>
                                            <td className="text-end">{rodQt}</td>
                                            <td className="text-end">kgs</td>
                                            <td className="text-end">{parseFloat(rodPrice).toFixed(2)}</td>
                                            <td className="text-end">{(parseFloat(rodQt) * parseFloat(rodPrice)).toFixed(2)}</td>
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

            <button onClick={showForm} className="px-4 py-2 bg-gray-200 hover:bg-gray-100">RCC Work</button>
        </>
    );
};

export default Rccwork;
