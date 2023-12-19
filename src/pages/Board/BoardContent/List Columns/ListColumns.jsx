
import { useState } from 'react'
import Box from '@mui/material/Box'
import Cloumn from './Columns/Cloumn'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      console.error('please enter column title!')
      return
    }
    // gọi api

    //đóng trạng thái input & clear input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
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
        {columns?.map(column => (<Cloumn column={column} key={column._id}/>))}
        {/* box add new column */}
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth:'250px',
            maxWidth:'250px',
            mx:2,
            borderRadius:'6px',
            height:'fit-content',
            bgcolor:'#ffffff3d'
          }}>
            <Button
              startIcon={<NoteAddIcon/>}
              sx={{ color:'white',
                width:'100%',
                justifyContent:'flex-start',
                pl:2.5,
                py:1
              }}
            >
                Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth:'250px',
            maxWidth:'250px',
            mx:2,
            p:1,
            borderRadius:'6px',
            height:'fit-content',
            bgcolor:'#ffffff3d',
            display:'flex',
            flexDirection:'column',
            gap:1
          }}>
            <TextField
              label="Enter Column Title ..."
              size='small'
              type="text"
              variant='outlined'
              autoFocu
              value={newColumnTitle}
              onChange={(e) =>
                setNewColumnTitle(e.target.value)
              }
              sx={{
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
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <Button
                onClick={addNewColumn}
                variant='contained' color='success' size='small'
                sx={{
                  boxShadow:'none',
                  border:'0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >Add Column</Button>
              <CloseIcon
                fontSize='small'
                sx={{ color:'white', cursor:'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns