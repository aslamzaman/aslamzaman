"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/bayprostab/Add";
import Edit from "@/components/bayprostab/Edit";
import Delete from "@/components/bayprostab/Delete";
import { fetchAll } from "@/lib/DexieDatabase";

import { jsPDF } from "jspdf";
import { BtnEn, DropdownEn, TextBn, TextDt, TextareaBn } from "@/components/Form";

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");

import { Format } from "./_lib/format";
import { Lib } from "@/lib/Lib";



const Bayprostab = () => {
    const [bayprostabs, setBayprostabs] = useState([]);
    const [totalTaka, setTotalTaka] = useState("0");
    const [msg, setMsg] = useState("Data ready");

    const [staff, setStaff] = useState("Avmjvg Rvgvb");
    const [project, setProject] = useState("GO");
    const [dt, setDt] = useState("");
    const [dpt, setDpt] = useState("ms¯’vcb");
    const [subject, setSubject] = useState("mvwf©m †m›Uv‡ii Mvwoi R¡vjvwb (AK‡Ub) µq");
    const [note, setNote] = useState(`Mvwoi R¡vjvwb (AK‡Ub) cÖ‡qvRb Abyhvqx wewfbœ cv¤ú †_‡K µq Kiv n‡e 
  
  
  
  
  
  
  µq m¤úv\`‡Ki bvg †eqvivi †PK n‡e`);

    const [staffData, setStaffData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(false);







    useEffect(() => {
        const load = async () => {
            try {

                const localData = localStorage.getItem('bayprostab_data');
                const jsonData = JSON.parse(localData);
                console.log(jsonData)
                if (localData) {                  
                    setStaff(jsonData.name);
                    setProject(jsonData.project);
                    setDt(Lib.util.dateFormat(jsonData.dt));
                    setDpt(jsonData.dpt);
                    setSubject(jsonData.subject);
                    setNote(jsonData.note);
                }
                //---------------------------------------------------

                const [staffs, projects] = await Promise.all([fetchAll("staff"), fetchAll("project")]);
                const staffData = staffs.data;
                const projectData = projects.data;

                const resultDrop = staffData.filter(s => parseInt(s.place_id) === 1699884047193);
                setStaffData(resultDrop);
                setProjectData(projectData);


                const response = await fetchAll("bayprostab");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
                setBayprostabs(result);

                const sumTaka = data.reduce((t, c) => t + (parseFloat(c.nos) * parseFloat(c.taka)), 0);
                setTotalTaka(sumTaka);
            } catch (error) {
                console.log(error);
            }
        };
        load();
        setDt(Lib.util.dateFormat(new Date(), '-'));

    }, [msg]);



    const messageHandler = (data) => {
        setMsg(data);
    }



    const createHandler = () => {
        setLoading(true);

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });

        let hd = bayprostabs.find(t => parseInt(t.taka) === 0);
        if (bayprostabs.length < 2 || hd === undefined) {
            setMsg("No data or budget head!");
            return false;
        }

        const data = {
            name: staff,
            project: project,
            dt: dt,
            dpt: dpt,
            subject: subject,
            note: note,
            db: bayprostabs
        }
        setTimeout(() => {
            localStorage.setItem('bayprostab_data', JSON.stringify(data));
            Format({ doc }, data);
            setLoading(false);
            doc.save(new Date().toISOString() + "-Bayprostab.pdf");
        }, 0);
    }



    return (
        <>
            {
                loading ? (
                    <div className="w-full my-6 lg:my-10" >
                        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Please Wait...</h1>
                    </div >
                ) : (
                    <div>
                        <div className="w-full my-6 lg:my-10">
                            <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab</h1>
                        </div>

                        <div className="w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">

                            <div className='p-4 lg:p-6 border-2 border-blue-900 rounded-md'>

                                <div className='w-full grid grid-cols-4 gap-4'>
                                    <div className="w-full col-span-2 md:col-span-3">
                                        <DropdownEn Title="Staff Name" Id="staff" Change={(e) => { setStaff(e.target.value) }} Value={staff}>
                                            {
                                                staffData.map((s, i) => {
                                                    return <option value={s.nm_bn} key={i}>{s.nm_en}</option>
                                                })
                                            }
                                        </DropdownEn>
                                    </div>
                                    <div className="full col-span-2 md:col-span-1">
                                        <DropdownEn Title="Project" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                                            {
                                                projectData.map((p, i) => {
                                                    return <option value={p.name} key={i}>{p.name}</option>
                                                })
                                            }
                                        </DropdownEn>
                                    </div>
                                    <div className="w-full col-span-2">
                                        <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                                    </div>

                                    <div className="w-full col-span-2">
                                        <TextBn Title="Department" Id="dpt" Change={(e) => { setDpt(e.target.value) }} Value={dpt} Chr="50" />
                                    </div>


                                    <div className="w-full col-span-4">
                                        <TextBn Title="Subject" Id="subject" Change={(e) => { setSubject(e.target.value) }} Value={subject} Chr="100" />
                                    </div>


                                    <div className="w-full col-span-4">
                                        <TextareaBn Title="Notes" Id="note" Rows="2" Change={(e) => { setNote(e.target.value) }} Value={note} />
                                    </div>

                                    <div className="w-full col-span-4 md:col-span-2">
                                        <BtnEn Title="Create" Click={createHandler} Class="w-full bg-gradient-to-r from-white via-red-800 to-white hover:bg-green-800 text-white" />
                                    </div>

                                </div>


                            </div>


                            <div className='p-4 lg:p-6 border-2 border-blue-900 rounded-md'>
                                <p className="w-full text-sm text-red-700">{msg}</p>
                                <table className="w-full border border-gray-200">
                                    <thead>
                                        <tr className="w-full bg-gray-200">
                                            <th className="text-start border-b border-gray-200 px-4 py-2">Item</th>
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Nos</th>
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                                <Add message={messageHandler} />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bayprostabs.length ? bayprostabs.map((bayprostab, i) => {
                                                return (
                                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={bayprostab.id}>
                                                        <td className={`text-start py-2 pl-6 ${parseFloat(bayprostab.taka) === 0 ? 'font-sans' : 'font-sutonny-n'}`}>{i + 1}. {bayprostab.item}</td>
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
                                            <td className="text-start py-2 px-4">Total</td>
                                            <td className="text-center py-2 px-4"></td>
                                            <td className="text-center py-2 px-4">{totalTaka}</td>
                                            <td className="flex justify-end items-center mt-1">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                )}
        </>
    )
}

export default Bayprostab;