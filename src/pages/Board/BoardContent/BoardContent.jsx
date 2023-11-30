import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './List Columns/ListColumns'
import { mapOrder } from '~/utils/sort'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance:10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance:10 } })

  // nhấn giữ 250s , và chênh lệch 5 px thì sẽ chạy hàm kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint:{ delay:250, tolerance: 150 } })

  // ưu tiên sử dụng mouse sensor và touch sensor để trải nhiệm trên mobile không bị bug
  const sensor = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
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
  }

  return (
    <DndContext onDragEnd={handelDragEnd} sensors={sensor}>
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
      </Box>

    </DndContext>
  )
}

export default BoardContent
