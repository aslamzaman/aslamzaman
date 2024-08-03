import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';

const options2 = [
    { name: "Q1", num: 114 },
    { name: "Q2", num: 115 },
    { name: "Q3", num: 116 },
    { name: "Q4", num: 117 }
]

export const POST = async (Request) => {
    try {
        const data = await Request.json();

        const qurrterName = data.searchData.quarter;
        const userName = data.searchData.user;
        const dt = data.searchData.dt;

        // Initialize excel
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet("Sheet1").name("Worksheet"); // Default worksheet 'Sheet1' rename 'Worksheet'

        //  add new worksheet "WorksheetOptions2"
        const WorksheetOptions2 = workbook.addSheet("WorksheetOptions2");

        // add data on "WorksheetOptions2"
        options2.forEach((item, index) => {
            WorksheetOptions2.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions2.cell(`B${index + 1}`).value(item.num);
        });

        // hide "WorksheetOptions2"
        WorksheetOptions2.hidden(true);

        //------------------------------------------------------

        // Set data validation for the range C4:C9 in Sheet1
        const perticipantLength = participant.length;
        sheet.range(`C4:C${perticipantLength + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions2!$A$1:$A$4',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });


        // range merged cell
        sheet.range("A1:C1").merged(true);
        sheet.cell('A1').value("Partner's information").style({ wrapText: true, borderColor: '5b92e5', border: true, fontSize: 10, bold: true, fill: '5b92e5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.range("D1:E1").merged(true);
        sheet.cell('D1').value("Attendance sheet").style({ fill: '5b92e5', horizontalAlignment: 'center', verticalAlignment: 'center' });

        // cell value
        sheet.cell('A2').value("Partner name").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });

        sheet.range('A1:B1').value('Aslam');
        sheet.range("C3:C13").value(() => parseInt(1e6 * Math.random()));
        sheet.range("D3:D13").formula("B3/C3").style("numberFormat", "0.00%");




        // range style
        sheet.range("A3:E3").style({ fill: 'bfdbf5' });

        // column width
        sheet.column("A").width(48);

        // array data 
        participant.forEach((item, i) => {
            sheet.cell(`A${i + 4}`).value('Centre for Mass Education in Science (CMES)');
            sheet.cell(`B${i + 4}`).value(`${userName}`);
            sheet.cell(`C${i + 4}`).value(`${qurrterName}`);
        })

        // formula
        sheet.cell('C4').formula('SUM(C2:C3)').style({ fontSize: 10, border: true, bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });



        // Generate the Excel file as a buffer
        const buffer = await workbook.outputAsync();

        // Set headers for file download
        const filename = "output.xlsx"; // Set your desired filename here
        const headers = new Headers();
        headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.set('Content-Disposition', `attachment; filename=${filename}`);

        // Return the buffer directly for download
        return new NextResponse(buffer, {
            status: 200,
            headers: headers
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error generating Excel file", err }, { status: 500 });
    }
};