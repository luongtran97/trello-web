import ModeSelect from '../../components/ModeSelect'
import Box from '@mui/material/Box'

function AppBar() {
  return (
    <div>
      <Box sx={{ backgroundColor:'primary.light',
        width:'100%',
        display:'flex',
        height:(theme) => theme.trello.appBarHeight,
        alignItems:'center' }}>
        <ModeSelect/>
      </Box>
    </div>
  )
}

export default AppBar