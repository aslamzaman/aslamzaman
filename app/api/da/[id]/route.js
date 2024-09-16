import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { DaModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const das = await PostModel.findById(id);
    return NextResponse.json(das);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { postId, tk } = await Request.json();
    const das = await DaModel.findOneAndUpdate({ _id: id }, { postId, tk });
    return NextResponse.json(das);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const das = await DaModel.findOneAndDelete({_id: id});
    return NextResponse.json(das);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 