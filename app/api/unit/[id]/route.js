import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { UnitModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const units = await PostModel.findById(id);
    return NextResponse.json(units);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { nmEn, nmBn } = await Request.json();
    const units = await UnitModel.findOneAndUpdate({ _id: id }, { nmEn, nmBn });
    return NextResponse.json(units);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const units = await UnitModel.findOneAndDelete({_id: id});
    return NextResponse.json(units);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 