export type TagType = {
  name: string
}

export type SearchResultType = {
  id: string
  name: string
  termMatches: TermMatch[]
  tagMatches: string[]
  searchRanking: number
}
export type TermSearchResult = {
  id: string
  termMatches: TermMatch[]
}
export type TermMatch = {
  term: string
  count: number
}
