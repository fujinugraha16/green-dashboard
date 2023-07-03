import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const shortenSentence = (sentence) => sentence.length <= 26 ? sentence : `${sentence.substring(0, 26)}...`

const Table = ({ tableData, list, handleAction, hideAction }) => {
  const [activeAccordioNumber, setActiveAccordionNumber] = useState(-1)

  const handleAccordionButton = (number) => setActiveAccordionNumber(activeAccordioNumber !== number ? number : -1)

  useEffect(() => {
    setActiveAccordionNumber(-1)
  }, [list])

  return (
    <>
      <div className="w-full overflow-scroll hidden sm:flex">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {tableData.head.map(({ name, customClassName }, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 ${customClassName}`}
                >
                  {name}
                </th>
              ))}

              {!hideAction && (
                <th scope="col" className="px-6 py-3 text-center">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id} className="bg-white border-b">
                {tableData.head.map(({ accessor, isPrimary, customClassName }, index) => 
                  accessor === 'title' ? (
                    <th key={index} scope="row" className={isPrimary ? `flex items-center gap-3 px-6 py-4 font-medium text-gray-700 whitespace-nowrap ${customClassName}` : `flex items-center gap-3 px-6 py-4 font-normal ${customClassName}`}>
                      <div className="flex items-center w-8 h-8 overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={`Thumbnail ${item.id}`}
                          className="object-fill"
                        />
                      </div>
                      {item.title}
                    </th>
                  ) : accessor === 'products' ? (
                    <th key={index} scope="row" className={isPrimary ? `px-6 py-4 font-medium text-gray-700 whitespace-nowrap ${customClassName}` : `px-6 py-4 font-normal ${customClassName}`}>
                      <ul key={accessor} className="list-disc px-4">
                        {item.products.map(product => (
                          <li key={product.id}>
                            {product.title} &nbsp;x &nbsp;{product.quantity}
                          </li>
                        ))}
                      </ul>
                    </th>
                  ) : (
                    <th key={index} scope="row" className={isPrimary ? `px-6 py-4 font-medium text-gray-700 whitespace-nowrap ${customClassName}` : `px-6 py-4 font-normal ${customClassName}`}>
                      {['price', 'total', 'discountedTotal', 'discountedPrice'].includes(accessor) && '$'}{item[accessor]}{accessor === 'discountPercentage' && '%'}
                    </th>
                  )
                )}

                {!hideAction && (
                  <th className="px-6 py-4 gap-5 text-center">
                    <button
                      className="text-gray-500"
                      onClick={() => handleAction.view(item.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </th>
                )} 
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile view */}
      <div className="w-full flex flex-col sm:hidden">
        <div className="px-3 py-4 text-xs uppercase font-bold bg-gray-50">{tableData.mobileHead.name}</div>
        
        {list.map((item, index) => (
          <div key={item.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 px-3 py-4 font-medium text-gray-700 whitespace-nowrap border-b border-gray-100">
                {'title' in item && 'thumbnail' in item ? (
                  <>
                    <div className="flex items-center w-8 h-8 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={`Thumbnail ${item.id}`}
                        className="object-fill"
                      />
                    </div>
                    {shortenSentence(item.title)}
                  </>
                ) : 'cart' in item ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>

                    {item.cart}
                  </>
                ) : 'productName' in item ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                    </svg>

                    {shortenSentence(item.productName)}
                  </>
                ) : (
                  item[tableData.mobileHead.accessor]
                )}
              </div>

              <button className="text-gray-700 px-3 py-4" onClick={() => handleAccordionButton(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${activeAccordioNumber === index && 'rotate-180'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            <div className={`${activeAccordioNumber !== index && 'hidden'} flex flex-col gap-5 px-3 py-4 bg-gray-50`}>
              {tableData.head.filter(({ accessor }) => accessor !== tableData.mobileHead.accessor).map(({ name, accessor }) =>
                accessor === 'products' ? (
                  <div key={accessor} className="flex flex-col gap-2">
                    <p className="text-gray-400 font-medium uppercase text-sm">{name}</p>
                    <ul key={accessor} className="list-disc px-4">
                      {item.products.map(product => (
                        <li key={product.id} className="text-sm">
                          {product.title} &nbsp;x &nbsp;{product.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div key={accessor} className="flex justify-between">
                    <p className="text-gray-400 font-medium uppercase text-sm">{name}</p>
                    <p>{['price', 'total', 'discountedTotal', 'discountedPrice'].includes(accessor) && '$'}{item[accessor]}{accessor === 'discountPercentage' && '%'}</p>
                  </div>
                )
              )}

              {!hideAction && (
                <div className="flex justify-between">
                  <p className="text-gray-400 font-medium uppercase text-sm">Action</p>
                  <div className="flex gap-5">
                    <button
                      className="text-gray-500"
                      onClick={() => handleAction.view(item.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

Table.propTypes = {
  tableData: PropTypes.object,
  list: PropTypes.array,
  handleAction: PropTypes.objectOf({
    view: PropTypes.func,
  }),
  hideAction: PropTypes.bool,
}

export default Table