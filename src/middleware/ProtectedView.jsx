import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"

const ProtectedView = ({ children }) => {
  const isAuth = localStorage.getItem("token")

  if (!isAuth) {
    return (
      <Navigate to="/login" />
    )
  }

  return children
}

ProtectedView.propTypes = {
  children: PropTypes.node,
}

export default ProtectedView