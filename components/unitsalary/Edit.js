import React, { useState } from "react";
import { TextBn, TextNum, BtnSubmit, DropdownEn } from "@/components/Form";
import { fetchDataFromAPI, putDataToAPI } from "@/lib/utils";


const Edit = ({ message, id, data }) => {
    const [staffId, setStaffId] = useState('');
    const [arear, setArear] = useState('');
    const [sal1, setSal1] = useState('');
    const [sal2, setSal2] = useState('');
    const [remarks, setRemarks] = useState('');

    const [show, setShow] = useState(false);
    const [staffs, setStaffs] = useState([]);

    const showEditForm = async () => {
        setShow(true);
        message("Ready to edit");
        const responseStaff = await fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`);
        console.log(responseStaff)
        setStaffs(responseStaff);


        try {
            const { staffId, arear, sal1, sal2, remarks } = data.find(unitsalary => unitsalary._id === id) || { staffId: '', arear: '', sal1: '', sal2: '', remarks: '' };
            setStaffId(staffId._id);
            setArear(arear);
            setSal1(sal1);
            setSal2(sal2);
            setRemarks(remarks);
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
            staffId: staffId,
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
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/unitsalary/${id}`;
            const msg = await putDataToAPI(apiUrl, newObject);
            message(msg);
        } catch (error) {
            console.error("Error saving unitsalary data:", error);
            message("Error saving unitsalary data.");
        } finally {
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <DropdownEn Title="Staff" Id="staffId" Change={e => setStaffId(e.target.value)} Value={staffId}>
                                        {staffs.length ? staffs.map(staff => <option value={staff._id} key={staff._id}>{staff.nmEn}</option>) : null}
                                    </DropdownEn>
                                    <TextBn Title="Arear" Id="arear" Change={e => setArear(e.target.value)} Value={arear} Chr={150} />
                                    <TextNum Title="Sal1" Id="sal1" Change={e => setSal1(e.target.value)} Value={sal1} />
                                    <TextNum Title="Sal2" Id="sal2" Change={e => setSal2(e.target.value)} Value={sal2} />
                                    <TextBn Title="Remarks" Id="remarks" Change={e => setRemarks(e.target.value)} Value={remarks} Chr={150} />
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;


