import PropTypes from "prop-types"
import { useCallback } from "react"

const FilterProductDrawer = ({ open, toggle, brands, priceMin, priceMax, categories, filter, setFilter }) => {
  const handleChangePriceRange = useCallback((type, event) => {
    const elementValue = event.target.value || 0
    let value = ''

    if (type === 'max') {
      if (parseInt(elementValue, 10) > priceMax) {
        value = priceMax
      } else if (parseInt(elementValue, 10) <= priceMax && parseInt(elementValue, 10) >= priceMin) {
        value = elementValue
      } else if (parseInt(elementValue, 10) < priceMin) {
        value = priceMin
      }
    }

    if (type === 'min') {
      if (parseInt(elementValue, 10) < priceMin) {
        value = priceMin
      } else if (parseInt(elementValue, 10) >= priceMin && parseInt(elementValue, 10) <= priceMax) {
        value = elementValue
      } else if (parseInt(elementValue, 10) > priceMax) {
        value = priceMin
      }
    }

    setFilter(prevState => ({
      ...prevState,
      price: {
        ...prevState.price,
        [type]: value,
      }
    }))
  }, [priceMin, priceMax, setFilter])

  const handleBlurPriceRange = useCallback((type) => {
    const element = document.getElementById(`price-${type}`)
    const priceValue = filter.price[type]
    let value = ''

    if (type === 'max') {
      if (parseInt(priceValue, 10) > priceMax) {
        element.value = priceMax
        value = priceMax
      } else if (parseInt(priceValue, 10) <= priceMax && parseInt(priceValue, 10) >= filter.price.min) {
        element.value = priceValue
        value = priceValue
      } else if (parseInt(priceValue, 10) < priceMin) {
        element.value = filter.price.min
        value = filter.price.min
      }
    }

    if (type === 'min') {
      if (parseInt(priceValue, 10) < priceMin) {
        element.value = priceMin
        value = priceMin
      } else if (parseInt(priceValue, 10) >= priceMin && parseInt(priceValue, 10) <= filter.price.max) {
        element.value = priceValue
        value = priceValue
      } else if (parseInt(priceValue, 10) > priceMax) {
        element.value = filter.price.max
        value = filter.price.max
      }
    }

    setFilter(prevState => ({
      ...prevState,
      price: {
        ...prevState.price,
        [type]: value,
      }
    }))
  }, [filter.price, priceMin, priceMax, setFilter])

  return (
    <div className="relative">
      <div className={`flex flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 gap-3 h-screen bg-white py-5 px-3 shadow-md fixed top-0 left-0 z-20 transition-all duration-500 transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="absolute top-4 right-4 text-gray-700" onClick={toggle}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    
        <div className="px-1 sm:px-2">
          <h1 className="text-gray-700 text-xl font-semibold">Filter</h1>
        </div>

        <form className="flex flex-col gap-4 px-1 sm:px-2">
          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="brand" className="font-medium">Select Brand</label>
            <select
              id="brand"
              className="px-3 py-2 border border-gray-400 focus:border-green-500 hover:border-green-500 rounded-md outline-none appearance-none cursor-pointer"
              onChange={(event) => setFilter(prevState => ({
                ...prevState,
                brand: event.target.value,
              }))}
              value={filter.brand}
            >
              <option value="all">All Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="price-range" className="font-medium">Price Range</label>
            
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="price-range" className="font-medium text-sm">Minimum Price</label>
                <div className="flex gap-2 w-full items-center px-3 py-2 border border-gray-400 focus:border-green-500 hover:border-green-500 rounded-md outline-none appearance-none cursor-pointer">
                  {"$"}
                  <input
                    id="price-min"
                    placeholder="Minimum Price"
                    className="w-full h-full outline-none appearance-none"
                    defaultValue={priceMin}
                    min={priceMin}
                    max={filter.price.max}
                    type="number"
                    onChange={(event) => handleChangePriceRange('min', event)}
                    onBlur={() => handleBlurPriceRange('min')}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="price-range" className="font-medium text-sm">Maximum Price</label>
                <div className="flex gap-2 w-full items-center px-3 py-2 border border-gray-400 focus:border-green-500 hover:border-green-500 rounded-md outline-none appearance-none cursor-pointer">
                  {"$"}
                  <input
                    id="price-max"
                    placeholder="Maximum Price"
                    className="w-full h-full outline-none appearance-none"
                    defaultValue={priceMax}
                    min={filter.price.min}
                    max={priceMax}
                    type="number"
                    onChange={(event) => handleChangePriceRange('max', event)}
                    onBlur={() => handleBlurPriceRange('max')}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <label htmlFor="category" className="font-medium">Select Category</label>
            <div className="flex gap-2 flex-wrap">
              {['all', ...categories].map(category => (
                <div 
                  key={category} 
                  className={`px-3 py-2 rounded-lg text-xs border-[1.5px] ${filter.category === category && 'bg-green-300'} border-green-300 text-green-800 hover:bg-green-300 font-medium cursor-pointer`}
                  onClick={() => setFilter(prevState => ({
                    ...prevState,
                    category,
                  }))}
                >
                  {category !== 'all' ? category : 'All'}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* backdrop */}
      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black opacity-50`} onClick={toggle} />
    </div>
  )
}

FilterProductDrawer.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  brands: PropTypes.array,
  priceMin: PropTypes.number,
  priceMax: PropTypes.number,
  categories: PropTypes.array,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
}

export default FilterProductDrawer