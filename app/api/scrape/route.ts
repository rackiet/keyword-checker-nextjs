import { addJSON } from '@/libs/file-operation';
import { scrapeWebPages } from '@/libs/scraper';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server'

export async function GET(request : Request){
    return NextResponse.json("Sorry Cant Access This!");
}

export async function POST(request: Request) {
    try {
      const data = await request.json();
    //   console.log('Received JSON data:', data);
      const arrRes = await scrapeWebPages(data);
      let result = await addJSON('list.json',arrRes)
      result.error = false;
      return NextResponse.json(result);
    } catch (error) {
      console.error('An error occurred:', error);
      return NextResponse.json({"data":[], "error": true});

    }
  }
  
  
  
  
  
  