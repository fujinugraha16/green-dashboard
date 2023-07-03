import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

import Table from "../components/Table"
import paginateSearchAndFilter from "../helpers/paginate-search-and-filter"
import Pagination from "../components/Pagination"

const tableData = {
  head: [
    {
      name: "Product Name",
      accessor: "productName",
      isPrimary: true,
    },
    {
      name: "Price",
      accessor: "price",
      customClassName: 'text-right',
    },
    {
      name: "Quantity",
      accessor: "quantity",
      customClassName: "text-center",
    },
    {
      name: "Total Price",
      accessor: "total",
      customClassName: "text-center",
    },
    {
      name: "Discount",
      accessor: "discountPercentage",
      customClassName: "text-center",
    },
    {
      name: "Price After Discount",
      accessor: "discountedPrice",
      customClassName: "text-center",
    },
  ],
  mobileHead: {
    name: "Product Name",
    accessor: "productName",
  },
}

const LIMIT = 5

const DetailCart = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [user, setUser] = useState({})
  
  const [productList, setProductList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const fetchCart = useCallback(async (id) => {
    const { data: { products, ...cart } } = await axios(`https://dummyjson.com/carts/${id}`)
    setProducts(products.map(product => ({ productName: product.title, ...product })))
    setCart(cart)
  }, [])

  const fetchUser = useCallback(async (id) => {
    const { data } = await axios(`https://dummyjson.com/users/${id}?select=email,firstName,lastName,image,address`)
    setUser(data)
  }, [])

  const handleBack = () => {
    navigate('/carts')
  }

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: products,
      perPage: LIMIT,
      page,
    })

    setProductList(list)
    setTotal(total)
  }, [page, products])

  useEffect(() => {
    fetchCart(id)
  }, [fetchCart, id])

  useEffect(() => {
    if ('userId' in cart) {
      fetchUser(cart.userId)
    }
  }, [fetchUser, cart])

  return (
    <>
      <div className="flex flex-col gap-5 w-full h-auto px-4 py-6 bg-white rounded-lg text-gray-700 shadow-none sm:shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              className="flex justify-center items-center w-8 h-8 rounded-full text-green-500 hover:bg-gray-100"
              onClick={handleBack}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h2 className="text-lg font-semibold">Detail Cart {id}</h2>
          </div>
        </div>

        <div className="w-full p-4 rounded-lg border border-green-300 bg-green-50 text-green-900">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <div className="flex items-center gap-2">
              {user.image && (
                <img
                  src={user.image}
                  alt="User Image"
                  className="w-14 h-14 bg-white rounded-full overflow-hidden border border-green-300 object-cover"
                />
              )}

              {Object.keys(user).length !== 0 && (
                <div className="flex flex-col">
                  <h4 className="uppercase text-sm font-semibold">{user.firstName} {user.lastName}</h4>
                  <p className="text-xs">{user.email}</p>
                  <div className="flex gap-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>

                    <p className="text-xs">{user.address.address}, {user.address.city}, {user.address.state}.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-row justify-between sm:flex-col gap-1 sm:items-end">
              <p className="text-xs"># of Items: <strong>{cart.totalProducts}</strong></p>
              <p className="text-xs">Total Quantity: <strong>{cart.totalQuantity}</strong></p>
              <p className="text-xs">Total Amount: <strong>${cart.total}</strong></p>
            </div>
          </div>
        </div>

        <h3 className="text-md font-semibold">Products</h3>

        <div className="flex flex-col gap-2">
          <Table
            list={productList}
            tableData={tableData}
            hideAction
          />

          {total > 0 ? (
            <p className="text-xs text-center text-gray-700">
              show <strong>{(LIMIT * page) - (LIMIT - 1)}</strong> - <strong>{total > LIMIT * page ? LIMIT * page : total}</strong> from <strong>{total}</strong> data
            </p>
          ) : (
            <p className="text-xs text-center text-gray-700">
              data not found
            </p>
          )}
        </div>

        <Pagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(total/LIMIT)}
          totalButton={Math.ceil(total/LIMIT) < 5 ? Math.ceil(total/LIMIT) : 5}
        />
      </div>
    </>
  )
}

export default DetailCart