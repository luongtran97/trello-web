import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        dialogProps: { maxWidth:'xs' },
        confirmationButtonProps : { color:'success' },
        cancellationButtonProps : { color:'inherit' },
        confirmationText: 'Confirm',
        cancellationText: 'Cancel',
        allowClose:false
      }}>
        <CssBaseline/>
        <App />
        <ToastContainer theme='colored' position='bottom-left'/>
      </ConfirmProvider>
    </CssVarsProvider>
  </>
)
