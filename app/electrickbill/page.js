"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { BtnSubmit, TextEn, TextDt, DropdownEn } from "@/components/Form";
import { Lib } from "@/lib/Lib";
import { MonthsObject, YearObject, Data, Format} from './_lib/model';


const Electrickbill = () => {
    const [msg, setMsg] = useState("Data ready");
    const [dt, setDt] = useState('');
    const [staff, setStaff] = useState('');
    const [project, setProject] = useState('');
    const [mnth, setMnth] = useState('');
    const [yr, setYr] = useState('');
    const [taka, setTaka] = useState('');

    const [staffs, setStaffs] = useState([]);
    const [projects, setProjects] = useState([]);
    const [mnths, setMnths] = useState([]);
    const [yrs, setYrs] = useState([]);




    useEffect(() => {
        const load = async () => {
            try {
                setMsg("Ready to works");
                await Data(data => {
                    setStaffs(data.staff);
                    setProjects(data.project);                    
                })
                setMnths(MonthsObject);
                setYrs(YearObject);
                //-----------------------

                setDt(Lib.util.dateFormat(new Date(), '-'));
                setStaff('Aslam Zaman,Senior Program Organizer');
                setProject('GO');
                setMnth('January');
                setYr('2024');
                setTaka('5000');
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);



    const createObject = () => {
        return {
            dt: dt,
            staff: staff,
            project: project,
            mnth: mnth,
            yr: yr,
            taka: taka
        }
    }



    const createHandler = (e) => {
        e.preventDefault();
        setMsg("Please wait...");
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });


        try {
            setTimeout(() => {
                const newObject = createObject();
                Format({doc}, newObject);               
                doc.save(new Date().toISOString() + "-electrickbill.pdf");
                setMsg("PDF Created Completed.");
            }, 0);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Electrickbill</h1>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-[calc(full-20px)] md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="w-full p-4">
                        <p className="w-full text-center text-sm text-red-700">{msg}</p>
                        <form onSubmit={createHandler}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <TextDt Title="Date" Id="dt" Change={(e) => setDt(e.target.value)} Value={dt} />
                                <DropdownEn Title="Staff Name" Id="staff" Change={(e) => setStaff(e.target.value)} Value={staff}>
                                    {staffs.map((staff, i) => {
                                        let vl = staff.nm_en + "," + staff.post;
                                        return <option value={vl} key={i}>{staff.nm_en}</option>

                                    })}
                                </DropdownEn>
                                <DropdownEn Title="Project" Id="project" Change={(e) => setProject(e.target.value)} Value={project}>
                                    {projects.map((project, i) => <option value={project.name} key={i}>{project.name}</option>)}
                                </DropdownEn>

                                <DropdownEn Title="Month" Id="mnth" Change={(e) => setMnth(e.target.value)} Value={mnth}>
                                    {mnths.map((month, i) => <option value={month.option} key={i}>{month.option}</option>)}
                                </DropdownEn>

                                <DropdownEn Title="Year" Id="yr" Change={(e) => setYr(e.target.value)} Value={yr}>
                                    {yrs.map((year, i) => <option value={year.option} key={i}>{year.option}</option>)}
                                </DropdownEn>


                                <TextEn Title="Taka" Id="taka" Change={(e) => setTaka(e.target.value)} Value={taka} Chr="50" />
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Create Pdf" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Electrickbill;


