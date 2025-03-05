import { getLoginToken } from '@/services/auth.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const data = await req.json()
    const res = await getLoginToken(data)

    return NextResponse.json(res, {
        status: res.status
    })
}
