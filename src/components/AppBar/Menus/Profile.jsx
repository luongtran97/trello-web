import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import PersonAdd from '@mui/icons-material/PersonAdd'
import ListItemIcon from '@mui/material/ListItemIcon'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'

function Profiles() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }


  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          size="small"
          onClick={handleClick}
          sx={{ padding:0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 36, height: 36 }}
            src='https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/283373885_1887558088104590_4004774488592908700_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TOzU88zqEdsAX9hetLT&_nc_ht=scontent.fsgn21-1.fna&oh=00_AfB2nLt8P3239eTRw0vRUw7iCD4xMnb6uP_gb1-g9GI_WA&oe=65699D01'>
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <MenuItem >
          <Avatar sx={{ width:32, height:30, mr:2 }}/> Profile
        </MenuItem>
        <MenuItem >
          <Avatar sx={{ width:32, height:30, mr:2 }}/> My account
        </MenuItem>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles