import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import logo from "./icon.svg"
import "./App.css"
import Search from "./Search"
import WordList from "./WordList"
import { search, Word } from "./api"

const handleSearch = debounce(
  (searchText, searchByStroke, useRegex, setWords) => {
    search(searchText, searchByStroke, useRegex).then(setWords)
  },
  300
)

export default function App() {
  const [searchText, setSearchText] = useState<string>("")
  const [searchByStroke, setSearchByStroke] = useState<boolean>(false)
  const [useRegex, setUseRegex] = useState<boolean>(false)
  const [words, setWords] = useState<Word[]>([])

  useEffect(() => {
    setWords([])
    if (!searchText) {
      return
    }
    handleSearch(searchText, searchByStroke, useRegex, setWords)
  }, [searchText, searchByStroke, useRegex, setWords])

  return (
    <div className="container">
      <header className="header">
        <img
          src={logo}
          alt="Spectra Lexer logo"
          className="logo"
          onClick={() => setSearchText("")}
        />
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
          searchByStroke={searchByStroke}
          setSearchByStroke={setSearchByStroke}
          useRegex={useRegex}
          setUseRegex={setUseRegex}
        />
      </header>
      {words.length === 0 ? (
        <div className="empty">
          {!!searchText
            ? "No entries found."
            : "Search for a word or outline to begin."}
        </div>
      ) : (
        <>
          <WordList words={words} searchByStroke={searchByStroke} />
        </>
      )}
    </div>
  )
}
