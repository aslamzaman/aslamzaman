import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';
import fs from 'fs';
import path from 'path';


export const POST = async (Request) => {
  try {
    const data = await Request.json();
    console.log(data)
    const filePath = path.join(process.cwd(), 'public', 'excel', 'logalto', 'input.xlsx');
    if (!fs.existsSync(filePath)) {
      throw new Error('Input file not found');
    }
    console.log(filePath);
    const workbook = await XlsxPopulate.fromFileAsync(filePath);

    // Make edits.
    for(let i =0; i < data.length; i++){
    workbook.sheet("Worksheet").cell(`H${i+4}`).value(`${data[i].name}`);
    }
    // Get the output
    const outputPath = path.join(process.cwd(), 'public', 'excel', 'logalto', 'output.xlsx');
    await workbook.toFileAsync(outputPath);

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}

