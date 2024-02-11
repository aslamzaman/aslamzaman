"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/project/Add";
import Edit from "@/components/project/Edit";
import Delete from "@/components/project/Delete";
import { fetchAll } from "@/lib/DexieDatabase";


const Project = () => {
    const [projects, setProjects] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetchAll("project");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setProjects(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Project</h1>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects.length ? projects.map(project => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={project.id}>
                                        <td className="text-center py-2 px-4">{project.name}</td>
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={project.id} />
                                            <Delete message={messageHandler} id={project.id} />
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

export default Project;



