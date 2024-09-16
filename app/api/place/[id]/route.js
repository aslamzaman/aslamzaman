import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { PlaceModel } from '@/lib/Models';


// Update data
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


// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const places = await PlaceModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(places);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 



// Hard deleted
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