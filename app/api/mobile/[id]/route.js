import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { MobileModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const mobiles = await PostModel.findById(id);
    return NextResponse.json(mobiles);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { registeredUser, presentUser, mobileNo } = await Request.json();
    const mobiles = await MobileModel.findOneAndUpdate({ _id: id }, { registeredUser, presentUser, mobileNo });
    return NextResponse.json(mobiles);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const mobiles = await MobileModel.findOneAndDelete({_id: id});
    return NextResponse.json(mobiles);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 