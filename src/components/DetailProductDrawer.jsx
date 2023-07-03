import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const DetailProductDrawer = ({ open, toggle, product }) => {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    if (!open) {
      setImageIndex(0)
    }
  }, [open])

  return (
    <div className="relative">
      <div className={`flex flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 gap-3 h-screen bg-white py-5 px-3 fixed top-0 right-0 z-20 transition-all duration-500 transform ${open ? '-translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-4 right-4 text-gray-700" onClick={toggle}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    
        <div className="px-1 sm:px-2">
          <h1 className="text-gray-700 text-xl font-semibold">Detail Product</h1>
        </div>
    
        {product && (
          <div className="flex flex-col gap-4 px-1 sm:px-2">
            {/* images */}
            <div className="flex flex-col gap-3">
              <img
                src={product.images[imageIndex]}
                alt="Main Product Image"
                className="w-full h-80 overflow-hidden rounded-md object-fill"
              />

              <div className="flex gap-4">
                {product.images.map((image, index) => (                  
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    width="auto"
                    height="auto"
                    className={`relative w-10 h-10 ${index === imageIndex && 'border-2 border-green-500'} cursor-pointer object-fill`}
                    onClick={() => setImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* main detail */}
            <div className="flex flex-col gap-3 text-gray-700">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-medium">
                  {product.title}
                </h2>

                <p className="uppercase text-gray-700 font-semibold text-sm">{product.brand}</p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <p className="text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </p>

                    <p className="text-gray-700 text-sm font-medium">{product.rating}</p>
                  </div>

                  <div className="px-2 py-1 rounded-full text-xs bg-green-300 text-green-800 font-semibold">{product.category}</div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                {product.description}
              </p>
            </div>

            {/* other detail */}
            <div className="flex flex-col gap-2 text-gray-700">
              <div className="flex gap-2">
                <div className="w-1/3 bg-gray-100 rounded-md px-2 py-1 text-sm font-medium">
                  Price
                </div>
                <div className="w-2/3 bg-gray-100 rounded-md px-2 py-1 text-sm">
                  ${product.price}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-1/3 bg-gray-100 rounded-md px-2 py-1 text-sm font-medium">
                  Discount
                </div>
                <div className="w-2/3 bg-gray-100 rounded-md px-2 py-1 text-sm">
                  {product.discountPercentage.toString().replace('.', ',')}%
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-1/3 bg-gray-100 rounded-md px-2 py-1 text-sm font-medium">
                  After Discount
                </div>
                <div className="w-2/3 bg-gray-100 rounded-md px-2 py-1 text-sm">
                  ${(product.price - (product.price * (product.discountPercentage/100))).toFixed(2).toString().replace('.', ',')}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-1/3 bg-gray-100 rounded-md px-2 py-1 text-sm font-medium">
                  Stock
                </div>
                <div className="w-2/3 bg-gray-100 rounded-md px-2 py-1 text-sm">
                  {product.stock}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* backdrop */}
      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black opacity-50`} onClick={toggle} />
    </div>
  )
}

DetailProductDrawer.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  product: PropTypes.object,
}

export default DetailProductDrawer