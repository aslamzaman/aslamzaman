import { titleCamelCase, titleCase } from "@/lib/utils";
export const Page = (tbl, datas) => {

    const replaceQutation = datas.replaceAll('`', '');
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());

    let thead = "";

    for (let i = 1; i < data.length; i++) {
        thead += `                                    <th className="text-center border-b border-gray-200 px-4 py-2">${titleCase(data[i])}</th>${i===data.length-1?'':'\n'}`;
    }

    let td = "";
    for (let i = 1; i < data.length; i++) {
        td += `                                                <td className="text-center py-2 px-4">{${tbl}.${data[i]}}</td>${i===data.length-1?'':'\n'}`;
    }



const str = `"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/${tbl}/Add";
import Edit from "@/components/${tbl}/Edit";
import Delete from "@/components/${tbl}/Delete";
import { localStorageGetItem } from "@/lib/utils";


const ${titleCamelCase(tbl)} = () => {
    const [${tbl}s, set${titleCamelCase(tbl)}s] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = () => {
            setWaitMsg('Please Wait...');
            try {
                const data = localStorageGetItem("${tbl}");
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                set${titleCamelCase(tbl)}s(result);
                setWaitMsg('');
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
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">${titleCase(tbl)}</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="w-full lg:w-3/4 mx-auto border-2 p-4 shadow-md rounded-md">
                <div className="overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
${thead}
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
${td}                                            
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={${tbl}.id} data={${tbl}} />
                                                <Delete message={messageHandler} id={${tbl}.id} data={${tbl}} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ${titleCamelCase(tbl)};
  
`;

    return str;
}

