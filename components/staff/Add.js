import React, { useState } from "react";
import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";
import { Close } from "@/components/Icons";
import { insertOne } from "@/lib/DexieDatabase";

const Add = ({ message }) => {
    const [nm_en, setNm_en] = useState('');
    const [nm_bn, setNm_bn] = useState('');
    const [dt, setDt] = useState('');
    const [sal, setSal] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender_id, setGender_id] = useState('');
    const [post_id, setPost_id] = useState('');
    const [project_id, setProject_id] = useState('');
    const [picture_id, setPicture_id] = useState('');
    const [emp_id, setEmp_id] = useState('');
    const [status, setStatus] = useState('');
    const [place_id, setPlace_id] = useState('');
    const [unit_id, setUnit_id] = useState('');
    const [remarks, setRemarks] = useState('');
    const [show, setShow] = useState(false);


    const resetVariables = () => {
        message("Ready to add new");
        setNm_en('');
        setNm_bn('');
        setDt('');
        setSal('');
        setMobile('');
        setGender_id('');
        setPost_id('');
        setProject_id('');
        setPicture_id('');
        setEmp_id('');
        setStatus('');
        setPlace_id('');
        setUnit_id('');
        setRemarks('');
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
            nm_en: nm_en,
            nm_bn: nm_bn,
            dt: dt,
            sal: sal,
            mobile: mobile,
            gender_id: gender_id,
            post_id: post_id,
            project_id: project_id,
            picture_id: picture_id,
            emp_id: emp_id,
            status: status,
            place_id: place_id,
            unit_id: unit_id,
            remarks: remarks
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const response = await insertOne("staff", newObject);
            message(response.message);
        } catch (error) {
            console.log(error);
            message("Error saving staff data.");
        }
        setShow(false);
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
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Nm_en" Id="nm_en" Change={(e) => setNm_en(e.target.value)} Value={nm_en} Chr="50" />
                                    <TextEn Title="Nm_bn" Id="nm_bn" Change={(e) => setNm_bn(e.target.value)} Value={nm_bn} Chr="50" />
                                    <TextEn Title="Dt" Id="dt" Change={(e) => setDt(e.target.value)} Value={dt} Chr="50" />
                                    <TextEn Title="Sal" Id="sal" Change={(e) => setSal(e.target.value)} Value={sal} Chr="50" />
                                    <TextEn Title="Mobile" Id="mobile" Change={(e) => setMobile(e.target.value)} Value={mobile} Chr="50" />
                                    <TextEn Title="Gender_id" Id="gender_id" Change={(e) => setGender_id(e.target.value)} Value={gender_id} Chr="50" />
                                    <TextEn Title="Post_id" Id="post_id" Change={(e) => setPost_id(e.target.value)} Value={post_id} Chr="50" />
                                    <TextEn Title="Project_id" Id="project_id" Change={(e) => setProject_id(e.target.value)} Value={project_id} Chr="50" />
                                    <TextEn Title="Picture_id" Id="picture_id" Change={(e) => setPicture_id(e.target.value)} Value={picture_id} Chr="50" />
                                    <TextEn Title="Emp_id" Id="emp_id" Change={(e) => setEmp_id(e.target.value)} Value={emp_id} Chr="50" />
                                    <TextEn Title="Status" Id="status" Change={(e) => setStatus(e.target.value)} Value={status} Chr="50" />
                                    <TextEn Title="Place_id" Id="place_id" Change={(e) => setPlace_id(e.target.value)} Value={place_id} Chr="50" />
                                    <TextEn Title="Unit_id" Id="unit_id" Change={(e) => setUnit_id(e.target.value)} Value={unit_id} Chr="50" />
                                    <TextEn Title="Remarks" Id="remarks" Change={(e) => setRemarks(e.target.value)} Value={remarks} Chr="50" />


                                   

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

