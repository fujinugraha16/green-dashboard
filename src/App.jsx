import { Route, Routes } from 'react-router-dom'

import Layout from './Layout'
import Products from './views/Products'
import Carts from './views/Carts'
import DetailCart from './views/DetailCart'
import Login from './views/Login'

import ProtectedView from './middleware/ProtectedView'

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedView>
              <Products />
            </ProtectedView>
          }
        />
        <Route
          path="/carts"
          element={
            <ProtectedView>
              <Carts />
            </ProtectedView>
          }
        />
        <Route
          path="/carts/:id"
          element={
            <ProtectedView>
              <DetailCart />
            </ProtectedView>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default App
