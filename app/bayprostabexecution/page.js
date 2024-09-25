"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, DropdownEn, TextareaBn, TextDt, TextNum } from "@/components/Form";
import { jsPDF } from "jspdf";
import Add from "@/components/bayprostabexecution/Add";
import Edit from "@/components/bayprostabexecution/Edit";
import Delete from "@/components/bayprostabexecution/Delete";
import Download from "@/components/bayprostabexecution/Download";
import Upload from "@/components/bayprostabexecution/Upload";

import { fetchDataFromAPI, numberWithComma, inwordBangla, formatedDate, formatedDateDot, sessionStorageGetItem } from "@/lib/utils";
require("@/app/fonts/SUTOM_MJ-normal");
require("@/app/fonts/SUTOM_MJ-bold");


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

    const getLocalData = sessionStorageGetItem("bayprostabexecution");
    setBayprostabexecutions(getLocalData);
    const total = getLocalData.reduce((t, c) => t + (parseFloat(eval(c.taka)) * parseFloat(c.nos)), 0);
    setTotal(total)
    setDt2(formatedDate(new Date()));

    const getData = async () => {
      setWaitMsg("Please wait...");
      try {
        const [staffs, projects] = await Promise.all([
          fetchDataFromAPI('staff'),
          fetchDataFromAPI('project')
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

  }, [msg])



  const messageHandler = (data) => {
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

    const x = sessionStorageGetItem("bayprostabexecution");
    if (!x) {
      setMsg("No data!!");
      return false;
    }
    const totalTaka = x.reduce((t, c) => t + parseFloat(eval(c.taka)) * parseFloat(c.nos), 0);

    setWaitMsg("Please wait...");
    setTimeout(() => {

      doc.addImage("/images/formats/bayprostab2.png", "PNG", 0, 0, 210, 297);
      doc.setFontSize(14);
      doc.text(`${project}`, 168.438, 26, null, null, "left");
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${staff} `, 38, 37, null, null, "left");
      doc.text(`${dt1 ? formatedDateDot(dt1) : ""}`, 150, 45, null, null, "left");
      doc.text(`${numberWithComma(parseFloat(advance))}/-`, 65, 45, null, null, "right");

      let y = 100;
      let gt = 0;

      for (let i = 0; i < x.length; i++) {
        const total = parseFloat(x[i].nos) * parseFloat(eval(x[i].taka));
        const no = parseFloat(x[i].nos);
        const tk = parseFloat(eval(x[i].taka));
        const line = doc.splitTextToSize(`${x[i].item}`, 50);

        if (tk === 0) {
          y += 2;
          doc.setFont("times", "normal");
          doc.text(`${x[i].item}`, 17, y, null, null, "left");
          y += 6;
        } else {
          doc.setFont("SutonnyMJ", "normal");
          doc.text(line, 17, y, { maxWidth: 50, align: 'left' });
          if (no > 1) {
            doc.text(`${tk.toFixed(2)}`, 90, y, null, null, "right");
            doc.text(`${no.toFixed(2)}`, 101.408, y, null, null, "center");
          } else {
            doc.text("-", 81, y, null, null, "center");
            doc.text("-", 101.408, y, null, null, "center");
          }
          doc.text(`${numberWithComma(total)}/-`, 132, y, null, null, "right");
          const lineNumber = line.length;
          y += lineNumber * 6;

        }


      }

      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${numberWithComma(parseInt(totalTaka))}/-`, 65, 53, null, null, "right");
      doc.text(`${numberWithComma(parseFloat(advance) - parseInt(totalTaka))}/-`, 65, 61, null, null, "right");
      doc.text(`${note ? note : ""}`, 174.347, 100, { maxWidth: 45, align: 'center' });
      doc.text(`${numberWithComma(parseInt(totalTaka))}/-`, 132, 235, null, null, "right");
      doc.text(`${inwordBangla(parseInt(totalTaka))} UvKv gvÎ`, 45, 241.5, null, null, "left");
      doc.text(`${formatedDateDot(dt2)}`, 60, 247.5, null, null, "left");
      doc.save(new Date().toISOString() + "Bayprostab-Execution.pdf");
      setWaitMsg("");
    }, 0);
  }


  const dd = () => {
    let x = 'Aslam Zaman';
    console.log(x.length);
  }


  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab Execution</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
      </div>
      <button onClick={dd}>Click Me</button>
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
              <div className="w-full flex justify-end">
                <div className="flex">
                  <Download message={messageHandler} />
                  <Upload message={messageHandler} />
                </div>
              </div>

              <div className="overflow-auto">
                <table className="w-full border border-gray-200">
                  <thead>
                    <tr className="w-full bg-gray-200">
                      <th className="text-center border-b border-gray-200 px-4 py-2">Item</th>
                      <th className="text-center border-b border-gray-200 px-4 py-2">Nos</th>
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
                      bayprostabexecutions.length ? bayprostabexecutions.map(bayprostabexecution => {
                        const subTotal = parseFloat(bayprostabexecution.nos) * parseFloat(eval(bayprostabexecution.taka));
                        return (
                          <tr className="border-b border-gray-200 hover:bg-gray-100" key={bayprostabexecution.id}>
                            <td className={`text-center py-2 px-4 ${parseInt(eval(bayprostabexecution.taka)) === 0 ? 'font-sans' : 'font-sutonnyN'}`}>{bayprostabexecution.item}</td>
                            <td className="text-center py-2 px-4">{bayprostabexecution.nos}</td>
                            <td title={subTotal} className="text-center py-2 px-4">{bayprostabexecution.taka}</td>
                            <td className="flex justify-end items-center mt-1">
                              <Edit message={messageHandler} id={bayprostabexecution.id} data={bayprostabexecution} />
                              <Delete message={messageHandler} id={bayprostabexecution.id} data={bayprostabexecution} />
                            </td>
                          </tr>
                        )
                      })
                        : null
                    }

                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="font-bold"></td>
                      <td></td>
                      <td className="text-center py-2 px-4 font-bold">{total}</td>
                      <td></td>
                    </tr>


                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );


};
export default Bayprostabexecution;
