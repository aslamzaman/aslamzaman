import { Lib } from "@/lib/Lib";


export const Format = ({ doc }, data) => {
    let m = data.db;
    let hd1 = "";
    let hd2 = "";
    for (let i = 0; i < m.length; i++) {
      if (parseFloat(m[i].taka) === 0) {
        hd1 = hd1 + m[i].item + ", ";
        hd2 = hd2 + m[i].item + "\n";
      }
    }
    hd1 = hd1.substring(0, hd1.length - 2);
    hd2 = hd2.substring(0, hd2.length - 1);
  
    doc.addImage("/images/formats/bayprostab1.png", "PNG", 0, 0, 210, 297);
  
    doc.setFont("SutonnyMJ", "normal");
  
  
    doc.setFont("times", "normal");
    doc.text(` ${data.project}`, 167, 26, null, null, "left");
  
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);
  
    doc.text(`${data.name}`, 50, 40.5, null, null, "left");
    doc.setFont("times", "normal");
    doc.text(` ${hd1}`, 22, 47, null, null, "left");
  
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${data.subject}`, 25, 53.5, null, null, "left");
  
    doc.text(`${Lib.util.dateFormat(data.dt, ".")}`, 150, 34, null, null, "left");
  
    let x1 = data.db;
    let y = 100;
    let dbTotal = 0;
    for (let i = 0; i < x1.length; i++) {
  
      let tk = parseFloat(x1[i].taka);
      if (tk === 0) {
        y = y + 2;
        doc.setFont("times", "normal");
        doc.text(`${x1[i].item}`, 16, y, null, null, "left");
      } else {
        doc.setFont("SutonnyMJ", "normal");
        doc.text(`${x1[i].item}`, 16, y, null, null, "left");
        doc.text(`${Lib.util.numberWithCommas(parseFloat(x1[i].taka))}/-`, 89, y, null, null, "right");
        doc.text(`${x1[i].nos}`, 101.641, y, null, null, "center");
        doc.text(`${Lib.util.numberWithCommas((parseFloat(x1[i].taka) * parseFloat(x1[i].nos)))}/-`, 131, y, null, null, "right");
        dbTotal = dbTotal + (parseFloat(x1[i].taka) * parseFloat(x1[i].nos));
      }
      y = y + 6;
    }
  
    doc.text(data.note, 174.347, 100, { maxWidth: 45, align: 'center' });
    doc.text(`${Lib.util.numberWithCommas(dbTotal)}/-`, 122.844, 218, null, null, "center");
    let inwordTak = Lib.util.inword.bn(parseInt(dbTotal));
    doc.text(`${inwordTak} UvKv gvÎ`, 60, 226.144, null, null, "left");
  
  
    /* ** ************************************************************************** */
    doc.addPage("a4", "p");
  
    doc.addImage("/images/formats/bayprostab3.png", "PNG", 0, 0, 210, 297);
  
    doc.setFont("times", "normal");
    doc.text(` ${data.project}`, 167, 26, null, null, "left");
    doc.setFont("SutonnyMJ", "normal");
  
    doc.setFontSize(14);
    doc.text(`${data.name}`, 42, 35.173, null, null, "left");
    doc.text(`${Lib.util.dateFormat(data.dt, ".")}`, 175, 35.173, null, null, "left");
  
    doc.setFont("times", "normal");
    doc.text(`${hd1}`, 23, 47.188, null, null, "left");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${data.subject}`, 27, 53.246, null, null, "left");
  
    doc.text(`${Lib.util.dateFormat(data.dt, ".")}`, 47, 59.2, null, null, "left");
    doc.text(`${Lib.util.dateFormat(Lib.util.dateAdd(data.dt, 15), ".")}`, 145, 59.2, null, null, "center");
  
  
    y = 105;
    for (let i = 0; i < x1.length; i++) {
  
      let tk = parseFloat(x1[i].taka);
      if (tk === 0) {
        y = y + 2;
        doc.setFont("times", "normal");
        doc.text(`${x1[i].item}`, 16, y, null, null, "left");
      } else {
        doc.setFont("SutonnyMJ", "normal");
        doc.text(`${x1[i].item}`, 16, y, null, null, "left");
        doc.text(`${Lib.util.numberWithCommas(parseFloat(x1[i].taka))}/-`, 90, y, null, null, "right");
        doc.text(`${x1[i].nos}`, 101.641, y, null, null, "center");
        doc.text(`${Lib.util.numberWithCommas((parseFloat(x1[i].taka) * parseFloat(x1[i].nos)))}/-`, 131, y, null, null, "right");
      }
      y = y + 6;
    }
  
  
    doc.text(data.note, 167, 107, { maxWidth: 60, align: 'center' });
    doc.text(`${Lib.util.numberWithCommas(dbTotal)}/-`, 122.844, 226.803, null, null, "center");
    doc.text(`${inwordTak} UvKv gvÎ`, 38, 239.429, null, null, "left");
  
  
    /*************************** GO format ************************************************** */
    doc.addPage("a4", "p");
    doc.addImage("/images/formats/go.png", "PNG", 0, 0, 210, 297);
  
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(16);
    doc.text(`${Lib.util.dateFormat(data.dt, ".")}`, 175, 42, null, null, "left");
  
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${inwordTak} UvKv gvÎ`, 55, 196, null, null, "left");
    doc.text("**", 19, 68, null, null, "center");
    doc.text(`${data.subject}`, 28, 68, { maxWidth: 65, align: 'left' });
    doc.line(25, 76, 98, 76) // underline
  
    y = 82;
    let godata = x1.filter(g => parseFloat(g.taka) !== 0);
    for (let i = 0; i < godata.length; i++) {
      doc.setFont("SutonnyMJ", "normal");
      doc.text("-", 19, y, null, null, "center");
      doc.text(`${godata[i].item}`, 28, y, null, null, "left");
      doc.text(`${Lib.util.numberWithCommas((parseFloat(godata[i].taka) * parseFloat(godata[i].nos)))}/-`, 130, y, null, null, "right");
      y = y + 6;
    }
  
    doc.text(`${Lib.util.numberWithCommas(dbTotal)}/-`, 122, 187, null, null, "center");
    doc.setFont("times", "normal");
    doc.text(`${hd2}`, 145, 68, null, null, "center");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${data.dpt}`, 180, 68, null, null, "center");
  
  
    /**************************** Bearer check ************************************************* */
    doc.addPage("a4", "p");
    doc.addImage("/images/formats/bearer.png", "PNG", 0, 0, 210, 297);
  
    doc.setFont("times", "normal");
    doc.setFontSize(13);
    doc.text(`${data.project}`, 103, 41.5, null, null, "left");
  
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${Lib.util.dateFormat(data.dt, ".")}`, 165, 49.5, null, null, "left");
    doc.setFont("times", "normal");
  
  
    doc.setFont("SutonnyMJ", "normal");
  
    doc.text("**", 25, 120, null, null, "center");
    doc.text(`${data.subject}`, 34, 120, { maxWidth: 64, align: 'left' });
  
    doc.line(30, 128, 105, 128) // underline
  
    y = 134;
    for (let i = 0; i < godata.length; i++) {
  
      doc.setFont("SutonnyMJ", "normal");
      doc.text("-", 25, y, null, null, "center");
      doc.text(`${godata[i].item}`, 34, y, null, null, "left");
      doc.text(`${Lib.util.numberWithCommas((parseFloat(godata[i].taka) * parseFloat(godata[i].nos)))}/-`, 129, y, null, null, "right");
  
      y = y + 6;
    }
  
  
  
    doc.setFont("times", "normal");
    doc.text(`${hd2}`, 162.5, 120, null, null, "center");
  
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${Lib.util.numberWithCommas(dbTotal)}/-`, 120, 248, null, null, "center");
  
    doc.text(`${inwordTak} UvKv gvÎ`, 40, 255, null, null, "left");
  
  }
  
  
  