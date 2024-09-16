import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { TaModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const tas = await PostModel.findById(id);
    return NextResponse.json(tas);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { unitId, tk } = await Request.json();
    const tas = await TaModel.findOneAndUpdate({ _id: id }, { unitId, tk });
    return NextResponse.json(tas);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const tas = await TaModel.findOneAndDelete({_id: id});
    return NextResponse.json(tas);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 