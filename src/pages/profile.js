import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import url from '@/components/url';
import { useRouter } from 'next/router';
const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
const router = useRouter()
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
       
          return;
        }
        const decodedToken = jwt_decode(token);
        if (!decodedToken) {
          router.push('/login');
          
          return;
        }

        // A sweet baked food made from a dough or thick batter usually containing flour and sugar and often shortening, eggs, and a raising agent (such as baking powder) : a flattened usually round mass of food that is baked or fried.




        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          router.push('/login');
        }
        const { email } = await res.json();

        const data = await fetch(`${url}/users/${email}`).then((res) => res.json());
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error(err);

      }
    };

    fetchCartProducts();
  }, []);


  if (loading) return <div className='min-h-screen pt-20 flex justify-center items-center'>
    <p className='text-xl'> Loading...</p>
  </div>


  return (
    <div className='min-h-screen pt-20 '>
      <div className='h-44 w-full relative'>
        <img src="/profilebg.jpg" className='h-full w-full' alt="" />
        <img src="/review.jpeg" className='h-24 w-24 left-4 rounded-full border border-black absolute -bottom-10' alt="" />
      </div>

      <div className='mt-10 ml-4'>
        <p>Name :{user.name}</p>
        <p>Email : {user.email}</p>
      </div>


    </div>
  )
}

export default Profile