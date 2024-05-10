import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { UnitsalaryModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const unitsalarys = await PostModel.findById(id);
    return NextResponse.json(unitsalarys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { staffId, arear, sal1, sal2, remarks } = await Request.json();
    const unitsalarys = await UnitsalaryModel.findOneAndUpdate({ _id: id }, { staffId, arear, sal1, sal2, remarks });
    return NextResponse.json(unitsalarys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const unitsalarys = await UnitsalaryModel.findOneAndDelete({_id: id});
    return NextResponse.json(unitsalarys);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 