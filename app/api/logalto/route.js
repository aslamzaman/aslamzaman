import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';

export const GET = async () => {
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