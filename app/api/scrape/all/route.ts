import { loadJSON, saveJSON } from '@/libs/file-operation';
import { scrapeWebPages } from '@/libs/scraper';
import { NextResponse } from 'next/server'

export async function POST(){
    try {
        const dataServer = await loadJSON('list.json');
        const arrRes = await scrapeWebPages(dataServer.data);
        const result = { data: arrRes , "error": false};
        saveJSON('list.json',result)
        return NextResponse.json(result);
    } catch (error) {
      console.error('An error occurred:', error);
      return NextResponse.json({"data":[], "error": true});
    }
}

  
  