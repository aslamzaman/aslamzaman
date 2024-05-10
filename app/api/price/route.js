import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { PriceModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const prices = await PriceModel.find({}).sort({_id:'desc'});
    return NextResponse.json( prices );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch prices' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name, tk } = await Request.json();
    const prices = await PriceModel.create({ name, tk });
    return NextResponse.json(prices);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}