import url from '@/components/url';
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/reset-password/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage('Failed to reset password');
    }
  };

  return (

<div className='min-h-screen pt-24 md:px-10 px-2'>
    <p className='text-center'>{message}</p>
      <div className='flex justify-center'>
      <form className='border border-black md:w-1/2 p-10' onSubmit={handleResetPassword}>
        <label htmlFor="email">Email:</label>
        <input
        className='border border-black p-2 rounded-xl mb-4 w-full' 
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <label className='' htmlFor="email">New Password</label>
           <input
        className='border border-black p-2 rounded-xl w-full' 
          id="email"
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className='border border-black p-2 rounded-xl w-full mt-4'  type="submit">Reset Password</button>
      </form>
      </div>
    </div>


  
  );
};

export default ForgotPassword;
