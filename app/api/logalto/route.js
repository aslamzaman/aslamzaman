import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';




export const POST = async (Request) => {
  try {
    const data = await Request.json();
    console.log(data)
    const filePath = "./input.xlsx"
    const workbook = await XlsxPopulate.fromFileAsync(filePath);

    // Make edits.
    workbook.sheet("Worksheet").cell("A1").value("foo");

    // Get the output
    await workbook.toFileAsync("./output.xlsx");

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}