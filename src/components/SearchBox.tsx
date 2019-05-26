import React from 'react'
import styled, { withTheme } from 'styled-components'
import { useSearch } from '../state/search-context'
import { GoSearch, GoX } from 'react-icons/go'
import { ThemeInterface } from '../theme/theme'

interface SearchBoxProps {
  theme: ThemeInterface
}

const SearchBox = (props: SearchBoxProps) => {
  const { searchTerm, setSearchTerm } = useSearch()
  const { theme } = props

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
        {/* <IconWrapper> */}
        {searchTerm.length === 0 ? (
          <GoSearch size="24px" data-testid="empty-search-icon" />
        ) : (
          <GoX
            size="24px"
            color={theme.color.warning}
            data-testid="clear-search-icon"
            onClick={e => setSearchTerm('')}
          />
        )}
        {/* </IconWrapper> */}
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
  align-items: center;
  padding: 12px 12px 12px 20px;
  > input {
    font-size: 18px;
    border: none;
    color: ${({ theme }) => theme.color.text};
  }
`

export default withTheme(SearchBox)
