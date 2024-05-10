import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { DistrictModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const districts = await PostModel.findById(id);
    return NextResponse.json(districts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


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