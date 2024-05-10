"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, DropdownEn, TextDt } from "@/components/Form";
import Add from "@/components/bkash/Add";
import Edit from "@/components/bkash/Edit";
import Delete from "@/components/bkash/Delete";
import { jsPDF } from "jspdf";
import { getItems } from "@/lib/utils/LocalDatabase";
import { fetchData } from "@/lib/utils/FetchData";
import { inwordBn } from "@/lib/InwordBn";
const date_format = dt => new Date(dt).toISOString().split('T')[0];
require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");



const Bkash = () => {
    const [bkashs, setBkashs] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");

    const [dt, setDt] = useState('');
    const [staff, setStaff] = useState('');
    const [total, setTotal] = useState(0);
    const [staffs, setStaffs] = useState([]);


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const responseStaff = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`);
                const filterScStaff = responseStaff.filter(staff => staff.placeId._id === "660ae2d4825d0610471e272d"); // filter only sc staff
                console.log(filterScStaff);
                setStaffs(filterScStaff);
                //--------------------------------------------------------------------
                const response = getItems("bkash");
                const data = response.data;
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                setBkashs(result);
                //-----------------------------------------------------------------------
                const grandTotal = data.reduce((t, c) => t + parseInt(c.taka), 0);
                setTotal(grandTotal);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        };
        load();
        setDt(date_format(new Date()));
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const handleCreate = async (e) => {
        e.preventDefault();
        setWaitMsg("Please wait...");

        const response = getItems("bkash");
        const data = response.data;

        if (data.length < 1) {
            setWaitMsg("No data to creating bkash.");
            return false;
        }

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

                doc.addImage("/images/formats/bkash.png", "PNG", 0, 0, 210, 297);
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(16);
                //doc.line(20,37,190,37); // horizontal line
                doc.setFont("SutonnyMJ", "normal");
                doc.text(`${date_format(dt)}`, 100, 55.5, null, null, "left");
                doc.setFontSize(16);

                let y = 85;
                let y1 = y;
                let t = 0;
                doc.setFont("SutonnyMJ", "bold");
                doc.line(20, y - 16, 190, y - 16); // horizontal line
                doc.line(20, y - 8, 190, y - 8); // horizontal line
                doc.text("µwgK bs", 32, y - 10, null, null, "center");
                doc.text("BDwbU", 65, y - 10, null, null, "left");
                doc.text("UvKv", 180, y - 10, null, null, "right");

                doc.setFont("SutonnyMJ", "normal");
                for (let i = 0; i < data.length; i++) {
                    doc.text(`${i + 1}`, 32, y - 2, null, null, "center");
                    doc.text(`${data[i].nmUnit}`, 65, y - 2, null, null, "left");
                    doc.text(`${data[i].taka}/-`, 180, y - 2, null, null, "right");
                    t = t + parseInt(data[i].taka);
                    doc.line(20, y, 190, y); // horizontal line
                    y = y + 8;
                }
                doc.line(20, y, 190, y); // horizontal line

                doc.line(20, y1 - 16, 20, y); // vertical line
                doc.line(45, y1 - 16, 45, y); // vertical line
                doc.line(145, y1 - 16, 145, y); // vertical line
                doc.line(190, y1 - 16, 190, y); // vertical line
                doc.setFont("SutonnyMJ", "bold");
                doc.text("†gvU UvKv", 65, y - 2, null, null, "left");
                doc.text(`${t}/-`, 180, y - 2, null, null, "right");
                doc.setFont("SutonnyMJ", "normal");
                doc.text(`UvKv K_vqt- ${inwordBn(t)} UvKv gvÎ`, 20, y + 8 - 2, null, null, "left");


                doc.text(`${staff.split(",")[0]}`, 20, y + 42, null, null, "left");
                doc.text(`${staff.split(",")[1]}`, 20, y + 48, null, null, "left");
                doc.text(`wmGgBGm`, 20, y + 54, null, null, "left");

                //--------------------------------------------------------------------

                doc.save(new Date().toISOString() + "-Bkash.pdf");
                setWaitMsg("");
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
             <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bkash Bill</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                <DropdownEn Title="Staff" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                                    {staffs.length ? staffs.map(staff => <option value={`${staff.nmBn},${staff.postId.nmBn}`} key={staff._id}>{staff.nmEn}</option>) : null}
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
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
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
                                        bkashs.length ? bkashs.map(bkash => {
                                            return (
                                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={bkash.id}>
                                                    <td className="text-center py-2 px-4 font-sutonnyN">{bkash.nmUnit}</td>
                                                    <td className="text-center py-2 px-4 font-sutonnyN">{bkash.taka}</td>
                                                    <td className="flex justify-end items-center mt-1">
                                                        <Edit message={messageHandler} id={bkash.id} data={bkashs} />
                                                        <Delete message={messageHandler} id={bkash.id} data={bkashs} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            : null
                                    }

                                    <tr className="border-b border-gray-200 hover:bg-gray-100 font-bold">
                                        <td className="text-center py-2 px-4 font-sutonnyN">†gvU</td>
                                        <td className="text-center py-2 px-4 font-sutonnyN">{total}</td>
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

export default Bkash;



