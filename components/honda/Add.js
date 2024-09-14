import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextDt } from "@/components/Form";
import { fetchDataFromAPI, postDataToAPI } from "@/lib/utils";



const Add = ({ message }) => {
    const [regNo, setRegNo] = useState('');
    const [regDt, setRegDt] = useState('');
    const [chassisNo, setChassisNo] = useState('');
    const [engineNo, setEngineNo] = useState('');
    const [condition, setCondition] = useState('');
    const [projectId, setProjectId] = useState('');
    const [unitId, setUnitId] = useState('');
    const [remarks, setRemarks] = useState('');
    const [show, setShow] = useState(false);


    const [projects, setProjects] = useState([]);
    const [units, setUnits] = useState([]);


    const resetVariables = () => {
        setRegNo('');
        setRegDt('');
        setChassisNo('');
        setEngineNo('');
        setCondition('');
        setProjectId('');
        setUnitId('');
        setRemarks('');
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();
        try {
            const [responseProject, responseUnit] = await Promise.all([
                fetchDataFromAPI("project"),
                fetchDataFromAPI("unit")
            ]);
            setProjects(responseProject);
            setUnits(responseUnit);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            regNo: regNo,
            regDt: regDt,
            chassisNo: chassisNo,
            engineNo: engineNo,
            condition: condition,
            projectId: projectId,
            unitId: unitId,
            remarks: remarks
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = postDataToAPI('honda',newObject);
            message(msg);
        } catch (error) {
            console.error("Error saving honda data:", error);
            message("Error saving honda data.");
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
                                    <TextEn Title="Regno" Id="regNo" Change={e => setRegNo(e.target.value)} Value={regNo} Chr={50} />
                                    <TextDt Title="Regdt" Id="regDt" Change={e => setRegDt(e.target.value)} Value={regDt} />
                                    <TextEn Title="Chassisno" Id="chassisNo" Change={e => setChassisNo(e.target.value)} Value={chassisNo} Chr={50} />
                                    <TextEn Title="Engineno" Id="engineNo" Change={e => setEngineNo(e.target.value)} Value={engineNo} Chr={50} />
                                    <TextEn Title="Condition" Id="condition" Change={e => setCondition(e.target.value)} Value={condition} Chr={50} />

                                    <DropdownEn Title="Project" Id="projectId" Change={e=>setProjectId(e.target.value)} Value={projectId}>
                                        {projects.length ? projects.map(project => <option value={project._id} key={project._id}>{project.name}</option>) : null}
                                    </DropdownEn>




                                    <DropdownEn Title="Unit" Id="unitId" Change={e=>setUnitId(e.target.value)} Value={unitId}>
                                        {units.length ? units.map(unit => <option value={unit._id} key={unit._id}>{unit.nmEn}</option>) : null}
                                    </DropdownEn>
                                    <TextEn Title="Remarks" Id="remarks" Change={e => setRemarks(e.target.value)} Value={remarks} Chr={250} />
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
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;

