
const Edit = (tbl, datas, opt) => {

    const titleCase = (str) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`','');  
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());


    let dd = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? dd = dd + `                                        <TextEn Title="${titleCase(d)}" Id="${d}" Change={e => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />`
                : dd = dd + `                                        <TextEn Title="${titleCase(d)}" Id="${d}" Change={e => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />\n`;
        }
    }
    );


    let stateVar = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateVar = stateVar + `        const [${d}, set${titleCase(d)}] = useState('');`
                : stateVar = stateVar + `        const [${d}, set${titleCase(d)}] = useState('');\n`
        }
    }
    );



    let stateClear = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateClear = stateClear + `                    set${titleCase(d)}('');`
                : stateClear = stateClear + `                    set${titleCase(d)}('');\n`
        }
    }
    );

    let getData = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? getData = getData + `                    set${titleCase(d)}(response.data.${d});`
                : getData = getData + `                    set${titleCase(d)}(response.data.${d});\n`
        }
    }
    );


    let getValue = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? getValue = getValue + `                ${d}: ${d}`
                : getValue = getValue + `                ${d}: ${d},\n`
        }
    }
    );


   

    const loc = 'getOne("' + tbl+ '", id);';
    const dex = 'await fetchOne("'+ tbl+ '", id);';
    const mysq = 'await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/get_one/${id}`);';
    const sqlite = 'await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/get_one/${id}`);';

    const loc2 = 'updateItem("' + tbl+ '", id, newObject);';
    const dex2 = 'await updateOne("'+ tbl+ '", newObject);';
    const mysq2 = 'await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/update_one/${id}`,newObject);';
    const sqlite2 = 'await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/update_one/${id}`,newObject);';


    const str = `    import React, { useState } from "react";
    import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";
    import { Close } from "@/components/Icons";   
    ${opt==='local'?'import { getOne, updateItem } from "@/lib/LocalDatabase";'
    :opt === 'dexie'?'import {fetchOne, updateOne} from "@/lib/DexieDatabase";'
    :'import axios from "axios";'}

    
    const Edit = ({ message, id }) => {        
${stateVar}        
        const [show, setShow] = useState(false);
    
    
        const showEditForm = ${opt==='local'?'':'async'} () => {
            setShow(true);
            message("Ready to edit");
            try {
                const response = ${opt==='local'?loc
                :opt==='dexie'?dex 
                :opt==='mysql'?mysq
                :sqlite}
                if (response) {
${getData}                    
                } else {
${stateClear}                    
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
${getValue}                
            }
        }
    
    
        const saveHandler = ${opt==='local'?'':'async'} (e) => {
            e.preventDefault();
            try {
                const newObject = createObject();
                const response = ${opt==='local'?loc2
                :opt==='dexie'?dex2   
                :opt==='mysql'?mysq2
                :sqlite2}
                message(${opt==='mysql'|| opt==='sqlite'?'response.data.message':'response.message'});
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
${dd}                                        
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
    
  
    `;

    return str;
}

export default Edit;