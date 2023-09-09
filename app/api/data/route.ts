import { NextResponse } from 'next/server'
import { loadJSON } from '@/libs/file-operation'

export async function POST(request : Request){
    // const { searchParams } = new URL(request.url)
    const dt = await loadJSON('list.json')
    return NextResponse.json(dt)
}