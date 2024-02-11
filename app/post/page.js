"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/post/Add";
import Edit from "@/components/post/Edit";    
import Delete from "@/components/post/Delete";
import {fetchAll} from "@/lib/DexieDatabase";


const Post = () => {
    const [posts, setPosts] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetchAll("post"); 
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setPosts(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Post</h1>
            </div>    
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>    
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">                             
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name(English)</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name(Bangla)</th>                                
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.length ? posts.map(post => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={post.id}>                                           
                                        <td className="text-center py-2 px-4">{post.nm_en}</td>
                                        <td className="text-center py-2 px-4 font-sutonny-n">{post.nm_bn}</td>                                            
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={post.id} />
                                            <Delete message={messageHandler} id={post.id} />
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

export default Post;


