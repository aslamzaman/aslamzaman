"use client";
import React, { useState } from "react";
import { BtnEn, TextNum } from "../../components/Form";



const Vattax = () => {
    const [taka, setTaka] = useState("12000");
    const [vat, setVat] = useState("7.5");
    const [tax, setTax] = useState("3");


    const [bill, setBill] = useState("");
    const [vat1, setVat1] = useState("");
    const [tax1, setTax1] = useState("");



    const vatTaxHanler = () => {
        const v = parseFloat(vat) / 100;
        const t = parseFloat(tax) / 100;
        const tk = parseFloat(taka);

        const b = tk / (1 + v + t);
        setBill(b.toFixed(2));
        setVat1((b * v).toFixed(2));
        setTax1((b * t).toFixed(2));
    }


    return (
        <>
            <div className="w-full my-6 lg:my-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">VAT and TAX</h1>
            </div>
            <div className="px-4 lg:px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full p-6 grid grid-cols-1 gap-2 border-2 rounded-lg shadow-lg">
                        <TextNum Title="Payable Bill" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                        <div className="grid grid-cols-2 gap-2">
                            <TextNum Title="Vat" Id="vat" Change={e => setVat(e.target.value)} Value={vat} />
                            <TextNum Title="Tax" Id="tax" Change={e => setTax(e.target.value)} Value={tax} />
                        </div>
                        <BtnEn Title="Calculate" Click={vatTaxHanler} Class="w-36 bg-gray-600 hover:bg-gray-800 text-white" />
                    </div>


                    <div className="w-full p-6 border-2 rounded-lg shadow-lg">
                        <h1 className="w-full py-2 text-center text-2xl font-bold">Bill Extract</h1>
                        <table className="w-full">
                            <tbody>                                
                                <tr>
                                    <td>Bill</td>
                                    <td className="text-end">=</td>
                                    <td className="text-end">{bill}</td>
                                </tr>
                                <tr>
                                    <td>Vat <span className="text-xs">({vat}%)</span></td>
                                    <td className="text-end">=</td>
                                    <td className="text-end">{vat1}</td>
                                </tr>
                                <tr>
                                    <td>Tax <span className="text-xs"> ({tax}%)</span></td>
                                    <td className="text-end">=</td>
                                    <td className="text-end">{tax1}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="w-full text-center"><hr className="w-full border border-1 border-gray-80" /></td>
                                </tr>
                                <tr className="font-bold">
                                    <td>Total</td>
                                    <td className="text-end">=</td>
                                    <td className="text-end">{parseFloat(taka).toFixed(2)}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>


            </div>

        </>
    );

};
export default Vattax;
