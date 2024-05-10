import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { MobileModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const mobiles = await MobileModel.find({}).sort({_id:'desc'});
    return NextResponse.json( mobiles );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch mobiles' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { registeredUser, presentUser, mobileNo } = await Request.json();
    const mobiles = await MobileModel.create({ registeredUser, presentUser, mobileNo });
    return NextResponse.json(mobiles);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}