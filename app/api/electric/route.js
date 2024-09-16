import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { ElectricModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const electrics = await ElectricModel.find({}).sort({_id:'asc'});
    return NextResponse.json( electrics );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch electrics' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { description } = await Request.json();
    const electrics = await ElectricModel.create({ description });
    return NextResponse.json(electrics);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}