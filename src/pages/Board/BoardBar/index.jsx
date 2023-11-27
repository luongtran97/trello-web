import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

function BoardBar() {
  const MENU_STYLES = {
    color:'primary.main',
    background:'white',
    border:'none',
    padding:'5px',
    borderRadius:'4px',
    '& .MuiSvgIcon-root':{
      color:'primary.main'
    },
    '&:hover':{
      bgcolor:'primary.50'
    }
  }

  return (
    <div>
      <Box px={2} sx={{
        width:'100%',
        height:(theme) => theme.trello.boardBarHeight,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        overflowX:'auto',
        borderTop:'1px solid #00bfa5'
      }}>
        <Box sx={{
          display:'flex',
          alignItems:'center',
          gap:1
        }}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label="LuongTranDev"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<VpnLockIcon />}
            label="Public/Private Workspace"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<AddToDriveIcon />}
            label="Add To Drive"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<FilterListIcon />}
            label="Filter"
            clickable
          />
        </Box>

        <Box sx={{
          display:'flex',
          alignItems:'center',
          gap:1
        }}>
          <Button variant="outlined" startIcon={<PersonAddIcon/>}>Invite</Button>
          <AvatarGroup max={4} sx={{
            '& .MuiAvatar-root':{
              height:32,
              width:32,
              fontSize:16
            }
          }}>
            <Tooltip title='LuongTranDev'>
              <Avatar
                alt="LuongTranDev"
                src="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/283373885_1887558088104590_4004774488592908700_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TOzU88zqEdsAX9hetLT&_nc_ht=scontent.fsgn21-1.fna&oh=00_AfB2nLt8P3239eTRw0vRUw7iCD4xMnb6uP_gb1-g9GI_WA&oe=65699D01" />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </div>
  )
}

export default BoardBar
