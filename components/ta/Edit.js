import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn } from "@/components/Form";
import { fetchData } from "@/lib/utils/FetchData";


const Edit = ({ message, id, data }) => {
    const [unitId, setUnitId] = useState('');
    const [tk, setTk] = useState('');
    const [show, setShow] = useState(false);

    const [units, setUnits] = useState([]);
    const [unitIdChange, setUnitIdChange] = useState('');

    const showEditForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {
            const responseUnit = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unit`);
            setUnits(responseUnit);
            //-----------------------------------------------
            console.log(data)
            const { unitId, tk } = data.find(ta => ta._id === id) || { unitId: '', tk: '' };
            setUnitId(unitId._id);
            setTk(tk);
            //------------------------------------------------
            setUnitIdChange(unitId._id);

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
            unitId: unitId,
            tk: tk
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ta/${id}`;
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Updated successfully completed");
            } else {
                throw new Error("Failed to create ta");
            }
        } catch (error) {
            console.error("Error saving ta data:", error);
            message("Error saving ta data.");
        } finally {
            setShow(false);
        }
    }

    const unitIdChangeHandler = (e) => {
        const unitIdValue = e.target.value;
        setUnitIdChange(unitIdValue);
        setUnitId(unitIdValue);
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
                                    <DropdownEn Title="Unit" Id="unitIdChange" Change={unitIdChangeHandler} Value={unitIdChange}>
                                        {units.length ? units.map(unit => <option value={unit._id} key={unit._id}>{unit.nmEn}</option>) : null}
                                    </DropdownEn>
                                    <TextEn Title="Tk" Id="tk" Change={e => setTk(e.target.value)} Value={tk} Chr={50} />
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


