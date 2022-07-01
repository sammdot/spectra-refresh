import React, { useEffect, useState } from "react"
import DerivationDetail from "./Derivation"
import { Derivation, derive, Word } from "./api"
import "./WordList.css"

interface Props {
  words: Word[]
  searchByStroke: boolean
}

export default function WordList({ words, searchByStroke }: Props) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [selectedOutline, setSelectedOutline] = useState<string | null>(null)

  const [derivation, setDerivation] = useState<Derivation | null>(null)

  useEffect(() => {
    if (words.length === 1) {
      setSelectedWord(words[0].word)
      if (words[0].outlines.length === 1) {
        setSelectedOutline(words[0].outlines[0])
      }
    }
  }, [words, setSelectedWord, setSelectedOutline])

  useEffect(() => {
    if (!selectedWord || !selectedOutline) {
      return
    }
    ;(searchByStroke
      ? derive(selectedOutline, selectedWord)
      : derive(selectedWord, selectedOutline)
    ).then((d) => {
      setDerivation(d)
    })
  }, [searchByStroke, selectedWord, selectedOutline])

  let currentWord = words.filter((w) => w.word === selectedWord)[0]
  return (
    <>
      <div className="word-list">
        <div className="list">
          {selectedWord ? (
            <></>
          ) : (
            <div className="count">
              {words.length} translation{words.length === 1 ? "" : "s"}
            </div>
          )}
          <ul className="words">
            {selectedWord ? (
              <li
                className={"selected" + (searchByStroke ? " steno" : "")}
                onClick={() => {
                  setDerivation(null)
                  setSelectedWord(null)
                  setSelectedOutline(null)
                }}
                key={selectedWord}
              >
                <span className="arrow">&larr;</span> {selectedWord}
              </li>
            ) : (
              <>
                {words.map((w) => (
                  <li
                    onClick={() => {
                      setDerivation(null)
                      setSelectedWord(w.word)
                      setSelectedOutline(null)
                    }}
                    key={w.word}
                    className={searchByStroke ? "steno" : undefined}
                  >
                    {w.word}
                  </li>
                ))}
              </>
            )}
          </ul>
          {selectedWord ? (
            <>
              <div className="count">
                {currentWord.outlines.length} outline
                {currentWord.outlines.length === 1 ? "" : "s"}
              </div>
              <ul className="outlines">
                {currentWord ? (
                  currentWord.outlines.map((ol) => (
                    <li
                      className={
                        (searchByStroke ? "" : "steno") +
                        (selectedOutline === ol ? " selected" : "")
                      }
                      onClick={() => {
                        if (selectedOutline !== ol) {
                          setDerivation(null)
                          setSelectedOutline(ol)
                        }
                      }}
                      key={ol}
                    >
                      {ol}
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="detail">
          <DerivationDetail derivation={derivation} />
        </div>
      </div>
    </>
  )
}
