import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

const LogoutToolTip = ({ open, toggle }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    toggle()
    localStorage.clear()
    navigate("/login", { replace: true })
  }

  return (
    <div className="relative">
      <div className={`${open ? 'block' : 'hidden'} bg-white p-4 shadow-lg rounded-lg relative z-10`}>
        <button
          className="flex justify-center items-center px-3 gap-1 border border-red-500 hover:bg-red-500 rounded-lg w-full sm:w-auto h-8 text-sm text-red-500 hover:text-white font-medium"
          onClick={handleLogout}
        >
          Logout
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>
      </div>

      <div className={`${open ? 'block' : 'hidden'} fixed inset-0`} onClick={toggle} />
    </div>
  )
}

LogoutToolTip.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
}

export default LogoutToolTip