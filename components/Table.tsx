type DataItem = {
    url: string;
    keyword: string;
    lastCheck: string;
    isFound: boolean;
    // Add other properties here
  };
  
  type Props = {
    dataRaw?: DataItem[]; // Make dataRaw optional
    handleDelete: (key: number) => void;
    handleCheckAll: () => void;
    loading: boolean;
  };

function Table({dataRaw, handleDelete, loading, handleCheckAll}: Props) {

    const data = dataRaw || [];

    if (data.length === 0) {
        return (
            <div className="mx-auto max-w-4xl px-8 py-4">
                <div className="flex items-center justify-between p-6 border-l-8 sm:py-8 border-violet-400 bg-gray-900 text-gray-100">
                    <span>Tidak ada list url yang disimpan</span>
                </div>
            </div>
        );
    }
    // console.log("hello ", data)
 
    return (
        <>
            <div className="container p-2 mx-auto sm:p-4 text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leadi">List Url Tersimpan</h2>
                <div className="mb-4">

                    <button
                        onClick={handleCheckAll}
                        type="button"
                        className={`inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white ${
                            loading ? 'bg-indigo-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-400'
                        } transition ease-in-out duration-150`}
                        disabled={loading}
                        >
                        {loading ? (
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
                            'Cek Semua Url'
                        )}
                    </button>

                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col className="w-32" />
                            <col className="w-24" />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="bg-gray-700">
                            <tr className="text-left">
                                <th className="p-3">URL</th>
                                <th className="p-3">Keyword</th>
                                <th className="p-3">Last Check</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-opacity-20 border-gray-700 bg-gray-900"
                                >
                                    <td className="p-3">
                                        <p>{item.url}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{item.keyword}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{item.lastCheck}</p>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span
                                            className={`hover:cursor-pointer px-3 py-1 font-bold uppercase ${
                                                item.isFound
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {item.isFound
                                                ? "ACTIVE"
                                                : "INACTIVE"}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span onClick={() => handleDelete(index)} className="hover:cursor-pointer px-3 py-1 font-semibold rounded-md bg-blue-900 text-gray-400 hover:bg-blue-700 hover:text-gray-50">
                                            DELETE
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Table;
