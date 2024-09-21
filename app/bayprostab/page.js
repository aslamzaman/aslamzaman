"use client";
import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { BtnSubmit, DropdownEn, TextBn, TextEn, TextDt, TextareaBn } from "@/components/Form";
import Add from "@/components/bayprostab/Add";
import Edit from "@/components/bayprostab/Edit";
import Delete from "@/components/bayprostab/Delete";
import Download from '@/components/bayprostab/Download';
import Upload from '@/components/bayprostab/Upload';

import { fetchDataFromAPI, formatedDate, formatedDateDot, sessionStorageGetItem } from '@/lib/utils';
require("@/app/fonts/SUTOM_MJ-normal");
require("@/app/fonts/SUTOM_MJ-bold");
import { BayprostabPreparation } from '@/lib/BayprostabPreparation';


const dtAdd15Days = (d1) => {
  const dt1 = new Date(d1);
  const dt2 = dt1.getTime() + (15 * 24 * 60 * 60 * 1000);
  return formatedDateDot(new Date(dt2), true);
}



const Bayprostab = () => {
  const [bayprostabs, setBayprostabs] = useState([]);
  const [waitMsg, setWaitMsg] = useState('');
  const [msg, setMsg] = useState("Data ready");


  const [staffData, setStaffData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const [staff, setStaff] = useState("Avmjvg Rvgvb");
  const [project, setProject] = useState("GO");
  const [dt, setDt] = useState("2023-01-12");
  const [dpt, setDpt] = useState("ms¯’vcb");
  const [subject, setSubject] = useState("mvwf©m †m›Uv‡ii Mvwoi R¡vjvwb (AK‡Ub) µq");
  const [note, setNote] = useState(`Mvwoi R¡vjvwb (AK‡Ub) cÖ‡qvRb Abyhvqx wewfbœ cv¤ú †_‡K µq Kiv n‡e`);
  const [total, setTotal] = useState("");
  const [budgetHead, setBudgetHead] = useState("");
  const [payType, setPayType] = useState("");
  const [cheque, setCheque] = useState("");

  useEffect(() => {
    setDt(formatedDate(new Date()));

    const getData = async () => {
      setWaitMsg('Please wait...');
      try {
        const [staffs, projects] = await Promise.all([
          fetchDataFromAPI('staff'),
          fetchDataFromAPI('project')
        ]);
        const scStaff = staffs.filter(staff => staff.placeId._id === "660ae2d4825d0610471e272d");
        setStaffData(scStaff);
        setProjectData(projects);
        setPayType('');
        setWaitMsg('');
      } catch (err) {
        console.log(err);
      }
    }
    getData();

    const locaData = sessionStorageGetItem("bayprostab");
    setBayprostabs(locaData);
    const totalTaka = locaData.reduce((t, c) => t + (parseFloat(eval(c.taka)) * parseFloat(c.nos)), 0);
    const totalRound = Math.round(totalTaka);
    setTotal(totalRound);

    const x = [];
    for (let i = 0; i < locaData.length; i++) {
      if (parseInt(locaData[i].taka) === 0) {
        x.push(locaData[i].item);
      }
    }
    const bhead = x.join(", ");
    setBudgetHead(bhead);
  }, [msg])


  const msgHandler = (data) => {
    setMsg(data);
  }



  const handleCreate = (e) => {
    e.preventDefault();
    if (bayprostabs.length < 2) {
      setWaitMsg("No data!");
      return false;
    }
    setWaitMsg("Please wait...");

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or "smart", default is 16
    });

    const data = {
      name: staff,
      project: project,
      dt: dt,
      dateStart: dt,
      dateEnd: dtAdd15Days(dt),
      dpt: dpt,
      subject: subject,
      note: note,
      total: total,
      budgetHead: budgetHead,
      payType: payType,
      cheque: cheque
    }
    const db = sessionStorageGetItem("bayprostab");

    setTimeout(() => {
      BayprostabPreparation.central({ doc, data });
      BayprostabPreparation.tableOne({ doc, db }, 14.3, 90.5, 102, 131.5, 97, 55);
      BayprostabPreparation.payment({ doc, data }, 174.7, 172, 49, payType);
      doc.addPage("a4", "p");
      BayprostabPreparation.completePlan({ doc, data });
      BayprostabPreparation.tableOne({ doc, db }, 15, 90.5, 102, 131.5, 103, 53);
      BayprostabPreparation.payment({ doc, data }, 166, 172, 64.5, payType);

      if (project === 'GO') {
        doc.addPage("a4", "p");
        BayprostabPreparation.go({ doc, data });
        BayprostabPreparation.tableTwo({ doc, db }, 19, 30, 131, 75, 74);
      }
      if (payType === 'br') {
        doc.addPage("a4", "p");
        BayprostabPreparation.bearer({ doc, data });
        BayprostabPreparation.tableTwo({ doc, db }, 25, 33, 131, 117, 71);
      }

      doc.save(new Date().toISOString() + "-Bayprostab.pdf");
      setWaitMsg("");
    }, 100);

  }





  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
      </div>


      <div className="px-4 lg:px-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
          <div className="w-full border-2 p-4 shadow-md rounded-md">

            <form onSubmit={handleCreate}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 my-2">


                <div className="w-full col-span-3">
                  <DropdownEn Title="Staff Name" Id="staff" Change={(e) => { setStaff(e.target.value) }} Value={staff}>
                    {staffData.map(staff => <option value={staff.nmBn} key={staff._id}>{staff.nmEn}</option>)}
                  </DropdownEn>
                </div>
                <DropdownEn Title="Project" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                  {projectData.map(project => <option value={project.name} key={project._id}>{project.name}</option>)}
                </DropdownEn>

                <div className="w-full col-span-2">
                  <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                </div>

                <div className="w-full col-span-2">
                  <TextBn Title="Department" Id="dpt" Change={(e) => { setDpt(e.target.value) }} Value={dpt} Chr="50" />
                </div>
                <div className="w-full col-span-4">
                  <TextBn Title="Subject" Id="subject" Change={(e) => { setSubject(e.target.value) }} Value={subject} Chr="150" />
                </div>

                <div className="w-full col-span-2">
                  <DropdownEn Title="Payment Type" Id="payType" Change={e => setPayType(e.target.value)} Value={payType}>
                    <option value="ft">Fund Transfer</option>
                    <option value="ace">A/C Pay English</option>
                    <option value="acb">A/C Pay Bangla</option>
                    <option value="br">Bearer Cheque</option>
                  </DropdownEn>
                </div>
                <div className="w-full col-span-2">

                  {
                    payType === '' ? null
                      : payType === 'ft' ? null
                        : payType === 'ace' ? <TextEn Title="Name (English)" Id="cheque" Change={e => setCheque(e.target.value)} Value={cheque} Chr="100" />
                          : payType === 'acb' ? <TextBn Title="Name (SutonnyMJ)" Id="cheque" Change={e => setCheque(e.target.value)} Value={cheque} Chr="100" />
                            : null
                  }
                </div>

                <div className="w-full col-span-4">
                  <TextareaBn Title="Notes" Id="note" Rows="2" Change={(e) => { setNote(e.target.value) }} Value={note} />
                </div>

              </div>
              <div className="w-full flex justify-start">
                <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
              </div>
            </form>

          </div>



          <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">
            <div className="px-4 lg:px-6 overflow-auto">
              <p className="w-full text-sm text-red-700">{msg}</p>
              <div className='flex justify-end'>
                <div className='flex space-x-1'>
                  <Download Msg={msgHandler} />
                  <Upload Msg={msgHandler} />
                </div>
              </div>
              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="w-full bg-gray-200">
                    <th className="text-start border-b border-gray-200 py-2 pl-6">Item</th>
                    <th className="text-center border-b border-gray-200 py-2">Nos</th>
                    <th className="text-center border-b border-gray-200 py-2">Taka</th>
                    <th className="text-normal flex justify-end mt-1 font-normal text-start">
                      <span className="w-full flex justify-end">
                        <Add Msg={msgHandler} />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bayprostabs.length ? bayprostabs.map((bayprostab, i) => {
                      return (
                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={bayprostab.id}>
                          <td className={`text-left py-2 pl-6 ${parseFloat(bayprostab.taka) === 0 ? 'font-sans' : 'font-sutonnyN'}`}>{i + 1}. {bayprostab.item}</td>
                          <td className="text-center py-2 px-4">{bayprostab.nos}</td>
                          <td className="text-center py-2 px-4" title={parseFloat(eval(bayprostab.taka)) * parseFloat(bayprostab.nos)}>{bayprostab.taka}</td>
                          <td className="flex justify-end items-center space-x-1 mt-1">
                            <Edit Msg={msgHandler} id={bayprostab.id} data={bayprostab} />
                            <Delete Msg={msgHandler} id={bayprostab.id} data={bayprostab} />
                          </td>
                        </tr>
                      )
                    })
                      : null
                  }

                  <tr className="border-b border-gray-200 font-bold">
                    <td className="text-start py-2 px-4"> Total</td>
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
  )
}
export default Bayprostab;
