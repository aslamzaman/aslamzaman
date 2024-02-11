"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/author/Add";
import Edit from "@/components/author/Edit";    
import Delete from "@/components/author/Delete";
import {fetchAll} from "@/lib/DexieDatabase";


const Author = () => {
    const [authors, setAuthors] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetchAll("author"); 
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setAuthors(result);
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
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Author</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                             
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Deg</th>                                
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authors.length ? authors.map(author => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={author.id}>                                           
                                        <td className="text-center py-2 px-4">{author.name}</td>
                                        <td className="text-center py-2 px-4">{author.deg}</td>                                            
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={author.id} />
                                            <Delete message={messageHandler} id={author.id} />
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

export default Author;


