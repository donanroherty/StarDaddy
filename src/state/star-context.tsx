import React, { useState, useEffect } from 'react'
import starredReposData from '../mock-data/starred.json'
import { StarredRepo } from '../types/GithubTypes'

type StarContextValue = {
  stars: StarredRepo[]
  setStars: (starredRepos: StarredRepo[]) => void
}
const StarContext = React.createContext<StarContextValue | undefined>(undefined)

const StarProvider = (props: any) => {
  const [stars, setStars] = useState()

  const value = React.useMemo(() => ({ stars, setStars }), [stars])
  return <StarContext.Provider value={value} {...props} />
}

const useStars = () => {
  const context = React.useContext(StarContext)
  if (!context) throw new Error('useStarred must be used within a StarProvider')

  const { stars, setStars } = context

  const updateStars = () => {
    const starredRepos = starredReposData.map(star => {
      const repo: StarredRepo = {
        id: star.id,
        ownerLogin: star.owner.login,
        name: star.name,
        htmlUrl: star.html_url,
        description: star.description || '',
        stargazersCount: star.stargazers_count,
        forksCount: star.forks_count,
        pushedAt: star.pushed_at
      }
      return repo
    })

    setStars(starredRepos)
  }

  useEffect(updateStars, [])

  return { stars, updateStars }
}

export { StarProvider, useStars }
