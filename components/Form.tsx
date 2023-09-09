import React from 'react'

type FormProps = {
    urlValue: string;
    setUrlValue: (value: string) => void;
    keywordValue: string;
    setKeywordValue: (value: string) => void;
    handleFormSubmit: () => void;
    btnLoading: boolean;
  };

function Form ({
    urlValue,
    setUrlValue,
    keywordValue,
    setKeywordValue,
    handleFormSubmit,
    btnLoading
  }: FormProps) {
  return (
    <section className="p-2 sm:p-4 bg-gray-800 text-gray-50">
        <form className="container flex flex-col mx-auto">
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-medium">Form Add Url</p>
                    <p className="text-xs">Masukkan data sesuai form disamping untuk menambahakn url</p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full">
                        <label htmlFor="url" className="text-sm">
                        URL
                        </label>
                        <input
                        id="url"
                        type="text"
                        placeholder="Masukkan Url"
                        className="w-full p-2 mt-2 bg-gray-500 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                        value={urlValue}
                        onChange={(e) => setUrlValue(e.target.value)} // Update URL input value
                        />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="keyword" className="text-sm">
                        Keyword
                        </label>
                        <input
                        id="keyword"
                        type="text"
                        placeholder="Masukkan Keyword"
                        className="w-full p-2 mt-2 bg-gray-500 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                        value={keywordValue}
                        onChange={(e) => setKeywordValue(e.target.value)}  // Update Keyword input value
                        />
                    </div>
                    <div className='col-span-full sm:col-span-3'>
                       
                        <div className='pt-8'>

                    <button
                        onClick={handleFormSubmit}
                        type="button"
                        className={`inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white ${
                            btnLoading ? 'bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-400'
                        } transition ease-in-out duration-150`}
                        disabled={btnLoading}
                        >
                        {btnLoading ? (
                            <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                            </>
                        ) : (
                            'Submit'
                        )}
                        </button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    </section>
  )
}

export default Form