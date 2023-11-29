import { useState } from 'react'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div>
      <Box px={2} sx={{
        width:'100%',
        display:'flex',
        height:(theme) => theme.trello.appBarHeight,
        alignItems:'center',
        justifyContent:'space-between',
        gap:2,
        overflowX:'auto',
        bgcolor:(theme) => (
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
        ),
        '&::-webkit-scrollbar-track':{
          m:2 }
      }}>
        <Box sx={{
          display:'flex', alignItems:'center', gap:1
        }}>
          <AppsIcon sx={{
            color: 'white'
          }}/>
          <Box sx={{
            display:'flex', alignItems:'center', gap:0.5
          }}>
            <SvgIcon sx={{
              color: 'white'
            }} component={TrelloAppIcon} inheritViewBox />
            <Typography variant='span' sx={{ fontSize:'1.2rem', fontWeight:'bold', color: 'white' }}>Trello</Typography>
          </Box>
          {/* dropdown menu */}
          <Box sx={{ display: { xs:'none', md:'flex' }, gap:1 }}>
            <WorkSpaces/>
            <Recent/>
            <Starred/>
            <Templates/>
            <Button sx={{
              color:'white',
              border:'none',
              '&:hover':{
                border:'none'
              }
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon/>}>
              Create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display:'flex', alignItems:'center', gap:1, cursor:'pointer' }}>
          <TextField id="outlined-search"
            label="Search ..."
            size='small'
            type="text"
            value={searchValue}
            onChange={(e) =>
              setSearchValue(e.target.value)
            }
            InputProps={{
              startAdornment:
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color:'white' }}/>
                </InputAdornment>,
              endAdornment:
                <ClearIcon onClick = { () => {
                  setSearchValue('')
                } } fontSize='small' sx={{ color: searchValue ? 'white' : 'transparent', cursor:'pointer' }}/>
            }}
            sx={{
              minWidth:120,
              maxWidth:170,
              '& label':{
                color:'white'
              },
              '& input':{
                color:'white'
              },
              '& label.Mui-focused':{
                color:'white'
              },
              '& .MuiOutlinedInput-root':{
                '& fieldset':{
                  borderColor:'white'
                },
                '&:hover fieldset':{
                  borderColor:'white'
                },
                '&.Mui-focused fieldset':{
                  borderColor:'white'
                }
              }
            }} />
          <ModeSelect/>
          <Tooltip title='Notification'>
            <Badge color="warning" variant="dot" >
              <NotificationsNoneIcon sx={{ color: 'white' }}/>
            </Badge>
          </Tooltip>
          <Tooltip title='help'>
            <HelpOutlineIcon sx={{ cursor:'pointer', color: 'white' }}/>
          </Tooltip>
          <Profiles/>
        </Box>
      </Box>
    </div>
  )
}

export default AppBar
