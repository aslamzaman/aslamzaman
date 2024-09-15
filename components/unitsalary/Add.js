import React, { useState } from "react";
import { BtnSubmit, DropdownEn, TextNum, TextBn } from "@/components/Form";
import { fetchDataFromAPI, postDataToAPI } from "@/lib/utils";


const Add = ({ message }) => {
    const [staffId, setStaffId] = useState('');
    const [arear, setArear] = useState('');
    const [sal1, setSal1] = useState('');
    const [sal2, setSal2] = useState('');
    const [remarks, setRemarks] = useState('');

    const [show, setShow] = useState(false);
    const [staffs, setStaffs] = useState([]);

    const resetVariables = () => {
        setStaffId('');
        setArear('');
        setSal1('');
        setSal2('');
        setRemarks('');
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();
        try {
            const responseStaff = await fetchDataFromAPI("staff");
            const sortStaff = responseStaff.sort((a,b)=>parseInt(a.empId) < parseInt(b.empId)?-1:1);
            console.log(responseStaff)
            setStaffs(sortStaff);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const closeAddForm = () => {
        setShow(false);
    }


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
            const msg = await postDataToAPI("unitsalary", newObject);
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
                                    <DropdownEn Title="Staff" Id="staffId" Change={e => setStaffId(e.target.value)} Value={staffId}>
                                        {staffs.length ? staffs.map(staff => <option value={staff._id} key={staff._id}>{staff.nmEn}-{staff.empId}</option>) : null}
                                    </DropdownEn>
                                    <TextBn Title="Arear" Id="arear" Change={e => setArear(e.target.value)} Value={arear} Chr={150} />
                                    <TextNum Title="Sal1" Id="sal1" Change={e => setSal1(e.target.value)} Value={sal1} />
                                    <TextNum Title="Sal2" Id="sal2" Change={e => setSal2(e.target.value)} Value={sal2} />
                                    <TextBn Title="Remarks" Id="remarks" Change={e => setRemarks(e.target.value)} Value={remarks} Chr={150} />
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
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-400 hover:bg-blue-600 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;

