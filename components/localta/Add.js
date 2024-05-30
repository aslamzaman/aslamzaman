import React, { useState } from "react";
import {TextBn, BtnEn, TextNum, BtnSubmit, DropdownBn } from "@/components/Form";
import { Close } from "@/components/Icons";
import { addItem } from "@/lib/utils/LocalDatabase";

const vehicles = [
    { id: 1, item: "evm" },
    { id: 1, item: "wmGbwR" },
    { id: 1, item: "wi·v" }
]


const Add = ({ Msg }) => {
    const [place1, setPlace1] = useState("");
    const [t1, setT1] = useState("");
    const [place2, setPlace2] = useState("");
    const [t2, setT2] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [taka, setTaka] = useState("");

    const [show, setShow] = useState(false);

    const resetStateVariables = () => {
        Msg("Ready to add new");
        setPlace1("");
        setT1("");
        setPlace2("");
        setT2("");
        setVehicle("evm");
        setTaka("");
    }


    const createLocaltaObject = () => {
        return {
            id: Date.now(),
            place1: place1,
            t1: t1,
            place2: place2,
            t2: t2,
            vehicle: vehicle,
            taka: taka
        }
    }


    const addtHandler = () => {
        setShow(true);
        resetStateVariables();
    }

    const saveHandler = (e) => {
        e.preventDefault();
        try {
            const localtaObject = createLocaltaObject();
            const local = addItem("localta", localtaObject);
            Msg(local.message);
        } catch (error) {
            console.log(`Error saveing houserent data: ${error}`);
            Msg(local.message);
        }
        setShow(false);
    }


    return (
        <>
            <div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto`}>
                <div className="w-11/12 md:w-8/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Add New</h1>
                        <Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-9 h-9" />
                    </div>

                    <div className="px-6 pb-6 text-black overflow-hidden">
                        <form onSubmit={saveHandler}>
                            <div className="grid grid-cols-1 gap-4 my-4">
                                <TextBn Title="Place1" Id="place1" Change={e => setPlace1(e.target.value)} Value={place1} Chr="50" />
                                <TextBn Title="T1" Id="t1" Change={e => setT1(e.target.value)} Value={t1} Chr="50" />
                                <TextBn Title="Place2" Id="place2" Change={e => setPlace2(e.target.value)} Value={place2} Chr="50" />
                                <TextBn Title="T2" Id="t2" Change={e => setT2(e.target.value)} Value={t2}  Chr="50" />

                                <DropdownBn Title="Vehicle" Id="vehicle" Change={e => setVehicle(e.target.value)} Value={vehicle}>
                                    {
                                        vehicles.map((v, i) => {
                                            return <option value={v.item} key={i}>{v.item}</option>
                                        })
                                    }
                                </DropdownBn>
                                <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                            </div>
                            <BtnEn Title="Close" Click={() => { setShow(false); Msg("Data ready") }} Class="bg-red-600 hover:bg-red-800 text-white" />
                            <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                        </form>
                    </div>
                </div>
            </div>
            <button onClick={addtHandler} className="w-7 h-7 mr-2 bg-indigo-700 hover:bg-indigo-900 text-white flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;
