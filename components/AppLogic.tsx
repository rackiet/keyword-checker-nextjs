'use client'
import { useEffect, useState } from 'react';
import Table from './Table';
import Form from './Form';

type PostData = {
    url: string;
    keyword: string;
    isFound: boolean;
    lastCheck: string;
  };

type PagesToScrape = PostData[];

async function getApi(endPoint: string) {
    
    const res = await fetch('/api/'+ endPoint  , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"data":"getapi"}),
        cache: 'no-store',
        next: { tags: ['jsondata'], revalidate: 5 }
      });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

async function scrapeData(postData: PagesToScrape): Promise<{'data': [], 'error': boolean}> {
    try {
      

      const response = await fetch('/api/scrape' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        cache: 'no-store',
        next: { tags: ['jsondata'], revalidate: 5 }
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Data posted successfully', result);
        return result; // Assuming the API returns data in the same structure
      } else {
        console.error('Failed to post data');
        throw new Error('Failed to post data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

async function updateDataToServer(data: string) {
    try {
        

        const response = await fetch('/api/data/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
          cache: 'no-store',
          next: { tags: ['jsondata'], revalidate: 5 }
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('updateDataToServer ok');
        } else {
          console.error('updateDataToServer error');
          throw new Error('updateDataToServer error');
        }
      } catch (error) {
        console.error('updateDataToServer ERROR:', error);
        throw error;
      }
}

function message(text: string){
    console.log(text)
}

const AppLogic = () => {
    const [data, setData] = useState({'data': []});
    const [loading, setLoading] = useState(true);
    const [urlValue, setUrlValue] = useState('');
    const [keywordValue, setKeywordValue] = useState('');
  
    const handleFormSubmit = () => {
        if(loading) {
            message('Sorry, Masih loading bro!')
            return;
        }

        if(urlValue == '' ||  keywordValue == ''){
            message('Isi formnya dlu dong!')
            return;
        }
      const newPageToScrape: PostData = {
        url: urlValue,
        keyword: keywordValue,
        isFound: false,
        lastCheck: 'belum',
      };
      setLoading(true);
      scrapeData([newPageToScrape])
        .then((result) => {
          setKeywordValue('');
          setUrlValue('');
          setLoading(false);
          if(result.error) {
            message("Fetching gagal!")
            return
          }
          setData(result);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    };

    const handleDelete = (key: number) => {
        if(loading) {
            message('Sorry, Masih loading bro!')
            return;
        }
        console.log("handleDelete ", key, data)
        const newData = data.data.filter((item, index) => index !== key);
        const res = { 'data': newData }
        updateDataToServer(JSON.stringify(res));
        setData(res);
    }

    const handleCheckAll= () => {
        setLoading(true);
        getApi('scrape/all')
        .then((result) => {
            setLoading(false);
            console.log("handleCheckAll", result)
            if(result.error) {
                message("Fetching gagal!")
                return
            }
            setData(result);
        })
    }
    useEffect(() => {
        setLoading(true);
        getApi('data').then((res)=>{
            setData(res);
            console.log("useEffect -- ",data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error:', error);
            setLoading(false);
          });
    }, []);

  return (
    <> 
        <Form urlValue={urlValue} setUrlValue={setUrlValue} keywordValue={keywordValue} setKeywordValue={setKeywordValue} handleFormSubmit={handleFormSubmit} btnLoading={loading}></Form>
        <Table dataRaw={data.data} handleDelete={handleDelete} loading={loading} handleCheckAll={handleCheckAll}></Table>

    </>
  )
}

export default AppLogic