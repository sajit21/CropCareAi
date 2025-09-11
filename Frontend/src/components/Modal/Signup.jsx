
import { Loader, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import GoogleSignUp from '../GoogleSignUp'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GoogleAuthWrapper=({ setIsSignupOpen })=>{
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleSignUp setIsSignupOpen={setIsSignupOpen} />
    </GoogleOAuthProvider>
  )
}

const Signup = ({ setIsLoginOpen, setIsSignupOpen }) => {
  const signup = useUserStore((state) => state.signup)
  const {isGoogleOauthLoading,isSignUpLoading}=useUserStore();
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const signupHandler = async (e) => {
    e.preventDefault()
    await signup({ fullName, email, password, confirmPassword })
    setFullName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="flex bg-white rounded-lg shadow-lg w-full  max-w-screen-md mx-4 relative max-h-[98vh]">
      {/* Left Side - Illustration Area */}
      <div className={`hidden ${!isImageLoading ? 'sm:block' : 'hidden'} sm:w-1/2 py-8 px-6`}>
        <img onLoad={() => setIsImageLoading(false)} src='/authimg.png' alt="Stylish Illustration" className="w-full rounded h-full object-cover mix-blend-multiply opacity-75" />
      </div>
      {isImageLoading && (
        <div className="hidden sm:flex sm:w-1/2 p-8 bg-green-200 items-center justify-center">
          <Loader className='animate-spin text-black size-11' />
        </div>
      )}

      {/* Right Side - Signup Form */}
      <div className="w-full sm:w-1/2 py-8 px-6 flex flex-col justify-center">
        {/* Close Button */}
        <div className="absolute top-3 right-5">
          <button onClick={() => setIsSignupOpen(false)} className="text-black" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
              <path d="M18 6 6 18" />
              <path d="M6 6 18 18" />
            </svg>
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center sm:text-left">Sign Up</h2>

        <form onSubmit={signupHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-[38px] right-3 text-gray-500">
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>

          {/* Confirm Password Field with Toggle */}
          <div className="mb-2 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-[38px] right-3 text-gray-500">
              {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
          <GoogleAuthWrapper setIsSignupOpen={setIsSignupOpen} />

          {/* <div onClick={handleOauth} className='w-full mb-4 cursor-pointer'>
            signup with google 
          </div> */}

          <div className="flex items-center mt-4  justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isGoogleOauthLoading || isSignUpLoading ? (
  <div className="flex items-center justify-center gap-2">
    <Loader className='animate-spin text-white size-5' /> <span className='text-sm'>creating user</span>
  </div>
) : (
  'Sign Up'
)}

            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700 text-sm">
            Already have an account?{' '}
            <a onClick={() => { setIsSignupOpen(false); setIsLoginOpen(true); }} href="#" className="text-green-500 hover:text-green-700 font-bold">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
