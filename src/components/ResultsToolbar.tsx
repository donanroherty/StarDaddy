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

  const lastUpdated = lastSyncDate ? (
    <>
      <em>{new Date(lastSyncDate).toDateString()}</em>&nbsp; at &nbsp;
      <em>{new Date(lastSyncDate).toLocaleTimeString()}</em>
    </>
  ) : (
    'never'
  )

  return (
    <Wrapper>
      <SyncWrapper>
        <SyncButton onClick={handleSyncRepos} isSyncing={isSyncing}>
          <GoSync size={25} />
        </SyncButton>
        <LastUpdated>Last updated: &nbsp;{lastUpdated}</LastUpdated>
      </SyncWrapper>
      <HR />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 45px;
  display: flex;
  flex-direction: column;
`
const SyncWrapper = styled.div`
  margin-top: 10px;
  margin-left: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const LastUpdated = styled.div`
  margin-left: 6px;
  font-size: 12px;
  color: ${({ theme }) => lighten(0.2, theme.color.text)};
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

const HR = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.borderLight};
  height: 1px;
  width: calc(100% - 50px);
  align-self: center;
  padding: 0;
  margin: 0;
  margin-top: auto;
`
export default withTheme(ResultsToolbar)
