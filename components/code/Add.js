
const Add = (tbl, datas,opt) => {

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
                ? dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={e => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />`
                : dd = dd + `                                      <TextEn Title="${titleCase(d)}" Id="${d}" Change={e => set${titleCase(d)}(e.target.value)} Value={${d}} Chr="50" />\n`;
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


    const loc = 'addItem("' + tbl+ '", newObject);';
    const dex = 'await insertOne("'+ tbl+ '", newObject);';
    const mysq = 'await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/insert_one`,newObject);';
    const sqlite = 'await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'/insert_one`,newObject);';




    const str = `  import React, { useState } from "react";
  import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";
  import { Close } from "@/components/Icons";
  ${opt==='local'?'import { addItem } from "@/lib/LocalDatabase";'
  :opt === 'dexie'?'import {insertOne} from "@/lib/DexieDatabase";'
  :'import axios from "axios";'}
  
  const Add = ({ message }) => {
${stateVar}
      const [show, setShow] = useState(false);
  
  
      const resetVariables = () => {
          message("Ready to add new");        
${stateClear}
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
${getValue} 
          }
      }
  
  
      const saveHandler = ${opt==='local'?'':'async'} (e) => {
          e.preventDefault();
          try {
              const newObject = createObject();
              const response = ${opt==='local'?loc
              :opt==='dexie'?dex
              :opt==='mysql'?mysq
              :sqlite}
              message(${opt==='mysql'|| opt==='sqlite'?'response.data.message'              
              :'response.message'});
          } catch (error) {
              console.log(error);
              message("Error saving ${tbl} data.");
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
${dd}                                      
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
                  <span className="scale-y-125">AddNew</span>
              </div>
          </button>
          </>
      )
  }
  export default Add;
  
    `;

    return str;
}

export default Add;