// board detail
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/moc-data'
import { fetchBoardDetailsAPI } from '~/apis'
import { createNewColumAPI, createNewCardAPI } from '~/apis'
import { generatePlaceHolderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6580f73fea92d11a4fd72e72'
    fetchBoardDetailsAPI(boardId).then( board => {
      //cần xử lý vấn đề kéo thả vào một column rỗng
      board.columns.forEach(((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        }
      }))
      setBoard(board)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handelAddNewColumn = async(newColumnTitle) => {
    const newColumnData = {
      title:newColumnTitle,
      boardId:board._id
    }

    //cập nhật state board
    const createdNewColumn = await createNewColumAPI(newColumnData)
    //khi tạo 1 column mới chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng
    createdNewColumn.cards = [generatePlaceHolderCard(createdNewColumn)]
    createdNewColumn.cardOrderIds = [generatePlaceHolderCard(createdNewColumn)._id]
    const newBoard = { ...board }
    newBoard.columns.push(createdNewColumn)
    newBoard.columnOrderIds.push(createdNewColumn._id)
    setBoard(newBoard)
  }

  const handelcreateNewCard = async(newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId:board._id
    })
    const newBoard = { ...board }
    const columnTuUpdate = newBoard.columns.find(column => column._id === createdCard.columnId )
    if (columnTuUpdate) {
      columnTuUpdate.cards.push(createdCard)
      columnTuUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }
  return (
    <Container maxWidth={false} disableGutters sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent
        board={board}
        handelAddNewColumn={handelAddNewColumn}
        handelcreateNewCard={handelcreateNewCard}
      />
    </Container>
  )
}

export default Board
