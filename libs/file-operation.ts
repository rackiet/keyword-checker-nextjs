
import * as fs from 'fs';
import * as path from 'path';


export function loadJSON(filename: string): any {
  const filePath = path.join("data", filename);
  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } else {
      // If the file doesn't exist, create it with the default structure
      const defaultData = { data: [] };
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
  } catch (err) {
    console.error('Error loading JSON file:', err);
    return {};
  }
}


export async function saveJSON(filename: string, data: any): Promise<void> {
    const filePath = path.join("data", filename);
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(filePath, jsonData);
      console.log(`JSON data saved to: ${filePath}`);
    } catch (err) {
      console.error('Error saving JSON file:', err);
    }
}


type DataType = { url: string; keyword: string; isFound: boolean; lastCheck: string; }

export function addJSON(filename: string, newData: DataType[]): any {
    try {

        // Load the existing JSON data
        const existingData = loadJSON(filename);
        let existArray = existingData['data']

        newData.forEach(newEntry => {
            const existingEntryIndex = existArray.findIndex(
                (entry: DataType) => entry.url === newEntry.url && entry.keyword === newEntry.keyword
            );
            if (existingEntryIndex !== -1) {
            // Entry with the same url and keyword exists, update it
            existArray[existingEntryIndex] = newEntry;
            } else {
            // Entry with the same url and keyword doesn't exist, add it to the beginning
            existArray.push(newEntry);
            }
        });
  
      // Save the updated JSON data
      saveJSON(filename, existingData);
  
      // Return the updated JSON data
      return existingData;
    } catch (err) {
      console.error('Error adding JSON data:', err);
      return {}; // Return an empty object on error
    }
  }