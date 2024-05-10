import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { PriceModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const prices = await PostModel.findById(id);
    return NextResponse.json(prices);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, tk } = await Request.json();
    const prices = await PriceModel.findOneAndUpdate({ _id: id }, { name, tk });
    return NextResponse.json(prices);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const prices = await PriceModel.findOneAndDelete({_id: id});
    return NextResponse.json(prices);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 