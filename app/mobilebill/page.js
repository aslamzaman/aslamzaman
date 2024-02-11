"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, TextDt, DropdownEn } from "@/components/Form";
import Add from "@/components/mobilebill/Add";
import Edit from "@/components/mobilebill/Edit";
import Delete from "@/components/mobilebill/Delete";
import { getItems } from "@/lib/LocalDatabase";
import { fetchAll } from "@/lib/DexieDatabase";

import { Lib } from "@/lib/Lib";
import { jsPDF } from "jspdf";

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");


const MobileBillCreation = ({ doc }, data) => {

    const projects = data.projects;
    const project_id = data.project_id;
    const dt = data.dt;
    const mobilebills = data.mobilebills;
    const p_name = projects.find(p => parseInt(p.id) === parseInt(project_id));


    doc.addImage("/images/formats/mobilebill.png", "PNG", 0, 0, 210, 297);
    doc.setFont("times", "italic");
    doc.setFontSize(14);
    doc.text(`${p_name.name}`, 103, 52.5, null, null, "left");
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(` ${Lib.util.dateFormat(dt, ".")}`, 103, 58.25, null, null, "left");

    let y = 70;

    doc.line(15, y, 195, y) // horizontal line
    doc.line(15, y + 7, 195, y + 7) // horizontal line

    doc.line(15, y, 15, y + 7) // vertical line
    doc.line(25, y, 25, y + 7) // vertical line
    doc.line(110, y, 110, y + 7) // vertical line
    doc.line(168, y, 168, y + 7) // vertical line
    doc.line(195, y, 195, y + 7) // vertical line

    doc.setFont("times", "bold");
    doc.text("SL", 20, y + 5, null, null, "center");
    doc.text("USER NAME", 35, y + 5, null, null, "left");
    doc.text("NUMBER", 140, y + 5, null, null, "center");
    doc.text("TAKA", 182, y + 5, null, null, "center");
    doc.setFont("times", "normal");
    //----------------------------------------------------

    let total = 0;
    for (let i = 0; i < mobilebills.length; i++) {
        doc.text(`${i + 1}`, 20, y + 12, null, null, "center");
        doc.text(`${mobilebills[i].m_name}`, 27, y + 12, null, null, "left");
        doc.text(`${mobilebills[i].m_num}`, 140, y + 12, null, null, "center");
        doc.text(`${mobilebills[i].taka}`, 182, y + 12, null, null, "center");

        doc.line(15, y + 14, 195, y + 14) // horizontal line

        doc.line(15, y + 7, 15, y + 14) // vertical line  
        doc.line(25, y + 7, 25, y + 14) // vertical line
        doc.line(110, y + 7, 110, y + 14) // vertical line
        doc.line(168, y + 7, 168, y + 14) // vertical line
        doc.line(195, y + 7, 195, y + 14) // vertical line

        total = total + parseFloat(mobilebills[i].taka);
        y = y + 7;
    }

    doc.line(15, y + 14, 195, y + 14) // horizontal line
    doc.line(15, y + 7, 15, y + 14) // vertical line
    doc.line(25, y + 7, 25, y + 14) // vertical line
    doc.line(168, y + 7, 168, y + 14) // vertical line
    doc.line(195, y + 7, 195, y + 14) // vertical line


    doc.setFont("times", "bold");
    doc.text("TOTAL", 35, y + 12, null, null, "left");
    doc.text(`${total}`, 182, y + 12, null, null, "center");
    doc.setFont("times", "normal");
    let inodrd = Lib.util.inword.en(parseInt(total));
    doc.text(`INWORD: ${inodrd.toUpperCase()} ONLY`, 15, y + 19, null, null, "left");


    doc.text("Prepared By:", 15, y + 45, null, null, "left");
    doc.text("Aslam Zaman", 15, y + 45 + 6, null, null, "left");
    doc.text("Senior Program Organizer", 15, y + 45 + 12, null, null, "left");
}




const Mobilebill = () => {
    const [msg, setMsg] = useState("Data ready");
    const [mobilebills, setMobilebills] = useState([]);
    const [projects, setProjects] = useState([]);

    const [dt, setDt] = useState("");
    const [project_id, setProject_id] = useState("");

    const [total, setTotal] = useState(0);


    const fetchData = async (callback) => {
        try {

            const [mobile, project] = await Promise.all([
                fetchAll("mobile"),
                fetchAll("project")
            ]);

            callback({
                mobile: mobile.data,
                project: project.data
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    useEffect(() => {

        const load = async () => {
            try {
                const response = getItems("mobilebill");
                const mobilebillData = response.data;

                await fetchData(data => {
                    const joinData = mobilebillData.map(d => {
                        const matchMobile = data.mobile.find(mobile => parseInt(mobile.id) === parseInt(d.mobile_id));
                        return {
                            ...d,
                            m_name: matchMobile.name,
                            m_num: matchMobile.mobile,
                        }
                    })

                    setMobilebills(joinData);
                    setProjects(data.project);

                    const totalTaka = joinData.reduce((t, c) => t + parseInt(c.taka), 0);
                    setTotal(totalTaka);
                    setDt(Lib.util.dateFormat(new Date(), "-"));
                });

            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const createObject = () => {
        return {
            projects: projects,
            dt: dt,
            project_id: project_id,
            mobilebills: mobilebills // localStorage mobile
        }
    }


    const handleCreate = (e) => {
        e.preventDefault();
        if (mobilebills.length < 0) {
            setMsg("No data to creating mobile.");
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
            console.log(newObject);

            setTimeout(() => {
                MobileBillCreation({ doc }, newObject);
                doc.save(`${new Date().toISOString()}-mobile-bill.pdf`);
                setMsg("PDF create completed.");
            }, 0);


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Mobile Bill</h1>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                                <DropdownEn Title="Project" Id="project_id" Change={e => setProject_id(e.target.value)} Value={project_id}>
                                    {projects.length ? projects.map(project => <option value={project.id} key={project.id}>{project.name}</option>) : null}
                                </DropdownEn>
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
                                        <th className="text-left border-b border-gray-200 px-4 py-2">User</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Mobile Number</th>
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
                                        mobilebills.length ? mobilebills.map(mobilebill => {
                                            return (
                                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={mobilebill.id}>
                                                    <td className="text-left py-2 px-4">{mobilebill.m_name}</td>
                                                    <td className="text-center py-2 px-4">{mobilebill.m_num}</td>
                                                    <td className="text-center py-2 px-4">{mobilebill.taka}</td>
                                                    <td className="flex justify-end items-center mt-1">
                                                        <Edit message={messageHandler} id={mobilebill.id} />
                                                        <Delete message={messageHandler} id={mobilebill.id} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            : null
                                    }

                                    <tr className="border-b border-gray-200 hover:bg-gray-100 font-bold">
                                        <td className="text-left py-2 px-4">Total</td>
                                        <td className="text-center py-2 px-4"></td>
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

export default Mobilebill;



