
import { Loader, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleLogIn from '../GoogleLogIn'
import { Link } from 'react-router-dom'


const GoogleAuthWrapper=({ setIsSignupOpen })=>{
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogIn />
    </GoogleOAuthProvider>
  )
}

const Login = ({ setIsLoginOpen, setIsSignupOpen }) => {
  const login = useUserStore((state) => state.login)
  const { isGoogleOauthLoading, isLoginInLoading } = useUserStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const loginSubmitHandler = async (e) => {
    e.preventDefault()
    await login({ email, password })
  }

  return (
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-screen-md mx-4 relative">
      {/* Left Side - Illustration Area */}
      <div className={`hidden ${!isImageLoading ? 'sm:block' : 'hidden'} sm:w-1/2`}>
        <img
          onLoad={() => setIsImageLoading(false)}
          src="/feature1.png"
          alt="Stylish Illustration"
          className="w-full h-full object-cover mix-blend-multiply opacity-75"
        />
      </div>
      {isImageLoading && (
        <div className="hidden sm:flex sm:w-1/2 bg-green-200 items-center justify-center">
          <Loader className="animate-spin text-black size-7" />
        </div>
      )}

      {/* Right Side - Login Form */}
      <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
        {/* Close Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setIsLoginOpen(false)}
            aria-label="Close"
            className="text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="M6 6 18 18" />
            </svg>
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center sm:text-left">
          Login
        </h2>

        <form onSubmit={loginSubmitHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="mb-2 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <GoogleAuthWrapper />
           <div className='text-right text-sm mt-4'>
             <Link onClick={()=>setIsLoginOpen(false)} to="/forgot-password">
               forget password ?
             </Link>
           </div>
          <div className="flex items-center mt-4 justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isGoogleOauthLoading || isLoginInLoading ? ( 
                <div className="flex items-center justify-center gap-2">
                  <Loader className='animate-spin text-white size-5' /> <span className='text-sm'>logging user</span>
                </div>
              ) : (
                'Log In'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700 text-sm">
            Don't have an account?{' '}
            <a
              onClick={() => {
                setIsLoginOpen(false)
                setIsSignupOpen(true)
              }}
              href="#"
              className="text-green-500 hover:text-green-700 font-bold"
            >
              Create your Account
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
