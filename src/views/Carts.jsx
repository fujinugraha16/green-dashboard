import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import Table from "../components/Table"
import Pagination from "../components/Pagination"

import paginateSearchAndFilter from "../helpers/paginate-search-and-filter"

const tableData = {
  head: [
    {
      name: "Products",
      accessor: "products",
    },
    {
      name: "Total Quantity",
      accessor: "totalQuantity",
      customClassName: 'text-center',
    },
    {
      name: "Total Price",
      accessor: "total",
      customClassName: 'text-center',
    },
    {
      name: "Price After Discount",
      accessor: "discountedTotal",
      customClassName: 'text-center',
    },
  ],
  mobileHead: {
    name: "Carts",
    accessor: "cart",
    isPrimary: true,
  },
}

const LIMIT = 5

const Carts = () => {
  const navigate = useNavigate()
  
  const [carts, setCarts] = useState([])
  const [cartList, setCartList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const fetchCarts = useCallback(async () => {
    const { data: { carts } } = await axios('https://dummyjson.com/carts')
    setCarts(carts.map((cart, index) => ({ cart: `Cart ${index + 1}`, ...cart })))
    setTotal(carts.length)
  }, [])

  const handleViewDetailCart = (id) => {
    navigate(`/carts/${id}`)
  } 

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: carts,
      perPage: 5,
      page,
    })

    setCartList(list)
    setTotal(total)
  }, [page, carts])

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])

  return (
    <>
      <div className="flex flex-col gap-5 w-full h-auto px-4 py-6 bg-white rounded-lg text-gray-700 shadow-none sm:shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h2 className="text-lg font-semibold">Carts</h2>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Table
            list={cartList}
            tableData={tableData}
            handleAction={{ view: handleViewDetailCart }}
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

export default Carts