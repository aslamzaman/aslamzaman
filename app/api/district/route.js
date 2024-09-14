import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { DistrictModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const districts = await DistrictModel.find({}).sort({_id:'desc'});
    return NextResponse.json( districts );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch districts' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { nmEn, nmBn } = await Request.json();
    const districts = await DistrictModel.create({ nmEn, nmBn });
    return NextResponse.json(districts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}