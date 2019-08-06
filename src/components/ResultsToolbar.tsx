import React from 'react'
import styled, { withTheme } from 'styled-components'
import { GoSync } from 'react-icons/go'
import { ThemeInterface } from 'theme/theme'
import { lighten, desaturate } from 'polished'
import useGithub from 'state/hooks/useGithub'
import { AuthState } from 'types/GithubTypes'
import useAppState from 'state/hooks/useAppState'

interface ResultsToolbarProps {
  theme: ThemeInterface
}
const ResultsToolbar: React.FC<ResultsToolbarProps> = ({ theme }) => {
  const { authState, fetchStars, isSyncing } = useGithub()
  const { lastSyncDate } = useAppState()

  const handleSyncRepos = () => {
    if (authState === AuthState.loggedIn) fetchStars()
  }

  const lastUpdated = lastSyncDate
    ? `${new Date(lastSyncDate).toDateString()} at ${new Date(
        lastSyncDate
      ).toLocaleTimeString()}`
    : 'never'

  return (
    <Wrapper>
      <SyncButton onClick={handleSyncRepos} isSyncing={isSyncing}>
        <GoSync size={25} />
      </SyncButton>

      <LastUpdated>Last updated: {lastUpdated}</LastUpdated>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 18px;
`
const LastUpdated = styled.div`
  margin-left: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.text};
`
const SyncButton = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => lighten(0.4, theme.color.primary)};

  animation: ${({ isSyncing }) =>
    isSyncing ? 'spin 2s linear infinite' : 'none'};

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  &:hover {
    color: ${({ theme }) => lighten(0.2, theme.color.primary)};
  }
  &:active {
    color: ${({ theme }) => desaturate(0.6, theme.color.primary)};
  }
`

export default withTheme(ResultsToolbar)
