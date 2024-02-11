import { Lib } from "@/lib/Lib";

export const LocalTaCreation = ({ doc }, data) => {
    const localtas = data.localtas;
    const staff = data.staff;
    const subject = data.subject;
    const project = data.project;
    const dt = data.dt;


    doc.addImage("/images/formats/localtasingle.png", "PNG", 0, 0, 210, 297);
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(`${project}`, 181, 10, null, null, "center");
    doc.line(165, 11, 197, 11);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);
    //----------------------------------------------------
    let y = 67;
    let total = 0;
    for (let i = 0; i < localtas.length; i++) {
        let tick = localtas[i].vehicle;
        let x = 0;
        let x1 = 0;
        let x2 = 0;

        if (tick === "evm") {
            x = 105;
            x1 = 130;
            x2 = 150;
        } else if (tick === "wmGbwR") {
            x = 128;
            x1 = 107;
            x2 = 150;
        } else if (tick === "wi·v") {
            x = 148;
            x1 = 130;
            x2 = 107;
        }
        doc.text(`${localtas[i].place1}`, 27, y, null, null, "center");
        doc.text(`${localtas[i].t1}`, 48.5, y, null, null, "center");

        doc.text(`${localtas[i].place2}`, 69.5, y, null, null, "center");
        doc.text(`${localtas[i].t2}`, 92, y, null, null, "center");

        doc.addImage("/images/tick_mark/tick.png", "PNG", x, y - 4 , 4.25, 4.25);
        doc.text(`-`, x1, y, null, null, "center");
        doc.text(`-`, x2, y, null, null, "center");

        doc.text(`${parseFloat(localtas[i].taka).toFixed(2)}`, 195, y, null, null, "right");
        total = total + parseFloat(localtas[i].taka);
        y = y + 6;
    }

    doc.text(`${total.toFixed(2)}`, 195, 113, null, null, "right");
    let t = parseInt(total).toString();
    doc.text(`${Lib.util.inword.bn(t)} UvKv gvÎ`, 39, 113.6, null, null, "left");


    doc.text(`${staff}`, 97, 35.6, null, null, "center");
    doc.text(`${Lib.util.dateFormat(dt, ".")}`, 178, 35, null, null, "center");
    doc.text("mv‡m", 178, 44, null, null, "center");
    doc.text(`${subject}`, 89, 44, null, null, "center");

}

