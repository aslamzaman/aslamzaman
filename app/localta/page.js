"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Add from "@/components/localta/Add";
import Edit from "@/components/localta/Edit";
import Delete from "@/components/localta/Delete";


import { fetchData } from "@/lib/utils/FetchData";
import { getItems } from "@/lib/utils/LocalDatabase";

import { DropdownEn, TextDt, TextBn, BtnSubmit } from "@/components/Form";
import { inwordBn } from "@/lib/InwordBn";

require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib/fonts/SUTOM_MJ-bold");

const date_format = dt => new Date(dt).toISOString().split('T')[0];


const LocalTaCreation = ({ doc }, data) => {
    const localtas = data.localtas;
    const staff = data.staff;
    const subject = data.subject;
    const project = data.project;
    const dt = data.dt;


    doc.addImage("/images/formats/localtasingle.png", "PNG", 0, 0, 210, 297);
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(`${project}`, 181, 10, null, null, "center");
    doc.line(165, 11, 197, 11);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);
    //----------------------------------------------------
    let y = 67;
    let total = 0;
    for (let i = 0; i < localtas.length; i++) {
        let tick = localtas[i].vehicle;
        let x = 0;
        let x1 = 0;
        let x2 = 0;

        if (tick === "evm") {
            x = 105;
            x1 = 130;
            x2 = 150;
        } else if (tick === "wmGbwR") {
            x = 128;
            x1 = 107;
            x2 = 150;
        } else if (tick === "wi·v") {
            x = 148;
            x1 = 130;
            x2 = 107;
        }
        doc.text(`${localtas[i].place1}`, 27, y + (i * 6), null, null, "center");
        doc.text(`${localtas[i].t1}`, 48.5, y + (i * 6), null, null, "center");

        doc.text(`${localtas[i].place2}`, 69.5, y + (i * 6), null, null, "center");
        doc.text(`${localtas[i].t2}`, 92, y + (i * 6), null, null, "center");

        doc.addImage("/images/tick_mark/tick.png", "PNG", x, y - 4 + (i * 6), 4.25, 4.25);
        doc.text(`-`, x1, y + (i * 6), null, null, "center");
        doc.text(`-`, x2, y + (i * 6), null, null, "center");

        doc.text(`${parseFloat(localtas[i].taka).toFixed(2)}`, 195, y + (i * 6), null, null, "right");
        total = total + parseFloat(localtas[i].taka);
    }

    doc.text(`${total.toFixed(2)}`, 195, 113, null, null, "right");
    let t = parseInt(total).toString();
    doc.text(`${inwordBn(t)} UvKv gvÎ`, 39, 113.6, null, null, "left");


    doc.text(`${staff}`, 97, 35.6, null, null, "center");
    doc.text(`${date_format(dt)}`, 178, 35, null, null, "center");
    doc.text("mv‡m", 178, 44, null, null, "center");
    doc.text(`${subject}`, 89, 44, null, null, "center");

}


const Localta = () => {
    const [localtas, setLocaltas] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");

    const [staffData, setStaffData] = useState([]);
    const [projectData, setProjectData] = useState([]);

    const [staff, setStaff] = useState("");
    const [project, setProject] = useState("");
    const [subject, setSubject] = useState("");
    const [dt, setDt] = useState("");

    const [total, setTotal] = useState("");



    useEffect(() => {
        setDt(date_format(new Date()));

        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const [staffs, projects] = await Promise.all([
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`),
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`)
                ]);
                const result = staffs.filter(staff => staff.placeId._id === "660ae2d4825d0610471e272d");
                setStaffData(result);
                setProjectData(projects);
                setWaitMsg('');
            } catch (err) {
                console.log(err);
            }
        }
        getData();



        const load = () => {
            let response = getItems("localta");
            const data = response.data;
            setLocaltas(data);
            const result = data.reduce((t, c) => t + parseFloat(c.taka), 0);
            setTotal(result);
        };
        load();
    }, [msg]);


    const msgHandler = (data) => {
        setMsg(data);
    }

    const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
        floatPrecision: 16
    });



    const handleCreate = (e) => {
        e.preventDefault();

        if (localtas.length < 1) {
            setMsg("No data!!");
            return false;
        }

        const data = {
            localtas: localtas,
            staff: staff,
            subject: subject,
            project: project,
            dt: dt
        }
        setWaitMsg('Please Wait...');

        setTimeout(() => {
            LocalTaCreation({ doc }, data);
            doc.line(0, 148.5, 10, 148.5);
            doc.line(100, 148.5, 110, 148.5);
            doc.line(200, 148.5, 210, 148.5);
            doc.save(new Date().toISOString() + "_Local_TA_Bill.pdf");
            setWaitMsg('');
        }, 0);


    }


    const PrintHandler = () => {
        alert("No actions!");
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Local TA</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <DropdownEn Title="Staff Name" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                                    {staffData.length ? staffData.map(staff => <option value={`${staff.nmBn}, ${staff.postId.nmBn}`} key={staff._id}>{staff.nmEn}</option>) : null}
                                </DropdownEn>
                                <DropdownEn Title="Project" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                                    {projectData.length ? projectData.map(project => <option value={project.name} key={project._id}>{project.name}</option>) : null}
                                </DropdownEn>
                                <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                                <TextBn Title="Subject" Id="subject" Change={(e) => { setSubject(e.target.value) }} Value={subject} Chr="50" />
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">
                        <div className="px-4 lg:px-6 overflow-auto">
                            <p className="w-full text-sm text-red-700">{msg}</p>
                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="w-full bg-gray-200">
                                        <th className="text-center border-b border-gray-200 py-2">Place1</th>
                                        <th className="text-center border-b border-gray-200 py-2">T1</th>
                                        <th className="text-center border-b border-gray-200 py-2">Place2</th>
                                        <th className="text-center border-b border-gray-200 py-2">T2</th>
                                        <th className="text-center border-b border-gray-200 py-2">Vehicle</th>
                                        <th className="text-center border-b border-gray-200 py-2">Taka</th>
                                        <th className="font-normal text-start flex justify-end mt-1">
                                            <Add Msg={msgHandler} />
                                            <button onClick={PrintHandler} className="w-7 h-7 bg-green-600 hover:bg-green-800 text-white flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                                </svg>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        localtas.length
                                            ? localtas.map((localta) => {
                                                return (
                                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={localta.id}>
                                                        <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{localta.place1}</td>
                                                        <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{localta.t1}</td>
                                                        <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{localta.place2}</td>
                                                        <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{localta.t2}</td>
                                                        <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{localta.vehicle}</td>
                                                        <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{localta.taka}</td>
                                                        <td className="flex justify-end items-center mt-1">
                                                            <Edit Msg={msgHandler} Id={localta.id} data={localtas} />
                                                            <Delete Msg={msgHandler} Id={localta.id} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : null
                                    }
                                    <tr className="border-b border-gray-200 font-bold">
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-center py-2 px-4">{total}</td>
                                        <td className="flex justify-end items-center mt-1">
                                        </td>
                                    </tr>
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
