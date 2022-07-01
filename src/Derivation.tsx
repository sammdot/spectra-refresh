import React, { useEffect, useState } from "react"
import { Derivation } from "./api"

type Props = {
  derivation: Derivation | null
}

export default function DerivationDetail({ derivation }: Props) {
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [hoverPageNumber, setHoverPageNumber] = useState<number>(0)

  useEffect(() => {
    if (derivation === null && pageNumber !== 0) {
      setPageNumber(0)
      setHoverPageNumber(0)
    }
  }, [derivation, pageNumber, setPageNumber, setHoverPageNumber])

  const page = derivation
    ? hoverPageNumber === 0
      ? derivation.basePage
      : derivation.pages[hoverPageNumber]
    : null

  return page === null ? (
    <></>
  ) : (
    <>
      <div
        className="graph"
        dangerouslySetInnerHTML={{
          __html: page.graph,
        }}
        onClick={(e) => {
          e.preventDefault()
          if (e.target instanceof HTMLAnchorElement) {
            let el = e.target as HTMLAnchorElement
            const nextPage = parseInt(el.href.split("#")[1])
            setPageNumber(nextPage)
            setHoverPageNumber(nextPage)
          }
        }}
        onMouseOver={(e) => {
          e.preventDefault()
          if (e.target instanceof HTMLAnchorElement) {
            let el = e.target as HTMLAnchorElement
            const nextPage = parseInt(el.href.split("#")[1])
            setHoverPageNumber(nextPage)
          }
        }}
        onMouseOut={(e) => {
          e.preventDefault()
          if (e.target instanceof HTMLAnchorElement) {
            setHoverPageNumber(pageNumber)
          }
        }}
      />
      <div className="caption">{page.caption}</div>
      <div
        className="board"
        dangerouslySetInnerHTML={{
          __html: page.board,
        }}
      />
    </>
  )
}
