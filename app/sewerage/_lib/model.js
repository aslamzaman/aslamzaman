import { Lib } from "@/lib/Lib";


export const MonthData = [
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

 export const YearData = [
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


  
export const SewerageFormat = {
    Page1({ doc }, m, y, tk, dt) {
      doc.addImage("/images/formats/bayprostab1.png", "PNG", 0, 0, 210, 297);
      doc.setFont("SutonnyMJ", "normal");
      doc.setFontSize(20);
  
      doc.setFontSize(16);
      doc.text('Avmjvg Rvgvb', 49.881, 40.600, null, null, "left");
      doc.setFontSize(14);
      doc.text(Lib.util.dateFormat(dt, "."), 150, 33.5, null, null, "left");
      doc.setFont("times", "normal");
      doc.text('Utilities Bill', 25, 46.454, null, null, "left");
      doc.text('GO', 170, 26, null, null, "left");
  
      doc.setFont("SutonnyMJ", "normal");
      doc.setFontSize(16);
      doc.text(`mvwf©m †m›Uv‡ii cvwb I wmD‡q‡iR wej cwi‡kva`, 25, 53.5, null, null, "left");
      doc.setFontSize(14);
  
      doc.setFont("SutonnyMJ", "bold");
      doc.text('mv‡mi cvwb I wmD‡q‡iR wej : ', 15, 100, null, null, "left");
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`- ${m} ${y}`, 15, 106, null, null, "left");
  
  
      doc.text(`${Lib.util.numberWithCommas(tk)}/-`, 90, 106, null, null, "right");
  
      doc.text('1', 103, 106, null, null, "right");
  
      doc.text(`${Lib.util.numberWithCommas(tk)}/-`, 132, 106, null, null, "right");
  
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
      doc.text(`bv‡g ${Lib.util.numberWithCommas(tk)}/- UvKvi`, 174.347, 155, null, null, "center");
      doc.text("GKvD›U †cÕ †PK n‡e", 174.347, 160, null, null, "center");
  
  
      doc.setFont("SutonnyMJ", "bold");
      doc.text(`${Lib.util.numberWithCommas(tk)}/-`, 132, 219.228, null, null, "right");
      doc.setFont("SutonnyMJ", "normal");
  
      doc.text(`${Lib.util.inword.bn(tk)} UvKv gvÎ`, 60, 226.144, null, null, "left");
  
    },
    Page2({ doc }, m, y, tk, dt) {
      doc.addImage("/images/formats/bayprostab3.png", "PNG", 0, 0, 210, 297);
  
      doc.setFontSize(16);
      doc.text('Avmjvg Rvgvb', 40, 35.173, null, null, "left");
      doc.setFontSize(14);
  
  
      doc.text(Lib.util.dateFormat(dt, "."), 170, 35.173, null, null, "left");
  
      doc.setFont("times", "normal");
      doc.text('Utilities Bill', 25, 47.188, null, null, "left");
      doc.text('GO', 170, 26, null, null, "left");
      doc.setFont("SutonnyMJ", "normal");
  
      doc.setFontSize(16);
      doc.text(`mvwf©m †m›Uv‡ii cvwb I wmD‡q‡iR wej cwi‡kva`, 25, 53.246, null, null, "left");
      doc.setFontSize(14);
  
      doc.text(Lib.util.dateFormat(dt, "."), 50, 59.304, null, null, "left");
      doc.text(Lib.util.dateFormat(Lib.util.dateAdd(dt, 15), "."), 135.293, 59.304, null, null, "center");
  
  
      doc.setFont("SutonnyMJ", "bold");
      doc.text('mv‡mi cvwb I wmD‡q‡iR wej : ', 15, 106, null, null, "left");
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`- ${m} ${y}`, 15, 112, null, null, "left");
  
  
      doc.text(`${Lib.util.numberWithCommas(tk)}/-`, 90, 112, null, null, "right");
  
      doc.text('1', 103, 112, null, null, "right");
  
      doc.text(`${Lib.util.numberWithCommas(tk)}/-`, 132, 112, null, null, "right");
  
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
      doc.text(`bv‡g ${Lib.util.numberWithCommas(tk)}/- UvKvi`, 167, 150, null, null, "center");
      doc.text("GKvD›U †cÕ †PK n‡e", 167, 155, null, null, "center");
  
      doc.setFont("SutonnyMJ", "bold");
      doc.text(`${Lib.util.numberWithCommas(tk)}/-`, 132, 226.803, null, null, "right");
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${Lib.util.inword.bn(tk)} UvKv gvÎ`, 40, 239.429, null, null, "left");
  
    },
    Go({ doc }, m, y, tk, dt) {
      doc.addImage("/images/formats/go.png", "PNG", 0, 0, 210, 297);
      doc.setFont("SutonnyMJ", "normal");
      doc.setFontSize(16);
      doc.text(Lib.util.dateFormat(dt, "."), 174, 42, null, null, "left");
  
      doc.setFont("SutonnyMJ", "normal");
      doc.text('1.', 16, 70, null, null, "left");
      doc.text(`mv‡mi cvwb I wmD‡q‡iR wej`, 30, 70, null, null, "left");
  
      doc.text('ms¯’cb', 170, 70, null, null, "left");
  
  
      doc.text(`- ${m} ${y} `, 30, 77, null, null, "left");
      doc.text(`${Lib.util.numberWithCommas(tk)}/-`, 130, 77, null, null, "right");
  
  
      doc.setFont("times", "normal");
      doc.text('Utilities', 145, 70, null, null, "center");
      doc.text('Bill', 145, 77, null, null, "center");
  
      doc.setFont("SutonnyMJ", "bold");
      doc.text(`${Lib.util.numberWithCommas(tk)}/-`, 130, 187, null, null, "right");
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`${Lib.util.inword.bn(tk)} UvKv gvÎ`, 56, 196, null, null, "left");
    }
  }
  
  
  