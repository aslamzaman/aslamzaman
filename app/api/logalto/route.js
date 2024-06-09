import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';




export const POST = async (Request) => {
  try {
    const data = await Request.json();
    console.log(data)
    const filePath = "./input.xlsx"
    const workbook = await XlsxPopulate.fromFileAsync(filePath);

    // Make edits.
    for(let i =0; i < data.length; i++){
    workbook.sheet("Worksheet").cell(`H${i+4}`).value(`${data[i].name}`);
    }
    // Get the output
    await workbook.toFileAsync("./output.xlsx");

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}