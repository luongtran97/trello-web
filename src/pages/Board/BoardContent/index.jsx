import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <Box sx={{
        bgcolor:(theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        width:'100%',
        display:'flex',
        height:(theme) => {
          return theme.trello.boardContentHeight
        },
        p:'10px 0'
      }}>
        <Box sx={{
          bgcolor:'inherit',
          width:'100%',
          height:'100%',
          overflowX:'auto',
          overflowY:'hidden',
          display:'flex',
          '&::-webkit-scrollbar-track':{
            m:2
          }
        }}>
          {/* box columns */}
          <Box sx={{
            minWidth:'300px',
            maxWidth:'300px',
            bgcolor:(theme) => ( theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
            ml:2,
            borderRadius:'6px',
            height:'fit-content',
            maxHeight:(theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
            {/* box column header */}
            <Box sx={{
              height:COLUMN_HEADER_HEIGHT,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Typography variant='h6' sx={{
                fontSize:'1rem',
                fontWeight:'bold',
                cursor:'pointer'
              }}>Column Title</Typography>
              <Box>
                <Tooltip title='More options'>
                  <ExpandMoreIcon sx={{
                    color:'text.primary',
                    cursor:'pointer'
                  }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="basic-menu-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Add New Card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                    <ListItemText>Archie this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            {/* box column content */}
            <Box sx={{
              p:'0 5px',
              m:'0 5px',
              display:'flex',
              flexDirection:'column',
              gap:1,
              overflowX:'hidden',
              overflowY:'auto',
              maxHeight:(theme) => `calc(
                ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_FOOTER_HEIGHT} - ${COLUMN_HEADER_HEIGHT}
                )`,
              '&::-webkit-scrollbar-thumb':{
                background:'#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover':{
                background: '#bfc2cf'
              }
            }}>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/404687869_122114215046102196_7928916660713104127_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=c42490&_nc_ohc=0xpQ5Q4sh6EAX-RFku5&_nc_ht=scontent.fsgn21-1.fna&oh=00_AfBgbN_4QK--ogh8ejlD6lU_Da_wLFTSnE_We3P52S7k5g&oe=656B6C0B"
                  title="green iguana"
                />
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    LuongTranDev
                  </Typography>
                </CardContent>
                <CardActions sx={{ p:'0px 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                  <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
                </CardActions>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
            </Box>


            {/* box column footer */}
            <Box sx={{
              height:COLUMN_FOOTER_HEIGHT,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Button startIcon={<AddCardIcon/>}>Add new card</Button>
              <Tooltip title='Drag to nmove'>
                <DragHandleIcon sx={{
                  cursor:'pointer'
                }}/>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{
            minWidth:'300px',
            maxWidth:'300px',
            bgcolor:(theme) => ( theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
            ml:2,
            borderRadius:'6px',
            height:'fit-content',
            maxHeight:(theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
            {/* box column header */}
            <Box sx={{
              height:COLUMN_HEADER_HEIGHT,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Typography variant='h6' sx={{
                fontSize:'1rem',
                fontWeight:'bold',
                cursor:'pointer'
              }}>Column Title</Typography>
              <Box>
                <Tooltip title='More options'>
                  <ExpandMoreIcon sx={{
                    color:'text.primary',
                    cursor:'pointer'
                  }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="basic-menu-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Add New Card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                    <ListItemText>Archie this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            {/* box column content */}
            <Box sx={{
              p:'0 5px',
              m:'0 5px',
              display:'flex',
              flexDirection:'column',
              gap:1,
              overflowX:'hidden',
              overflowY:'auto',
              maxHeight:(theme) => `calc(
                ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_FOOTER_HEIGHT} - ${COLUMN_HEADER_HEIGHT}
                )`,
              '&::-webkit-scrollbar-thumb':{
                background:'#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover':{
                background: '#bfc2cf'
              }
            }}>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/404687869_122114215046102196_7928916660713104127_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=c42490&_nc_ohc=0xpQ5Q4sh6EAX-RFku5&_nc_ht=scontent.fsgn21-1.fna&oh=00_AfBgbN_4QK--ogh8ejlD6lU_Da_wLFTSnE_We3P52S7k5g&oe=656B6C0B"
                  title="green iguana"
                />
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    LuongTranDev
                  </Typography>
                </CardContent>
                <CardActions sx={{ p:'0px 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                  <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
                </CardActions>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            
            {/* box column footer */}
            <Box sx={{
              height:COLUMN_FOOTER_HEIGHT,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Button startIcon={<AddCardIcon/>}>Add new card</Button>
              <Tooltip title='Drag to nmove'>
                <DragHandleIcon sx={{
                  cursor:'pointer'
                }}/>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{
            minWidth:'300px',
            maxWidth:'300px',
            bgcolor:(theme) => ( theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
            ml:2,
            borderRadius:'6px',
            height:'fit-content',
            maxHeight:(theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
            {/* box column header */}
            <Box sx={{
              height:COLUMN_HEADER_HEIGHT,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Typography variant='h6' sx={{
                fontSize:'1rem',
                fontWeight:'bold',
                cursor:'pointer'
              }}>Column Title</Typography>
              <Box>
                <Tooltip title='More options'>
                  <ExpandMoreIcon sx={{
                    color:'text.primary',
                    cursor:'pointer'
                  }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="basic-menu-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Add New Card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                    <ListItemText>Archie this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            {/* box column content */}
            <Box sx={{
              p:'0 5px',
              m:'0 5px',
              display:'flex',
              flexDirection:'column',
              gap:1,
              overflowX:'hidden',
              overflowY:'auto',
              maxHeight:(theme) => `calc(
                ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_FOOTER_HEIGHT} - ${COLUMN_HEADER_HEIGHT}
                )`,
              '&::-webkit-scrollbar-thumb':{
                background:'#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover':{
                background: '#bfc2cf'
              }
            }}>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/404687869_122114215046102196_7928916660713104127_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=c42490&_nc_ohc=0xpQ5Q4sh6EAX-RFku5&_nc_ht=scontent.fsgn21-1.fna&oh=00_AfBgbN_4QK--ogh8ejlD6lU_Da_wLFTSnE_We3P52S7k5g&oe=656B6C0B"
                  title="green iguana"
                />
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    LuongTranDev
                  </Typography>
                </CardContent>
                <CardActions sx={{ p:'0px 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                  <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
                </CardActions>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor:'pointer',
                boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
                overflow:'unset'
              }}>
                <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                  <Typography>
                    Card 01
                  </Typography>
                </CardContent>
              </Card>
            </Box>


            {/* box column footer */}
            <Box sx={{
              height:COLUMN_FOOTER_HEIGHT,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Button startIcon={<AddCardIcon/>}>Add new card</Button>
              <Tooltip title='Drag to nmove'>
                <DragHandleIcon sx={{
                  cursor:'pointer'
                }}/>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>

    </div>
  )
}

export default BoardContent
