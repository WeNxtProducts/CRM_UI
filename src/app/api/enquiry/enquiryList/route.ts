/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEnqList } from '@/services/enquiry.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  let data: any = {};
  try {
    data = await req.json();
  } catch (error) {
    console.log("No JSON body provided, using empty data:", error);
  }
  
  const res = await getEnqList(data);

  return NextResponse.json(res, {
    status: res.status,
  });
}
