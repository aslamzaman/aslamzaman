import { formatedDateDot, inwordBangla, numberWithComma } from "./utils";


export const BayprostabPreparation = {
  central: ({ doc, data }) => {
    doc.addImage("/images/formats/bayprostab1.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);
    doc.text(`${data.name}`, 50, 40.5, null, null, "left");
    doc.text(`${formatedDateDot(data.dt, true)}`, 146, 33.65, null, null, "left");
    doc.text(`${data.subject}`, 25, 53.5, null, null, "left");
    doc.text(data.note, 174.347, 100, { maxWidth: 45, align: 'center' });
    doc.text(`${numberWithComma(data.total)}/-`, 122.844, 218, null, null, "center");
    let inwordTak = inwordBangla(parseInt(data.total));
    doc.text(`${inwordTak} UvKv gvÎ`, 60, 226.144, null, null, "left");

    doc.setFont("times", "normal");
    doc.text(`${data.payType === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
    doc.text(` ${data.project}`, 168, 26, null, null, "left");
    doc.text(` ${data.budgetHead}`, 22, 47, null, null, "left");
  },
  completePlan: ({ doc, data }) => {
    doc.addImage("/images/formats/bayprostab3.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);

    doc.text(`${data.name}`, 42, 35.173, null, null, "left");
    doc.text(`${formatedDateDot(data.dt, true)}`, 175, 35.173, null, null, "left");
    doc.text(`${data.subject}`, 27, 53.246, null, null, "left");
    doc.text(`${formatedDateDot(data.dateStart, true)}`, 47, 59.2, null, null, "left");
    doc.text(`${formatedDateDot(data.dateEnd, true)}`, 145, 59.2, null, null, "center");
    doc.text(`${numberWithComma(data.total)}/-`, 122.844, 226.803, null, null, "center");
    let inwordTak = inwordBangla(parseInt(data.total));
    doc.text(`${inwordTak} UvKv gvÎ`, 38, 239.429, null, null, "left");
    doc.text(data.note, 167, 107, { maxWidth: 60, align: 'center' });


    doc.setFont("times", "normal");
    doc.text(`${data.payType === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
    doc.text(`${data.project}`, 168, 26, null, null, "left");
    doc.text(` ${data.budgetHead}`, 23, 47, null, null, "left");
  },
  go: ({ doc, data }) => {
    doc.addImage("/images/formats/goformat.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);

    doc.text(`${data.subject}`, 24, 56, null, null, 'left');
    doc.text(`${formatedDateDot(data.dt, true)}`, 101, 42.5, null, null, "left");
    doc.text(`${data.dpt}`, 181, 76, null, null, "center");

    let inwordTak = inwordBangla(parseInt(data.total));
    doc.text(`†gvU: ${inwordTak} UvKv gvÎ`, 13.5, 226, null, null, "left");
    doc.text(`${numberWithComma(data.total)}/-`, 128.5, 219, null, null, "right");

    doc.setFont("times", "normal");
    doc.text(`${data.payType === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
    doc.text(` ${data.budgetHead}`, 146, 76, { maxWidth: 26, align: "center" });

  },
  bearer: ({ doc, data }) => {
    doc.addImage("/images/formats/bearer.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);

    doc.text(`(${data.subject})`, 20, 105.2, null, null, 'left');
    doc.text(`${formatedDateDot(data.dt, true)}`, 165, 49.5, null, null, "left");
    let inwordTak = inwordBangla(parseInt(data.total));
    doc.text(`${inwordTak} UvKv gvÎ`, 38, 255.2, null, null, "left");
    doc.text(`${numberWithComma(data.total)}/-`, 120, 247.5, null, null, "center");


    doc.setFont("times", "normal");
    doc.text(`${data.payType === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
    doc.text(`${data.project}`, 103, 41.5, null, null, "left");
    doc.text(` ${data.budgetHead}`, 162.4, 119, { maxWidth: 54, align: "center" });
  },
  tableOne: ({ doc, db }, x1, x2, x3, x4, y, w) => {
    doc.setFontSize(14);
    for (let i = 0; i < db.length; i++) {

      const total = parseFloat(db[i].nos) * parseFloat(eval(db[i].taka));
      const no = parseFloat(db[i].nos);
      const tk = parseFloat(eval(db[i].taka));
      const line = doc.splitTextToSize(`${db[i].item}`, w);

      if (tk === 0) {
        y += 3;
        doc.setFont("times", "normal");
        doc.text(`${db[i].item}:-`, x1, y, null, null, 'left');
        y += 6;
      } else {
        doc.setFont("SutonnyMJ", "normal");
        if (no > 1) {
         
          doc.text(line, x1, y, { maxWidth: w, align: 'left' });
         // doc.text(`${db[i].item}`, x1, y, { maxWidth: w, align: 'left' });
          doc.text(`${numberWithComma(tk, false)}/-`, x2, y, null, null, 'right');
          doc.text(`${no}`, x3, y, null, null, 'center');
          doc.text(`${numberWithComma(total, false)}/-`, x4, y, null, null, 'right');
        } else {
          doc.text(line, x1, y, { maxWidth: w, align: 'left' });
         // doc.text(`${db[i].item}`, x1, y, { maxWidth: w, align: 'left' });
          doc.text("-", 80.7, y, null, null, 'center');
          doc.text("-", 101.8, y, null, null, 'center');
          doc.text(`${numberWithComma(total, false)}/-`, x4, y, null, null, 'right');
        }
       
        const lineNumber = line.length;
        y += lineNumber * 6;
      }

    }
  },
  tableTwo: ({ doc, db }, x1, x2, x3, y, w) => {
    doc.setFontSize(14);
    for (let i = 0; i < db.length; i++) {
      if (db[i].taka !== 0) {
        doc.setFont("SutonnyMJ", "normal");
        const total = parseFloat(db[i].nos) * parseFloat(eval(db[i].taka));
        doc.text(`-`, x1, y, null, null, 'center');
        const line = doc.splitTextToSize(`${db[i].item}`, w);
        doc.text(line, x2, y, { maxWidth: w, align: 'left' });
        doc.text(`${numberWithComma(total, false)}/-`, x3, y, null, null, 'right');
       
        // console.log("line Two: ", line);
        const lineNumber = line.length;
        y += lineNumber * 6;
      } else {
        y += 2;
        doc.setFont("times", "normal");
        doc.text(`${db[i].item}:-`, x2, y, null, null, 'left');
        y += 6;
      }
    }
  },
  payment: ({ doc, data }, x, y, w, opt) => {

    if (opt === 'ace') {
      doc.setFont("times", "normal");
      doc.text(`"${data.cheque}"`, x, y, { maxWidth: w, align: 'center' });
    } else if (opt === 'acb') {
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`"${data.cheque}"`, x, y, { maxWidth: w, align: 'center' });
    } else if (opt === 'br') {
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`"µq m¤úv\`‡Ki"`, x, y, { maxWidth: w, align: 'center' });
    } else {
      doc.text("", x, y, { maxWidth: w, align: 'center' });
    }

    const line = doc.splitTextToSize(`"${data.cheque}"`, w);
    const lineNumber = line.length;
    y += (lineNumber * 6);

    doc.setFont("SutonnyMJ", "normal");
    if (opt === 'ace' || opt === 'acb') {
      doc.text("bv‡g GKvD›U †c' †PK n‡e", x, y, null, null, 'center');
    } else if (opt === 'br') {
      doc.text("bv‡g †eqvivi †PK n‡e", x, y, null, null, 'center');
    } else {
      doc.text("", x, y, null, null, 'center');
    }
  }

}