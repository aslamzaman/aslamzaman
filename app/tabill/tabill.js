import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import Layout from "../../components/Layout";
import Add from "../../components/tabill/Add";
import Edit from "../../components/tabill/Edit";
import Delete from "../../components/tabill/Delete";
import Download from "../../components/tabill/Download";
import Upload from "../../components/tabill/Upload";

import { fetchAll } from "../../components/DexieDatabase";
import { getItems } from "../../components/LocalDatabase";


import { Panel, PanelBody } from "../../components/Panel";
import { DropdownEn, TextDt, TextBn, BtnSubmit } from "../../components/Form";
import { Lib } from "../../utils/Lib";
import { Formats } from "@/utils/Formats";

require("../../utils/fonts/SUTOM_MJ-normal");
require("../../utils/fonts/SUTOM_MJ-bold");

const dtAr = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
]

const dateShortFormat=(dt)=> {
  const d = new Date(dt);
const fyr = d.getFullYear().toString();
const yr = fyr.substr(2,2);
  return dtAr[d.getDate()] + "." + dtAr[d.getMonth() + 1] + "." + yr;
}


const TaBillCreation = ({ doc }, data) => {
  const tabills = data.tabills;
  const staff = data.staff;
  const project = data.project;
  const dt1 = data.dt1;
  const taData = data.taData;
  const daData = data.daData;

  const nm = staff.split(",");
  Formats.tabill({ doc });
  // doc.addImage("/images/formats/tabill.png", "PNG", 0, 0, 210, 297);
  doc.setFont("times", "normal");
  doc.setFontSize(14);
  doc.text(`${nm[2]}`, 75, 71.5, null, null, "center");
  doc.text(`${project}`, 172, 71.5, null, null, "center");
  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${nm[0]}`, 75, 61.5, null, null, "center");
  doc.text(`${nm[1]}`, 172, 61.5, null, null, "center");

  //----------------------------------------------------
  let y = 92;
  let total = 0;
  for (let i = 0; i < tabills.length; i++) {

    let expanse = 0;
    if (tabills[i].vehicle === "wba©vwiZ") {
      const taMatchData = taData.find(t => parseInt(t.unit_id) === parseInt(data.unit));
      expanse = parseInt(taMatchData.tk);
    } else {
      expanse = tabills[i].taka
    }

    doc.text(`${dateShortFormat(tabills[i].dt)}`, 21, y + 1.5, null, null, "center");
    // doc.line(13.5, y + 0.25, 23, y + .025);
    // doc.text(`${TaDtFormat(tabills[i].dt)[1]}`, 18.5, y + 3, null, null, "center");
    doc.text(`${tabills[i].place1}`, 39.5, y + 1.5, null, null, "center");
    doc.text(`${tabills[i].tm1}`, 55.7, y + 1.5, null, null, "center");
    doc.text(`${tabills[i].place2}`, 71.7, y + 1.5, null, null, "center");
    doc.text(`${tabills[i].tm2}`, 87.7, y + 1.5, null, null, "center");
    doc.text(`${tabills[i].cause}`, 119.3, y + 1.5, null, null, "center");
    doc.text(`${tabills[i].vehicle}`, 154, y + 1.5, null, null, "center");
    doc.text(`${parseFloat(expanse).toFixed(2)}`, 182, y + 1.5, null, null, "right");
    total = total + parseFloat(expanse);
    y = y + 5;
  }

  const date1 = tabills[0].dt;
  const date2 = tabills[tabills.length - 1].dt;

  let tourDays = parseInt(Lib.util.dateDiff(date1, date2)) - 1;

  const firstDayTime = tabills[0].tm1;
  const lastDayTime = tabills[tabills.length - 1].tm2;


  const f1 = new Date(`January 01, 2000 ${firstDayTime}`).getTime();
  const f2 = new Date("January 01, 2000 12:00").getTime();
  const f3 = f1 - f2; // 7 -12

  if (f3 < 0) {
    tourDays = tourDays + 1;
  } else {
    tourDays = tourDays + 0.5;
  }


  const t1 = new Date(`January 01, 2000 ${lastDayTime}`).getTime();
  const t2 = new Date("January 01, 2000 20:00").getTime();
  const t3 = t1 - t2; // 7- 8


  if (t3 < 0) {
    tourDays = tourDays + 0.5;
  } else {
    tourDays = tourDays + 1;
  }

  const findStaffDa = daData.find(d => parseInt(d.post_id) === parseInt(nm[3]));
  const daTaka = findStaffDa ? findStaffDa.tk : 0;
  const totalDa = parseInt(daTaka) * parseFloat(tourDays);
  const gt = parseInt(totalDa) + parseInt(total);

  doc.text(`${dateShortFormat(date1, ".")} †_‡K ${dateShortFormat(date2, ".")} ZvwiL = ${tourDays} w\`b * ${daTaka} `, 68, 240, null, null, "left");
  doc.text(`${totalDa.toFixed(2)}`, 182, 240, null, null, "right");

  doc.text(`${gt.toFixed(2)}`, 182, 247, null, null, "right");
  // let t = parseInt(total).toString();
  doc.text(`${Lib.util.inword.bn(gt)} UvKv gvÎ`, 50, 247, null, null, "left");
  doc.text(`${dateShortFormat(dt1)}`, 179.5, 279.5, null, null, "left");

}


const Tabill = () => {
  const [tabills, setTabills] = useState([]);
  const [msg, setMsg] = useState("Data ready");

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
    setDt1(Lib.util.dateFormat(new Date(), "-"));
    const getData = async () => {
      try {
        const [staffs, posts, projects, places, units, tas, das] = await Promise.all([
          fetchAll("staff"),
          fetchAll("post"),
          fetchAll("project"),
          fetchAll("place"),
          fetchAll("unit"),
          fetchAll("ta"),
          fetchAll("da")
        ]);

        const joinStaffs = staffs.map(s => {
          const matchPost = posts.find(ps => parseInt(ps.id) === parseInt(s.post_id));
          const matchPlace = places.find(pl => parseInt(pl.id) === parseInt(s.place_id));
          return {
            ...s,
            post: matchPost.nm_bn,
            place: matchPlace.name
          }
        })


        setStaffData(joinStaffs);
        setProjectData(projects);
        setUnitData(units);
        setTaData(tas);
        setDaData(das);
      } catch (err) {
        console.log(err);
      }
    }
    getData();

    const load = () => {
      let data = getItems("tabill");
      setTabills(data);
      const result = data.reduce((total, dta) => total + parseFloat(dta.taka), 0);
      setTotal(result)
    };
    load();
  }, [msg]);


  const msgHandler = (data) => {
    setMsg(data);
  }

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16
  });

  const createHandler = (e) => {
    e.preventDefault();

    if (tabills.length < 1) {
      setMsg("No data!!");
      return false;
    }

    const data = {
      tabills: tabills,
      taData: taData,
      daData: daData,
      staff: staff,
      unit: unit,
      project: project,
      dt1: dt1
    }
    setMsg("Please wait...");

    setTimeout(() => {
      TaBillCreation({ doc }, data);
      doc.save(new Date().toISOString() + "_TA_Bill.pdf");
      setMsg("PDF create completed.");
    }, 0);


  }

  const PrintHandler = () => {
    alert("No actions!");
  }

  return (
    <Layout Title="TA Bill">
      <div className="w-full">

        <div className='w-full h-16 mx-auto mb-4 bg-gradient-to-r from-white via-blue-600 to-white text-white flex justify-center items-center'>
          <h1 className='text-2xl font-bold'>TA Bill</h1>
        </div>
        <div className='w-full'>
          <p className='w-full text-red-600 text-center'>{msg}</p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="w-full col-span-1 md:col-span-2">
            <Panel>
              <PanelBody>
                <form onSubmit={createHandler}>
                  <div className='w-full grid grid-cols-2 gap-2'>
                    <div className="w-full">
                      <DropdownEn Title="Staff Name" Id="staff" Change={(e) => { setStaff(e.target.value) }} Value={staff}>
                        {
                          staffData.length
                            ? staffData.map((s, i) => {
                              let stf = s.nm_bn + "," + s.post + "," + s.place + "," + s.post_id;
                              return <option value={stf} key={i}>{s.nm_en}</option>
                            })
                            : null
                        }
                      </DropdownEn>
                    </div>

                    <div className="full">
                      <DropdownEn Title="Project" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                        {
                          projectData.length
                            ? projectData.map((p, i) => {
                              return <option value={p.name} key={i}>{p.name}</option>
                            })
                            : null
                        }
                      </DropdownEn>
                    </div>
                    <div className="w-full">
                      <TextDt Title="Date" Id="dt" Change={(e) => { setDt1(e.target.value) }} Value={dt1} />
                    </div>
                    <div className="w-full">
                      <DropdownEn Title="Unit" Id="unit" Change={(e) => { setUnit(e.target.value) }} Value={unit}>
                        {
                          unitData.length
                            ? unitData.map((u, i) => {
                              return <option value={u.id} key={u.id}>{u.nm_en}</option>
                            })
                            : null
                        }
                      </DropdownEn>
                    </div>

                    <div className="w-full col-span-2 md:col-span-2">
                      <BtnSubmit Title="Create" Class="w-full bg-gradient-to-r from-white via-red-800 to-white hover:bg-green-800 text-white" />
                    </div>

                  </div>
                </form>
              </PanelBody>
            </Panel>
          </div>
          <div className="w-full col-span-1 md:col-span-3">
            <Panel>
              <PanelBody>
                
                <div className="w-full">                 
                    <div className="w-full flex justify-end items-center pr-1 mb-2">
                      <Download Msg={msgHandler} />
                      <Upload Msg={msgHandler} />
                    </div>
                  <div>                  
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
                          <th className="font-normal text-start flex justify-end mt-1">
                            <Add Msg={msgHandler} />
                            <button onClick={PrintHandler} className="w-7 h-7 bg-green-600 hover:bg-green-800 text-white flex justify-center items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                              </svg>
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          tabills.length
                            ? tabills.map((ta) => {
                              return (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={ta.id}>
                                  <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{ta.dt}</td>
                                  <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{ta.place1}</td>
                                  <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{ta.tm1}</td>
                                  <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{ta.place2}</td>
                                  <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{ta.tm2}</td>
                                  <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{ta.vehicle}</td>
                                  <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{ta.taka}</td>
                                  <td className="text-center py-2 px-4 font-SutonnyMJ_Regular">{ta.cause}</td>
                                  <td className="flex justify-end items-center mt-1">
                                    <Edit Msg={msgHandler} Id={ta.id} />
                                    <Delete Msg={msgHandler} Id={ta.id} />
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

              </PanelBody>
            </Panel>
          </div>
        </div>


      </div>

    </Layout>
  );


};
export default Tabill;
