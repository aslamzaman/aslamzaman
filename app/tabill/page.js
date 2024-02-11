"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, DropdownEn, TextDt } from "@/components/Form";
import Add from "@/components/tabill/Add";
import Edit from "@/components/tabill/Edit";
import Delete from "@/components/tabill/Delete";
import { getItems } from "@/lib/LocalDatabase";

import { Lib } from "@/lib/Lib";
import { jsPDF } from "jspdf";

import { fetchData, pdfCreation } from "./_lib/model";


require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");




const Tabill = () => {
    const [tabills, setTabills] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    const [total, setTotal] = useState("");

    //-------------------------------------------------------
    const [staffs, setStaffs] = useState([]);
    const [projects, setProjects] = useState([]);
    const [units, setUnits] = useState([]);
    const [tas, setTas] = useState([]);
    const [das, setDas] = useState([]);

    const [staff, setStaff] = useState("Avmjvg Rvgvb,wmwbqi †cÖvMÖvg AM©vbvBRvi,SC,1699873936304");
    const [project, setProject] = useState("MC");
    const [unit, setUnit] = useState("1699882798135");
    const [dt, setDt] = useState('');


    useEffect(() => {

        setDt(Lib.util.dateFormat(new Date(), "-"));

        const getData = async () => {
            await fetchData(data => {
                const response = data.staff;
                const joinStaffs = response.map(staff => {
                    const matchPost = data.post.find(post => parseInt(post.id) === parseInt(staff.post_id));
                    const matchPlace = data.place.find(place => parseInt(place.id) === parseInt(staff.place_id));
                    return {
                        ...staff,
                        post: matchPost.nm_bn,
                        place: matchPlace.name
                    }
                })
                setStaffs(joinStaffs);
                setProjects(data.project);
                setUnits(data.unit);
                setTas(data.ta);
                setDas(data.da);
            });
        };

        getData();


        const load = async () => {
            try {
                const response = getItems("tabill");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? -1 : 1);
              //  console.log(result)
                setTabills(result);
                const totalTk = data.reduce((t, c) => t + parseFloat(c.taka), 0);
                setTotal(totalTk)

            } catch (error) {
                console.log(error);
            }
        };
        load();

    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
        floatPrecision: 16
    });




    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            if (tabills.length < 1) {
                setMsg("No data!!");
                return false;
            }

            const data = {
                tabills: tabills,
                tas: tas,
                das: das,
                staff: staff,
                unit: unit,
                project: project,
                dt: dt
            }
            setMsg("Please wait...");

            setTimeout(() => {
                pdfCreation({ doc }, data);
                doc.save(new Date().toISOString() + "_TA_Bill.pdf");
                setMsg("PDF create completed.");
            }, 0);


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">TA Bill</h1>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">


                                <DropdownEn Title="Staff" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                                    {
                                        staffs.length
                                            ? staffs.map(staff => {
                                                let stf = staff.nm_bn + "," + staff.post + "," + staff.place + "," + staff.post_id;
                                                return <option value={stf} key={staff.id}>{staff.nm_en}</option>
                                            })
                                            : null
                                    }
                                </DropdownEn>


                                <DropdownEn Title="Project" Id="project" Change={e => setProject(e.target.value)} Value={project}>
                                    {
                                        projects.length
                                            ? projects.map(project => {
                                                return <option value={project.name} key={project.id}>{project.name}</option>
                                            })
                                            : null
                                    }
                                </DropdownEn>

                                <TextDt Title="Dt" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />


                                <DropdownEn Title="Unit" Id="unit" Change={e => setUnit(e.target.value)} Value={unit}>
                                    {
                                        units.length
                                            ? units.map(unit => {
                                                return <option value={unit.id} key={unit.id}>{unit.nm_en}</option>
                                            })
                                            : null
                                    }
                                </DropdownEn>

                                <div className="w-full flex justify-start">
                                    <BtnSubmit Title="Create Invoice" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">
                        <div className="px-4 lg:px-6 overflow-auto">
                            <p className="w-full text-sm text-red-700">{msg}</p>
                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="w-full bg-gray-200">
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Place1</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Tm1</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Place2</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Tm2</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Vehicle</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Cause</th>
                                        <th className="w-[100px] font-normal">
                                            <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                                <Add message={messageHandler} />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tabills.length ? tabills.map(tabill => {
                                            return (
                                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={tabill.id}>
                                                    <td className="text-center py-2 px-4 font-sutonny-n">{Lib.util.dateFormat(tabill.dt, '.')}</td>
                                                    <td className="text-center py-2 px-4 font-sutonny-n">{tabill.place1}</td>
                                                    <td className="text-center py-2 px-4 font-sutonny-n">{tabill.tm1}</td>
                                                    <td className="text-center py-2 px-4 font-sutonny-n">{tabill.place2}</td>
                                                    <td className="text-center py-2 px-4 font-sutonny-n">{tabill.tm2}</td>
                                                    <td className="text-center py-2 px-4 font-sutonny-n">{tabill.vehicle}</td>
                                                    <td className="text-center py-2 px-4 font-sutonny-n">{tabill.taka}</td>
                                                    <td className="text-center py-2 px-4 font-sutonny-n">{tabill.cause}</td>
                                                    <td className="flex justify-end items-center mt-1">
                                                        <Edit message={messageHandler} id={tabill.id} />
                                                        <Delete message={messageHandler} id={tabill.id} />
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

export default Tabill;



