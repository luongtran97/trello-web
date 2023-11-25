// board detail
import Container from '@mui/material/Container'
import AppBar from '../../components/NavBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'


function Board() {
  return (
    <Container maxWidth={false} disableGutters sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar/>
      <BoardContent/>
    </Container>
  )
}

export default Board
