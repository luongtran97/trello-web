import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <CssBaseline/>
      <App />
      <ToastContainer theme='colored' position='bottom-left'/>
    </CssVarsProvider>
  </>
)
