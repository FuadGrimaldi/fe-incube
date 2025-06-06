import fetchClient from '@/lib/fetch-client';
import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
    const body = await req.json();
    const response = await fetchClient({
        method: "POST",
        url:
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/store-data`,
        body: JSON.stringify(body)
    });
            
    // Transform or forward the response
    const data = await response.json();
    const transformed = { ...data, source: 'proxied-through-nextjs' };
    
    return NextResponse.json(transformed)
}