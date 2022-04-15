import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import App from 'pages/App'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { getLibrary } from 'utils'

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <App />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root')
)
