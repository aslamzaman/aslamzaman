"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, TextDt, DropdownEn, TextNum, TextareaBn } from "@/components/Form";
import Add from "@/components/bayprostabexecution/Add";
import Edit from "@/components/bayprostabexecution/Edit";
import Delete from "@/components/bayprostabexecution/Delete";
import { getItems } from "@/lib/LocalDatabase";
import { fetchAll } from "@/lib/DexieDatabase";

require("@/lib/fonts/SUTOM_MJ-bold");
require("@/lib/fonts/SUTOM_MJ-normal");

import { Lib } from "@/lib/Lib";
import { jsPDF } from "jspdf";


const MyDt = ({ Title, Id, Change, Value }) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="date" id={Id} name={Id} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
    </div>
  )
}



const BayprostabFormat = ({ doc }, data) => {

  let x = data.db;
  const total = x.reduce(
    (a, c) => a + parseFloat(c.taka), 0
  );

  doc.addImage("/images/formats/bayprostab2.png", "PNG", 0, 0, 210, 297);
  doc.setFontSize(14);
  doc.text(`${data.project}`, 168.438, 26, null, null, "left");

  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${data.staff} `, 38, 37, null, null, "left");
  doc.text(`${data.dt1 ? Lib.util.dateFormat(data.dt1) : ""}`, 150, 45, null, null, "left");

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
      doc.text(`${Lib.util.numberWithCommas(x[i].taka)}/-`, 90, y, null, null, "right");
      doc.text(`${x[i].nos}`, 101.408, y, null, null, "center");
      let subTotal = parseInt(parseFloat(x[i].taka) * parseFloat(x[i].nos));
      doc.text(`${Lib.util.numberWithCommas(subTotal)}/-`, 132, y, null, null, "right");
      gt = gt + parseInt(parseFloat(x[i].taka) * parseFloat(x[i].nos));
    }
    y = y + 6;
  }
  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${Lib.util.numberWithCommas(data.advance)}/-  `, 65, 45, null, null, "right");
  doc.text(`${Lib.util.numberWithCommas(gt)}/- `, 65, 53, null, null, "right");
  doc.text(`${Lib.util.numberWithCommas(parseFloat(data.advance) - parseFloat(gt))}/- `, 65, 61, null, null, "right");

  doc.text(`${data.note ? data.note : ""}`, 174.347, 100, { maxWidth: 45, align: 'center' });
  doc.text(`${Lib.util.numberWithCommas(gt)}/-`, 132, 235, null, null, "right");


  doc.text(`${Lib.util.inword.bn(gt)} UvKv gvÎ`, 45, 241.5, null, null, "left");

  doc.text(`${Lib.util.dateFormat(data.dt2, ".")}`, 65, 247.5, null, null, "left");

}




const Bayprostabexecution = () => {
  const [bayprostabexecutions, setBayprostabexecutions] = useState([]);
  const [msg, setMsg] = useState("Data ready");


  const [staffs, setStaffs] = useState([]);
  const [projects, setProjects] = useState([]);


  const [staff, setStaff] = useState("");
  const [project, setProject] = useState("");
  const [dt1, setDt1] = useState("");
  const [dt2, setDt2] = useState("");
  const [advance, setAdvance] = useState(3000);
  const [note, setNote] = useState("");
  const [total, setTotal] = useState("");


  useEffect(() => {
    const load = async () => {
      try {
        const response = getItems("bayprostabexecution");
        const data = response.data;
        const result = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setBayprostabexecutions(result);
        //-------------------------------------------------------
        const [staff, project] = await Promise.all([
          fetchAll("staff"),
          fetchAll("project")
        ]);
        const staffData = staff.data;
        const projectData = project.data;

        const resultStaff = staffData.filter(s => parseInt(s.place_id) === 1699884047193);
        setStaffs(resultStaff);
        setProjects(projectData);

      } catch (error) {
        console.log(error);
      }
    };
    load();
    setDt2(Lib.util.dateFormat(new Date(), "-"));
  }, [msg]);


  const messageHandler = (data) => {
    setMsg(data);
  }



  const handleCreate = (e) => {
    e.preventDefault();
    const response = getItems("bayprostabexecution");
    const data = response.data;

    if (data.length < 0) {
      setMsg("No data to creating bayprostabexecution.");
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

      const data = {
        staff: staff,
        project: project,
        dt1: dt1,
        dt2: dt2,
        advance: advance,
        note: note,
        db: JSON.parse(localStorage.getItem('bayprostabexecution'))
      }

      setTimeout(() => {
        BayprostabFormat({ doc }, data);
        doc.save(new Date().toISOString() + "Bayprostab-Execution.pdf");
        setMsg("PDF file Created");
      }, 0);


    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="w-full my-6 lg:my-10">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab Execution</h1>
      </div>

      <div className="px-4 lg:px-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
          <div className="w-full border-2 p-4 shadow-md rounded-md">


            <form onSubmit={handleCreate}>
              <div className="grid grid-cols-1 gap-2 my-2">
                <DropdownEn Title="Staff Name *" Id="staff" Change={(e) => { setStaff(e.target.value) }} Value={staff}>
                  {staffs.map(staff => <option value={staff.nm_bn} key={staff.id}>{staff.nm_en}</option>)}
                </DropdownEn>
                <DropdownEn Title="Project *" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                  {projects.map(project => <option value={project.name} key={project.id}>{project.name}</option>)}
                </DropdownEn>
                <MyDt Title="Advance Date" Id="dt1" Change={(e) => { setDt1(e.target.value) }} Value={dt1} />
                <TextDt Title="Executon Date *" Id="dt2" Change={(e) => { setDt2(e.target.value) }} Value={dt2} />
                <TextNum Title="Advance Taka *" Id="dt2" Change={(e) => { setAdvance(e.target.value) }} Value={advance} />
                <TextareaBn Title="Note" Id="note" Rows="1" Change={e => setNote(e.target.value)} Value={note} />
              </div>
              <div className="w-full flex justify-start">
                <BtnSubmit Title="Create Execution" Class="bg-blue-600 hover:bg-blue-800 text-white" />
              </div>
            </form>


          </div>
          <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">
            <div className="px-4 lg:px-6">
              <p className="w-full text-sm text-red-700">{msg}</p>
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
                      return (
                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={bayprostabexecution.id}>
                          <td className={`text-center py-2 px-4 ${parseFloat(bayprostabexecution.taka) === 0 ? 'sans' : 'font-sutonny-n'}`}>{bayprostabexecution.item}</td>
                          <td className="text-center py-2 px-4">{bayprostabexecution.nos}</td>
                          <td className="text-center py-2 px-4">{bayprostabexecution.taka}</td>
                          <td className="flex justify-end items-center mt-1">
                            <Edit message={messageHandler} id={bayprostabexecution.id} />
                            <Delete message={messageHandler} id={bayprostabexecution.id} />
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

export default Bayprostabexecution;



