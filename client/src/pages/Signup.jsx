import { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom"
import Oauth from "../components/Oauth";
import { useSelector } from 'react-redux';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  const [passwordEye, setpasswordEye] = useState(true)

  useEffect(() => {
    if(currentUser){
      navigate('/profile')
    }
    if(error){
      dispatch(signOut())
    }

  }, [])

  const handlePasswordEye = () =>{
    setpasswordEye(!passwordEye)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} required
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} required
          name="email" 
          autocomplete="email" 
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
          title="Enter a valid email address" 
        />
        <div className="flex items-center ">
        <input
          type={ passwordEye ? 'password' : 'text' }
          placeholder='Password'
          id='password'
          className=' p-3 bg-slate-100 rounded-xl w-full'
          onChange={handleChange} required />
          {passwordEye ?
          <img src="https://cdn-icons-png.flaticon.com/128/2767/2767146.png"onClick={handlePasswordEye} className="-ml-10 h-6 w-6 mx-auto cursor-pointer "/>
          :
          <img src="https://cdn-icons-png.flaticon.com/128/11502/11502607.png" onClick={handlePasswordEye} className="-ml-10 h-6 w-6 mx-auto cursor-pointer"/>

          }</div>
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <Oauth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error && 'Something went wrong!'}
      </p>
    </div>
  );
}