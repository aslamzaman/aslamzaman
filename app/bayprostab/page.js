"use client";
import React, { useState, useEffect } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextDt, TextBn, TextareaBn } from "@/components/Form";
import Add from "@/components/bayprostab/Add";
import Edit from "@/components/bayprostab/Edit";
import Delete from "@/components/bayprostab/Delete";
import { getItems } from "@/lib/LocalDatabase";
import { fetchAll } from "@/lib/DexieDatabase";
import { Format } from "./_lib/format";

import { Lib } from "@/lib/Lib";
import { jsPDF } from "jspdf";
import { resolve } from "styled-jsx/css";

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");


const Bayprostab = () => {
    const [bayprostabs, setBayprostabs] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    //------------------------------------------------------------
    const [staffs, setStaffs] = useState([]);
    const [projects, setProjects] = useState([]);

    const [staff_id, setStaff_id] = useState('');
    const [project_id, setProject_id] = useState('');
    const [dt, setDt] = useState('');
    const [dept, setDept] = useState('');
    const [subject, setSubject] = useState('');
    const [notes, setNotes] = useState(`Mvwoi R¡vjvwb (AK‡Ub) cÖ‡qvRb Abyhvqx wewfbœ cv¤ú †_‡K µq Kiv n‡e 
  
  
  
  
  
  
    µq m¤úv\`‡Ki bvg †eqvivi †PK n‡e`);


    const [total, setTotal] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [staff, project] = await Promise.all([
                    fetchAll("staff"),
                    fetchAll("project")
                ]);
                setStaffs(staff.data);
                setProjects(project.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();


        const load = () => {
            try {
                const response = getItems("bayprostab");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? -1 : 1);
                setBayprostabs(result);
                const totalTaka = data.reduce((t, c) => t + (parseFloat(c.nos) * parseFloat(c.taka)), 0);
                setTotal(totalTaka);
            } catch (error) {
                console.log(error);
            }
        };
        load();
        
        setStaff_id('1699873583579');
        setProject_id('1699885557183');
        setDt(Lib.util.dateFormat(new Date(), "-"));    
        setDept('ms¯’vcb');
        setSubject('mvwf©m †m›Uv‡ii Mvwoi R¡vjvwb (AK‡Ub) µq');


    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const createObject = () => {
        return {
            id: Date.now(),
            staff_id: staff_id,
            staff: staffs.find(staff => parseInt(staff.id) === parseInt(staff_id)).nm_bn,
            project_id: project_id,
            project: projects.find(project => parseInt(project.id) === parseInt(project_id)).name,
            dt: dt,
            dept: dept,
            subject: subject,
            notes: notes,
            db: bayprostabs
        }
    }


    const handleCreate = async (e) => {
        e.preventDefault();
        if (bayprostabs.length < 1) {
            setMsg("No data to creating bayprostab.");
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
            const newObject = createObject();
            setMsg("Please wait...");
            setTimeout(() => {
                Format({ doc }, newObject);
                doc.save(new Date().toISOString() + "-Bayprostab.pdf");
                setMsg("Pdf create completed.");
            }, 0);
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab</h1>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-4 my-4">
                                <div className="w-full grid grid-cols-3 gap-3">
                                    <div className="col-span-2">
                                        <DropdownEn Title="Staff" Id="staff_id" Change={e => setStaff_id(e.target.value)} Value={staff_id}>
                                            {staffs.length ? staffs.map(staff => <option value={staff.id} key={staff.id}>{staff.nm_en}</option>) : null}
                                        </DropdownEn>
                                    </div>
                                    <DropdownEn Title="Project" Id="project_id" Change={e => setProject_id(e.target.value)} Value={project_id}>
                                        {projects.length ? projects.map(project => <option value={project.id} key={project.id}>{project.name}</option>) : null}
                                    </DropdownEn>
                                </div>
                                <div className="w-full grid grid-cols-2 gap-3">
                                    <TextDt Title="Dt" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextBn Title="Dept" Id="dept" Change={e => setDept(e.target.value)} Value={dept} Chr="50" />
                                </div>
                                <TextBn Title="Subject" Id="subject" Change={e => setSubject(e.target.value)} Value={subject} Chr="200" />
                                <TextareaBn Title="Notes" Id="notes" Rows="2" Change={e => setNotes(e.target.value)} Value={notes} />
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Create" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">
                        <div className="px-4 lg:px-6 overflow-auto">
                            <p className="w-full text-sm text-red-700">{msg}</p>

                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="w-full bg-gray-200">
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Item</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Nos</th>
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
                                        bayprostabs.length ? bayprostabs.map(bayprostab => {
                                            return (
                                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={bayprostab.id}>
                                                    <td className={`text-center py-2 px-4 ${parseFloat(bayprostab.taka) === 0 ? 'font-sans' : 'font-sutonny-n'}`}>{bayprostab.item}</td>
                                                    <td className="text-center py-2 px-4">{bayprostab.nos}</td>
                                                    <td className="text-center py-2 px-4">{bayprostab.taka}</td>
                                                    <td className="flex justify-end items-center mt-1">
                                                        <Edit message={messageHandler} id={bayprostab.id} />
                                                        <Delete message={messageHandler} id={bayprostab.id} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            : null
                                    }
                                    <tr className="border-b border-gray-200 hover:bg-gray-100 font-bold">
                                        <td className="text-center py-2 px-4">Total</td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-center py-2 px-4">{total}</td>
                                        <td className="flex justify-end items-center mt-1"> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Bayprostab;



