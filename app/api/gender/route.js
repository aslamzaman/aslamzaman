import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { GenderModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const genders = await GenderModel.find({isDeleted: false}).sort({_id:'desc'});
    return NextResponse.json( genders );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch genders' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name } = await Request.json();
    const genders = await GenderModel.create({ name });
    return NextResponse.json(genders);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}