import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import url from '@/components/url'
import jwt_decode from 'jwt-decode';

const Checkout = () => {
    const [bkashNo, setBkashNo] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [amount, setAmount] = useState(0)
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState([]);
    const [email, setEmail] = useState('')
    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const token = localStorage.getItem('token');
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
                console.log(email)
                const data = await fetch(`${url}/cartProducts/${email}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json());
                console.log('this is ', data)
                setCartProducts(data)
                setLoading(false);
            } catch (err) {
                console.error(err);
                router.push('/login');
            }
        };


        fetchCartProducts();
    }, [router]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const data = {
            bkashNo,
            transactionId,
            amount,
            deliveryAddress,
            phoneNo,
            cartProducts,
            email
        }

        try {
            const response = await fetch(`${url}/orderedProducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                alert('Your order placed successfully')
            } else {
                console.log('An error occurred while submitting the form')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return <div className='min-h-screen pt-20 flex justify-center items-center'>
        <p className='text-xl'> Loading...</p>

    </div>
    return (
        <div className='min-h-screen pt-24 md:px-10 pb-24'>
            <div className='flex justify-center'>
                <form className='border border-black md:w-1/2 md:p-10 p-4' onSubmit={handleSubmit}>
                    <p className='text-center md:text-3xl text-xl'>Payment and delivery Info</p>
                    <p>Bkash No.</p>
                    <input className='border border-black p-2 rounded-xl w-full' type='text' value={bkashNo} onChange={(e) => setBkashNo(e.target.value)} required />
                    <p>Transaction Id</p>
                    <input className='border border-black p-2 rounded-xl w-full' type='text' value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required />
                    <p>Amount</p>
                    <input className='border border-black p-2 rounded-xl w-full' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    <p>Delivery Address</p>
                    <input className='border border-black p-2 rounded-xl w-full' type='text' value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required />
                    <p>Phone No:</p>
                    <input className='border border-black p-2 rounded-xl w-full' type='number' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                    <br />
                    <input className='border border-black p-2 rounded-xl mt-4 w-full' type='submit' value={isSubmitting ? 'Submitting...' : 'Submit'} disabled={isSubmitting} />
                </form>
            </div>
        </div>
    )
}

export default Checkout
