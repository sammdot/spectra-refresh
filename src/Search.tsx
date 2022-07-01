import React, { Dispatch, SetStateAction } from "react"
import "./Search.css"

interface Props {
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
  searchByStroke: boolean
  setSearchByStroke: Dispatch<SetStateAction<boolean>>
  useRegex: boolean
  setUseRegex: Dispatch<SetStateAction<boolean>>
}

export default function Search({
  searchText,
  setSearchText,
  searchByStroke,
  setSearchByStroke,
  useRegex,
  setUseRegex,
}: Props) {
  return (
    <div className="search-field">
      <input
        type="text"
        placeholder="Search for a word or phrase..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="controls">
        <div>
          <input
            type="radio"
            id="searchByWord"
            name="search"
            checked={!searchByStroke}
            onChange={(e) => setSearchByStroke(false)}
          />
          <label htmlFor="searchByWord">Search by Word</label>
        </div>
        <div>
          <input
            type="radio"
            id="searchBySteno"
            name="search"
            checked={searchByStroke}
            onChange={(e) => setSearchByStroke(true)}
          />
          <label htmlFor="searchBySteno">Search by Steno</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="regexSearch"
            checked={useRegex}
            onChange={(e) => setUseRegex(!useRegex)}
          />
          <label htmlFor="regexSearch">Regex</label>
        </div>
      </div>
    </div>
  )
}
