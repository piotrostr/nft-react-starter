import { configureStore } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'
import wallet from 'state/wallet/reducer'

const PERSISTED_KEYS: string[] = ['wallet']

const store = configureStore({
  reducer: {
    wallet,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS }),
})

export default store

export type AppDispatch = typeof store.dispatch
