import { useForm } from 'react-hook-form';
import url from '@/components/url';
import React, { useEffect, useRef, useState } from 'react'



const UploadProducts = () => {


    const cakeFlavors = ['Vanilla', 'Chocolate', 'Strawberry', 'Lemon', 'Carrot', 'Red velvet', 'Coconut', 'Pumpkin spice'];

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorageKey = '6c0277e2286d8c4a1059080d1574e2a7'


    const onSubmit = async data => {

        const image = data.photo[0]

        const formData = new FormData();
        formData.append('image', image)


        fetch(`https://api.imgbb.com/1/upload?key=${imageStorageKey}`, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(result => {
                if (result.success) {

                    const imgUrl = result.data.url

                    fetch(`${url}/addProduct`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },

                        body: JSON.stringify({
                            name: data.name,
                            unit: data.unit,
                            price: data.price,
                            flavorName: data.flavorName,
                            description: data.description,
                            weight: data.weight,
                            img: imgUrl,
                            quantity: 1,
                           
                        })
                    })
                        .then(res => res.json())
                        .then((data) => {
               
                            if (data.message ) {
                                alert(data.message)

                            } else {
                                alert('Sorry the product does not added. Please try again')
                            }

                        })
                }
            })

    }
    return (

        <div>
            <div>
                <h1 className='text-center text-3xl mb-5 '>Upload Product</h1>
                <div className='flex justify-center'>

                    <form onSubmit={handleSubmit(onSubmit)} className="  border-[1px] border-violet-400 p-4 rounded">
                        <div className="mb-4">
                            <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Product Image</label>
                            <input type="file" id="photo" name="photo" className='border-2 p-2 border-black rounded w-72 md:w-[500px]'{...register('photo')} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fname" className="block text-gray-700 font-bold mb-2"> Product Name</label>
                            <input className='border-2 p-2 border-black rounded w-72 md:w-[500px]' type="text" id="fname" name="fname" {...register('name')} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2"> Cake Flavor</label>
                            <select className='border-2 p-3 border-black rounded w-72 md:w-[500px]' type="text" id="flavorName" name="flavorName" {...register('flavorName')}  >
                                {
                                    cakeFlavors.map(d => <option value={d} key={d}> {d}</option>)
                                }
                            </select>
                        </div>


                        <div className="mb-4">
                            <label htmlFor="unit" className="block text-gray-700 font-bold mb-2"> Unit</label>
                            <input className='border-2 p-2 border-black rounded w-72 md:w-[500px]' type="text" id="unit" name="unit" {...register('unit')} required />
                        </div>


                        <div className="mb-4">
                            <label htmlFor="weight" className="block text-gray-700 font-bold mb-2"> weight</label>
                            <input className='border-2 p-2 border-black rounded w-72 md:w-[500px]' type="text" id="weight" name="weight" {...register('weight')} required />
                        </div>


                        <div className="mb-4">
                            <label htmlFor="priceOfUnit" className="block text-gray-700 font-bold mb-2">Price Of Unit</label>
                            <input className='border-2 p-2 border-black rounded w-72 md:w-[500px]' type="text" id="priceOfUnit" name="priceOfUnit"{...register('price')} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                            <input className='border-2 p-2 border-black rounded w-72 md:w-[500px]' type="text" id="description" name="description"{...register('description')} required />
                        </div>


                        <div className="flex items-center justify-center">
                            <button type="submit" className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                        </div>
                    </form>

                </div>


            </div>
        </div>


    )
}

export default UploadProducts