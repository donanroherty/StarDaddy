import React from 'react'
import styled from 'styled-components'

interface ModalProps {
  show: boolean
  children?: React.ReactNode
}
const Modal: React.FC<ModalProps> = ({ show, children }) => {
  return show ? (
    <Wrapper>
      <Inner>
        <Header>
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 590.74 548.55"
            width="50px"
            height="50px"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="logo_02">
                  <path
                    id="star"
                    style={{ fill: '#a6bcd4', fillRule: 'evenodd' }}
                    d="M590.74,211,384,184,295.37,0,206.76,184,0,211,151.9,348.54l-39.24,200,182.71-98.32,182.71,98.32-39.24-200Z"
                  />
                  <path
                    id="head"
                    style={{ fill: '#24292e' }}
                    d="M428.87,231.62c13-30-3-69-3-69-26-4-72,27-72,27a205.56,205.56,0,0,0-117,0s-46-31-72-27c0,0-16,39-3,69,0,0-28,32-26,72s13.29,90,64.5,109.5c50,19,75,15,95,15s45,4,95-15c51.21-19.46,62.5-69.5,64.5-109.5S428.87,231.62,428.87,231.62Z"
                  />
                  <g id="mirror">
                    <g id="whiskers">
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#24292e',
                          strokeMiterlimit: 10,
                          strokeWidth: '3px'
                        }}
                        d="M409.93,358.22s69.82-16.71,125.68-14.73"
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#24292e',
                          strokeMiterlimit: 10,
                          strokeWidth: '3px'
                        }}
                        d="M408.66,373s60.49-4.25,116.61,24.23"
                      />
                    </g>
                    <g id="eye">
                      <path
                        style={{ fill: '#fff' }}
                        d="M360.37,306.12c13,1,23.93,16.38,23,40-.92,23.38-14,33-25,33-14,0-25-14-25-36S346.41,305.05,360.37,306.12Z"
                      />
                    </g>
                    <g id="whiskers-2" data-name="whiskers">
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#24292e',
                          strokeMiterlimit: 10,
                          strokeWidth: '3px'
                        }}
                        d="M180.82,358.22S111,341.51,55.13,343.49"
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#24292e',
                          strokeMiterlimit: 10,
                          strokeWidth: '3px'
                        }}
                        d="M182.08,373s-60.49-4.25-116.61,24.23"
                      />
                    </g>
                    <g id="eye-2" data-name="eye">
                      <path
                        style={{ fill: '#fff' }}
                        d="M230.37,306.12c-13,1-23.93,16.38-23,40,.92,23.38,14,33,25,33,14,0,25-14,25-36S244.33,305.05,230.37,306.12Z"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </Logo>
          <h1>StarDaddy</h1>
        </Header>

        <Content>{children}</Content>
      </Inner>
    </Wrapper>
  ) : null
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;

  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.26));
  background-color: rgba(0, 0, 0, 0.2);
`
const Inner = styled.div`
  width: 610px;
`
const Header = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 16px 16px 0 0;
  background-color: white;
  font-family: ${({ theme }) => theme.font.brand}, sans-serif;
  text-align: center;

  > h1 {
    margin: 0;
    line-height: 30px;
    font-size: 30px;
    font-weight: normal;
    color: ${({ theme }) => theme.color.dark};
  }
  > h4 {
    margin: 0;
    font-size: 14px;
    font-style: italic;
    font-weight: normal;
  }
`
const Logo = styled.svg`
  display: block;
  margin: 0 auto 0 auto;
  padding-top: 8px;
  width: 70px;
  height: 70px;
`
const Content = styled.div`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 30px;
  border-radius: 0 0 16px 16px;
  background-color: ${({ theme }) => theme.color.dark};
  color: white;
  margin-bottom: 24px;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary};
  }

  > p {
    margin-top: 0;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`

export default Modal
