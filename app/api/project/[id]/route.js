import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { ProjectModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const projects = await PostModel.findById(id);
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name } = await Request.json();
    const projects = await ProjectModel.findOneAndUpdate({ _id: id }, { name });
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const projects = await ProjectModel.findOneAndDelete({_id: id});
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 