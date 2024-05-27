import { Provider } from 'react-redux'
import reduxStore from "../redux/store"
import '../styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
