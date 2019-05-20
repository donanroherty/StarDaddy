import React, { useState, useEffect } from 'react'
import starredReposData from '../mock-data/starred.json'
import { StarredRepo } from '../types/GithubTypes'

type StarredContextValue = {
  starred: StarredRepo[]
  setStarred: (starredRepos: StarredRepo[]) => void
}
const StarredContext = React.createContext<StarredContextValue | undefined>(
  undefined
)

const StarredProvider = (props: any) => {
  const [starred, setStarred] = useState()
  const value = React.useMemo(() => ({ starred, setStarred }), [starred])
  return <StarredContext.Provider value={value} {...props} />
}

const useStarred = () => {
  const context = React.useContext(StarredContext)
  if (!context)
    throw new Error('useStarred must be used within a StarredProvider')

  const { starred, setStarred } = context

  useEffect(() => {
    updateStarred()
  }, [])

  const updateStarred = () => {
    const starredRepos = starredReposData.map(star => {
      const repo: StarredRepo = {
        ownerLogin: star.owner.login,
        ownerAvatarUrl: star.owner.avatar_url,
        name: star.name,
        htmlUrl: star.html_url,
        description: star.description || '',
        stargazersCount: star.stargazers_count,
        forksCount: star.forks_count,
        pushedAt: star.pushed_at
      }
      return repo
    })

    setStarred(starredRepos)
  }

  return { starred, updateStarred }
}

export { StarredProvider, useStarred }
