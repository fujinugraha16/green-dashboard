import { useLocation, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

import menus from "../utils/menus"

const MenuDrawer = ({ open, toggle }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleClickMenu = (url) => {
    navigate(url)
    toggle()
  }

  return (
    <div className="relative">
      <div className={`flex flex-col w-full sm:w-2/5 gap-3 h-screen bg-white py-5 px-3 fixed top-0 left-0 z-20 transition-all duration-500 transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="absolute top-4 right-4 text-gray-700" onClick={toggle}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    
        <div className="px-1 sm:px-3">
          <h1 className="text-gray-700 text-xl font-semibold">Dashboard</h1>
        </div>
    
        <div className="flex flex-col gap-1">
          {menus.map(({ title, icon, url }, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${pathname === url ? 'text-green-500' : 'text-gray-700'} ${pathname === url ? 'font-semibold' : 'font-normal'} hover:text-white hover:font-normal hover:bg-green-500 h-10 rounded-lg px-2 sm:px-4 cursor-pointer`}
              onClick={() => handleClickMenu(url)}
            >
              <div className="w-6 h-6">{icon}</div>
              <p>{title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* backdrop */}
      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black opacity-50`} onClick={toggle} />
    </div>
  )
}

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
}

export default MenuDrawer