import { useCallback, useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const navigate = useNavigate()
  const isAuth = localStorage.getItem("token")

  // DUMMY CREDENTIAL
  const USERNAME = "dpierrof"
  const PASSWORD = "Vru55Y4tufI4"

  const usernameRef = useRef()
  const passwordRef = useRef()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios({
        url: 'https://dummyjson.com/auth/login',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        })
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem('name', `${data.firstName} ${data.lastName}`)
      localStorage.setItem('userImage', data.image)

      navigate("/", { replace: true })
    } catch(err) {
      if ('response' in err && 'status' in err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.message)
      }
    }
  }, [navigate])


  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex justify-center items-center min-w-screen w-full min-h-screen h-full text-gray-700">
      <div className="flex flex-col gap-5 bg-white w-full h-auto sm:w-[450px] shadow-none sm:shadow-md rounded-md px-6 py-5">
        <h2 className="text-xl text-center font-medium">
          <strong className="text-green-500 font-semibold">Green</strong> Dashboard
        </h2>

        {errorMessage && (
          <div className="flex justify-between items-center rounded-md border border-red-200 bg-red-50 text-red-900 px-3 py-2">
            {errorMessage}

            <button onClick={() => setErrorMessage('')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <form
          autoComplete="off"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="font-medium"
            >
              Username
            </label>
            <input
              ref={usernameRef}
              id="username"
              name="username"
              placeholder="Username"
              className="w-full px-3 py-2 outline-none border border-green-500 rounded-md"
              defaultValue={USERNAME}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="font-medium"
            >
              Password
            </label>
            <div className="flex gap-2 w-full border border-green-500 rounded-md overflow-hidden">
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-[90%] px-3 py-2 outline-none"
                defaultValue={PASSWORD}
                required
              />

              <button
                className="w-[10%] flex justify-center items-center"
                onClick={() => setShowPassword(prevState => !prevState)}
                type="button"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>                
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            className="flex justify-center items-center gap-1 w-full rounded-md bg-green-500 hover:bg-green-600 text-white font-medium py-2"
            type="submit"
          >
            Login

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login