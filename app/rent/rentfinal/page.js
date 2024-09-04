"use client";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { BtnSubmit, DropdownEn, TextDt } from "@/components/Form";
import { numberWithComma, inwordBangla, formatedDate, formatedDateDot } from "@/lib/utils";

require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib//fonts/SUTOM_MJ-bold");
const dtAdd15Days = (d1) => {
  const dt1 = new Date(d1);
  const dt2 = dt1.getTime() + (15 * 24 * 60 * 60 * 1000);
  return formatedDate(new Date(dt2));
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



const RentFormate = ({ doc }, m, y, dt, rent, goRent, gas, vat, go_tax, total_tax) => {

  doc.addImage("/images/formats/rent1.png", "PNG", 0, 0, 210, 297);
  doc.setFont("SutonnyMJ", "normal");
  doc.setFontSize(16);
  doc.text(`${m} ${y} gv‡mi evwo fvov I M¨vm wej`, 25, 53.5, null, null, "left");
  doc.setFontSize(14);
  doc.text(`${formatedDateDot(dt, true)}`, 150, 34, null, null, "left");
  doc.text(`- ${m} ${y}`, 15, 106, null, null, "left");
  doc.text(`${m} ${y} gv‡mi evwo`, 174.347, 105, null, null, "center");


  //------------------------------------------------------------------
  doc.addPage("a4", "p");
  doc.addImage("/images/formats/rent2.png", "PNG", 0, 0, 210, 297);
  doc.setFont("SutonnyMJ", "normal");
  doc.setFontSize(16);
  doc.text(`${m} ${y} gv‡mi evwo fvov I M¨vm wej`, 25, 53.246, null, null, "left");
  doc.setFontSize(14);
  doc.text(formatedDateDot(dt), 175, 35.173, null, null, "left");
  doc.text(`${formatedDateDot(dt, true)}`, 50, 59, null, null, "left");
  doc.text(`${formatedDateDot(dtAdd15Days(dt), true)}`, 150, 59, null, null, "center");

  doc.text(`- ${m} ${y}`, 15, 112, null, null, "left");
  doc.text(`${m} ${y} gv‡mi evwo fvov I M¨vm`, 167, 110, null, null, "center");

  //--------------------------------------------------------------------
  doc.addPage("a4", "p");
  doc.addImage("/images/formats/rent3.png", "PNG", 0, 0, 210, 297);

  doc.setFont("SutonnyMJ", "normal");
  doc.setFontSize(16);
  doc.text(formatedDateDot(dt, true), 175, 41.75, null, null, "left");

  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${m} ${y} gv‡mi evwo fvov I M¨vm wej`, 30, 70, null, null, "left");
  doc.text(`- ${m} ${y} evwo fvov`, 30, 77, null, null, "left");

}




const Houserent = () => {
  const [msg, setMsg] = useState("");
  const [mnth, setMnth] = useState("Rvbyqvix");
  const [dt, setDt] = useState("");
  const [yr, setYr] = useState("");


  useEffect(() => {
    setDt(formatedDate(new Date()));
    const d = new Date();
    const d1 = d.getMonth();
    const d2 = d.getFullYear();
    setMnth(MonthData[d1].id);
    setYr(d2);
  }, [msg])



  const createHouseRent = (e) => {
    e.preventDefault();
    setMsg("Please wait...");

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or "smart", default is 16
    });


    const h_rent = 33600;
    const g_rent = 25458;
    const gas_bill = 1080;
    const vat = 3819;
    const go_tax = 1273;
    const total_tax = 3360;
    setTimeout(() => {
      RentFormate({ doc }, mnth, yr, dt, h_rent, g_rent, gas_bill, vat, go_tax, total_tax);
      doc.save(new Date().toISOString() + "-House rent.pdf");
      setMsg("");
    }, 0);
  }


  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">House Rent</h1>
        <p className="w-full text-center text-lg text-blue-300">&nbsp;{msg}&nbsp;</p>
      </div>

      <div className="px-4 lg:px-6">
        <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
          <div className="w-full p-4">
            <form onSubmit={createHouseRent}>
              <div className="grid grid-cols-1 gap-2 my-2">
                <TextDt Title="Date" Id="dt" Change={(e) => setDt(e.target.value)} Value={dt} />
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

export default Houserent;