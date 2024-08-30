
"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/post/Add";
import Edit from "@/components/post/Edit";
import Delete from "@/components/post/Delete";
import Print from "@/components/post/Print";
import { fetchDataFromAPI } from "@/lib/utils";
import { Tiro_Bangla } from 'next/font/google';
const tiro = Tiro_Bangla({ subsets: ['bengali'], weight: "400" });





const Post = () => {
    const [posts, setPosts] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);
                setPosts(data);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Post</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>
            <div className="w-full lg:w-3/4 p-4 mx-auto border-2 shadow-md rounded-md">
                <div className="overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                                <th className="pl-4 text-start border-b border-gray-200 px-4 py-2">Nmen</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Nmbn</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Nmun</th>
                                <th className="w-[95px] font-normal">
                                    <div className="w-[90px] h-[45px] flex justify-end space-x-2 p-1">
                                        <Print data={posts} />
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length ? (
                                posts.map((post,i) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={post._id}>    
                                        <td className="text-center">{i+1}</td>
                                        <td className="pl-4 text-start">{post.nmEn}</td>
                                        <td className="text-center font-sutonnyN">{post.nmBn}</td>
                                        <td className={`text-center ${tiro.className}`}>{post.nmUn}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={post._id} data={posts} />
                                            <Delete message={messageHandler} id={post._id} data={posts} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 px-4">
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

export default Post;

