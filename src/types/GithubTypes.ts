export type User = {
  avatar_url: string
  login: string
  name: string
  url: string
}

export interface StarredRepo {
  id: number
  ownerLogin: string
  name: string
  htmlUrl: string
  description: string
  stargazersCount: number
  forksCount: number
  pushedAt: string
  tags: string[]
}

export enum AuthState {
  loggedOut,
  connecting,
  loggedIn,
  error
}
