import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { StaffModel } from '@/lib/Models';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const staffs = await StaffModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(staffs);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { nmEn, nmBn,nmUn, joinDt, mobile, genderId, postId, projectId, pictureUrl, empId, placeId, unitId, status, remarks, salary } = await Request.json();
    const staffs = await StaffModel.findOneAndUpdate({ _id: id }, { nmEn, nmBn,nmUn, joinDt, mobile, genderId, postId, projectId, pictureUrl, empId, placeId, unitId, status, remarks, salary });
    return NextResponse.json(staffs);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
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