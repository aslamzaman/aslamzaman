"use client";
import React, { useState, useEffect } from "react";
import { TextBn, DropdownEn, BtnSubmit, TextDt } from "@/components/Form";
import Add from "@/components/localta/Add";
import Edit from "@/components/localta/Edit";
import Delete from "@/components/localta/Delete";
import { getItems } from "@/lib/LocalDatabase";
import { fetchAll } from "@/lib/DexieDatabase";

import { Lib } from "@/lib/Lib";
import { jsPDF } from "jspdf";
import { LocalTaCreation } from "./_lib/model";

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");



const Localta = () => {
    const [localtas, setLocaltas] = useState([]);
    const [msg, setMsg] = useState("Data ready");

    const [staffs, setStaffs] = useState([]);
    const [projects, setProjects] = useState([]);

    const [staff, setStaff] = useState("");
    const [project, setProject] = useState("");
    const [dt, setDt] = useState('');
    const [subject, setSubject] = useState('');




    useEffect(() => {
        const fetchData = async (callback) => {
            try {
                const [staff, post, project] = await Promise.all([
                    fetchAll("staff"),
                    fetchAll("post"),
                    fetchAll("project")
                ]);

                callback({
                    staff: staff.data,
                    post: post.data,
                    project: project.data
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const getData = async () => {
            try {
                await fetchData(data => {
                    const joinStaff = data.staff.map(staff => {
                        const postMatch = data.post.find(post => parseInt(post.id) === parseInt(staff.post_id));
                        return {
                            ...staff,
                            post: postMatch === undefined ? 'Error!' : postMatch.nm_bn
                        }
                    });
                    setStaffs(joinStaff);
                    setProjects(data.project);
                });
            } catch (error) {
                console.log(error);
            };
        };
        getData();





        const load = () => {
            try {
                const response = getItems("localta");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setLocaltas(result);
            } catch (error) {
                console.log(error);
            }
        };
        load();
        setDt(Lib.util.dateFormat(new Date(), "-"));
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const createObject = () => {
        return {
            localtas: localtas,
            staff: staff,
            project: project,
            dt: dt,
            subject: subject
        }
    }


    const handleCreate = async (e) => {
        e.preventDefault();
        const response = getItems("localta");
        const data = response.data;

        if (data.length < 0) {
            setMsg("No data to creating localta.");
            return false;
        }

        try {
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true,
                floatPrecision: 16 // or "smart", default is 16
            });

            setMsg("Please wait...");

            setTimeout(() => {
                const newObject = createObject();
                LocalTaCreation({ doc }, newObject);
                doc.line(0, 148.5, 10, 148.5);
                doc.line(100, 148.5, 110, 148.5);
                doc.line(200, 148.5, 210, 148.5);
                doc.save(new Date().toISOString() + "_Local_TA_Bill.pdf");
                setMsg("PDF cteation completed.");
            }, 0);



        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Local TA</h1>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <TextDt Title="Date" Id="dt" Change={(e) => setDt(e.target.value)} Value={dt} />



                                <DropdownEn Title="Staff" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                                    {staffs.length ? staffs.map(staff => {
                                        let stf = staff.nm_bn + ", " + staff.post;
                                        return <option value={stf} key={staff.id}>{staff.nm_en}</option>
                                    })
                                        : null}
                                </DropdownEn>
                                <DropdownEn Title="Project" Id="project" Change={e => setProject(e.target.value)} Value={project}>
                                    {projects.length ? projects.map(project => <option value={project.name} key={project.id}>{project.name}</option>) : null}
                                </DropdownEn>

                                <TextBn Title="Subject" Id="subject" Change={(e) => { setSubject(e.target.value) }} Value={subject} Chr="50" />




                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Create Invoice" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">
                        <div className="px-4 lg:px-6 overflow-auto">
                            <p className="w-full text-sm text-red-700">{msg}</p>
                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="w-full bg-gray-200">
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Place1</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">T1</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Place2</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">T2</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Vehicle</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                        <th className="w-[100px] font-normal">
                                            <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                                <Add message={messageHandler} />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        localtas.length ? localtas.map(localta => {
                                            return (
                                                <tr className="border-b border-gray-200 hover:bg-gray-100 font-sutonny-n" key={localta.id}>
                                                    <td className="text-center py-2 px-4">{localta.place1}</td>
                                                    <td className="text-center py-2 px-4">{localta.t1}</td>
                                                    <td className="text-center py-2 px-4">{localta.place2}</td>
                                                    <td className="text-center py-2 px-4">{localta.t2}</td>
                                                    <td className="text-center py-2 px-4">{localta.vehicle}</td>
                                                    <td className="text-center py-2 px-4">{localta.taka}</td>
                                                    <td className="flex justify-end items-center mt-1">
                                                        <Edit message={messageHandler} id={localta.id} />
                                                        <Delete message={messageHandler} id={localta.id} />
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
                </div>
            </div>
        </>
    );
};

export default Localta;



