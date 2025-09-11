import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useUserStore } from '../store/useUserStore'
import toast from 'react-hot-toast'

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState('')
  // const setIsModalOpen = useUserStore((state) => state.setIsModalOpen)
  const { forgetPassword, isresetLinkSending } = useUserStore()

  console.log(email)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email.')
      return
    }
    try {
      await forgetPassword(email )
      // toast.success('Password reset email sent. Please check your inbox.')
    } catch (error) {
      console.error('Error sending password reset email', error)
      toast.error('Failed to send password reset email. Please try again.')
    }
  }

  return (
    <div className="flex h-full min-h-[40vh] w-full items-center justify-center px-2 sm:px-4 my-7">
      <div className="mx-auto w-[80%] max-w-md rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address to receive a password reset link.
          </p>
        </div>
        <div className="py-6 px-2 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="johndoe@mail.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isresetLinkSending}
              className="inline-flex h-10 w-full cursor-pointer items-center bg-gray-600 text-white justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {isresetLinkSending ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          {/* <Link
          onClick={() => setIsModalOpen(true)}
            to="/"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link> */}
        </div>
      </div>
    </div>
  )
}