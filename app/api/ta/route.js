import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { TaModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const tas = await TaModel.find({}).populate('unitId').sort({_id:'asc'});
    return NextResponse.json( tas );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch tas' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { unitId, tk } = await Request.json();
    const tas = await TaModel.create({ unitId, tk });
    return NextResponse.json(tas);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
