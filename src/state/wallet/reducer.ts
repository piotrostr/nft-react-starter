import { createSlice } from '@reduxjs/toolkit'

export interface WalletState {
  readonly chainId: number | null
}

const initialState: WalletState = {
  chainId: null,
}

const applicationSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateChainId(state, action) {
      const { chainId } = action.payload
      state.chainId = chainId
    },
  },
})

export const { updateChainId } = applicationSlice.actions
export default applicationSlice.reducer
