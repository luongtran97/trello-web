
import Box from '@mui/material/Box'
import ListColumns from './List Columns/ListColumns'


function BoardContent() {

  return (
    <div>
      <Box sx={{
        bgcolor:(theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        width:'100%',
        display:'flex',
        overflowX:'auto',
        height:(theme) => {
          return theme.trello.boardContentHeight
        },
        p:'10px 0'
      }}>
        <ListColumns/>
      </Box>

    </div>
  )
}

export default BoardContent
