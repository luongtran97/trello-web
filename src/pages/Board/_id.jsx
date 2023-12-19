// board detail
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/moc-data'
import { fetchBoardDetailsAPI } from '~/apis'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '657c1fc9dee7899f983d6437'
    fetchBoardDetailsAPI(boardId).then(( res ) => {
      setBoard(res)
    })
  }, [])
  return (
    <Container maxWidth={false} disableGutters sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent board={board}/>
    </Container>
  )
}

export default Board
