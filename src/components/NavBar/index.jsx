import ModeSelect from '~/components/ModeSelect'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloAppIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from '~/components/AppBar/Menus/WorkSpaces'
import Recent from '~/components/AppBar/Menus/Recent'
import Starred from '~/components/AppBar/Menus/Starred'
import Templates from '~/components/AppBar/Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from '~/components/AppBar/Menus/Profile'
function AppBar() {
  return (
    <div>
      <Box px={2} sx={{
        width:'100%',
        display:'flex',
        height:(theme) => theme.trello.appBarHeight,
        alignItems:'center',
        justifyContent:'space-between' }}>
        <Box sx={{
          display:'flex', alignItems:'center', gap:1
        }}>
          <AppsIcon sx={{
            color:'primary.main'
          }}/>
          <Box sx={{
            display:'flex', alignItems:'center', gap:0.5
          }}>
            <SvgIcon sx={{
              color:'primary.main'
            }} component={TrelloAppIcon} inheritViewBox />
            <Typography variant='span' sx={{ fontSize:'1.2rem', fontWeight:'bold', color:'primary.main' }}>Trello</Typography>
          </Box>
          {/* dropdown menu */}
          <WorkSpaces/>
          <Recent/>
          <Starred/>
          <Templates/>

          <Button variant="outlined">Create</Button>
          <Box >
          </Box>
        </Box>

        <Box sx={{ display:'flex', alignItems:'center', gap:1, cursor:'pointer' }}>
          <TextField id="outlined-search" label="Search ..." size='small' type="search" />
          <ModeSelect/>
          <Tooltip title='Notification'>
            <Badge color="secondary" variant="dot" >
              <NotificationsNoneIcon sx={{ color:'primary.main' }}/>
            </Badge>
          </Tooltip>
          <Tooltip title='help'>
            <HelpOutlineIcon sx={{ cursor:'pointer', color:'primary.main' }}/>
          </Tooltip>
          <Profiles/>
        </Box>
      </Box>
    </div>
  )
}

export default AppBar
