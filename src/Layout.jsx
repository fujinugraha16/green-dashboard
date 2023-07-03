import PropTypes from "prop-types"
import { useLocation } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Headbar from "./components/Headbar"

const Layout = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <div className="flex w-full min-h-screen h-auto bg-white sm:bg-gray-100">
      {pathname !== "/login" ? (
        <>
          <Sidebar />
          <div className="w-full">
            <Headbar />

            {/* main conent */}
            <div className="p-0 sm:p-4">
              {children}
            </div>
          </div>
        </>
      ) : (
        children
      )}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout