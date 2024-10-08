
const Page = (tbl, datas) => {

    const titleCase = (str) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`', '');
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());



    let thead_string = "";
    data.map((d, i) => {
        if (i < data.length - 1) {
            if (i > 0) {
                thead_string = thead_string + `                                <th className="text-center border-b border-gray-200 px-4 py-1">${titleCase(d)}</th>\n`
            }
        }
    }
    );


    let td_string = "";
    data.map((d, i) => {
        if (i < data.length - 1) {
            if (i > 0) {
                td_string = td_string + `                                        <td className="text-center py-1 px-4">{${tbl}.${d}}</td>\n`
            }
        }
    });


    //-------------------------------
    let loadMongo = "";
    loadMongo += '                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/' + tbl + '`, {' + '\n';
    loadMongo += '                        method: "GET",' + '\n';
    loadMongo += '                        headers: { "Content-Type": "application/json" }' + '\n';
    loadMongo += '                    });' + '\n';
    loadMongo += '                    if (!response.ok) {' + '\n';
    loadMongo += '                        throw new Error("Failed to fetch data");' + '\n';
    loadMongo += '                    }' + '\n';
    loadMongo += '                    const data = await response.json();' + '\n';
    loadMongo += '                    // console.log(data);\n';
    loadMongo += '                    set' + titleCase(tbl) + 's(data);';
    //-------------




const str = `"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/${tbl}/Add";
import Edit from "@/components/${tbl}/Edit";
import Delete from "@/components/${tbl}/Delete";
// import Print from "@/components/${tbl}/Print";
import { fetchDataFromAPI } from "@/lib/utils";


const ${titleCase(tbl)} = () => {
    const [${tbl}s, set${titleCase(tbl)}s] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await fetchDataFromAPI("${tbl}");
                set${titleCase(tbl)}s(data);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
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
            <div className="px-4 lg:px-6">
                <div className="p-4 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
${thead_string}                                <th className="w-[95px] border-b border-gray-200 px-4 py-2">
                                    <div className="w-[90px] h-[45px] flex justify-end space-x-2 p-1 font-normal">
                                        {/* <Print data={${tbl}s} /> */}
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {${tbl}s.length ? (
                                ${tbl}s.map(${tbl} => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={${tbl}._id}>    
${td_string}                                        <td className="text-center py-2">
                                            <div className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                                <Edit message={messageHandler} id={${tbl}._id} data={${tbl}} />
                                                <Delete message={messageHandler} id={${tbl}._id} data={${tbl}} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={${data.length-1}} className="text-center py-10 px-4">
                                        Data not available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

};

export default ${titleCase(tbl)};

`;
return str;
}
export default Page;
