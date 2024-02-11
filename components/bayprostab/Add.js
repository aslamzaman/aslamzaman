import React, { useState } from "react";
import { TextEn, TextBn, BtnSubmit, BtnEn, TextNum } from "@/components/Form";
import { Close } from "@/components/Icons";
import { insertOne } from "@/lib/DexieDatabase";

const Add = ({ message }) => {
    const [item, setItem] = useState('');
    const [nos, setNos] = useState('');
    const [taka, setTaka] = useState('');
    const [show, setShow] = useState(false);

    const [check, setCheck] = useState(false);

    const resetVariables = () => {
        message("Ready to add new");
        setItem('');
        setNos('');
        setTaka('');
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
    }


    const closeAddForm = () => {
        setShow(false);
        message("Data ready");
    }


    const createObject = () => {
        return {
            id: Date.now(),
            item: item,
            nos: nos,
            taka: taka
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const response = await insertOne("bayprostab", newObject);
            message(response.message);
        } catch (error) {
            console.log(error);
            message("Error saving bayprostab data.");
        }
        setCheck(false);
        setShow(false);
    }

    const checkBoxHandler = (e) => {
        const checValue = e.target.checked;
        setCheck(checValue);
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
                          
                                <input onChange={checkBoxHandler} type="checkbox" checked={check} /> English
                           
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">

                                    {check ?
                                        <TextEn Title="Item (English)" Id="item" Change={(e) => { setItem(e.target.value) }} Value={item} Chr="50" />
                                        :
                                        <TextBn Title="Item (Bangla)" Id="item" Change={(e) => { setItem(e.target.value) }} Value={item} Chr="50" />
                                    }



                                    <TextNum Title="Nos" Id="nos" Change={(e) => setNos(e.target.value)} Value={nos} />
                                    <TextNum Title="Taka" Id="taka" Change={(e) => setTaka(e.target.value)} Value={taka} />
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
                    <span className="scale-y-125">Add New</span>
                </div>
            </button>
        </>
    )
}
export default Add;

