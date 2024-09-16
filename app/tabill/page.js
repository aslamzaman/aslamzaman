"use client";
import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";

import Add from "@/components/tabill/Add";
import Edit from "@/components/tabill/Edit";
import Delete from "@/components/tabill/Delete";



import { DropdownEn, TextDt, BtnSubmit } from "@/components/Form";

import { fetchDataFromAPI, formatedDateDot, inwordBangla, numberWithComma, dateDifferenceInDays,localStorageGetItem } from "@/lib/utils";

const date_format = dt => new Date(dt).toISOString().split('T')[0];
require("@/app/fonts/SUTOM_MJ-normal");
require("@/app/fonts/SUTOM_MJ-bold");

const dtAr = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
]


const Tabill = () => {
    const [tabills, setTabills] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");


    const [staffData, setStaffData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [unitData, setUnitData] = useState([]);
    const [taData, setTaData] = useState([]);
    const [daData, setDaData] = useState([]);

    const [staff, setStaff] = useState("Avmjvg Rvgvb,wmwbqi †cÖvMÖvg AM©vbvBRvi,SC,1699873936304");
    const [project, setProject] = useState("");
    const [unit, setUnit] = useState("1699882805516");
    const [dt1, setDt1] = useState("");

    const [total, setTotal] = useState("");


    useEffect(() => {
        setDt1(date_format(new Date()));
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const [staffs, projects, places, units, tas, das] = await Promise.all([
                    fetchDataFromAPI("staff"),
                    fetchDataFromAPI("project"),
                    fetchDataFromAPI("place"),
                    fetchDataFromAPI("unit"),
                    fetchDataFromAPI("ta"),
                    fetchDataFromAPI("da")
                ]);

                const scStaff = staffs.filter(staff => staff.placeId._id === "660ae2d4825d0610471e272d");
                const staffResult = scStaff.map(staff => {
                    const matcheDa = das.find(da => da.postId._id === staff.postId._id);
                    return {
                        ...staff,
                        da: matcheDa ? matcheDa.tk : 0
                    }
                })

                console.log(scStaff, projects, places, units, tas, das);

                const unitResult = units.map(unit => {
                    const matchTa = tas.find(ta => ta.unitId._id === unit._id);
                    return {
                        ...unit,
                        ta: matchTa ? matchTa.tk : 0
                    }
                })

                setStaffData(staffResult);
                setProjectData(projects);
                setUnitData(unitResult);
                setTaData(tas);
                setDaData(das);
                setWaitMsg('');
            } catch (err) {
                console.log(err);
            }
        }
        getData();

        const load = () => {
            let response = localStorageGetItem("tabill");
            let data = response.data;
            setTabills(data);
            const result = data.reduce((t, c) => t + parseFloat(c.taka), 0);
            setTotal(result)
        };
        load();
    }, [msg]);


    const msgHandler = (data) => {
        setMsg(data);
    }


    const handleCreate = (e) => {
        e.preventDefault();

        if (tabills.length < 1) {
            setMsg("No data!!");
            return false;
        }

        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        const data = {
            tabills: tabills,
            taData: taData,
            daData: daData,
            staff: staff,
            unit: unit,
            project: project,
            dt1: dt1
        }
        setWaitMsg('Please Wait...');
        console.log(data);
        setTimeout(() => {
            //------------------------------------------------------
            doc.addImage("/images/formats/tabill.png", "PNG", 0, 0, 210, 297);
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);
            doc.text(`${staff.split(',')[0]}`, 75, 56, null, null, "center");
            doc.text(`${staff.split(',')[1]}`, 145, 56, null, null, "left");
            doc.text(`${unit.split(',')[0]}`, 79, 64, null, null, "center");

            doc.setFont("times", "normal");
            doc.text(`${project}`, 168, 64, null, null, "center");
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(12);
            //----------------------------------------------------
            let y = 85;
            let total = 0;
            for (let i = 0; i < tabills.length; i++) {

                let expanse = 0;
                if (tabills[i].vehicle === "wba©vwiZ") {
                    expanse = unit.split(',')[1];
                } else {
                    expanse = tabills[i].taka
                }

                doc.text(`${formatedDateDot(tabills[i].dt, false)}`, 19.8, y + 1.5, null, null, "center");
                // doc.text(`${TaDtFormat(tabills[i].dt)[1]}`, 18.5, y + 3, null, null, "center");
                doc.text(`${tabills[i].place1}`, 37.6, y + 1.5, null, null, "center");
                doc.text(`${tabills[i].tm1}`, 53.5, y + 1.5, null, null, "center");
                doc.text(`${tabills[i].place2}`, 69.6, y + 1.5, null, null, "center");
                doc.text(`${tabills[i].tm2}`, 86, y + 1.5, null, null, "center");
                doc.text(`${tabills[i].cause}`, 121.6, y + 1.5, null, null, "center");
                doc.text(`${tabills[i].vehicle}`, 156.5, y + 1.5, null, null, "center");
                doc.text(`${numberWithComma(parseFloat(expanse))}`, 181, y + 1.5, null, null, "right");
                total = total + parseFloat(expanse);
                y = y + 5;
            }
            //----------------------------------------------------
            if (y < 210) {
                doc.line(179, y + 0.25, 166, 221);
            }
            const date1 = tabills[0].dt;
            const date2 = tabills[tabills.length - 1].dt;


            const firstDayTime = tabills[0].tm1;
            const lastDayTime = tabills[tabills.length - 1].tm2;


            const f1 = new Date(`January 01, 2000 ${firstDayTime}`).getTime();
            const f2 = new Date("January 01, 2000 12:00").getTime();
            const f3 = f1 - f2; // 7 -12 = -5
            let tourDays = 0;
            if (f3 < 0) {
                tourDays = dateDifferenceInDays(date1, date2, false);
            } else {
                tourDays = dateDifferenceInDays(date1, date2, false) - 0.5;
            }

            const t1 = new Date(`January 01, 2000 ${lastDayTime}`).getTime();
            const t2 = new Date("January 01, 2000 20:00").getTime();
            const t3 = t1 - t2; // 7- 8


            if (t3 < 0) {
                tourDays = tourDays + 0.5;
            } else {
                tourDays = tourDays + 1;
            }


            const daTaka = staff.split(',')[2];
            const totalDa = parseInt(daTaka) * parseFloat(tourDays);
            const gt = parseInt(totalDa) + parseInt(total);


            doc.text(`${formatedDateDot(date1, false)} †_‡K ${formatedDateDot(date2, false)} ZvwiL = ${tourDays} w\`b * ${daTaka} `, 66.5, 228, null, null, "left");
            doc.text(`${numberWithComma(totalDa)}`, 181, 228, null, null, "right");

            doc.text(`${numberWithComma(gt)}`, 181, 235, null, null, "right");


            // let t = parseInt(total).toString();
            doc.text(`${inwordBangla(gt)} UvKv gvÎ`, 47.5, 235, null, null, "left");
            doc.text(`${formatedDateDot(dt1, false)}`, 177.5, 271, null, null, "left");

            //------------------------------------------------------
            doc.save(new Date().toISOString() + "_TA_Bill.pdf");
            setWaitMsg('');
        }, 0);


    }

    const PrintHandler = () => {
        alert("No actions!");
    }
    // let stf = s.nm_bn + "," + s.post + "," + s.place + "," + s.post_id;
    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className='text-center text-2xl font-bold'>TA Bill</h1>
                <p className="text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <DropdownEn Title="Staff Name" Id="staff" Change={(e) => { setStaff(e.target.value) }} Value={staff}>
                                    {staffData.length ? staffData.map(staff => <option value={`${staff.nmBn},${staff.postId.nmBn},${staff.da}`} key={staff._id}>{staff.nmEn}</option>) : null}
                                </DropdownEn>
                                <DropdownEn Title="Project" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                                    {
                                        projectData.length ? projectData.map(project => <option value={project.name} key={project._id}>{project.name}</option>) : null}
                                </DropdownEn>
                                <TextDt Title="Date" Id="dt" Change={(e) => { setDt1(e.target.value) }} Value={dt1} />
                                <DropdownEn Title="Unit" Id="unit" Change={(e) => { setUnit(e.target.value) }} Value={unit}>
                                    {unitData.length ? unitData.map(unit => <option value={`${unit.nmBn},${unit.ta}`} key={unit._id}>{unit.nmEn}</option>) : null}
                                </DropdownEn>
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
                                        <th className="text-center border-b border-gray-200 py-2">Date</th>
                                        <th className="text-center border-b border-gray-200 py-2">From</th>
                                        <th className="text-center border-b border-gray-200 py-2">Tm1</th>
                                        <th className="text-center border-b border-gray-200 py-2">Where</th>
                                        <th className="text-center border-b border-gray-200 py-2">Tm2</th>
                                        <th className="text-center border-b border-gray-200 py-2">Vehicle</th>
                                        <th className="text-center border-b border-gray-200 py-2">Taka</th>
                                        <th className="text-center border-b border-gray-200 py-2">Cause</th>
                                        <th className="w-[100px] font-normal">
                                            <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                                <Add message={msgHandler} />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tabills.length
                                            ? tabills.map((ta) => {
                                                return (
                                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={ta.id}>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{ta.dt}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{ta.place1}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{ta.tm1}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{ta.place2}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{ta.tm2}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{ta.vehicle}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{ta.taka}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{ta.cause}</td>
                                                        <td className="flex justify-end items-center mt-1">
                                                            <Edit message={msgHandler} Id={ta.id} data={ta} />
                                                            <Delete message={msgHandler} Id={ta.id} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : null
                                    }
                                    <tr className="border-b border-gray-200 font-bold">
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-center py-2 px-4">{total}</td>
                                        <td className="text-center py-2 px-4"></td>
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
export default Tabill;
