import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { PostModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const posts = await PostModel.find({isDeleted: false}).sort({_id:'desc'});
    return NextResponse.json( posts );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { nmEn, nmBn, nmUn } = await Request.json();
    const posts = await PostModel.create({ nmEn, nmBn, nmUn });
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}