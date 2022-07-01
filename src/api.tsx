export interface Word {
  word: string
  outlines: string[]
}

export interface Page {
  board: string
  caption: string
  graph: string
  intense_graph: string
  rule_id: string
}

export interface Derivation {
  basePage: Page
  pages: Page[]
}

function request(body: any): Promise<any> {
  const strBody = JSON.stringify(body)
  return new Promise((resolve, reject) =>
    fetch("https://spectra.sammdot.ca/request", {
      method: "post",
      body: strBody,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => resolve(res.json()))
  )
}

export function search(
  query: string,
  bySteno: boolean,
  withRegex: boolean
): Promise<Word[]> {
  return request({
    action: "search",
    args: [query, 1],
    options: {
      search_mode_strokes: bySteno,
      search_mode_regex: withRegex,
    },
  }).then((data) =>
    Array.from(
      Object.entries(data.matches.results).map(([key, value]) => ({
        word: key,
        outlines: value as string[],
      }))
    )
  )
}

export function derive(word: string, outline: string): Promise<Derivation> {
  return request({
    action: "query_match",
    args: [word, [outline]],
    options: {
      board_aspect_ratio: 0.125,
      board_show_compound: 1,
      board_show_letters: 0,
    },
  }).then((data) => {
    let d = data.display
    let pages: Page[] = []
    for (let pageId in d.pages_by_ref) {
      pages[parseInt(pageId)] = d.pages_by_ref[pageId]
    }
    return {
      basePage: d.default_page,
      pages,
    }
  })
}
