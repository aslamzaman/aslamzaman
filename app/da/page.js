"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/da/Add";
import Edit from "@/components/da/Edit";
import Delete from "@/components/da/Delete";
import { fetchAll } from "@/lib/DexieDatabase";


const Da = () => {
    const [das, setDas] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const [response, post] = await Promise.all([
                    fetchAll("da"),
                    fetchAll("post")
                ]);
                const data = response.data;
                const postData = post.data;

                const joinDa = data.map(d => {
                    const matchPost = postData.find(post => parseInt(post.id) === parseInt(d.post_id));
                    return {
                        ...d,
                        post: matchPost ? matchPost.nm_en : 'Error!'
                    }
                })

                const result = joinDa.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setDas(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Daily Allowance (DA)</h1>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Post</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            das.length ? das.map(da => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={da.id}>
                                        <td className="text-center py-2 px-4">{da.post}</td>
                                        <td className="text-center py-2 px-4">{da.tk}</td>
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={da.id} />
                                            <Delete message={messageHandler} id={da.id} />
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

export default Da;


