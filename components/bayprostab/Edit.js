import React, { useState } from "react";
import { TextNum, TextEn, TextBn, BtnSubmit } from "@/components/Form";
import { Close } from "@/components/Icons";
import { sessionStorageUpdateItem } from "@/lib/utils";


const Edit = ({ Msg, id, data }) => {
    const [item, setItem] = useState("");
    const [nos, setNos] = useState("");
    const [taka, setTaka] = useState("");

    const [show, setShow] = useState(false);
    const [check, setCheck] = useState(false);

    const editHandler = () => {
        setShow(true);
        Msg("Ready to edit.")
        if (data) {
            const { item, nos, taka } = data;
            setItem(item);
            setNos(nos);
            setTaka(taka);
            if (parseInt(taka) === 0) {
                setCheck(true);
            } else {
                setCheck(false);
            }
        } else {
            setItem('');
            setNos('');
            setTaka('');
        }
    }


    const saveHandler = (e) => {
        e.preventDefault();
        let obj = {
            id: id,
            item: item,
            nos: nos,
            taka: taka
        }

        const message = sessionStorageUpdateItem("bayprostab", id, obj);
        Msg(message);
        setShow(false);
    }

    const checkChangeHanler = (e) => {
        const checValue = e.target.checked;
        setCheck(checValue);
    }


    return (
        <>
            <div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto`}>
                <div className={`w-11/12 md:w-8/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300`}>
                    <div className="px-6 md:px-6 py-6 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Edit Existing</h1>
                        <Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-9 h-9" />
                    </div>

                    <div className="px-6 pb-6 text-black">
                        <input onChange={checkChangeHanler} type="checkbox" checked={check} /> English
                        <form onSubmit={saveHandler}>
                            <div className="w-full grid grid-cols-1 gap-4 my-4">
                                {check ?
                                    <TextEn Title="Item (English)" Id="item" Change={(e) => { setItem(e.target.value) }} Value={item} Chr="150" />
                                    :
                                    <TextBn Title="Item (Bangla)" Id="item" Change={(e) => { setItem(e.target.value) }} Value={item} Chr="150" />
                                }
                                <TextNum Title="Nos" Id="nos" Change={(e) => { setNos(e.target.value) }} Value={nos} />

                                <TextEn Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} Chr={200} />
                            </div>
                            <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                        </form>
                    </div>


                </div>
            </div>
            <button onClick={editHandler} className="w-8 h-8 rounded-full hover:bg-gray-200 mr-1 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;
