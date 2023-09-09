import { NextResponse } from 'next/server'
import { loadJSON, saveJSON } from '@/libs/file-operation'

export async function POST(request: Request) {
    try {
      const data = await request.json();
    //   console.log('Received JSON data:', data);
      saveJSON('list.json',data)
      return NextResponse.json({ status: 200 });
    } catch (error) {
      console.error('An error occurred:', error);
      return NextResponse.json({"data":[], "error": true});

    }
  }