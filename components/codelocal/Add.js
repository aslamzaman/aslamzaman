import { titleCamelCase } from "@/lib/utils";
export const Add = (tbl, datas, isSession) => {

    const replaceQutation = datas.replaceAll('`', '');
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());

    let use_state = "";

    for (let i = 1; i < data.length; i++) {
        use_state += `    const [${data[i]}, set${titleCamelCase(data[i])}] = useState('');${i===data.length-1?'':'\n'}`;
    }

    let reset_veriable = "";

    for (let i = 1; i < data.length; i++) {
        reset_veriable += `        set${titleCamelCase(data[i])}('');${i===data.length-1?'':'\n'}`;
    }

   let form_text = ""; 
    for (let i = 1; i < data.length; i++) {
        form_text += `                                    <TextEn Title="${titleCamelCase(data[i])}" Id="${data[i]}" Change={e => set${titleCamelCase(data[i])}(e.target.value)} Value={${data[i]}} Chr={150} />${i===data.length-1?'':'\n'}`;
    }

    let objectText = ""; 
    for (let i = 1; i < data.length; i++) {
        objectText += `            ${data[i]}: ${data[i]}${i===data.length-1?'':',\n'}`;
    }


    const storageType = isSession?'sessionStorageAddItem':'localStorageAddItem';

    const str = `import React, { useState } from "react";
import { BtnSubmit, TextEn } from "@/components/Form";
import { ${storageType} } from "@/lib/utils";

const Add = ({ message }) => {
${use_state}   
    const [show, setShow] = useState(false);


    const resetVariables = () => {
${reset_veriable}        
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            id: Date.now(),
${objectText}            
        }
    }


    const saveHandler = (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = ${storageType}('${tbl}', newObject);
            message(msg);
        } catch (error) {
            console.error("Error saving ${tbl} data:", error);
            message("Error saving ${tbl} data.");
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
${form_text}                                
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
  
`;

    return str;
}

