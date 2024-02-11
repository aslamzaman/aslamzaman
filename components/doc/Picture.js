import React, { useState } from "react";
import { BtnEn } from "@/components/Form";
import { Close } from "@/components/Icons";
import { fetchOne, updateOne } from "@/lib/DexieDatabase";


const Picture = ({ children, message, id }) => {
    const [cat_id, setCat_id] = useState('');
    const [dt, setDt] = useState('');
    const [unit, setUnit] = useState('');
    const [picurl, setPicurl] = useState('');
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");


    const [buttonShow, setButtonShow] = useState(true);

    const showPictureForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {
            const response = await fetchOne("doc", id);
            if (response) {
                setCat_id(response.data.cat_id);
                setDt(response.data.dt);
                setUnit(response.data.unit);
                setPicurl(response.data.picurl);
            } else {
                setCat_id('');
                setDt('');
                setUnit('');
                setPicurl('');
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
            cat_id: cat_id,
            dt: dt,
            unit: unit,
            picurl: picurl
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const response = await updateOne("doc", newObject);
            message(response.message);
        } catch (error) {
            console.log(error);
            message("Data updating error");
        }
        setShow(false);
    }


    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        const fileSize = file.size;
        console.log(fileSize)
        if (fileSize > 500000) {
            setButtonShow(false);
            setMsg("Please select a smaller size image (Maximum size: 500kb)");
        } else {
            setMsg("");
            setButtonShow(true);
        }

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (evt) => {
                const result = evt.target.result;
                // console.log(result);
                setPicurl(result);
            };
        } catch (error) {
            console.error("Error parsing file:", error);
        }
    };



    const testHandler = async () => {
        try {
            const fetchData = await fetch('https://i.ibb.co/Bn9XjkD/Envalope.jpg');
            const blobData = await fetchData.blob();

            const reader = new FileReader();
            reader.readAsDataURL(blobData);

            reader.onload = (evt) => {
                console.log(evt.target.result);
            }
            console.log(blobData);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="max-w-[842px] mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <Close Click={closeEditForm} Size="w-8 h-8" />
                        </div>

                        <div className="p-4 text-black">
                            <div className="w-[595px] mx-auto">
                                <p className="py-2">{msg}</p>
                                <img className="w-full" src={picurl} alt="Picture" />
                            </div>
                            <input type="file" onChange={fileChangeHandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" accept=".jpg, .png" />

                        </div>

                        <div className="w-full flex justify-start p-4">
                            {buttonShow ? (
                                <div>
                                    <BtnEn Title="Close" Click={closeEditForm} Class="bg-pink-600 hover:bg-pink-800 text-white" />
                                    <BtnEn Title="Save" Click={saveHandler} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                    <BtnEn Title="TEST" Click={testHandler} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            ) : null}
                        </div>

                    </div >
                </div >
            )}
            <button onClick={showPictureForm} title="Edit" className="w-8 h-8 rounded-full hover:bg-gray-200 mr-1 flex justify-center items-center">
                {children}
            </button>
        </>
    )
}
export default Picture;


