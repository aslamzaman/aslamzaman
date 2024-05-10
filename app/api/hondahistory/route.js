import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { HondahistoryModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const hondahistorys = await HondahistoryModel.find({}).populate('hondaId').populate('projectId').populate('staffId').populate('postId').sort({_id:'desc'});
    return NextResponse.json( hondahistorys );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch hondahistorys' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { hondaId, location, projectId, staffId, postId, dt, remarks, picUrl, pageNo } = await Request.json();
    const hondahistorys = await HondahistoryModel.create({ hondaId, location, projectId, staffId, postId, dt, remarks, picUrl, pageNo });
    return NextResponse.json(hondahistorys);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
