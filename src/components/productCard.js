import Link from 'next/link'
import React from 'react'

const ProductCard = ({ p }) => {
    return (
        <div>
            <div className='border-t m-4 border-violet-400 shadow-lg shadow-violet-900 md:w-80 w-72 rounded-lg overflow-hidden hover:scale-110 duration-700' >
                <img className='w-72 md:w-80 md:h-80 h-72 rounded-t-lg border border-b-black' src={p.img} alt={p.name} />
                <div className='pl-2 my-2 '>
                    <h2 className='font-bold'>{p.name}</h2>
                    <p>Price: {p.price} tk/ {p.unit}</p>
                </div>
                <Link href={`/productDetails/${p._id}`}>
                    <button className='md:w-80 w-72 p-4 bg hover:bg-violet-900 font-bold text-white'>Show Details</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard