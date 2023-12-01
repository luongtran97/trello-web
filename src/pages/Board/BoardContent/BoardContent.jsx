import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './List Columns/ListColumns'
import { mapOrder } from '~/utils/sort'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Cloumn from './List Columns/Columns/Cloumn'
import TrelloCard from './List Columns/Columns/ListCards/Card/TrelloCard'

const ACTIVE_DRAG_ITEM_STYLE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_STYLE_COLUMN',
  CARD:'ACTIVE_DRAG_ITEM_STYLE_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance:10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance:10 } })

  // nhấn giữ 250s , và chênh lệch 5 px thì sẽ chạy hàm kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint:{ delay:250, tolerance: 150 } })

  // ưu tiên sử dụng mouse sensor và touch sensor để trải nhiệm trên mobile không bị bug
  const sensor = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // cùng 1 thời điểm chỉ có 1 item được kéo là card hoặc column
  const [activeDragItemId, setActiveDragItemId] = useState(null)


  const [activeDragItemType, setActiveDragItemType] = useState(null)


  const [activeDragItemData, setActiveDragItemData] = useState(null)


  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // xử lý khi kết thúc kéo 1 phần tử (thả - drop)
  const handelDragEnd = (event) => {
    const { active, over } = event
    //kiểm tra nếu không tồn tại over kéo linh tinh ra ngoài tránh lỗi
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id ) // lấy vị trí cũ từ thằng active
      const newIndex = orderedColumns.findIndex(c => c._id === over.id) // lấy vị trí mới từ thằng active
      // dùng array move của thằng dnd-kit để sắp xếp lại mảng columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      setOrderedColumns(dndOrderedColumns)
    }
    // set state về null khi (kéo  ) thả xong
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)

  }
  // xử lý bắt đầu kéo - drag
  const handelDragStart = (event) => {
    // khi bắt đầu kéo set sữ liệu, sau khi kéo xong phải set về null
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_STYLE.CARD : ACTIVE_DRAG_ITEM_STYLE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  return (
    <DndContext onDragEnd={handelDragEnd} onDragStart={handelDragStart} sensors={sensor}>
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
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={{
          duration: 500,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
          { !activeDragItemType && null }
          { activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.COLUMN && <Cloumn column={activeDragItemData}/>}
          { activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.CARD && <TrelloCard card={activeDragItemData}/>}
        </DragOverlay>
      </Box>

    </DndContext>
  )
}

export default BoardContent
