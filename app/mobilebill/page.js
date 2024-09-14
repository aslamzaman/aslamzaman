"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, TextDt, DropdownEn } from "@/components/Form";
import Add from "@/components/mobilebill/Add";
import Edit from "@/components/mobilebill/Edit";
import Delete from "@/components/mobilebill/Delete";
import { jsPDF } from "jspdf";
import { fetchDataFromAPI, formatedDate, formatedDateDot, inwordEnglish, localStorageGetItem } from "@/lib/utils";



const Mobilebill = () => {
    const [mobilebills, setMobilebills] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");

    const [dt, setDt] = useState('');
    const [total, setTotal] = useState(0);

    const [staffs, setStaffs] = useState([]);
    const [staffNameChange, setStaffNameChange] = useState('');
    const [staffName, setStaffName] = useState('');

    const [projects, setProjects] = useState([]);
    const [projectNameChange, setProjectNameChange] = useState('');
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = localStorageGetItem("mobilebill");
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                const totaTaka = data.reduce((t, c) => t + parseInt(c.taka), 0);
                setMobilebills(result);
                setTotal(totaTaka);

                const responseStaff = await fetchDataFromAPI("staff");
                const scStaff = responseStaff.filter(staff => staff.placeId._id === '660ae2d4825d0610471e272d');
                setStaffs(scStaff);

                const responseProject = await fetchDataFromAPI("project");
                setProjects(responseProject);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        };
        load();
        setDt(formatedDate(new Date()));
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }



    const handleCreate = async (e) => {
        e.preventDefault();

        const data = localStorageGetItem("mobilebill");
        if (data.length < 0) {
            setWaitMsg("No data to creating mobile bill.");
            return false;
        }
        setWaitMsg('Please Wait...');
        try {
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true,
                floatPrecision: 16 // or "smart", default is 16
            });


            setTimeout(() => {
                doc.addImage("/images/formats/mobilebill.png", "PNG", 0, 0, 210, 297);
                doc.setFont("times", "italic");
                doc.setFontSize(14);
                doc.text(`${projectName}`, 103, 52.5, null, null, "left");
                doc.setFont("times", "normal");
                doc.setFontSize(12);
                doc.text(` ${formatedDateDot(dt,true)}`, 103, 58.25, null, null, "left");

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
                    doc.text(`${mobilebills[i].name}`, 35, y + 12, null, null, "left");
                    doc.text(`${mobilebills[i].num}`, 140, y + 12, null, null, "center");
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
                let inodrd = inwordEnglish(parseInt(total));
                doc.text(`INWORD: ${inodrd.toUpperCase()} ONLY`, 15, y + 19, null, null, "left");

                const splitName = staffName.split(',');
                doc.text("Prepared By:", 15, y + 45, null, null, "left");
                doc.text(`${splitName[0]}`, 15, y + 45 + 6, null, null, "left");
                doc.text(`${splitName[1]}`, 15, y + 45 + 12, null, null, "left");
                doc.save(new Date().toISOString() + "-Mobile_bill.pdf");
                setWaitMsg('');
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Mobile Bill</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <TextDt Title="Date" Id="dt" Change={(e) => setDt(e.target.value)} Value={dt} />
                                <DropdownEn Title="Staff" Id="staffName" Change={e=>setStaffName(e.target.value)} Value={staffName}>
                                    {staffs.length ? staffs.map(staff => <option value={`${staff.nmEn},${staff.postId.nmEn}`} key={staff._id}>{staff.nmEn}</option>) : null}
                                </DropdownEn>
                            </div>
                            <DropdownEn Title="Project" Id="projectName" Change={e=>setProjectName(e.target.value)} Value={projectName}>
                                {projects.length ? projects.map(project => <option value={project.name} key={project._id}>{project.name}</option>) : null}
                            </DropdownEn>

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
                                        <th className="text-start border-b border-gray-200 px-4 py-2">Mobile User</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Number</th>
                                        <th className="text-end border-b border-gray-200 px-4 py-2">Taka</th>
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
                                                    <td className="text-start py-2 px-4">{mobilebill.name}</td>
                                                    <td className="text-center py-2 px-4">{mobilebill.num}</td>
                                                    <td className="text-end py-2 px-4">{mobilebill.taka}</td>
                                                    <td className="flex justify-end items-center mt-1">
                                                        <Edit message={messageHandler} id={mobilebill.id} data={mobilebill} />
                                                        <Delete message={messageHandler} id={mobilebill.id} data={mobilebill} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            : null
                                    }
                                    <tr className="border-b border-gray-200 hover:bg-gray-100 font-bold">
                                        <td className="text-start py-2 px-4">Total</td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-end py-2 px-4">{total}</td>
                                        <td className="flex justify-end items-center mt-1"></td>
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



