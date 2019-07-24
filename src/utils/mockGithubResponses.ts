import axios from 'axios'
import MockAxios from 'axios-mock-adapter'
import { queryStars, GET_USER } from 'state/hooks/useGithub'
import starredData from 'mock-data/stars.json'

const mock = new MockAxios(axios)
afterAll(() => mock.restore())

const GQLApi = 'https://api.github.com/graphql'

export default function mockGithub() {
  // Mock authentication response
  mock.onPost(GQLApi, { query: GET_USER }).reply(200, {
    data: {
      viewer: {
        name: 'Test Name',
        login: 'testname',
        url: 'https://github.com/testname',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/5565439?v=4'
      }
    }
  })

  // Mock 2 pages of /starred response
  mock
    .onPost(GQLApi, {
      query: queryStars(100, '')
    })
    .reply(200, {
      ...starredData.page1.data
    })
  mock
    .onPost(GQLApi, {
      query: queryStars(100, 'Y3Vyc29yOnYyOpHOBvdfhw==')
    })
    .reply(200, {
      ...starredData.page2.data
    })

  return mock
}
