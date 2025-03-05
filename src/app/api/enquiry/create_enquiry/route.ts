import { createNewEnquiry } from '@/services/enquiry.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json()
    console.log("data from POST: ",data)
    
    const res = await createNewEnquiry(data)
    console.log("res : ", res)
    return NextResponse.json(res, {
        status: res.status
    })
}