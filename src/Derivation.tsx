import React, { useEffect, useState } from "react"
import { Derivation } from "./api"
import "./Derivation.css"

type Props = {
  derivation: Derivation | null
}

function recolorKeys(svg: string): string {
  return svg
    .replaceAll(/style="fill:#7F7F7F;.+?"/g, 'class="key"') // base
    .replaceAll(/style="fill:#007FFF;.+?"/g, 'class="key matched"') // matched
    .replaceAll(/style="fill:#DFDFDF;.+?"/g, 'class="key unmatched"') // unmatched
    .replaceAll(/style="fill:#00AFFF;.+?"/g, 'class="key letters"') // letters
    .replaceAll(/style="fill:#00AFAF;.+?"/g, 'class="key alt"') // alt
    .replaceAll(/style="fill:#9FCFFF;.+?"/g, 'class="key rare"') // rare
    .replaceAll(/style="fill:#8F8FFF;.+?"/g, 'class="key combo"') // combo
    .replaceAll(/style="fill:#3F8F00;.+?"/g, 'class="key number"') // number
    .replaceAll(/style="fill:#AFAF00;.+?"/g, 'class="key symbol"') // symbol
    .replaceAll(/style="fill:#7FFFFF;.+?"/g, 'class="key spelling"') // spelling
    .replaceAll(/style="fill:#FF7F00;.+?"/g, 'class="key brief"') // brief
    .replaceAll(/style="fill:none;stroke:#000000;.+?"/g, 'class="chain-casing"')
    .replaceAll(/style="fill:none;stroke:#B0B0B0;.+?"/g, 'class="chain-inner"')
    .replaceAll(/style="fill:#000000;"/g, 'class="label"')
}

function addNumbers(svg: string): string {
  let counter = 0
  return svg.replaceAll(
    /<use href=/g,
    (match) =>
      `<text class="counter" transform="translate(-1, 84)">${String.fromCharCode(
        0x2460 + counter++
      )}</text>${match}`
  )
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

  const isBasePage = hoverPageNumber === 0
  const page = derivation
    ? isBasePage
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
          __html: recolorKeys(isBasePage ? addNumbers(page.board) : page.board),
        }}
      />
    </>
  )
}
