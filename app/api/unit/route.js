import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { UnitModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const units = await UnitModel.find({isDeleted: false}).sort({_id:'desc'});
    return NextResponse.json( units );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch units' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { nmEn, nmBn, nmUn } = await Request.json();
    const units = await UnitModel.create({ nmEn, nmBn, nmUn });
    return NextResponse.json(units);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}