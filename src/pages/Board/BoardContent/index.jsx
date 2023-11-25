import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <div>
      <Box sx={{ backgroundColor:'primary.main', width:'100%', display:'flex',
        alignItems:'center', height:(theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight} )` }}>
      Board Content
      </Box>
    </div>
  )
}

export default BoardContent