import React from 'react'
import UserAuthenticator from '../UserAuthenticator'
import { render, cleanup, fireEvent } from '../utils/test-utils'
import userData from '../../mock-data/user.json'

const authorizeMock = jest.fn()

afterEach(() => {
  cleanup()
  authorizeMock.mockClear()
})

test('Clicking login button calls correct function', () => {
  const { getByText } = render(<UserAuthenticator authorize={authorizeMock} />)
  expect(authorizeMock).toHaveBeenCalledTimes(0)
  fireEvent.click(getByText('Login with GitHub'))
  expect(authorizeMock).toHaveBeenCalledTimes(1)
})

test('Calls authorize for a user saved to local storage on mount', async () => {
  localStorage.setItem('user-data', JSON.stringify(userData))
  expect(authorizeMock).toHaveBeenCalledTimes(0)
  const comp = render(<UserAuthenticator authorize={authorizeMock} />)
  expect(authorizeMock).toHaveBeenCalledTimes(1)
})
