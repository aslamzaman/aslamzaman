import React, { useState } from "react";
import { TextDt, TextTm, TextBn, BtnEn, TextNum, BtnSubmit, DropdownBn, TextEnDisabled } from "@/components/Form";
import { addItem, getItems } from "@/lib/utils/LocalDatabase";
import { localStorageAddItem } from "@/lib/utils";
const date_format = dt => new Date(dt).toISOString().split('T')[0];



const vehicles = [
    { id: 1, item: "evm" },
    { id: 2, item: "wmGbwR" },
    { id: 3, item: "wi·v" },
    { id: 4, item: "ûÛv" },
    { id: 5, item: "f¨vb" },
    { id: 6, item: "†bŠKv" },
    { id: 7, item: "UÖvK" },
    { id: 8, item: "†ijMvwo" },
    { id: 9, item: "evBmvB‡Kj" },
    { id: 10, item: "A‡UvwiKkv" },
    { id: 11, item: "wba©vwiZ" }
]


const Add = ({ message }) => {
    const [dt, setDt] = useState("");
    const [place1, setPlace1] = useState("");
    const [tm1, setTm1] = useState("");
    const [place2, setPlace2] = useState("");
    const [tm2, setTm2] = useState("")
    const [vehicle, setVehicle] = useState("");
    const [taka, setTaka] = useState("");
    const [cause, setCause] = useState("");

    const [show, setShow] = useState(false);

    const [takaOnOff, setTakaOnOff] = useState(false);


    const resetStateVariables = () => {
        setDt(date_format(new Date()));
        setPlace1("");
        setTm1("");
        setPlace2("");
        setTm2("");
        setVehicle("wba©vwiZ");
        setTaka("0");
        setCause("");
        setTakaOnOff(true);
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const showAddForm = async () => {
        setShow(true);
        resetStateVariables();
    }




    const createLocaltaObject = () => {
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
        const data = getItems("tabill");
        if (data.length >= 26) {
            message("You can no longer enter new data.");
            setShow(false);
            return false;
        }
        try {
            const tabillObject = createLocaltaObject();
            const msg = localStorageAddItem('tabill',tabillObject);
            message(msg);
        } catch (error) {
            console.log(`Error saveing houserent data: ${error}`);
            message(msg);
        }
        setShow(false);
    }


    const vehicleChange = (e) => {
        setVehicle(e.target.value);
        if (e.target.value === "wba©vwiZ") {
            setTakaOnOff(true);
            setTaka(0);
        } else {
            setTakaOnOff(false);
            setTaka(0);
        }
    }



    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 pb-6 text-black">


                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextBn Title="Place1" Id="place1" Change={e => setPlace1(e.target.value)} Value={place1} Chr="50" />
                                    <TextTm Title="Time1" Id="tm1" Change={e => setTm1(e.target.value)} Value={tm1} />
                                    <TextBn Title="Place2" Id="place2" Change={e => setPlace2(e.target.value)} Value={place2} Chr="50" />
                                    <TextTm Title="Time2" Id="tm2" Change={e => setTm2(e.target.value)} Value={tm2} />
                                    <DropdownBn Title="Vehicle" Id="vehicle" Change={vehicleChange} Value={vehicle}>
                                        {vehicles.map((v, i) => <option value={v.item} key={i}>{v.item}</option>)}
                                    </DropdownBn>
                                    {takaOnOff
                                        ? <TextEnDisabled Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                                        : <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />}


                                    <TextBn Title="Cause" Id="cause" Change={e => setCause(e.target.value)} Value={cause} Chr="100" />
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;
