import React, { useState } from "react";
import { TextDt, TextTm, TextBn, BtnEn, TextNum, BtnSubmit, DropdownBn, TextEnDisabled } from "@/components/Form";
import { Close } from "@/components/Icons";
import { localStorageUpdateItem } from "@/lib/utils";
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


const Edit = ({ message, Id, data }) => {
    const [dt, setDt] = useState("");
    const [place1, setPlace1] = useState("");
    const [tm1, setTm1] = useState("");
    const [place2, setPlace2] = useState("");
    const [tm2, setTm2] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [taka, setTaka] = useState("");
    const [cause, setCause] = useState("");

    const [show, setShow] = useState(false);

    const [takaOnOff, setTakaOnOff] = useState(false);


    const closeEditForm = () => {
        setShow(false);
     };


    const editHandler = () => {
        setShow(true);
        try {
            console.log(data)
            const findData = data;
            if (findData) {
                const { dt, place1, tm1, place2, tm2, vehicle, taka, cause } = findData;
                setDt(date_format(dt));
                setPlace1(place1);
                setTm1(tm1);
                setPlace2(place2);
                setTm2(tm2);
                setVehicle(vehicle);
                setTaka(taka);
                setCause(cause);

                if (vehicle === "wba©vwiZ") {
                    setTakaOnOff(true);
                } else {
                    setTakaOnOff(false);
                }

            } else {
                resetStateVariables();
            }
        } catch (error) {
            console.log(`Error fetching localta data: ${error}`);
        }
    };


    const createLocaltaObject = () => {
        return {
            id: Id,
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
            const tabillData = createLocaltaObject();
            const updatedtabill = localStorageUpdateItem("tabill", Id, tabillData);
            message(updatedtabill);
        } catch (error) {
            message(updatedtabill);
            console.log(`Error updating localta data: ${error}`);
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
            <div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto`}>
                <div className="w-11/12 md:w-8/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Edit Existing</h1>
                        <Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-9 h-9" />
                    </div>

                    <div className="px-6 pb-6 text-black overflow-hidden">
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
                                <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button onClick={editHandler} className="w-7 h-7 mr-2 bg-fuchsia-700 hover:bg-fuchsia-900 text-white flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;
