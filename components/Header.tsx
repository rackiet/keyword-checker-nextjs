import React from 'react'

const Header = () => {
  return (
    <section className="bg-gray-800 text-gray-100">
        <div className="container mx-auto flex flex-col items-center px-4 py-4 text-center md:py-10  md:px-10 lg:px-32 xl:max-w-3xl">
            <h1 className="text-4xl font-bold leadi sm:text-5xl">Aplikasi 
                <span className="text-violet-400"> URL Keyword </span> Checker
            </h1>
            <p className="px-8 mt-8 mb-12 text-lg">Masukkan URL dan keyword, kemudian tekan tombol submit. Semudah itu 😱</p>
        </div>
    </section>
  )
}

export default Header