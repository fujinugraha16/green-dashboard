
const paginateSearchAndFilter = ({ list, perPage, page, search, filter }) => {
  let filteredList = search
    ? list.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    : list

  if (filter) {
    if (filter.brand !== 'all') {
      filteredList = filteredList.filter(item => item.brand === filter.brand)
    }
  
    filteredList = filteredList.filter(item => item.price >= filter.price.min && item.price <= filter.price.max)
  
    if (filter.category !== 'all') {
      filteredList = filteredList.filter(item => item.category === filter.category)
    }
  }

  return {
    list: filteredList.slice((page - 1) * perPage, page * perPage),
    total: filteredList.length,
  }
}

export default paginateSearchAndFilter