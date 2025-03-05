import { getEnquiryById } from '@/services/enquiry.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const data = await req.json()
	const res = await getEnquiryById(data)

	return NextResponse.json(res, {
		status: res.status
	})
}
