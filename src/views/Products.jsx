import { useState, useEffect, useCallback } from "react"
import axios from "axios"

import Pagination from "../components/Pagination"
import Table from "../components/Table"
import FilterProductDrawer from "../components/FilterProductDrawer"
import DetailProductDrawer from "../components/DetailProductDrawer"

import paginateSearchAndFilter from "../helpers/paginate-search-and-filter"
import debounce from "../helpers/debounce"

const tableData = {
  head: [
    {
      name: "Product Name",
      accessor: "title",
      isPrimary: true,
    },
    {
      name: "Brand",
      accessor: "brand",
    },
    {
      name: "Price",
      accessor: "price",
      customClassName: 'text-right',
    },
    {
      name: "Stock",
      accessor: "stock",
      customClassName: "text-center",
    },
    {
      name: "Category",
      accessor: "category",
    },
  ],
  mobileHead: {
    name: "Product Name",
    accessor: "title",
  },
}

const LIMIT = 10

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [productList, setProductList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [showFilterProductDrawer, setShowFilterProductDrawer] = useState(false)
  const [product, setProduct] = useState(null)
  const [showDetailProductDrawer, setShowDetailProductDrawer] = useState(false)

  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)

  const [filter, setFilter] = useState({
    brand: 'all',
    price: {
      min: 0,
      max: 0,
    },
    category: 'all',
  })

  const fetchProducts = useCallback(async () => {
    const { data: { products } } = await axios('https://dummyjson.com/products?limit=100&select=title,brand,price,stock,category,thumbnail')
    setProducts(products)
    setPriceMin(Math.min(...products.map(product => product.price)))
    setPriceMax(Math.max(...products.map(product => product.price)))
    setFilter(prevState => ({
      ...prevState,
      price: {
        min: Math.min(...products.map(product => product.price)),
        max: Math.max(...products.map(product => product.price)),
      },
    }))
    setTotal(products.length)
  }, [])

  const fetchCategories = useCallback(async () => {
    const { data } = await axios('https://dummyjson.com/products/categories')
    setCategories(data)
  }, [])

  const handleSearch = debounce((event) => {
    setSearch(event.target.value)
  }, 700)

  const handleToggleFilterProductDrawer = () => setShowFilterProductDrawer(prevState => !prevState)

  const handleShowDetailProductDrawer = async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await res.json()
    
    setProduct(data)
    setShowDetailProductDrawer(true)
  }

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: products,
      perPage: LIMIT,
      page,
      ...(search && { search }),
      filter,
    })

    setProductList(list)
    setTotal(total)
  }, [page, products, search, filter])

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: products,
      perPage: LIMIT,
      page: 1,
      ...(search && { search }),
      filter,
    })

    setProductList(list)
    setTotal(total)
    setPage(1)
  }, [search, products, filter])

  useEffect(() => {
    const { list, total } = paginateSearchAndFilter({
      list: products,
      perPage: LIMIT,
      page: 1,
      ...(search && { search }),
      filter,
    })

    setProductList(list)
    setTotal(total)
    setPage(1)
  }, [filter, products, search])

  useEffect(() => {
    if (!showDetailProductDrawer) {
      setProduct(null)
    }
  }, [showDetailProductDrawer])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  return (
    <>
      <div className="flex flex-col gap-5 w-full h-auto px-4 py-6 bg-white rounded-lg text-gray-700 shadow-none sm:shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <h2 className="text-lg font-semibold">Products</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 px-3 w-full sm:w-auto h-8 text-gray-700 border border-gray-700 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              
              <input
                placeholder="Search ..."
                onChange={handleSearch}
                className="text-sm focus:outline-none"
              />
            </div>

            <button
              className="flex justify-center items-center px-3 gap-1 border border-green-500 hover:bg-green-500 rounded-lg w-full sm:w-auto h-8 text-sm text-green-500 hover:text-white font-medium"
              onClick={handleToggleFilterProductDrawer}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>

              Filter
            </button>
          </div>
        </div>

        {(filter.brand !== 'all' || filter.price.min !== priceMin || filter.price.max !== priceMax || filter.category !== 'all') && (
          <div className="flex gap-3 items-center flex-wrap">
            <p className="text-xs font-semibold">FILTERED BY:</p>
            {filter.brand !== 'all' && (
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs bg-green-300 text-green-800 hover:bg-green-300 font-medium cursor-pointer">
                Brand:<strong>{filter.brand}</strong>
                <button onClick={() => setFilter(prevState => ({ ...prevState, brand: 'all' }))}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {(filter.price.min !== priceMin || filter.price.max !== priceMax) && (
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs bg-green-300 text-green-800 hover:bg-green-300 font-medium cursor-pointer">
                Price Range:<strong>${filter.price.min} - ${filter.price.max}</strong>
                <button
                  onClick={() => {
                    const elementPriceMin = document.getElementById('price-min')
                    const elementPriceMax = document.getElementById('price-max')
                    elementPriceMin.value = priceMin
                    elementPriceMax.value = priceMax

                    setFilter(prevState => ({ ...prevState, price: { min: priceMin, max: priceMax } }))
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {filter.category !== 'all' && (
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs bg-green-300 text-green-800 hover:bg-green-300 font-medium cursor-pointer">
                Category:<strong>{filter.category}</strong>
                <button onClick={() => setFilter(prevState => ({ ...prevState, category: 'all' }))}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Table
            list={productList}
            tableData={tableData}
            handleAction={{ view: handleShowDetailProductDrawer }}
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

      <FilterProductDrawer
        open={showFilterProductDrawer}
        toggle={handleToggleFilterProductDrawer}
        brands={[...new Set(products.map(product => product.brand))]}
        priceMin={priceMin}
        priceMax={priceMax}
        categories={categories}
        filter={filter}
        setFilter={setFilter}
      />

      <DetailProductDrawer
        open={showDetailProductDrawer}
        toggle={() => setShowDetailProductDrawer(prevState => !prevState)}
        product={product}
      />
    </>
  )
}

export default Products