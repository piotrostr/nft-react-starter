/** @jsxImportSource theme-ui */
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther, parseEther } from '@ethersproject/units'
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media'
import Toast, {
  displayErrorToast,
  displaySuccessToast,
} from 'components/Toast'
import { useChainId, useIsActive, useProvider } from 'connectors/metamask'
import { useEffect, useState } from 'react'
import { Box, Heading } from 'theme-ui'

import { CHAIN_ID } from '../constants'
import { useContract } from '../hooks/useContract'
import { CenteredColumn } from './Flex'
import MintButton from './MintButton'

const MintingWindow = () => {
  // TODO use a typechain artifact to get typings
  const contract = useContract()
  const provider = useProvider()
  const isActive = useIsActive()

  const [quantity, setQuantity] = useState<number>(5)
  const [balance, setBalance] = useState<BigNumber>()
  const [weiRequired, setWeiRequired] = useState<BigNumber>()
  const [ethRequired, setEthRequired] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const chainId = useChainId()
  const index = useBreakpointIndex()

  useEffect(() => {
    if (quantity) {
      const price = BigNumber.from(parseEther('0.024'))
      const weiRequired = price.mul(quantity)
      const ethRequired = formatEther(weiRequired)
      setWeiRequired(weiRequired)
      setEthRequired(ethRequired)
    }
  }, [quantity])

  useEffect(() => {
    const getBalance = async () => {
      if (isActive && provider && contract.signer && chainId === 4) {
        const signerAddress = await contract.signer.getAddress()
        setBalance(await provider.getBalance(signerAddress))
      }
    }
    getBalance()
  }, [isActive, contract, provider, chainId])

  const mint = async () => {
    if (chainId && chainId !== CHAIN_ID) {
      displayErrorToast('Invalid network!', 'colored')
      return
    }
    if (contract.signer && weiRequired && balance) {
      const signerAddress = await contract.signer.getAddress()
      try {
        if (weiRequired.gt(balance)) {
          throw Error('Insufficient balance!')
        }
        setIsLoading(true)
        const tx = await contract.mint(signerAddress, quantity, {
          value: weiRequired,
        })
        await tx.wait()
        setIsLoading(false)
        displaySuccessToast(tx.hash, 'colored')
      } catch (err) {
        setIsLoading(false)
        if (err?.message) {
          displayErrorToast(err.message, 'colored')
        } else {
          displayErrorToast(err, 'colored')
        }
      }
    }
  }

  const fontSize = useResponsiveValue([2, 2, 2, 6])

  return (
    <>
      <CenteredColumn>
        {index > 2 && (
          <div sx={{ mt: 4, mb: 2 }}>
            <MainLogo />
          </div>
        )}
        <Heading
          sx={{
            color: 'black',
            mt: index > 2 ? 4 : 1,
            textAlign: 'center',
            fontSize,
          }}
        >
          General Sale
        </Heading>
        {isActive ? (
          <>
            <Box sx={{ my: index > 2 ? 4 : 0 }}>
              <Slider
                quantity={quantity}
                setQuantity={setQuantity}
                isLoading={isLoading}
              />
            </Box>
            {index > 2 && (
              <Box>
                <MintButton
                  ethRequired={ethRequired}
                  onClick={mint}
                  isLoading={isLoading}
                  small={false}
                />
              </Box>
            )}
          </>
        ) : (
          <Heading sx={{ fontSize, color: 'black', textAlign: 'center' }}>
            Connect wallet to get started
          </Heading>
        )}
        <Toast />
      </CenteredColumn>
      {index < 3 && isActive && (
        <Box sx={{ mt: 4 }}>
          <MintButton
            ethRequired={ethRequired}
            onClick={mint}
            isLoading={isLoading}
            small
          />
        </Box>
      )}
    </>
  )
}

export default MintingWindow
