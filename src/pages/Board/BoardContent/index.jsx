import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <div>
      <Box sx={{
        bgcolor:(theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        width:'100%', display:'flex',
        alignItems:'center',
        height:(theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight} )`
      }}>
      Board Content
      </Box>
    </div>
  )
}

export default BoardContent
