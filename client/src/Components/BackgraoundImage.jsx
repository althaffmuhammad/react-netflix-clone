import React from 'react'
import backgraound from '../assets/background_banner.jpg'
import styled from 'styled-components'

const BackgraoundImage = () => {
  return (
    <Container >
        <img src={backgraound} alt="backgraound" />
    </Container>
  )
}

export default BackgraoundImage

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
  }
`;