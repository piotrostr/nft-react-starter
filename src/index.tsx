import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import App from 'pages/App'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'state'
import WalletUpdater from 'state/wallet/updater'
import { getLibrary } from 'utils'

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <WalletUpdater />
          <App />
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
