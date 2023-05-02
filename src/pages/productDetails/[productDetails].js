import url from '@/components/url';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
const ProductDetails = () => {
  const router = useRouter();
  const productId = router.query.productDetails
  const [product, setProduct] = useState({})



  useEffect(() => {

    if (productId) {
      fetch(`${url}/productDetails/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }

  }, [productId])


  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      router.push('/login')
      return
    }
    const decodedToken = jwt_decode(token);
    if (decodedToken) {

      try {
        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          // handle error response
          throw new Error('Failed to fetch user');
        }

        const { email } = await res.json();

        fetch(`${url}/storeIntoCart`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: product.name,
            unit: product.unit,
            price: product.price,
            flavorName: product.flavorName,
            description: product.description,
            weight: product.weight,
            img: product.img,
            quantity: 1,
            email: email
          })
        })
          .then(res => res.json())
          .then((data) => {
            if (data.success) {
              alert('Your product added successfully')
            } else {
              alert('Sorry the product does not added. Please try again')
            }
          })



      } catch (err) {
        console.error(err);
        // handle error
      }
    }


    else {
      router.push('/login');
    }


  }



  return (
    <div className='min-h-screen pt-24'>
      <h2 className='text-3xl text-center md:mt-10 mt-4 md:mb-24 mb-10'>{product.name}</h2>
      <div className='flex justify-center '>
        <div className='md:flex justify-center items-center px-4  md:px-10 mb-10'>

          <img className=' md:w-[320px] w-full h-[320px] border border-black p-2 ' src={product.img} alt="" />

          <div className=' md:w-[320px] w-full h-[320px] md:ml-10  border-black relative'>

            <p className='text-2xl font-bold'>{product.price} tk <span className='text-base'>/{product.unit}</span></p>
            <p className='mt-3'>Flavour: {product.flavorName}</p>
            <p className='mt-3'>Weight: {product.weight}</p>
            <p className='mt-3'>Quantity: {product.quantity} pcs</p>
            <p className='mt-3'>Description:</p>
            <p className='text-justify'> {product.description?.slice(0, 150)}</p>
            <button onClick={addToCart} className='mt-3 hover:bg-violet-800 hover:text-white border absolute bottom-0 w-full border-violet-900 rounded p-2'>Add to cart</button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProductDetails