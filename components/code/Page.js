
const Page = (tbl, datas ,opt) => {

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


    let thead_string = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? thead_string = thead_string + `                                <th className="text-center border-b border-gray-200 px-4 py-2">${titleCase(d)}</th>`
                : thead_string = thead_string + `                                <th className="text-center border-b border-gray-200 px-4 py-2">${titleCase(d)}</th>\n`;
        }
    }
    );


    let td_string = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? td_string = td_string + `                                            <td className="text-center py-2 px-4">{${tbl}.${d}}</td>`
                : td_string = td_string + `                                            <td className="text-center py-2 px-4">{${tbl}.${d}}</td>\n`;
        }
    }
    );



    const url1 = "const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/" + tbl + "/read/${Id}`);";
    const url2 = "const response = await axios.put(`${Lib.url}/" + tbl + "/update/${Id}`, new" + titleCase(tbl) + "Object);";

    const errData = "console.error(`Error fetching " + tbl + " data: ${error}`);";
    const errData2 = " console.error(`Error updating " + tbl + ": ${error}`);";


    const stringData = data.map(t => ` ${t}`).toString();

// process.env.NEXT_PUBLIC_API_URL

const loc = 'getItems("' + tbl+ '");';
const dex = 'await fetchAll("'+ tbl+ '");';
const mysq = 'await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/'+ tbl+'`);';


    const str = `    "use client";
    import React, { useState, useEffect } from "react";
    import Add from "@/components/${tbl}/Add";
    import Edit from "@/components/${tbl}/Edit";    
    import Delete from "@/components/${tbl}/Delete";
    ${opt==='local'?'import { getItems } from "@/lib/LocalDatabase";'
    :opt === 'dexie'?'import {fetchAll} from "@/lib/DexieDatabase";'
    :'import axios from "axios";'}
    
    
    const ${titleCase(tbl)} = () => {
        const [${tbl}s, set${titleCase(tbl)}s] = useState([]);
        const [msg, setMsg] = useState("Data ready");
    
    
        useEffect(() => {
            const load = ${opt==='local'?'':'async'} () => {
                try {
                    const response = ${opt==='local'?loc
                    :opt==='dexie'?dex:mysq} 
                    const data = response.data;                    
                    const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                    set${titleCase(tbl)}s(result);
                } catch (error) {
                    console.log(error);
                }
            };
            load();
        }, [msg]);
    
    
        const messageHandler = (data) => {
            setMsg(data);
        }
    
    
        return (
            <>
                <div className="w-full my-6 lg:my-8">
                    <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">${titleCase(tbl)}</h1>
                </div>    
                <div className="px-4 lg:px-6">
                    <p className="w-full text-sm text-red-700">{msg}</p>    
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">                           
${thead_string}                                
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ${tbl}s.length ? ${tbl}s.map(${tbl} => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={${tbl}.id}>                                           
${td_string}                                            
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={${tbl}.id} />
                                                <Delete message={messageHandler} id={${tbl}.id} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    
    };
    
    export default ${titleCase(tbl)};
    
  
    `;

    return str;
}

export default Page;