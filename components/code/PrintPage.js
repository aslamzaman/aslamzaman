

const PrintPage = (tbl, datas, opt) => {

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


const loc = 'getItems("' + tbl+ '");';
const dex = 'await fetchAll("'+ tbl+ '");';
const mysq = 'await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'`);';
const sqlite = 'await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'`);';



  let str = `  import React, { useState } from "react";
  import { BtnEn, BtnSubmit, TextEn  } from "@/components/Form";
  import { jsPDF } from "jspdf";
  import { Close } from "@/components/Icons";
  ${opt==='local'?'import { getItems } from "@/lib/LocalDatabase";'
  :opt === 'dexie'?'import {fetchAll} from "@/lib/DexieDatabase";'
  :opt === 'mysql'?'import axios from "axios";";'
  :'import axios from "axios";'}

  
  const Print = ({ message }) => {
      const [${tbl}s, set${titleCase(tbl)}s] = useState([]);
      const [staff, setStaff] = useState("");
      const [show, setShow] = useState(false);
  
  
      const showPrintForm = ${opt==='local'?'':'async'} () => {
          setShow(true);
          message("Ready to print");
          try {
              const response =  ${opt==='local'?loc
              :opt==='dexie'?dex
              :opt==='mysql'?mysq
              :sqlite} 
              const data = response.data;              
              const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? -1 : 1);
              set${titleCase(tbl)}s(result);
          } catch (err) {
              console.log(err);
          }
      }
  
  
      const closePrintForm = () => {
          setShow(false);
          message("Data ready");
      }
  
  
      const printHandler = (e) => {
          e.preventDefault();
          message("Please wait...");

          const doc = new jsPDF({
              orientation: "p",
              unit: "mm",
              format: "a4",
              putOnlyUsedFonts: true,
              floatPrecision: 16
          });
  
          setTimeout(() => {
            let y = 20;
            for (let i = 0; i < ${tbl}s.length; i++) {
                doc.text("${tbl}", 30, y, null, null, "center");
                y = y + 6;
            }
            doc.save(new Date().toISOString() + "-${titleCase(tbl)}.pdf");
            message("Print completed.");
            setShow(false);
          }, 0);
      }
  
  
      return (
          <>
              {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <Close Click={closePrintForm} Size="w-8 h-8" />
                        </div>

                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={printHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Staff Name" Id="staff" Change={e => setStaff(e.target.value)} Value={staff} Chr="50" />
                                </div>
  
                                <div className="w-full flex justify-start">
                                    <BtnEn Title="Close" Click={closePrintForm} Class="bg-pink-600 hover:bg-pink-800 text-white" />
                                    <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
              )}
  
              <button onClick={showPrintForm} className="group px-1 py-1 text-sm font-bold text-blue-900 hover:text-blue-500">
                  <div className="flex justify-center items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-blue-900 group-hover:stroke-blue-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                      </svg>
                      <span className="scale-y-125">Print</span>
                  </div>
              </button>
  
  
  
          </>
      )
  }
  export default Print;
  
  `;
  

  return str;
}


export default PrintPage;
