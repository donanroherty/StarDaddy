import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Button from 'components/Button'
import { GoCheck, GoX } from 'react-icons/go'
import usePopup from 'state/hooks/usePopup'
import useKeyPress from 'hooks/useKeyPress'

interface ConfirmationPopupProps {}
const ConfirmationPopup: React.FC<ConfirmationPopupProps> = () => {
  const theme = useContext(ThemeContext)

  const {
    isVisible,
    handleConfirm,
    handleCancel,
    size,
    content,
    position
  } = usePopup()

  useKeyPress((e: KeyboardEvent) => {
    if (isVisible && e.key === 'Escape') {
      handleCancel()
    }
    if (isVisible && e.key === 'Enter') {
      handleConfirm()
    }
  })

  // return ReactDOM.createPortal(
  return (
    <Wrapper
      data-testid="popup"
      position={position}
      size={size}
      height={85}
      isVisible={isVisible}
    >
      <Content size={size}>
        <Message>{content}</Message>
        <ButtonWrapper data-testid="popup-buttons">
          <Button
            data-testid="popup-btn-cancel"
            isRound
            radius={15}
            isHollow
            onClick={handleCancel}
          >
            <GoX color={theme.color.primary} />
          </Button>
          <Button
            data-testid="popup-btn-tick"
            isRound
            radius={15}
            onClick={handleConfirm}
          >
            <GoCheck />
          </Button>
        </ButtonWrapper>
        <Arrow />
      </Content>
    </Wrapper>
  )

  // document.body)
}

const arrowSize = 15

const Wrapper = styled.div<any>`
  z-index: 500;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.26));
  position: absolute;
  top: ${({ position, height }) => {
    return position[1] - height - arrowSize / 2
  }}px;
  left: ${({ position }) => position[0]}px;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`
const Content = styled.div<any>`
  text-align: center;
  background-color: white;
  border-radius: 8px;
  border-width: 2px;
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 32px 12px 32px;
`
const Message = styled.div``
const ButtonWrapper = styled.div`
  margin-top: 12px;

  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 16.5px;
`

const Arrow = styled.div`
  position: absolute;
  left: 10px;
  top: calc(100%);
  width: ${arrowSize}px;
  height: ${arrowSize}px;
  width: 0;
  height: 0;
  border-left: ${arrowSize}px solid transparent;
  border-right: ${arrowSize}px solid transparent;
  border-top: ${arrowSize}px solid white;
`

export default ConfirmationPopup
