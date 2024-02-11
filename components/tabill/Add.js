import React, { useState } from "react";
import { BtnSubmit, BtnEn, TextDt, TextTm, DropdownBn, TextEnDisabled, TextNum, TextBn } from "@/components/Form";
import { Close } from "@/components/Icons";
import { addItem } from "@/lib/LocalDatabase";

const Add = ({ message }) => {
    const [dt, setDt] = useState('');
    const [place1, setPlace1] = useState('');
    const [tm1, setTm1] = useState('');
    const [place2, setPlace2] = useState('');
    const [tm2, setTm2] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [taka, setTaka] = useState('');
    const [cause, setCause] = useState('');
    const [show, setShow] = useState(false);

    const [fixedTaka, setFixedTaka] = useState(false);

    const resetVariables = () => {
        message("Ready to add new");
        setDt('');
        setPlace1('');
        setTm1('');
        setPlace2('');
        setTm2('');
        setVehicle('');
        setTaka('');
        setCause('');
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
        setFixedTaka(false);
        setTaka("0");
    }


    const closeAddForm = () => {
        setShow(false);
        message("Data ready");
    }


    const createObject = () => {
        return {
            id: Date.now(),
            dt: dt,
            place1: place1,
            tm1: tm1,
            place2: place2,
            tm2: tm2,
            vehicle: vehicle,
            taka: taka,
            cause: cause
        }
    }


    const saveHandler = (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const response = addItem("tabill", newObject);
            message(response.message);
        } catch (error) {
            console.log(error);
            message("Error saving tabill data.");
        }
        setShow(false);
    }

    const vehicleChange = (e) => {
        const vehicleValue = e.target.value;
        setVehicle(vehicleValue);
        if (vehicleValue === "wba©vwiZ") {
            setFixedTaka(true);
        } else {
            setFixedTaka(false);
        }
        setTaka("0");
    }

    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <Close Click={closeAddForm} Size="w-8 h-8" />
                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-2">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextBn Title="Place-1" Id="place1" Change={e => setPlace1(e.target.value)} Value={place1} Chr="50" />
                                    <TextTm Title="Time-1" Id="tm1" Change={e => setTm1(e.target.value)} Value={tm1} />
                                    <TextBn Title="Place-2" Id="place2" Change={e => setPlace2(e.target.value)} Value={place2} Chr="50" />
                                    <TextTm Title="Time-2" Id="tm2" Change={e => setTm2(e.target.value)} Value={tm2} />

                                    <DropdownBn Title="Vehicle" Id="vehicle" Change={vehicleChange} Value={vehicle}>
                                        <option value="evm">evm</option>
                                        <option value="wmGbwR">wmGbwR</option>
                                        <option value="wi·v">wi·v</option>
                                        <option value="ûÛv">ûÛv</option><option value="f¨vb">f¨vb</option>
                                        <option value="†bŠKv">†bŠKv</option><option value="UÖvK">UÖvK</option>
                                        <option value="†ijMvwo">†ijMvwo</option>
                                        <option value="evBmvB‡Kj">evBmvB‡Kj</option>
                                        <option value="A‡UvwiKkv">A‡UvwiKkv</option>
                                        <option value="wba©vwiZ">wba©vwiZ</option>
                                    </DropdownBn>
                                    {
                                        fixedTaka ? <TextEnDisabled Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} Chr="50" />
                                            : <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                                    }

                                    <TextBn Title="Cause" Id="cause" Change={e => setCause(e.target.value)} Value={cause} Chr="50" />


                                </div>
                                <div className="w-full flex justify-start">
                                    <BtnEn Title="Close" Click={closeAddForm} Class="bg-pink-600 hover:bg-pink-800 text-white" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="group px-1 py-1 text-sm font-bold text-blue-900 hover:text-blue-500">
                <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5 stroke-blue-900 group-hover:stroke-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="scale-y-125">AddNew</span>
                </div>
            </button>
        </>
    )
}
export default Add;

