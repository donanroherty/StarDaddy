import React from 'react'
import styled from 'styled-components'
import { useSearch } from '../state/search-context'
import { GoSearch } from 'react-icons/go'

const SearchBox = () => {
  const { searchTerm, setSearchTerm } = useSearch()

  return (
    <Wrapper data-testid="search-box">
      <InputField>
        <input
          type="text"
          placeholder="Search..."
          id="search"
          onChange={event => setSearchTerm(event.target.value)}
          value={searchTerm}
        />

        <GoSearch size="24px" />
      </InputField>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 0.5px solid ${({ theme }) => theme.color.border};
  border-radius: 15px;
  margin: 12.8px;
  box-sizing: border-box;
  background-color: white;
`
const InputField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 12px 12px 12px 20px;
  > input {
    font-size: 18px;
    border: none;

    color: ${({ theme }) => theme.color.text};
  }
`
const SearchIconWrapper = styled.div``

export default SearchBox
