import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { ElectricModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const electrics = await PostModel.findById(id);
    return NextResponse.json(electrics);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { description } = await Request.json();
    const electrics = await ElectricModel.findOneAndUpdate({ _id: id }, { description });
    return NextResponse.json(electrics);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const electrics = await ElectricModel.findOneAndDelete({_id: id});
    return NextResponse.json(electrics);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 