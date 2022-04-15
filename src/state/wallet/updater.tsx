import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import useDebounce from 'hooks/useDebounce'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateChainId } from 'state/wallet/reducer'

function supportedChainId(chainId: number): boolean {
  if (chainId === 1) {
    return true
  }
  return false
}

export default function WalletUpdater(): null {
  const { chainId, library } = useWeb3React<Web3Provider>()
  const windowVisible = useIsWindowVisible()
  const dispatch = useDispatch()

  const [activeChainId, setActiveChainId] = useState(chainId)

  useEffect(() => {
    if (library && chainId && windowVisible) {
      setActiveChainId(chainId)
    }
  }, [dispatch, chainId, library, windowVisible])

  const debouncedChainId = useDebounce(activeChainId, 100)

  useEffect(() => {
    const chainId = debouncedChainId ? supportedChainId(debouncedChainId) ?? null : null
    dispatch(updateChainId({ chainId }))
  }, [dispatch, debouncedChainId])

  return null
}
