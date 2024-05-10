import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { StaffModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const staffs = await PostModel.findById(id);
    return NextResponse.json(staffs);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { nmEn, nmBn, joinDt, mobile, genderId, postId, projectId, pictureUrl, empId, placeId, unitId, status, remarks } = await Request.json();
    const staffs = await StaffModel.findOneAndUpdate({ _id: id }, { nmEn, nmBn, joinDt, mobile, genderId, postId, projectId, pictureUrl, empId, placeId, unitId, status, remarks });
    return NextResponse.json(staffs);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const staffs = await StaffModel.findOneAndDelete({_id: id});
    return NextResponse.json(staffs);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 