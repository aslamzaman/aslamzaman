import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { HondaModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const hondas = await PostModel.findById(id);
    return NextResponse.json(hondas);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const PUT = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const { regNo, regDt, chassisNo, engineNo, condition, projectId, unitId, remarks, isDeleted } = await Request.json();
    const hondas = await HondaModel.findOneAndUpdate({ _id: id }, { regNo, regDt, chassisNo, engineNo, condition, projectId, unitId, remarks, isDeleted });
    return NextResponse.json(hondas);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}



// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const hondas = await HondaModel.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    return NextResponse.json(hondas);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
}



export const DELETE = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const hondas = await HondaModel.findOneAndDelete({ _id: id });
    return NextResponse.json(hondas);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 