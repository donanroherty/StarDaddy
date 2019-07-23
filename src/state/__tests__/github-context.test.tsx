import { render, cleanup } from 'utils/test-utils'
import { cleanStarData } from 'state/github-context'
import { StarredRepo } from 'types/GithubTypes'

afterEach(() => cleanup())

const localStarsMock = [
  {
    id: 'MDEwOlJlcG9zaXRvcnkxMTU2MTgzMw==',
    ownerLogin: 'AdamsLair',
    name: 'duality',
    htmlUrl: 'https://github.com/AdamsLair/duality',
    description: 'a 2D Game Development Framework',
    stargazersCount: 1035,
    forksCount: 262,
    pushedAt: '2019-07-09T07:00:09Z',
    tags: []
  },
  {
    id: 'MDEwOlJlcG9zaXRvcnk1Njg5MTgy',
    ownerLogin: 'multiwii',
    name: 'baseflight',
    htmlUrl: 'https://github.com/multiwii/baseflight',
    description: '32 bit fork of the MultiWii RC flight controller firmware',
    stargazersCount: 380,
    forksCount: 325,
    pushedAt: '2016-01-18T22:04:53Z',
    tags: ['C']
  }
]

const mockRepoData = [
  {
    id: 'MDEwOlJlcG9zaXRvcnkxMTU2MTgzMw==',
    name: 'duality',
    url: 'https://github.com/AdamsLair/duality',
    owner: {
      login: 'AdamsLair'
    },
    description: 'a 2D Game Development Framework',
    stargazers: {
      totalCount: 1035
    },
    forkCount: 262,
    pushedAt: '2019-07-09T07:00:09Z',
    languages: {
      totalSize: 5973825,
      edges: [
        {
          node: {
            name: 'C#'
          },
          size: 5969303
        },
        {
          node: {
            name: 'GLSL'
          },
          size: 3755
        },
        {
          node: {
            name: 'Batchfile'
          },
          size: 767
        }
      ]
    }
  },
  {
    id: 'MDEwOlJlcG9zaXRvcnk3MDY4OTA3',
    name: 'SSE',
    url: 'https://github.com/stramit/SSE',
    owner: {
      login: 'stramit'
    },
    description: 'Strumpy Shader Editor',
    stargazers: {
      totalCount: 309
    },
    forkCount: 112,
    pushedAt: '2017-11-06T11:34:48Z',
    languages: {
      totalSize: 384972,
      edges: [
        {
          node: {
            name: 'C#'
          },
          size: 381558
        },
        {
          node: {
            name: 'GLSL'
          },
          size: 3414
        }
      ]
    }
  },
  {
    id: 'MDEwOlJlcG9zaXRvcnk1Njg5MTgy',
    name: 'baseflight',
    url: 'https://github.com/multiwii/baseflight',
    owner: {
      login: 'multiwii'
    },
    description: '32 bit fork of the MultiWii RC flight controller firmware',
    stargazers: {
      totalCount: 380
    },
    forkCount: 325,
    pushedAt: '2016-01-18T22:04:53Z',
    languages: {
      totalSize: 2806840,
      edges: [
        {
          node: {
            name: 'Makefile'
          },
          size: 6982
        },
        {
          node: {
            name: 'C'
          },
          size: 2282583
        },
        {
          node: {
            name: 'HTML'
          },
          size: 26297
        },
        {
          node: {
            name: 'Assembly'
          },
          size: 446011
        },
        {
          node: {
            name: 'C++'
          },
          size: 44286
        },
        {
          node: {
            name: 'Batchfile'
          },
          size: 681
        }
      ]
    }
  }
]
test('cleanStarData returns correct data', () => {
  expect(cleanStarData(mockRepoData, localStarsMock)).toEqual([
    {
      id: 'MDEwOlJlcG9zaXRvcnkxMTU2MTgzMw==',
      ownerLogin: 'AdamsLair',
      name: 'duality',
      htmlUrl: 'https://github.com/AdamsLair/duality',
      description: 'a 2D Game Development Framework',
      stargazersCount: 1035,
      forksCount: 262,
      pushedAt: '2019-07-09T07:00:09Z',
      tags: []
    },
    {
      id: 'MDEwOlJlcG9zaXRvcnk3MDY4OTA3',
      ownerLogin: 'stramit',
      name: 'SSE',
      htmlUrl: 'https://github.com/stramit/SSE',
      description: 'Strumpy Shader Editor',
      stargazersCount: 309,
      forksCount: 112,
      pushedAt: '2017-11-06T11:34:48Z',
      tags: ['C#']
    },
    {
      id: 'MDEwOlJlcG9zaXRvcnk1Njg5MTgy',
      ownerLogin: 'multiwii',
      name: 'baseflight',
      htmlUrl: 'https://github.com/multiwii/baseflight',
      description: '32 bit fork of the MultiWii RC flight controller firmware',
      stargazersCount: 380,
      forksCount: 325,
      pushedAt: '2016-01-18T22:04:53Z',
      tags: ['C']
    }
  ])
})
