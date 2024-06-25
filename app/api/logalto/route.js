import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';

export const GET = async () => {
  try {
    const workbook = await XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet("Sheet1");

    const range = sheet.range("A1:G1");
    range.value("Centre for Mass Education in Science (CMES)");
    range.style({ horizontalAlignment: "center", verticalAlignment: "center",fontSize:18 });
    range.merged(true);
    const range2 = sheet.range("A2:G2");
    range2.value("Unit: Khaserhat, Patuakhali ");
    range2.style({ horizontalAlignment: "center", verticalAlignment: "center", });
    range2.merged(true);

    sheet.cell("A3").value("SL").style({ horizontalAlignment: "center", verticalAlignment: "center", bold: true });


    sheet.cell("B3").value("Activity no.").style({ horizontalAlignment: "center", verticalAlignment: "center", bold: true });
    sheet.column("B").width(18);

    sheet.cell("C3").value("Sub no.").style({ horizontalAlignment: "center", verticalAlignment: "center", bold: true });
    sheet.column("C").width(18);

    sheet.cell("D3").value("Taka").style({ horizontalAlignment: "center", verticalAlignment: "center", bold: true });
    sheet.column("D").width(15);

    sheet.cell("E3").value("Other Bill under 500/-Taka attached").style({ horizontalAlignment: "center", verticalAlignment: "center", bold: true, wrapText: true });
    sheet.column("E").width(15);

    sheet.cell("F3").value("Total Taka").style({ horizontalAlignment: "center", verticalAlignment: "center", bold: true });
    sheet.column("F").width(15);

    sheet.cell("G3").value("Comments").style({ horizontalAlignment: "center", verticalAlignment: "center", bold: true });
    sheet.column("G").width(30);

    sheet.cell("A4").value("1");
    sheet.cell("B4").value('1112.1');
    sheet.cell("C4").value('1112.1.1');
    sheet.cell("D4").value(500);
    sheet.cell("E4").value(0);
    sheet.cell("F4").formula('D4+E4');
    sheet.cell("G4").value('Bill copy attached ');


    sheet.cell("C5").value('1112.1.2');
    sheet.cell("D5").value(700);
    sheet.cell("E5").value(300);
    sheet.cell("F5").formula('D5+E5');
    sheet.cell("G5").value('Bill copy attached ');

    sheet.cell("C6").value('1112.1.3');
    sheet.cell("D6").value(900);
    sheet.cell("E6").value(100);
    sheet.cell("F6").formula('D6+E6');
    sheet.cell("G6").value('Bill copy attached ');




    sheet.cell("B7").value('Total');
    sheet.cell("F7").formula('SUM(F4:F6)');



    sheet.cell("H4").value("Aslam");
    sheet.cell("H5").value("Zohur");
    sheet.cell("H6").value("Mofiz");
    sheet.cell("H7").value("Zakia");
    sheet.cell("H8").value("Amit");
    sheet.cell("H9").value("Tuhin");
    const range3 = sheet.range("H4:H9");
    range3.dataValidation({
      type: 'list',
      allowBlank: false,
      showInputMessage: false,
      prompt: false,
      promptTitle: 'String',
      showErrorMessage: false,
      error: 'String',
      errorTitle: 'String',
      operator: 'String',
      formula1: '$H4:$H9',//Required
      formula2: 'String'
  });
  

//    formula1: '$A:$A',//Required

    // Generate the Excel file as a buffer
    const buffer = await workbook.outputAsync();

    // Set headers for file download
    const filename = "out"; // Set your desired filename here
    const headers = new Headers();
    headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    headers.set('Content-Disposition', `attachment; filename=${filename}.xlsx`);

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



/*

export const POST = async (request) => {
  try {
    const workbook = await XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet("Sheet1");

    sheet.cell("A1").value("This is neat!");
    sheet.cell("B1").value(50);
    sheet.cell("C1").value(25);
    sheet.cell("D1").formula("B1 + C1");

    // Generate the Excel file as a buffer
    const buffer = await workbook.outputAsync();

    // Set headers for file download
    const filename = "out"; // Set your desired filename here
    const headers = new Headers();
    headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    headers.set('Content-Disposition', `attachment; filename=${filename}.xlsx`);

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

*/