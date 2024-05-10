"use client";
import React, { useState, useEffect } from "react";
import { TextDt, TextNum, DropdownEn, BtnSubmit } from "@/components/Form";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
import { fetchData } from "@/lib/utils/FetchData";
import { jsPDF } from "jspdf";
import { inword } from "@/lib/Inword";

const montsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Link3 = () => {
    const [msg, setMsg] = useState("Data ready");

    const [dt, setDt] = useState('');
    const [taka, setTaka] = useState('1932');
    const [months, setMonths] = useState('');
    const [yr, setYr] = useState('');
    const [staffName, setStaffName] = useState('');
    const [projectName, setProjectName] = useState('');

    const [staffs, setStaffs] = useState([]);
    const [staffNameChange, setStaffNameChange] = useState('');
    const [projects, setProjects] = useState([]);
    const [projectNameChange, setProjectNameChange] = useState('');



    useEffect(() => {
        const loadData = async () => {
            setMsg('Please Wait...');
            try {
                const [responseStaff, responseProject, response] = await Promise.all([
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`),
                    fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`)
                ]);
                const scStaff = responseStaff.filter(staff => staff.placeId._id === "660ae2d4825d0610471e272d");
                setStaffs(scStaff);
                setProjects(responseProject);
                setMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
                setMsg("Failed to fetch data");
            }
        };
        loadData();
        setDt(date_format(new Date()));
        setYr(new Date().getFullYear());
        setMonths(montsArray[new Date().getMonth()]);
    }, []);


    //-----------------------------------------------
    const staffNameChangeHandler = (e) => {
        const staffNameValue = e.target.value;
        setStaffNameChange(staffNameValue);
        setStaffName(staffNameValue);
    }

    const projectNameChangeHandler = (e) => {
        const projectNameValue = e.target.value;
        setProjectNameChange(projectNameValue);
        setProjectName(projectNameValue);
    }


    const pdfCreateHandler = (e) => {
        e.preventDefault();
        setMsg("Please wait...");
        try {
            setTimeout(() => {
                const doc = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4',
                    putOnlyUsedFonts: true,
                    floatPrecision: 16 // or "smart", default is 16
                });

                //--------------------------------------------------------------------

                doc.addImage("/images/formats/link3internetbill.png", "PNG", 0, 0, 210, 297);
                doc.setFontSize(13);
                doc.setFont("times", "normal");
                doc.text(`${projectName}`, 102, 48, null, null, "left");
                doc.text(`${date_format(dt)}`, 102, 54, null, null, "left");

                doc.setFont("times", "normal");
                doc.text(`${months} ${yr}`, 113, 77, null, null, "left");
                doc.text(`${taka}/-`, 180, 77, null, null, "right");
                //-------------------------------------------------------------
                let b = taka / 1.15;
                doc.text(`${b.toFixed(2)}`, 100, 82, null, null, "right");
                doc.text(`${(b * 0.05).toFixed(2)}`, 100, 87, null, null, "right");
                doc.text(`${(b * 0.1).toFixed(2)}`, 100, 92, null, null, "right");
                //-------------------------------------------------------------

                doc.setFont("times", "bold");
                doc.text(`${taka}/-`, 180, 180, null, null, "right"); // Total Taka
                let total = parseInt(taka);
                doc.setFont("times", "normal");
                let t = inword(total);
                doc.text(`${t.toUpperCase()} TAKA ONLY`, 42, 188, null, null, "left"); // Inword
                doc.line(175, 82, 160, 170);

                doc.text(`${staffName.split(",")[0]}`, 25, 216, null, null, "left");
                doc.text(`${staffName.split(",")[1]}`, 25, 222, null, null, "left");

                //--------------------------------------------------------------------

                doc.save(new Date().toISOString() + "-Link3-Bill.pdf");
                setMsg("");
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Link3 Internet Bill</h1>
                <p className="w-full text-center text-lg text-blue-300">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="px-4 lg:px-6">

                <div className="w-full lg:w-9/12 mx-auto p-4 border border-gray-200 shadow-lg rounded-lg">
                    <form onSubmit={pdfCreateHandler}>
                        <div className="grid grid-cols-2 gap-4">
                            <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                            <DropdownEn Title="Staff" Id="staffNameChange" Change={staffNameChangeHandler} Value={staffNameChange}>
                                {staffs.length ? staffs.map(staff => <option value={`${staff.nmEn},${staff.postId.nmEn}`} key={staff._id}>{staff.nmEn}</option>) : null}
                            </DropdownEn>
                            <DropdownEn Title="Project" Id="projectNameChange" Change={projectNameChangeHandler} Value={projectNameChange}>
                                {projects.length ? projects.map(project => <option value={project.name} key={project._id}>{project.name}</option>) : null}
                            </DropdownEn>

                            <DropdownEn Title="Month" Id="months" Change={e => setMonths(e.target.value)} Value={months}>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </DropdownEn>

                            <DropdownEn Title="Year" Id="yr" Change={e => setYr(e.target.value)} Value={yr}>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                                <option value="2033">2033</option>
                                <option value="2034">2034</option>
                                <option value="2035">2035</option>
                                <option value="2036">2036</option>
                                <option value="2037">2037</option>
                                <option value="2038">2038</option>
                                <option value="2039">2039</option>
                                <option value="2040">2040</option>
                            </DropdownEn>
                            <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                        </div>
                        <BtnSubmit Title="Create Electric Bill" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                    </form>
                </div>
            </div>
        </>
    );

};

export default Link3;


