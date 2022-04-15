/** @jsxImportSource theme-ui */
import styled from '@emotion/styled'
import { useBreakpointIndex } from '@theme-ui/match-media'
import { Flex } from 'theme-ui'

import Wallet from './Wallet'

const HeaderContainer = styled.header``

const Separator = styled.div``

const Header = () => {
  const index = useBreakpointIndex()
  return (
    <HeaderContainer sx={{ p: 4, display: 'flex', flexDirection: 'row' }}>
      <Separator sx={{ mx: 'auto' }} />
      <Flex sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Wallet />
      </Flex>
      {index}
    </HeaderContainer>
  )
}

export default Header
