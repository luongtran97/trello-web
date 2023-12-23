// board detail
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/moc-data'
import { fetchBoardDetailsAPI } from '~/apis'
import { mapOrder } from '~/utils/sort'
import CircularProgress from '@mui/material/CircularProgress'
import {
  createNewColumAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'
import { generatePlaceHolderCard } from '~/utils/formatters'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6580f73fea92d11a4fd72e72'
    fetchBoardDetailsAPI(boardId).then( board => {
      // sắp xếp thứ tự các column trước khi đem xuống các props con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      //cần xử lý vấn đề kéo thả vào một column rỗng
      board.columns.forEach(((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
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

  // gọi API và xử lý khi kéo thả Column
  const handelMoveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumnsIds
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    updateBoardDetailsAPI(board._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
    // setBoard(newBoard)

  }

  // gọi api xử lý move card trong cùng column
  const handelMoveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //update chuẩn state board
    const newBoard = { ...board }
    const columnTuUpdate = newBoard.columns.find(column => column._id === columnId )
    if (columnTuUpdate) {
      columnTuUpdate.cards = dndOrderedCards
      columnTuUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    // gọi api update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  // gọi api xử lý move card khác column
  /**
   * khi di chuyển card sang column khác
   * B1: cập nhật mảng cardOrderIds của column ban đầu chứa nó ( xóa _id của card hiện tại ra khỏi column chứa nó )
   * B2: cập nhật lại mảng cardOrderIds của column được chuyển đén ( thêm _id card đang di chuyển vào mảng card được kéo đến)
   * B3: cập nhật lại trường columnId mới của cái card đã kéo
   * => làm API hỗ trợ riêng
   */
  const handelMoveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumnsIds
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    // gọi API xử lý backend
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if ( !board ) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'pink',
        gap:2,
        width:'100vw',
        height:'100vh'
      }}>
        <CircularProgress />
        <Typography>Loading Board... </Typography>
      </Box>
    )
  }
  return (
    <Container maxWidth={false} disableGutters sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent
        board={board}
        handelAddNewColumn={handelAddNewColumn}
        handelcreateNewCard={handelcreateNewCard}
        handelMoveColumn={handelMoveColumn}
        handelMoveCardInTheSameColumn={handelMoveCardInTheSameColumn}
        handelMoveCardToDifferentColumn= {handelMoveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board