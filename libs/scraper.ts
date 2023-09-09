import puppeteer from "puppeteer";

const SEMBUNYI : boolean = true ;

function isKeywordFound(allText: string, keyword: string): boolean {
    // Convert both the text and keyword to lowercase for case-insensitive search
    const lowerAllText = allText.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
  
    // Check if the keyword is present in the text
    return lowerAllText.includes(lowerKeyword);
  }

  export async function scrapeWebPages(pagesToScrape: { url: string; keyword: string }[]) {
    const results = [];
    
    const browser = await puppeteer.launch({ headless: SEMBUNYI });

    try {
      
      for (const pageToScrape of pagesToScrape) {
        const page = await browser.newPage();
  
        // Navigate to the URL
        await page.goto(pageToScrape.url, { waitUntil: 'networkidle2' });
  
        // Get the innerText of document.body using Puppeteer's evaluate function
        const allText = await page.evaluate(() => {
          return document.body.innerText;
        });
  
        const isFound = isKeywordFound(allText, pageToScrape.keyword);
  
        // Log and return all text and keyword presence
        console.log(`URL: ${pageToScrape.url}, Keyword: ${pageToScrape.keyword}, Found: ${isFound}`);
        
        const jakartaTimezone = 'Asia/Jakarta';
        const currentTimeInJakarta = new Date().toLocaleString('en-US', { timeZone: jakartaTimezone });

        const pageResult = {
          url: pageToScrape.url,
          keyword: pageToScrape.keyword,
          isFound: isFound,
          lastCheck: currentTimeInJakarta, // Add the timestamp
        };
  
        results.push(pageResult);
  
        await page.close();
      }
  
      // Close the browser after scraping all pages
      await browser.close();
  
      return results;
    } catch (error) {
      console.error('Error scraping web pages:', error);
      await browser.close();
      return [];
    }
  }