import { Contract } from '@ethersproject/contracts'
import { useProvider } from 'connectors/metamask'
import { SMPLVerse } from './abi'

import { CONTRACT_ADDRESS_RINKEBY } from '../constants'

export const useContract = () => {
  const provider = useProvider()

  if (provider) {
    return new Contract(
      CONTRACT_ADDRESS_RINKEBY,
      SMPLVerse.abi,
      provider?.getSigner() || provider || undefined
    )
  }
  return undefined
}
