import { useState } from 'react'

import MenuDrawer from './MenuDrawer'
import LogoutToolTip from './LogoutToolTip'

const Headbar = () => {
  const name = localStorage.getItem("name")
  const userImage = localStorage.getItem("userImage")

  const [showMenuDrawer, setShowMenuDrawer] = useState()
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false)

  const handleToggleMenuDrawer = () => setShowMenuDrawer(prevState => !prevState)

  return (
    <>
      <div className="flex justify-between lg:justify-end items-center px-4 w-full h-16 bg-white border-b-[1px] border-b-gray-100 sticky top-0 shadow-sm">
        <button className="text-gray-700 block lg:hidden" onClick={handleToggleMenuDrawer}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div className="flex items-center gap-3 relative">
          <p className="text-sm text-gray-700">{name || 'Fuji Nugraha'}</p>
          <div
            className="w-9 h-9 cursor-pointer rounded-full border border-green-300 bg-green-50 overflow-hidden"
            onClick={() => setShowLogoutTooltip(true)}
          >
            <img
              src={userImage || "https://robohash.org/fujinugraha"}
              alt="Avatar"
              className="object-cover"
            />
          </div>
          
          <div className="absolute -bottom-20 z-50">
            <LogoutToolTip
              open={showLogoutTooltip}
              toggle={() => setShowLogoutTooltip(prevState => !prevState)}
            />
          </div>
        </div>
      </div>

      <MenuDrawer open={showMenuDrawer} toggle={handleToggleMenuDrawer} />
    </>
  )
}

export default Headbar