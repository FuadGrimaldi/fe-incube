import fetchClient from '@/lib/fetch-client';
import { NextResponse } from "next/server";
 
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const productId = params.id;
    const response = await fetchClient({
            method: "GET",
            url:
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/device-setting/${productId}`,
            });
    // Transform or forward the response
    const data = await response.json();
    const transformed = { ...data, source: 'proxied-through-nextjs' };
    
    return NextResponse.json(transformed)
}