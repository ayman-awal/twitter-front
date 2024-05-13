import { Provider } from 'react-redux'
import reduxStore from "../redux/store"
import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
