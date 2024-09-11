import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { HondahistoryModel } from '@/lib/Models';


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { dt, hondaId, staffId, pageNo, remarks } = await Request.json();
    const hondahistorys = await HondahistoryModel.findOneAndUpdate({ _id: id }, { dt, hondaId, staffId, pageNo, remarks });
    return NextResponse.json(hondahistorys);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const hondahistorys = await HondahistoryModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(hondahistorys);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 



// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const hondahistorys = await HondahistoryModel.findOneAndDelete({_id: id});
    return NextResponse.json(hondahistorys);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 