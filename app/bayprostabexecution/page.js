"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, DropdownEn, TextareaBn, TextDt, TextNum } from "@/components/Form";
import { jsPDF } from "jspdf";
import Add from "@/components/bayprostabexecution/Add";
import Edit from "@/components/bayprostabexecution/Edit";
import Delete from "@/components/bayprostabexecution/Delete";
import { fetchData } from "@/lib/utils/FetchData";
import { getItems } from "@/lib/utils/LocalDatabase";
import { numberWithComma } from "@/lib/NumberWithComma";
import { inwordBn } from "@/lib/InwordBn";

const date_format = dt => new Date(dt).toISOString().split('T')[0];
require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib/fonts/SUTOM_MJ-bold");



const Bayprostabexecution = () => {
  const [staffData, setStaffData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const [bayprostabexecutions, setBayprostabexecutions] = useState([]);
  const [msg, setMsg] = useState("Data ready");
  const [waitMsg, setWaitMsg] = useState("");

  const [staff, setStaff] = useState("");
  const [project, setProject] = useState("");

  const [dt1, setDt1] = useState("");
  const [dt2, setDt2] = useState("");
  const [advance, setAdvance] = useState(3000);
  const [note, setNote] = useState("");
  const [total, setTotal] = useState("");



  useEffect(() => {
    const getData = async () => {
      setWaitMsg("Please wait...");
      try {
        const [staffs, projects] = await Promise.all([
          fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`),
          fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`)
        ]);
        const scStaff = staffs.filter(staff => staff.placeId._id === "660ae2d4825d0610471e272d");
        setStaffData(scStaff);
        setProjectData(projects);
        setWaitMsg("");
      } catch (err) {
        console.log(err);
      }
    }
    getData();
    setDt2(date_format(new Date()));
    const localData = getItems("bayprostabexecution");
    const getLocalData = localData.data;


    const result = getLocalData.reduce((t, c) => t + (parseFloat(eval(c.taka)) * parseFloat(c.nos)), 0);
    setTotal(result)
    setBayprostabexecutions(getLocalData);
  }, [msg])



  const msgHandler = (data) => {
    setMsg(data);
  }


  const createHandler = (e) => {
    e.preventDefault();
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or "smart", default is 16
    });

    const localData = getItems("bayprostabexecution");
    if (!localData) {
      setMsg("No data!!");
      return false;
    }



    setWaitMsg("Please wait...");
    setTimeout(() => {

      let x = localData.data;

      doc.addImage("/images/formats/bayprostab2.png", "PNG", 0, 0, 210, 297);
      doc.setFontSize(14);
      doc.text(`${project}`, 168.438, 26, null, null, "left");
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${staff} `, 38, 37, null, null, "left");
      doc.text(`${dt1 ? date_format(dt1) : ""}`, 150, 45, null, null, "left");
      doc.text(`${numberWithComma(parseFloat(advance))}/-`, 65, 45, null, null, "right");

      let y = 100;
      let gt = 0;

      for (let i = 0; i < x.length; i++) {
        let tk = parseFloat(x[i].taka);
        if (tk === 0) {
          y = y + 2;
          doc.setFont("times", "normal");
          doc.text(`${x[i].item}`, 17, y, null, null, "left");
        } else {
          doc.setFont("SutonnyMJ", "normal");
          doc.text(`${x[i].item}`, 17, y, null, null, "left");
          const evalTaka = eval(x[i].taka);
          doc.text(`${parseFloat(evalTaka).toFixed(2)}`, 90, y, null, null, "right");
          doc.text(`${parseFloat(x[i].nos).toFixed(2)}`, 101.408, y, null, null, "center");
          let subTotal = parseFloat(evalTaka) * parseFloat(x[i].nos);
          doc.text(`${numberWithComma(Math.round(subTotal))}/-`, 132, y, null, null, "right");
          gt = gt + Math.round(subTotal);
        }
        y = y + 6;
      }
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${numberWithComma(parseInt(gt))}/-`, 65, 53, null, null, "right");
      doc.text(`${numberWithComma(parseFloat(advance) - parseInt(gt))}/-`, 65, 61, null, null, "right");
      
      doc.text(`${note ? note : ""}`, 174.347, 100, { maxWidth: 45, align: 'center' });
      doc.text(`${numberWithComma(parseInt(gt))}/-`, 132, 235, null, null, "right");
      
      
      doc.text(`${inwordBn(parseInt(gt))} UvKv gvÎ`, 45, 241.5, null, null, "left");

    
      doc.text(`${date_format(dt2)}`, 60, 247.5, null, null, "left");

      doc.save(new Date().toISOString() + "Bayprostab-Execution.pdf");
      setWaitMsg("");
    }, 0);
  }



  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab Execution</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
      </div>

      <div className="px-4 lg:px-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
          <div className="w-full border-2 p-4 shadow-md rounded-md">
            <form onSubmit={createHandler}>
              <div className="grid grid-cols-1 gap-2 my-2">
                <DropdownEn Title="Staff Name *" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                  {staffData.length ? staffData.map(staff => <option value={staff.nmBn} key={staff._id}>{staff.nmEn}</option>) : null}
                </DropdownEn>
                <DropdownEn Title="Project *" Id="project" Data={projectData} Change={e => setProject(e.target.value)} Value={project}>
                  {projectData.length ? projectData.map(project => <option value={project.name} key={project._id}>{project.name}</option>) : null}
                </DropdownEn>

                <div className="w-full flex flex-col items-start">
                  <label className='text-xs font-semibold mb-1 opacity-50' htmlFor="dt1">Advance Date</label>
                  <input onChange={e => setDt1(e.target.value)} value={dt1} type="date" id="dt1" name="dt1" className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
                </div>

                <TextDt Title="Executon Date *" Id="dt2" Change={e => setDt2(e.target.value)} Value={dt2} />
                <TextNum Title="Advance Taka *" Id="dt2" Change={e => setAdvance(e.target.value)} Value={advance} />
                <TextareaBn Title="Note" Id="note" Rows="1" Change={e => setNote(e.target.value)} Value={note} />
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
                    <th className="text-center border-b border-gray-200 py-2">Item</th>
                    <th className="text-center border-b border-gray-200 py-2">Nos</th>
                    <th className="text-center border-b border-gray-200 py-2">Taka</th>
                    <th className="font-normal text-start flex justify-end mt-1">
                      <Add message={msgHandler} />

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bayprostabexecutions.length ? bayprostabexecutions.map((bayprostabexecution) => {
                      return (
                        <tr className="border-b border-gray-200" key={bayprostabexecution.id}>
                          <td className={`text-center py-2 px-4 ${parseFloat(bayprostabexecution.taka) === 0 ? 'font-sans' : 'font-sutonnyN'}`}>{bayprostabexecution.item}</td>
                          <td className="text-center py-2 px-4">{bayprostabexecution.nos}</td>
                          <td className="text-center py-2 px-4" title={eval(bayprostabexecution.taka)}>{bayprostabexecution.taka}</td>
                          <td className="flex justify-end items-center mt-1">
                            <Edit message={msgHandler} id={bayprostabexecution.id} data={bayprostabexecutions} />
                            <Delete message={msgHandler} id={bayprostabexecution.id} data={bayprostabexecutions} />
                          </td>
                        </tr>
                      )
                    })
                      : null
                  }
                  <tr className="border-b border-gray-200 font-bold">
                    <td className="text-center py-2 px-4"> Total</td>
                    <td className="text-center py-2 px-4"></td>
                    <td className="text-center py-2 px-4">{numberWithComma(parseFloat(total))}</td>
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
export default Bayprostabexecution;
