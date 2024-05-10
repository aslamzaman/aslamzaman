import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { DaModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const das = await DaModel.find({}).populate('postId').sort({_id:'asc'});
    return NextResponse.json( das );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch das' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { postId, tk } = await Request.json();
    const das = await DaModel.create({ postId, tk });
    return NextResponse.json(das);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}