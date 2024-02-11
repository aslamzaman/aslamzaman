import React, { useState } from "react";
import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";
import { Close } from "@/components/Icons";   
import {fetchOne, updateOne} from "@/lib/DexieDatabase";


const Edit = ({ message, id }) => {        
    const [staff_id, setStaff_id] = useState('');
    const [arear, setArear] = useState('');
    const [sal1, setSal1] = useState('');
    const [sal2, setSal2] = useState('');
    const [remarks, setRemarks] = useState('');        
    const [show, setShow] = useState(false);


    const showEditForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {
            const response = await fetchOne("unitsalary", id);
            if (response) {
                setStaff_id(response.data.staff_id);
                setArear(response.data.arear);
                setSal1(response.data.sal1);
                setSal2(response.data.sal2);
                setRemarks(response.data.remarks);                    
            } else {
                setStaff_id('');
                setArear('');
                setSal1('');
                setSal2('');
                setRemarks('');                    
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
            staff_id: staff_id,
            arear: arear,
            sal1: sal1,
            sal2: sal2,
            remarks: remarks                
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const response = await updateOne("unitsalary", newObject);
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
                                    <TextEn Title="Staff_id" Id="staff_id" Change={(e) => setStaff_id(e.target.value)} Value={staff_id} Chr="50" />
                                    <TextEn Title="Arear" Id="arear" Change={(e) => setArear(e.target.value)} Value={arear} Chr="50" />
                                    <TextEn Title="Sal1" Id="sal1" Change={(e) => setSal1(e.target.value)} Value={sal1} Chr="50" />
                                    <TextEn Title="Sal2" Id="sal2" Change={(e) => setSal2(e.target.value)} Value={sal2} Chr="50" />
                                    <TextEn Title="Remarks" Id="remarks" Change={(e) => setRemarks(e.target.value)} Value={remarks} Chr="50" />                                        
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


