import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { UnitsalaryModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const unitsalarys = await UnitsalaryModel.find({isDeleted: false}).populate('staffId').sort({_id:'asc'});
    return NextResponse.json( unitsalarys );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch unitsalarys' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { staffId, arear, sal1, sal2, remarks } = await Request.json();
    const unitsalarys = await UnitsalaryModel.create({ staffId, arear, sal1, sal2, remarks });
    return NextResponse.json(unitsalarys);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}