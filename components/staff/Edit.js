import React, { useState } from "react";
import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";
import { Close } from "@/components/Icons";   
import {fetchOne, updateOne} from "@/lib/DexieDatabase";


const Edit = ({ message, id }) => {        
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


    const showEditForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {
            const response = await fetchOne("staff", id);
            if (response) {
                setNm_en(response.data.nm_en);
                setNm_bn(response.data.nm_bn);
                setDt(response.data.dt);
                setSal(response.data.sal);
                setMobile(response.data.mobile);
                setGender_id(response.data.gender_id);
                setPost_id(response.data.post_id);
                setProject_id(response.data.project_id);
                setPicture_id(response.data.picture_id);
                setEmp_id(response.data.emp_id);
                setStatus(response.data.status);
                setPlace_id(response.data.place_id);
                setUnit_id(response.data.unit_id);
                setRemarks(response.data.remarks);                    
            } else {
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
            const response = await updateOne("staff", newObject);
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


