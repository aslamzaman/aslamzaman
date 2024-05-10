"use client";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib/fonts/SUTOM_MJ-bold");

import { TextNum, DropdownEn, BtnSubmit, TextDt } from "@/components/Form";
import { numberWithComma } from "@/lib/NumberWithComma";
import { inwordBn } from "@/lib/InwordBn";

const date_format = dt => new Date(dt).toISOString().split('T')[0];
const dtAdd15Days = (d1) => {
  const dt1 = new Date(d1);
  const dt2 = dt1.getTime() + (15 * 24 * 60 * 60 * 1000);
  return date_format(new Date(dt2));
}

const MonthData = [
  { id: "Rvbyqvix", option: "January" },
  { id: "†deªæqvix", option: "February" },
  { id: "gvP©", option: "March" },
  { id: "GwcÖj", option: "April" },
  { id: "†g", option: "May" },
  { id: "Ryb", option: "June" },
  { id: "RyjvB", option: "July" },
  { id: "AvMó", option: "August" },
  { id: "†m‡Þ¤^i", option: "September" },
  { id: "A‡±vei", option: "October" },
  { id: "b‡f¤^i", option: "November" },
  { id: "wW‡m¤^i", option: "December" }
]

const YearData = [
  { id: 2023, option: '2023' },
  { id: 2024, option: '2024' },
  { id: 2025, option: '2025' },
  { id: 2026, option: '2026' },
  { id: 2027, option: '2027' },
  { id: 2028, option: '2028' },
  { id: 2029, option: '2029' },
  { id: 2030, option: '2030' },
  { id: 2031, option: '2031' },
  { id: 2032, option: '2032' }
]



const Sewerage = {

  Page1({ doc }, m, y, tk, dt) {
    doc.addImage("/images/formats/bayprostab1.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(20);

    doc.setFontSize(16);
    doc.text('Avmjvg Rvgvb', 49.881, 40.600, null, null, "left");
    doc.setFontSize(14);
    doc.text(date_format(dt), 150, 33.5, null, null, "left");
    doc.setFont("times", "normal");
    doc.text('Utilities', 25, 46.454, null, null, "left");
    doc.text('GO', 170, 26, null, null, "left");

    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(16);
    doc.text(`mvwf©m †m›Uv‡ii cvwb I wmD‡q‡iR wej cwi‡kva`, 25, 53.5, null, null, "left");
    doc.setFontSize(14);

    doc.setFont("SutonnyMJ", "bold");
    doc.text('mv‡mi cvwb I wmD‡q‡iR wej : ', 15, 100, null, null, "left");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`- ${m} ${y}`, 15, 106, null, null, "left");


    doc.text(`${numberWithComma(parseFloat(tk))}/-`, 90, 106, null, null, "right");

    doc.text('1', 103, 106, null, null, "right");

    doc.text(`${numberWithComma(parseFloat(tk))}/-`, 132, 106, null, null, "right");

    // TOR
    doc.setFont("times", "normal");
    doc.text(`TOR`, 150, 100, null, null, "left");

    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${m} ${y} cvwb I`, 174.347, 105, null, null, "center");
    doc.text(`wmD‡q‡iR wej †Rbv‡ij`, 174.347, 110, null, null, "center");
    doc.text(`Acv‡ikb LvZ †_‡K`, 174.347, 115, null, null, "center");
    doc.text(`cwi‡kva Kiv n‡e |`, 174.347, 120, null, null, "center");


    doc.setFont("times", "normal");
    doc.text(`'Professor Dr. M. A.`, 174.347, 145, null, null, "center");
    doc.text(`Quasem’`, 174.347, 150, null, null, "center");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`bv‡g ${numberWithComma(parseFloat(tk))}/- UvKvi`, 174.347, 155, null, null, "center");
    doc.text("GKvD›U †cÕ †PK n‡e", 174.347, 160, null, null, "center");


    doc.setFont("SutonnyMJ", "bold");
    doc.text(`${numberWithComma(parseFloat(tk))}/-`, 132, 219.228, null, null, "right");
    doc.setFont("SutonnyMJ", "normal");

    doc.text(`${inwordBn(tk)} UvKv gvÎ`, 60, 226.144, null, null, "left");

  },
  Page2({ doc }, m, y, tk, dt) {
    doc.addImage("/images/formats/bayprostab3.png", "PNG", 0, 0, 210, 297);

    doc.setFontSize(16);
    doc.text('Avmjvg Rvgvb', 40, 35.173, null, null, "left");
    doc.setFontSize(14);


    doc.text(date_format(dt), 170, 35.173, null, null, "left");

    doc.setFont("times", "normal");
    doc.text('Utilities', 25, 47.188, null, null, "left");
    doc.text('GO', 170, 26, null, null, "left");
    doc.setFont("SutonnyMJ", "normal");

    doc.setFontSize(16);
    doc.text(`mvwf©m †m›Uv‡ii cvwb I wmD‡q‡iR wej cwi‡kva`, 25, 53.246, null, null, "left");
    doc.setFontSize(14);

    doc.text(`${date_format(dt)}`, 50, 59.304, null, null, "left");
    doc.text(`${dtAdd15Days(dt)}`, 135.293, 59.304, null, null, "center");


    doc.setFont("SutonnyMJ", "bold");
    doc.text('mv‡mi cvwb I wmD‡q‡iR wej : ', 15, 106, null, null, "left");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`- ${m} ${y}`, 15, 112, null, null, "left");


    doc.text(`${numberWithComma(parseFloat(tk))}/-`, 90, 112, null, null, "right");

    doc.text('1', 103, 112, null, null, "right");

    doc.text(`${numberWithComma(parseFloat(tk))}/-`, 132, 112, null, null, "right");

    // TOR
    doc.setFont("times", "normal");
    doc.text(`TOR`, 136, 105, null, null, "left");

    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${m} ${y} cvwb I`, 167, 110, null, null, "center");
    doc.text(`wmD‡q‡iR wej †Rbv‡ij`, 167, 115, null, null, "center");
    doc.text(`Acv‡ikb LvZ †_‡K`, 167, 120, null, null, "center");
    doc.text(`cwi‡kva Kiv n‡e |`, 167, 125, null, null, "center");

    doc.setFont("times", "normal");
    doc.text(`'Professor Dr. M. A. Quasem’`, 167, 145, null, null, "center");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`bv‡g ${numberWithComma(parseFloat(tk))}/- UvKvi`, 167, 150, null, null, "center");
    doc.text("GKvD›U †cÕ †PK n‡e", 167, 155, null, null, "center");

    doc.setFont("SutonnyMJ", "bold");
    doc.text(`${numberWithComma(parseFloat(tk))}/-`, 132, 226.803, null, null, "right");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${inwordBn(tk)} UvKv gvÎ`, 40, 239.429, null, null, "left");

  },
  Go({ doc }, m, y, tk, dt) {
    doc.addImage("/images/formats/go.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(16);
    doc.text(`${date_format(dt)}`, 174, 42, null, null, "left");

    doc.setFont("SutonnyMJ", "normal");
    doc.text('1.', 16, 70, null, null, "left");
    doc.text(`mv‡mi cvwb I wmD‡q‡iR wej`, 30, 70, null, null, "left");

    doc.text('ms¯’cb', 170, 70, null, null, "left");


    doc.text(`- ${m} ${y} `, 30, 77, null, null, "left");
    doc.text(`${numberWithComma(parseFloat(tk))}/-`, 130, 77, null, null, "right");


    doc.setFont("times", "normal");
    doc.text('Utilities', 145, 70, null, null, "center");

    doc.setFont("SutonnyMJ", "bold");
    doc.text(`${numberWithComma(parseFloat(tk))}/-`, 130, 187, null, null, "right");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${inwordBn(tk)} UvKv gvÎ`, 56, 196, null, null, "left");
  }
}




const Sewerage_page = () => {
  const [msg, setMsg] = useState("");
  const [tk, setTk] = useState("1673");
  const [mnth, setMnth] = useState("Rvbyqvix");
  const [yr, setYr] = useState("2024");
  const [dt, setDt] = useState("");


  useEffect(() => {

    setDt(date_format(new Date()));
    const d = new Date();
    const d1 = d.getMonth();
    const d2 = d.getFullYear();
    setMnth(MonthData[d1].id);
    setYr(d2);
  }, [msg])

  const createSewerage = (e) => {
    e.preventDefault();
    setMsg("Please wait...");
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or "smart", default is 16
    });
    setTimeout(() => {
      Sewerage.Page1({ doc }, mnth, yr, tk, dt);
      doc.addPage("a4", "p");
      Sewerage.Page2({ doc }, mnth, yr, tk, dt);
      doc.addPage("a4", "p");
      Sewerage.Go({ doc }, mnth, yr, tk, dt);
      doc.save(new Date().toISOString() + "_Sewerage_Bill.pdf");
      setMsg("");
    }, 0);
  }

 

  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Sewerage Bill</h1>
        <p className="w-full text-center text-lg text-blue-300">&nbsp;{msg}&nbsp;</p>
      </div>

      <div className="px-4 lg:px-6">
        <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
          <div className="w-full p-4">
            <form onSubmit={createSewerage}>
              <div className="grid grid-cols-1 gap-2 my-2">
                <TextDt Title="Date" Id="dt" Change={(e) => setDt(e.target.value)} Value={dt} />
                <TextNum Title="Taka" Id="tk" Change={(e) => { setTk(e.target.value) }} Value={tk} Class="" />
                <DropdownEn Title="Select Month" Id="mnth" Change={(e) => { setMnth(e.target.value) }} Value={mnth}>
                  {MonthData.map((m, i) => <option value={m.id} key={i}>{m.option}</option>)}
                </DropdownEn>

                <DropdownEn Title="Select Year" Id="yr" Change={(e) => { setYr(e.target.value) }} Value={yr}>
                  {YearData.map((y, i) => <option value={y.id} key={i}>{y.option}</option>)}
                </DropdownEn>
              </div>
              <div className="w-full flex justify-start">
                <BtnSubmit Title="Create Pdf" Class="bg-blue-600 hover:bg-blue-800 text-white" />
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Sewerage_page;