import React, { useState } from "react"
import Link from "next/link"
import Text from "./Text"

const SearchBar = ({ data }) => {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState("")

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === "") {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="search"
          placeholder="lisabo, kallax..."
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length != 0 && (
        <div className="p-5">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div className="hover:bg-sky-700">
                <Link
                  href={{
                    pathname: `./detailsArticle/${value.id}`,
                  }}
                >
                  <a className="inline-flex pb-5 px-2">
                    <img
                      src={value.pictures[0]}
                      alt={value.pictures[0]}
                      width={50}
                      height={50}
                      className="object-center object-cover mx-2 rounded"
                    />
                    <Text variant="card_name" size="md">
                      {value.name}
                    </Text>
                  </a>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
