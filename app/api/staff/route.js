import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { StaffModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const staffs = await StaffModel.find({isDeleted: false}).populate('genderId').populate('postId').populate('projectId').populate('placeId').populate('unitId').sort({_id:'desc'});
    return NextResponse.json( staffs );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch staffs' }, { status: 500 });
  }
}


/*
export const POST = async (Request) => {
  try {
    await Connect();
    const { nmEn, nmBn, joinDt, mobile, genderId, postId, projectId, pictureUrl, empId, placeId, unitId, status, remarks, salary } = await Request.json();
    const staffs = await StaffModel.create({ nmEn, nmBn, joinDt, mobile, genderId, postId, projectId, pictureUrl, empId, placeId, unitId, status, remarks, salary });
    return NextResponse.json(staffs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}

*/

export const POST = async (Request) => {
  try {
    await Connect();
    const data  = await Request.json();
    const staffs = await StaffModel.insertMany(data);
    return NextResponse.json(staffs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}