import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { DistrictModel } from '@/lib/Models';


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { nmEn, nmBn } = await Request.json();
    const districts = await DistrictModel.findOneAndUpdate({ _id: id }, { nmEn, nmBn });
    return NextResponse.json(districts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const districts = await DistrictModel.findOneAndUpdate({_id: id},{isDeleted:true},{new:true});
    return NextResponse.json(districts);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 



// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const districts = await DistrictModel.findOneAndDelete({_id: id});
    return NextResponse.json(districts);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 