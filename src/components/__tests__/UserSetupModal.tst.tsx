import React from 'react'
import UserSetupModal from '../UserSetupModal'
import { render, cleanup, fireEvent } from '../utils/test-utils'

afterEach(() => cleanup())

test('<UserSetupModal/> renders', () => {
  const comp = render(<UserSetupModal />)
  expect(comp).toBeTruthy()
})
