import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { PostModel } from '@/lib/Models';


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { nmEn, nmBn, nmUn } = await Request.json();
    const posts = await PostModel.findOneAndUpdate({ _id: id }, { nmEn, nmBn, nmUn });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const posts = await PostModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 



// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const posts = await PostModel.findOneAndDelete({_id: id});
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 