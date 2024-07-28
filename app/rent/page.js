"use client";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { BtnSubmit, DropdownEn, TextDt } from "@/components/Form";
import { numberWithComma } from "@/lib/utils";
import { inwordBangla } from "@/lib/utils";

const date_format = dt => new Date(dt).toISOString().split('T')[0];
require("@/lib/fonts/SUTOM_MJ-normal");
require("@/lib//fonts/SUTOM_MJ-bold");
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



const RentFormate = ({ doc }, m, y, dt, rent, goRent, gas, vat, go_tax, total_tax) => {

  doc.addImage("/images/formats/bayprostab1.png", "PNG", 0, 0, 210, 297);

  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${date_format(dt)}`, 150, 34, null, null, "left");
  doc.text("1", 160, 40.600, null, null, "left");

  doc.setFont("times", "normal");
  doc.text('Rent', 25, 46.454, null, null, "left");
  doc.text('GO', 170, 26, null, null, "left");
  doc.setFont("SutonnyMJ", "normal");
  doc.setFontSize(16);
  doc.text('Avmjvg Rvgvb', 50, 40.600, null, null, "left");
  doc.text(`${m} ${y} gv‡mi evwo fvov I M¨vm wej`, 25, 53.5, null, null, "left");
  doc.setFontSize(14);

  doc.setFont("SutonnyMJ", "bold");
  doc.text('evwo fvov : ', 15, 100, null, null, "left");
  doc.setFont("SutonnyMJ", "normal");
  doc.text(`- ${m} ${y}`, 15, 106, null, null, "left");
  doc.text('- M¨vm wej', 15, 112, null, null, "left");
  doc.text('-f¨vU (†Rbv‡ij Acv‡ikb)', 15, 118, null, null, "left");
  doc.text(`-- ${numberWithComma(goRent)}    15%`, 15, 124, null, null, "left");

  doc.line(35, 121.5, 37, 123.5); // Multiply
  doc.line(37, 121.5, 35, 123.5); // Multiply

  doc.text(`${numberWithComma(rent)}/-`, 90, 106, null, null, "right");
  doc.text(`${numberWithComma(gas)}/-`, 90, 112, null, null, "right");
  doc.text(`${numberWithComma(vat)}/-`, 90, 124, null, null, "right");

  doc.text('2', 103, 106, null, null, "right");
  doc.text('1', 103, 112, null, null, "right");
  doc.text('1', 103, 124, null, null, "right");

  doc.text(`${numberWithComma(rent * 2)}/-`, 132, 106, null, null, "right");
  doc.text(`${numberWithComma(gas)}/-`, 132, 112, null, null, "right");
  doc.text(`${numberWithComma(vat)}/-`, 132, 124, null, null, "right");

  // TOR

  doc.setFont("times", "normal");
  doc.text(`TOR`, 150, 100, null, null, "left");

  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${m} ${y} gv‡mi evwo`, 174.347, 105, null, null, "center");
  doc.text(`fvov I M¨vm wej †Rbv‡ij`, 174.347, 110, null, null, "center");
  doc.text(`Acv‡ikb LvZ †_‡K`, 174.347, 115, null, null, "center");
  doc.text(`cwi‡kva Kiv n‡e | c‡i Zv`, 174.347, 120, null, null, "center");
  doc.text(`wewfbœ cÖ‡R± †_‡K AbycvZ`, 174.347, 125, null, null, "center");
  doc.text(`Abyhvqx †diZ n‡e|`, 174.347, 130, null, null, "center");

  doc.setFont("SutonnyMJ", "bold");
  doc.text(`evwo fvov  : `, 150, 140, null, null, "left");

  doc.setFont("times", "normal");
  doc.text(`'Professor Dr. M. A.`, 174.347, 145, null, null, "center");
  doc.text(`Quasem’`, 174.347, 150, null, null, "center");
  doc.setFont("SutonnyMJ", "normal");


  doc.text("bv‡g U¨v·(5%) ev‡` " + `${numberWithComma((rent * 2) - total_tax)}/-`, 174.347, 155, null, null, "center");
  doc.text("Ges M¨vm wej eve` " + `${numberWithComma(gas)}/-`, 174.347, 160, null, null, "center");
  doc.text("UvKvi 2wU GKvD›U †cÕ †PK n‡e", 174.347, 165, null, null, "center");

  // VAt
  doc.setFont("SutonnyMJ", "bold");
  doc.text(`f¨vU:`, 150, 175, null, null, "left");
  doc.setFont("SutonnyMJ", "normal");

  doc.text("GKvD›Um wefv‡Mi m`‡m¨i", 174.347, 180, null, null, "center");
  doc.text("bv‡g †Rbv‡ij Acv‡ik‡bi", 174.347, 185, null, null, "center");
  doc.text("f¨vU+U¨v· eve`", 174.347, 190, null, null, "center");
  doc.text(`(${numberWithComma(vat)}+${numberWithComma(go_tax)})=${numberWithComma(parseInt(vat) + parseInt(go_tax))}/-`, 174.347, 195, null, null, "center");
  doc.text("UvKvi  †eqvivi †PK n‡e|", 174.347, 200, null, null, "center");


  doc.setFont("SutonnyMJ", "bold");
  let total = parseInt(rent * 2) + parseInt(gas) + parseInt(vat);

  doc.text(`${numberWithComma(total)}/-`, 132, 218, null, null, "right");
  doc.setFont("SutonnyMJ", "normal");

  doc.text(`${inwordBangla(total)} UvKv gvÎ`, 60, 226.144, null, null, "left");

  //------------------------------------------------------------------
  doc.addPage("a4", "p");
  doc.addImage("/images/formats/bayprostab3.png", "PNG", 0, 0, 210, 297);

  doc.setFont("SutonnyMJ", "normal");
  doc.setFontSize(16);
  doc.text('Avmjvg Rvgvb', 40, 35.173, null, null, "left");
  doc.setFontSize(14);

  doc.text(date_format(dt), 175, 35.173, null, null, "left");
  doc.setFont("times", "normal");
  doc.text('Rent', 25, 47.188, null, null, "left");
  doc.text('GO', 170, 26, null, null, "left");

  doc.setFont("SutonnyMJ", "normal");
  doc.setFontSize(16);
  doc.text(`${m} ${y} gv‡mi evwo fvov I M¨vm wej`, 25, 53.246, null, null, "left");

  doc.setFontSize(14);
  doc.text(`${date_format(dt)}`, 50, 59, null, null, "left");
  doc.text(`${dtAdd15Days(dt)}`, 150, 59, null, null, "center");


  doc.setFont("SutonnyMJ", "bold");
  doc.text('evwo fvov : ', 15, 106, null, null, "left");
  doc.setFont("SutonnyMJ", "normal");
  doc.text(`- ${m} ${y}`, 15, 112, null, null, "left");
  doc.text('- M¨vm wej', 15, 118, null, null, "left");
  doc.text('-f¨vU (†Rbv‡ij Acv‡ikb)', 15, 124, null, null, "left");
  doc.text(`-- ${numberWithComma(goRent)}    15%`, 15, 130, null, null, "left");


  doc.line(35, 127.5, 37, 129.5); // Multiply
  doc.line(37, 127.5, 35, 129.5); // Multiply

  doc.text(`${numberWithComma(rent)}/-`, 90, 112, null, null, "right");
  doc.text(`${numberWithComma(gas)}/-`, 90, 118, null, null, "right");
  doc.text(`${numberWithComma(vat)}/-`, 90, 130, null, null, "right");

  doc.text('2', 103, 112, null, null, "right");
  doc.text('1', 103, 118, null, null, "right");
  doc.text('1', 103, 130, null, null, "right");

  doc.text(`${numberWithComma(rent * 2)}/-`, 132, 112, null, null, "right");
  doc.text(`${numberWithComma(gas)}/-`, 132, 118, null, null, "right");
  doc.text(`${numberWithComma(vat)}/-`, 132, 130, null, null, "right");


  // TOR

  doc.setFont("times", "normal");
  doc.text(`TOR`, 136, 105, null, null, "left");

  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${m} ${y} gv‡mi evwo fvov I M¨vm`, 167, 110, null, null, "center");
  doc.text(`wej †Rbv‡ij Acv‡ikb LvZ †_‡K`, 167, 115, null, null, "center");
  doc.text(`cwi‡kva Kiv n‡e | c‡i Zv wewfbœ`, 167, 120, null, null, "center");
  doc.text(`cÖ‡R± †_‡K AbycvZ Abyhvqx †diZ n‡e`, 167, 125, null, null, "center");

  doc.setFont("SutonnyMJ", "bold");
  doc.text(`evwo fvov  : `, 136, 140, null, null, "left");

  doc.setFont("times", "normal");
  doc.text(`'Professor Dr. M. A. Quasem’`, 167, 145, null, null, "center");
  doc.setFont("SutonnyMJ", "normal");
  doc.text("bv‡g U¨v·(5%) ev‡` " + `${numberWithComma((rent * 2) - total_tax)}/- Ges`, 167, 150, null, null, "center");
  doc.text("M¨vm wej eve` " + `${numberWithComma(gas)}/--UvKvi`, 167, 155, null, null, "center");
  doc.text("2wU GKvD›Um †cÕ †PK n‡e|", 167, 160, null, null, "center");

  // VAt
  doc.setFont("SutonnyMJ", "bold");
  doc.text(`f¨vU:`, 136, 175, null, null, "left");
  doc.setFont("SutonnyMJ", "normal");

  doc.text("GKvD›Um wefv‡Mi m`‡m¨i bv‡g", 167, 180, null, null, "center");
  doc.text("†Rbv‡ij Acv‡ik‡bi f¨vU+U¨v· eve`", 167, 185, null, null, "center");
  doc.text(`(${numberWithComma(vat)}+${numberWithComma(go_tax)})=${numberWithComma(parseInt(vat) + parseInt(go_tax))}/-`, 167, 190, null, null, "center");
  doc.text("UvKvi †eqvivi †PK n‡e|", 167, 195, null, null, "center");

  doc.setFont("SutonnyMJ", "bold");
  doc.text(`${numberWithComma(total)}/-`, 132, 226.803, null, null, "right");
  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${inwordBangla(total)} UvKv gvÎ`, 45, 239.5, null, null, "left");

  //--------------------------------------------------------------------
  doc.addPage("a4", "p");
  doc.addImage("/images/formats/go.png", "PNG", 0, 0, 210, 297);

  doc.setFont("SutonnyMJ", "normal");
  doc.setFontSize(16);
  doc.text(date_format(dt), 175, 41.75, null, null, "left");

  doc.setFont("SutonnyMJ", "normal");
  doc.text('1.', 16, 70, null, null, "left");
  doc.text(`${m} ${y} gv‡mi evwo fvov I M¨vm wej`, 30, 70, null, null, "left");
  doc.text('ms¯’vcb', 170, 70, null, null, "left");
  doc.text(`- ${m} ${y} evwo fvov`, 30, 77, null, null, "left");
  doc.text(`${numberWithComma(rent * 2)}/-`, 130, 77, null, null, "right");

  doc.text("- M¨vm wej", 30, 84, null, null, "left");
  doc.text(`${numberWithComma(gas)}/-`, 130, 84, null, null, "right");
  doc.text("--f¨vU (†Rbv‡ij Acv‡ikb)", 30, 91, null, null, "left");
  doc.text("-- f¨vU 15%", 60, 98, null, null, "left");
  doc.text(`${numberWithComma(vat)}/-`, 130, 98, null, null, "right");

  doc.setFont("times", "normal");
  doc.text('Rent', 145, 70, null, null, "center");

  doc.setFont("SutonnyMJ", "bold");
  doc.text(`${numberWithComma(total)}/-`, 130, 187, null, null, "right");
  doc.setFont("SutonnyMJ", "normal");
  doc.text(`${inwordBangla(total)} UvKv gvÎ`, 55, 196, null, null, "left");

}




const Houserent = () => {
  const [msg, setMsg] = useState("");
  const [mnth, setMnth] = useState("Rvbyqvix");
  const [dt, setDt] = useState("");
  const [yr, setYr] = useState("");


  useEffect(() => {
    setDt(date_format(new Date()));
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