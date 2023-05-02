import url from '@/components/url'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import jwt_decode from 'jwt-decode';
const AllProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter();




    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token){
                    router.push('/login');
                    return;
                }
                const decodedToken = jwt_decode(token);
                if (!decodedToken) {
                    router.push('/login');
                    return;
                }

                const res = await fetch(`${url}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    router.push('/login');
                    return;
                }
                const { email } = await res.json();
              
                const data = await fetch(`${url}/users/${email}`).then((res) => res.json());
            
                if (data.role) {
                    fetch(`${url}/getProduct`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                          },
                    }).then(res => res.json())
                        .then(data => {
                            setProducts(data)
                            setLoading(false)
                        })
                        .catch(error => console.log(error));

                } else {
                    router.push('/login');
                }
            } catch (err) {
                console.error(err);
                router.push('/login');
            }
        };


        fetchCartProducts();
    }, [products , router]);







    const deleteProduct = async (productId) => {
        try {
            const res = await fetch(`${url}/products/${productId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete product');
            }

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };


    if (loading) return <div className='min-h-screen pt-20 flex justify-center items-center'>
    <p className='text-xl'> Loading...</p>
 </div>


    return (
        <div className='px-2'>
            <div className='flex justify-between md:px-10 px-4 border py-4 border-black items-center'>
                <div className=''>
                    <p>Img</p>
                </div>
                <p>Name</p>
                <button>Del</button>
            </div>

            {products.map((p) => <div key={p._id} className='flex justify-between md:px-10 px-4 py-2 mb-2 items-center border border-black'>
                <div className='w-12 h-12'>
                    <img src={p.img} className='w-full h-full  rounded-full' alt="" />
                </div>
                <p className='md:w-full w-44  ml-2 md:text-center'>{p.name}</p>
                {/* <button><RiDeleteBin6Line /></button> */}


                <p onClick={() => deleteProduct(p._id)} className='border-[1px] bg-red-600 rounded text-white border-red-800 text-center'><button className=" px-1 py-1"><RiDeleteBin6Line /></button></p>



            </div>)}

        </div>
    )
}

export default AllProducts