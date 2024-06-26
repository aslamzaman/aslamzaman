import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { PlaceModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const places = await PostModel.findById(id);
    return NextResponse.json(places);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name } = await Request.json();
    const places = await PlaceModel.findOneAndUpdate({ _id: id }, { name });
    return NextResponse.json(places);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const places = await PlaceModel.findOneAndDelete({_id: id});
    return NextResponse.json(places);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 