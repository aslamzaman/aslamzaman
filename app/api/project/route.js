import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { ProjectModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const projects = await ProjectModel.find({}).sort({_id:'desc'});
    return NextResponse.json( projects );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch projects' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name } = await Request.json();
    const projects = await ProjectModel.create({ name });
    return NextResponse.json(projects);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}