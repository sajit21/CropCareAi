import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useUserStore } from '../store/useUserStore'
import { useNavigate, useParams } from 'react-router-dom'


const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleVisibility = () => setShowPassword(!showPassword)

  return (
    <div className="relative">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" />
        )}
      </button>
    </div>
  )
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const navigate=useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('')
  const {resetPassword,isResettingPassword}=useUserStore();
  const {token}=useParams();
  console.log(token)

  console.log(password, confirmPassword)
  async function handleSubmit(e) {
    e.preventDefault()
    await resetPassword(token,password, confirmPassword);
    navigate('/');
  }

  return (
    <div className="flex h-full min-h-[50vh] w-full items-center justify-center px-2 sm:px-4 my-7">
      <div className="mx-auto w-[90%] sm:w-[80%] max-w-md rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password to reset your password.
          </p>
        </div>
        <div className=" py-6 px-2 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none"
                >
                  New Password
                </label>
                <PasswordInput
                  id="password"
                  placeholder="******"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium leading-none"
                >
                  Confirm Password
                </label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="******"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isResettingPassword}
                className="inline-flex h-10 bg-gray-600 text-white w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {isResettingPassword ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}