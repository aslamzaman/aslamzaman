"use client";
import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { BtnSubmit, DropdownEn, TextBn, TextEn, TextDt, TextareaBn } from "@/components/Form";
import Add from "@/components/bayprostab/Add";
import Edit from "@/components/bayprostab/Edit";
import Delete from "@/components/bayprostab/Delete";
import Download from '@/components/bayprostab/Download';
import Upload from '@/components/bayprostab/Upload';

import { fetchDataFromAPI, localStorageGetItem, inwordBangla, numberWithComma, formatedDate, formatedDateDot, localStorageSetItem } from '@/lib/utils';
require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib/fonts/SUTOM_MJ-bold");




const dtAdd15Days = (d1) => {
  const dt1 = new Date(d1);
  const dt2 = dt1.getTime() + (15 * 24 * 60 * 60 * 1000);
  return formatedDateDot(new Date(dt2), true);
}

const octenInitialData = [
  {
    "id": 1715063792028,
    "item": "Fuel and Maintenance",
    "nos": "0",
    "taka": "0"
  },
  {
    "id": 1722238997542,
    "item": "R¦vjvbx AK‡Ub",
    "nos": "100",
    "taka": "131"
  },
  {
    "id": 1723009985957,
    "item": "gwej",
    "nos": "2",
    "taka": "3400"
  },
  {
    "id": 1723010030117,
    "item": "gwej wdëvi",
    "nos": "1",
    "taka": "350"
  },
  {
    "id": 1723010049736,
    "item": "Gqvi wdëvi",
    "nos": "1",
    "taka": "280"
  },
  {
    "id": 1723010067936,
    "item": "mvwf©wms gRyix",
    "nos": "1",
    "taka": "500"
  }
]

const utilitiesInitialData = [
  {
    "id": "1696132914376",
    "item": "Utilities",
    "nos": 0,
    "taka": 0
  },
  {
    "id": "1697954408859",
    "item": "dzjevwo BDwbU",
    "nos": "1",
    "taka": "2062"
  },
  {
    "id": "1697969706641",
    "item": "Lv‡minvU BDwbU-1wU",
    "nos": "1",
    "taka": "1446"
  },
  {
    "id": "1698041914343",
    "item": "AvgZjx BDwbU-4wU",
    "nos": "1",
    "taka": "1402"
  },
  {
    "id": "1698571393678",
    "item": "N›UvNi BDwbU-2wU",
    "nos": "1",
    "taka": "877"
  },
  {
    "id": "1698750460577",
    "item": "ivbxie›`i BDwbU-1wU",
    "nos": "1",
    "taka": "3753"
  },
  {
    "id": "1699177918265",
    "item": " mwLcyi BDwbU-1wU",
    "nos": "1",
    "taka": "2200"
  },
  {
    "id": "1699333415687",
    "item": "nvjyqvNvU BDwbU-1wU",
    "nos": "1",
    "taka": "1133"
  },
  {
    "id": "1699334180195",
    "item": "AvgZjx BDwbU-1wU",
    "nos": "1",
    "taka": "587"
  }
];

const maintenanceInitialData = [
  {
    "id": "1685510085407",
    "item": "Maintenance",
    "nos": 0,
    "taka": 0
  },
  {
    "id": "1697954649183",
    "item": "dzjevwo BDwbU",
    "nos": "1",
    "taka": "1925"
  },
  {
    "id": "1697969755519",
    "item": "Lv‡minvU BDwbU",
    "nos": "1",
    "taka": "40"
  },
  {
    "id": "1698042054538",
    "item": "AvgZjx BDwbU-2wU",
    "nos": "1",
    "taka": "90"
  },
  {
    "id": "1698571470686",
    "item": "N›UvNi BDwbU-1wU",
    "nos": "1",
    "taka": "800"
  },
  {
    "id": "1698743746685",
    "item": "ivbxie›`i BDwbU-2wU",
    "nos": "1",
    "taka": "810"
  },
  {
    "id": "1699333519606",
    "item": "nvjyqvNvU BDwbU-1wU",
    "nos": "1",
    "taka": "120"
  }
];



const BayprostabFormat = ({ doc }, data) => {
  let m = data.db;
  let hd1 = "";
  let hd2 = "";

  let chequeString = '';
  let chequeEnglihName = '';
  let payment = data.payment;
  if (payment === 'ace') {
    chequeString = `bv‡g GKvD›U †cÕ †PK n‡e|`;
    chequeEnglihName = `'${data.nmEn}'`;
  } else if (payment === 'acb') {
    chequeString = `'${data.nmBn}' bv‡g GKvD›U †cÕ †PK n‡e|`;
  } else if (payment === 'br') {
    chequeString = `µq m¤úv\`‡Ki bv‡g †eqvivi †PK n‡e|`;
  } else {
    chequeString = ``;
  }



  for (let i = 0; i < m.length; i++) {
    if (parseInt(m[i].taka) === 0) {
      hd1 = hd1 + m[i].item + ", ";
      hd2 = hd2 + m[i].item + "\n";
    }
  }
  hd1 = hd1.substring(0, hd1.length - 2);
  hd2 = hd2.substring(0, hd2.length - 1);

  doc.addImage("/images/formats/bayprostab1.png", "PNG", 0, 0, 210, 297);

  doc.setFont("SutonnyMJ", "normal");

  doc.setFontSize(18);
  doc.setFont("times", "normal");
  doc.text(` ${data.project}`, 167, 26, null, null, "left");
  doc.text(`${payment === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');

  doc.setFont("SutonnyMJ", "normal");
  doc.setFontSize(14);

  doc.text(`${data.name}`, 50, 40.5, null, null, "left");
  doc.setFont("times", "normal");
  doc.text(` ${hd1}`, 22, 47, null, null, "left");

  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${data.subject}`, 25, 53.5, null, null, "left");

  doc.text(`${formatedDateDot(data.dt, true)}`, 157, 40.5, null, null, "left");

  let x1 = data.db;
  const godata = x1.filter(g => parseFloat(g.taka) !== 0);
  let y = 100;
  let dbTotal = 0;
  for (let i = 0; i < x1.length; i++) {
    const itemLen = x1[i].item;
    let tk = parseFloat(x1[i].taka);

    if (tk === 0) {
      y = y + 2;
      doc.setFont("times", "normal");
      doc.text(`${x1[i].item}`, 16, y, null, null, "left");
    } else {
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${x1[i].item}`, 16, y, { maxWidth: 52, align: 'left' });
      const evalTaka = eval(x1[i].taka);
      doc.text(`${parseFloat(evalTaka).toFixed(2)}`, 91, y, null, null, "right");
      doc.text(`${parseFloat(x1[i].nos).toFixed(2)}`, 101.641, y, null, null, "center");
      const subTotal = parseFloat(evalTaka) * parseFloat(x1[i].nos);
      doc.text(`${numberWithComma(subTotal)}/-`, 133, y, null, null, "right");
      dbTotal = dbTotal + Math.round(subTotal);
    }

    if (itemLen.length > 28) {
      y = y + 12;
    } else {
      y = y + 6;
    }
  }

  doc.text(data.note, 174.347, 100, { maxWidth: 45, align: 'center' });

  if (payment === 'ace') {
    doc.setFont("times", "normal");
    doc.text(`${chequeEnglihName}`, 174.347, 182, null, null, 'center');
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${chequeString}`, 174.347, 188, { maxWidth: 60, align: 'center' });
  } else {
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${chequeString}`, 174.347, 190, { maxWidth: 60, align: 'center' });
  }


  doc.text(`${numberWithComma(dbTotal)}/-`, 122.844, 218, null, null, "center");
  let inwordTak = inwordBangla(parseInt(dbTotal));
  doc.text(`${inwordTak} UvKv gvÎ`, 60, 226.144, null, null, "left");


  /* ** *************************2nd Page Sompurno ***************************** */
  doc.addPage("a4", "p");

  doc.addImage("/images/formats/bayprostab3.png", "PNG", 0, 0, 210, 297);

  doc.setFontSize(18);
  doc.setFont("times", "normal");
  doc.text(`${data.project}`, 168, 26, null, null, "left");
  doc.text(`${payment === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
  doc.setFont("SutonnyMJ", "normal");

  doc.setFontSize(14);
  doc.text(`${data.name}`, 42, 35.173, null, null, "left");
  doc.text(`${formatedDateDot(data.dt, true)}`, 173, 35.173, null, null, "left");

  doc.setFont("times", "normal");
  doc.text(`${hd1}`, 23, 47.188, null, null, "left");
  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${data.subject}`, 27, 53.246, null, null, "left");

  doc.text(`${formatedDateDot(data.dt, true)}`, 47, 59.2, null, null, "left");
  doc.text(`${formatedDateDot(dtAdd15Days(data.dt))}`, 145, 59.2, null, null, "center");


  y = 105;
  for (let i = 0; i < x1.length; i++) {
    const itemLen = x1[i].item;
    let tk = parseFloat(x1[i].taka);
    if (tk === 0) {
      y = y + 2;
      doc.setFont("times", "normal");
      doc.text(`${x1[i].item}`, 16, y, null, null, "left");
    } else {
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${x1[i].item}`, 16, y, { maxWidth: 55, align: 'left' });
      const evalTaka = eval(x1[i].taka);
      doc.text(`${parseFloat(evalTaka).toFixed(2)}`, 90, y, null, null, "right");
      doc.text(`${parseFloat(x1[i].nos).toFixed(2)}`, 101.641, y, null, null, "center");
      const subTotal2ndPage = parseFloat(evalTaka) * parseFloat(x1[i].nos);
      doc.text(`${numberWithComma(Math.round(subTotal2ndPage))}/-`, 133, y, null, null, "right");
    }
    if (itemLen.length > 30) {
      y = y + 12;
    } else {
      y = y + 6;
    }
  }


  doc.text(data.note, 167, 107, { maxWidth: 60, align: 'center' });

  if (payment === 'ace') {
    doc.setFont("times", "normal");
    doc.text(`${chequeEnglihName}`, 167, 190, null, null, 'center');
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${chequeString}`, 167, 196, { maxWidth: 60, align: 'center' });
  } else {
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${chequeString}`, 167, 190, { maxWidth: 60, align: 'center' });
  }



  doc.text(`${numberWithComma(dbTotal)}/-`, 122.844, 226.803, null, null, "center");
  doc.text(`${inwordTak} UvKv gvÎ`, 38, 239.429, null, null, "left");


  /*************************** GO format ************************************************** */
  if (data.project === 'GO') {
    doc.addPage("a4", "p");
    doc.addImage("/images/formats/go.png", "PNG", 0, 0, 210, 297);
    doc.setFontSize(18);
    doc.setFont("times", "normal");
    doc.text(`${payment === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');

    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(16);
    doc.text(`${formatedDateDot(data.dt, true)}`, 175, 42, null, null, "left");
    doc.text(`${inwordTak} UvKv gvÎ`, 55, 196, null, null, "left");
    doc.text("**", 19, 68, null, null, "center");
    doc.text(`${data.subject}`, 28, 68, { maxWidth: 78, align: 'left' });
    doc.line(25, 76, 105, 76) // underline

    y = 82;



    for (let i = 0; i < godata.length; i++) {
      const itemLen = godata[i].item;
      doc.setFont("SutonnyMJ", "normal");
      doc.text("-", 19, y, null, null, "center");
      doc.text(`${godata[i].item}`, 28, y, { maxWidth: 68, align: 'left' });
      const goTotal = parseFloat(eval(godata[i].taka)) * parseFloat(godata[i].nos);
      doc.text(`${numberWithComma(Math.round(goTotal))}/-`, 130, y, null, null, "right");
      if (itemLen.length > 38) {
        y = y + 12;
      } else {
        y = y + 6;
      }
    }

    doc.text(`${numberWithComma(dbTotal)}/-`, 122, 187, null, null, "center");
    doc.setFontSize(13);
    doc.setFont("times", "normal");
    doc.text(`${hd2}`, 146.5, 68, null, null, "center");
    doc.setFontSize(14);
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${data.dpt}`, 180, 68, null, null, "center");

  }

  /**************************** Bearer check ************************************************* */
  if (payment === 'br') {
    if (payment !== 'ace') {
      doc.addPage("a4", "p");
      doc.addImage("/images/formats/bearer.png", "PNG", 0, 0, 210, 297);

      doc.setFont("times", "normal");
      doc.setFontSize(14);
      doc.text(`${data.project}`, 103, 41.5, null, null, "left");

      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${formatedDateDot(data.dt, true)}`, 165, 49.5, null, null, "left");
      doc.setFont("times", "normal");


      doc.setFont("SutonnyMJ", "normal");

      doc.text("**", 25, 120, null, null, "center");
      doc.text(`${data.subject}`, 32, 120, { maxWidth: 70, align: 'left' });

      doc.line(30, 128, 105, 128) // underline

      y = 134;
      for (let i = 0; i < godata.length; i++) {
        const itemLen = godata[i].item;
        doc.setFont("SutonnyMJ", "normal");
        doc.text("-", 25, y, null, null, "center");
        doc.text(`${godata[i].item}`, 34, y, { maxWidth: 65, align: 'left' });
        const totalBearar = parseFloat(eval(godata[i].taka)) * parseFloat(godata[i].nos);
        doc.text(`${numberWithComma(Math.round(totalBearar))}/-`, 129, y, null, null, "right");

        if (itemLen.length > 38) {
          y = y + 12;
        } else {
          y = y + 6;
        }
      }



      doc.setFont("times", "normal");
      doc.text(`${hd2}`, 162.5, 120, null, null, "center");

      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${numberWithComma(dbTotal)}/-`, 120, 248, null, null, "center");

      doc.text(`${inwordTak} UvKv gvÎ`, 40, 255, null, null, "left");
    }
  }
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
  const [payment, setPayment] = useState("");
  const [nmEn, setNmEn] = useState("");
  const [nmBn, setNmBn] = useState("");
  const [nmBr, setNmBr] = useState("");
  const [note, setNote] = useState(`Mvwoi R¡vjvwb (AK‡Ub) cÖ‡qvRb Abyhvqx wewfbœ cv¤ú †_‡K µq Kiv n‡e`);
  const [total, setTotal] = useState("");


  useEffect(() => {
    setDt(formatedDate(new Date()));

    const getData = async () => {
      setWaitMsg('Please wait...');
      try {
        const [staffs, projects] = await Promise.all([
          fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`),
          fetchDataFromAPI(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`)
        ]);
        const scStaff = staffs.filter(staff => staff.placeId._id === "660ae2d4825d0610471e272d");
        console.log(scStaff)
        setStaffData(scStaff);
        setProjectData(projects);
        setWaitMsg('');
        setPayment('br');
        setNmEn('Sun Moon Ad & Printers');
        setNmBn('mvb gyb GW Ges wc«›Uvm©');
        setNmBr('Avmjvg Rvgvb');
      } catch (err) {
        console.log(err);
      }
    }
    getData();

    const locaData = localStorageGetItem("bayprostab");
    console.log(locaData)
    setBayprostabs(locaData);
    const totalTaka = locaData.reduce((t, c) => t + (parseFloat(eval(c.taka)) * parseFloat(c.nos)), 0);
    const totalRound = numberWithComma(Math.round(totalTaka));
    setTotal(totalRound);
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

    let hd = bayprostabs.find(t => parseInt(t.taka) === 0);
    if (bayprostabs.length < 2 || hd === undefined) {
      setMsg("No data or budget head!");
      return false;
    }

    const data = {
      name: staff,
      project: project,
      dt: dt,
      dpt: dpt,
      subject: subject,
      payment: payment,
      nmEn: nmEn,
      nmBn: nmBn,
      nmBr: nmBr,
      note: note,
      total: total,
      db: bayprostabs
    }

    setTimeout(() => {
      BayprostabFormat({ doc }, data);
      doc.save(new Date().toISOString() + "-Bayprostab.pdf");
      setWaitMsg("");
    }, 500);
  }

  // ----------------------------------------------
  const utilitiesHandler = () => {
    const getMsg = localStorageSetItem("bayprostab", utilitiesInitialData);
    setMsg(`${getMsg}-${new Date().toISOString()}`);
    console.log(getMsg);
  }
  const maintenanceHandler = () => {
    const getMsg = localStorageSetItem("bayprostab", maintenanceInitialData);
    setMsg(`${getMsg}-${new Date().toISOString()}`);
    console.log(getMsg);
  }
  const octenHandler = () => {
    const getMsg = localStorageSetItem("bayprostab", octenInitialData);
    setMsg(`${getMsg}-${new Date().toISOString()}`);
    console.log(getMsg);
  }

  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
      </div>

      <div className="w-full px-4 lg:px-6 mb-4 flex justify-between">
        <button onClick={utilitiesHandler} className="text-blue-300 underline underline-offset-4 decoration-4">Utilities</button>
        <button onClick={maintenanceHandler} className="text-blue-300 underline underline-offset-4 decoration-4">Maintenance</button>
        <button onClick={octenHandler} className="text-blue-300 underline underline-offset-4 decoration-4">Octen</button>
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
                  <DropdownEn Title="Payment" Id="payment" Change={e => setPayment(e.target.value)} Value={payment}>
                    <option value="ft">Fund Transfer</option>
                    <option value="ace">A/C Pay English</option>
                    <option value="acb">A/C Pay Bangla</option>
                    <option value="br">Bearer Cheque</option>
                  </DropdownEn>
                </div>
                <div className="w-full col-span-2">

                  {
                    payment === '' ? ' '
                      : payment === 'ft' ? ' '
                        : payment === 'ace' ? <TextEn Title="Name" Id="nmEn" Change={e => setNmEn(e.target.value)} Value={nmEn} Chr="100" />
                          : payment === 'acb' ? <TextBn Title="Name" Id="nmBn" Change={e => setNmBn(e.target.value)} Value={nmBn} Chr="100" />
                            : <TextBn Title="Name" Id="nmBr" Change={e => setNmBr(e.target.value)} Value={nmBr} Chr="100" />
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
                            <Edit Msg={msgHandler} Id={bayprostab.id} data={bayprostabs} />
                            <Delete Msg={msgHandler} Id={bayprostab.id} data={bayprostabs} />
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
