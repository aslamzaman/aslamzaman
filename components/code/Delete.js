
const Delete = (tbl, datas, opt) => {

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
                ? dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={(e) => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />`
                : dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={(e) => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />\n`;
        }
    }
    );


    let stateVar = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateVar = stateVar + `      const [${d}, set${titleCase(d)}] = useState('');`
                : stateVar = stateVar + `      const [${d}, set${titleCase(d)}] = useState('');\n`
        }
    }
    );



    let stateClear = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? stateClear = stateClear + `          set${titleCase(d)}('');`
                : stateClear = stateClear + `          set${titleCase(d)}('');\n`
        }
    }
    );

    let getData = "";
    data.map((d, i) => {
        i === (data.length - 1)
            ? getData = getData + `set${titleCase(d)}(${d});`
            : getData = getData + `set${titleCase(d)}(${d});\n`
    }
    );


    let getValue = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? getValue = getValue + `              ${d}: ${d}`
                : getValue = getValue + `              ${d}: ${d},\n`
        }
    }
    );




    const loc = 'getOne("' + tbl+ '", id);';
    const dex = 'await fetchOne("'+ tbl+ '", id);';
    const mysq = 'await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/get_one/${id}`);';
    const sqlite = 'await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/get_one/${id}`);';

    const loc2 = 'deleteItem("' + tbl+ '", id);';
    const dex2 = 'await deleteOne("'+ tbl+ '", id);';
    const mysq2 = 'await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/delete_one/${id}`);';
    const sqlite2 = 'await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/delete_one/${id}`);';



    const str = `    import React, { useState } from "react";
    import { BtnEn } from "../Form";
    import { Close } from "@/components/Icons";  
    ${opt==='local'?'import { getOne, deleteItem } from "@/lib/LocalDatabase";'
    :opt === 'dexie'?'import {fetchOne, deleteOne} from "@/lib/DexieDatabase";'
    :'import axios from "axios";'}	
    
    const Delete = ({ message, id }) => {
        const [data, setData] = useState({});
        const [show, setShow] = useState(false);
    
    
        const showDeleteForm = ${opt==='local'?'':'async'} () => {
            setShow(true);
            try {
                const response = ${opt==='local'?loc
                :opt==='dexie'?dex
                :opt==='mysql'?mysq
                :sqlite}

                setData(response.data);
                message("Ready to delete");
            }
            catch (err) {
                console.log(err);
            }
        }
    
    
        const closeDeleteForm = () => {
            setShow(false);
            message("Data ready");
        }
    
    
        const deleteYesClick = ${opt==='local'?'':'async'} () => {
            try {
                const response = ${opt==='local'?loc2
                :opt==='dexie'?dex2
                :opt==='mysql'?mysq2
                :sqlite2}
                message(${opt==='mysql'|| opt==='sqlite'?'response.data.message':'response.message'});
            } catch (error) {
                console.log(error);
                message("Data deleting error");
            }
            setShow(false);
        }
    
    
        return (
            <>
                {show && (
                    <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                        <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                            <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                                <h1 className="text-xl font-bold text-blue-600">Delete Existing Data</h1>
                                <Close Click={closeDeleteForm} Size="w-8 h-8" />
                            </div>
                            <div className="p-4 lg:p-6 flex flex-col space-y-4">
                                <div className="w-full">
                                    <img className="w-10 h-10 mx-auto mb-5" src="/images/warning/warning-sign-icon.png" alt="warning" />   
                                    <h1 className="text-sm text-center text-gray-600">
                                        Are you sure to proceed with the deletion?</h1>
                                    <h1 className="text-center text-gray-600 font-bold">{data.${data[1]}}</h1>
                                </div>
                                <div className="w-full flex justify-start">
                                    <BtnEn Title="Close" Click={closeDeleteForm} Class="bg-pink-700 hover:bg-pink-900 text-white mr-1" />
                                    <BtnEn Title="Yes Delete" Click={deleteYesClick} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={showDeleteForm} title="Delete" className="w-8 h-8 rounded-full hover:bg-gray-200 mr-[16px] flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </>
        )
    }
    export default Delete;
    
  
    `;

    return str;
}

export default Delete;