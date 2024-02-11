import React, { useState } from "react";
import { BtnSubmit, BtnEn, TextBn, TextTm, TextNum, DropdownBn } from "@/components/Form";
import { Close } from "@/components/Icons";
import { getOne, updateItem } from "@/lib/LocalDatabase";


const Edit = ({ message, id }) => {
    const [place1, setPlace1] = useState('');
    const [t1, setT1] = useState('');
    const [place2, setPlace2] = useState('');
    const [t2, setT2] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [taka, setTaka] = useState('');
    const [show, setShow] = useState(false);


    const showEditForm = () => {
        setShow(true);
        message("Ready to edit");
        try {
            const response = getOne("localta", id);
            if (response) {
                setPlace1(response.data.place1);
                setT1(response.data.t1);
                setPlace2(response.data.place2);
                setT2(response.data.t2);
                setVehicle(response.data.vehicle);
                setTaka(response.data.taka);
            } else {
                setPlace1('');
                setT1('');
                setPlace2('');
                setT2('');
                setVehicle('');
                setTaka('');
            }
        } catch (err) {
            console.log(err);
        }
    };


    const closeEditForm = () => {
        setShow(false);
        message("Data ready.");
    };


    const createObject = () => {
        return {
            id: id,
            place1: place1,
            t1: t1,
            place2: place2,
            t2: t2,
            vehicle: vehicle,
            taka: taka
        }
    }


    const saveHandler = (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const response = updateItem("localta", id, newObject);
            message(response.message);
        } catch (error) {
            console.log(error);
            message("Data updating error");
        }
        setShow(false);
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <Close Click={closeEditForm} Size="w-8 h-8" />
                        </div>

                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextBn Title="Place1" Id="place1" Change={e => setPlace1(e.target.value)} Value={place1} Chr="50" />
                                    <TextTm Title="T1" Id="t1" Change={e => setT1(e.target.value)} Value={t1} />
                                    <TextBn Title="Place2" Id="place2" Change={e => setPlace2(e.target.value)} Value={place2} Chr="50" />
                                    <TextTm Title="T2" Id="t2" Change={e => setT2(e.target.value)} Value={t2} />
                                    <DropdownBn Title="Vehicle" Id="vehicle" Change={e => setVehicle(e.target.value)} Value={vehicle}>
                                        <option value='evm'>evm</option>
                                        <option value='wmGbwR'>wmGbwR</option>
                                        <option value='wi·v'>wi·v</option>
                                    </DropdownBn>
                                    <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />

                                </div>
                                <div className="w-full flex justify-start">
                                    <BtnEn Title="Close" Click={closeEditForm} Class="bg-pink-600 hover:bg-pink-800 text-white" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="w-8 h-8 rounded-full hover:bg-gray-200 mr-1 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;


