
import Box from '@mui/material/Box'
import Cloumn from './Columns/Cloumn'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
function ListColumns() {


  return (
    <div>
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
        <Cloumn/>
        <Cloumn/>
        <Cloumn/>
        <Cloumn/>
        <Cloumn/>
        <Cloumn/>
        {/* box add new column */}
        <Box sx={{
          minWidth:'200px',
          maxWidth:'200px',
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
      </Box>
    </div>
  )
}

export default ListColumns