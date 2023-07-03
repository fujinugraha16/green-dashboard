import { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"

const removeCharacters = (text) => {
  return text.replace(/^0+/, '').replace(/[^0-9.]/g, '').replace(/\./g,'')
}

const Pagination = ({ page, setPage, totalPage, totalButton }) => {
  const numberOfPages = Array(totalButton).fill().map((_, index) => index + 1)
  const [pageButtons, setPageButtons] = useState(numberOfPages)

  const inputPageNumberRef = useRef(null)

  const handlePrevious = () => {
    const firstNumber = pageButtons[0]

    if (page === firstNumber) {
      pageButtons.pop()
      pageButtons.unshift(firstNumber - 1)
    }

    setPage(prevState => prevState - 1)
  }

  const handleNext = () => {
    const lastNumber = pageButtons.at(-1)

    if (page === lastNumber) {
      pageButtons.shift()
      pageButtons.push(lastNumber + 1)

      setPageButtons(pageButtons)
    }

    setPage(prevState => prevState + 1)
  }

  const handlePageButton = (number) => setPage(number)

  const handleKeyUpInputPageNumber = () => {
    const element = document.getElementById('input-number')
    const value = removeCharacters(element.value)
    if (value > totalPage) {
      element.value = totalPage
    } else {
      element.value = value
    }
  }

  const handleToPageSubmit = (event) => {
    event.preventDefault()

    const value = +inputPageNumberRef.current.value

    if (!pageButtons.includes(value)) {
      if (value - totalButton > 0) {
        const newNumbersOfPage = Array(totalButton).fill().map((_, index) => index + 1 + (value - totalButton))

        setPageButtons(newNumbersOfPage)
      } else if (value - totalButton <= 0) {
        setPageButtons(numberOfPages)
      }
    }

    setPage(value)
  }

  useEffect(() => {
    const numberOfPages = Array(totalButton).fill().map((_, index) => index + 1)
    setPageButtons(numberOfPages)
  }, [totalButton])

  return (
    <div className="flex flex-col justify-center lg:justify-end gap-4 lg:flex-row items-center">
      <div className="flex gap-2">
        {page !== 1 && (
          <button
            className="flex justify-center items-center w-8 h-8 rounded-full text-green-500 hover:bg-gray-100"
            onClick={handlePrevious}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {pageButtons.map(number => (
          <button
            key={number}
            className={`flex justify-center items-center w-8 h-8 rounded-full ${page === number ? 'text-white bg-green-500' : 'text-gray-700 bg-gray-100'}`}
            onClick={() => handlePageButton(number)}
          >
            {number}
          </button>
        ))}

        {page < totalPage && (
          <button
            className="flex justify-center items-center w-8 h-8 rounded-full text-green-500 hover:bg-gray-100"
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm text-gray-700">to page: </p>
        <form onSubmit={handleToPageSubmit}>
          <input
            id="input-number"
            ref={inputPageNumberRef}
            type="number"
            className="text-sm w-16 h-8 rounded-lg border border-gray-200 pl-3" 
            onKeyUp={handleKeyUpInputPageNumber}
            defaultValue={1}
          />
        </form>
        <p className="text-sm text-gray-700">{page}/{totalPage}</p>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPage: PropTypes.number,
  totalButton: PropTypes.number,
}

export default Pagination