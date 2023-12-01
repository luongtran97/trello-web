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
import { cloneDeep } from 'lodash'

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

  // Tìm một column cardId
  const findColumnByCardId= ( cardId ) => {
    return orderedColumns.find(column => column?.cards?.map( card => card._id )?.includes(cardId))
  }

  // xử lý khi kết thúc kéo 1 phần tử (thả - drop)
  const handelDragEnd = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.CARD) return

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

  // xử lý hành động trong quá trình kéo 1 phần tử
  const handelDragOver = (event) => {

    // trong hàm này chỉ xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.COLUMN) return

    // nếu kéo thả card thi xử lý tiếp ( active là nơi bắt đầu kéo, over là nơi kết thúc thả )
    const { active, over } = event
    // nếu như không tồn tại active thì return (khi kéo card ra ngoài khỏi phạm vi container ) thì không làm gì cả tránh tình trạng crash web
    if (!over || !active) return

    // activeDraggingCard: là card đang được kéo
    const { id:activeDraggingCardId, data:{ current:activeDraggingCardData } } = active
    // overCard là card đang được tương tác phía trên hoặc phía dưới
    const { id:overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)

    const overColumn = findColumnByCardId(overCardId)

    // nếu không tồn tại 1 trong 2 column thì không làm gì, tránh tình trạng crash trang
    if (!activeColumn || !overColumn) return

    // xử lý logic ở đây chỉ khi 2 colum khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // vì đây đang là đoạn xử lý kéo (handelDragOver), còn xử lý kéo xong thì nó lại là vấn để ở handelDragEnd
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // Tìm vị trí index của cái overCard trong column đích (nơi card sắp dược thả)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // logic tính toán "card index mới" (trên hoặc dưới overcard) lấy chuẩn ra từ code của thư viện
        let newCardIndex

        const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top >
        over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length +1

        // Clone mảng orderedColumnsState cũ ra một mảng mới để xứ lý data rồi > return - cập nhật lại orderedColumnsState mới
        const nextColumns = cloneDeep(prevColumns)

        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)

        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        // colum cũ
        if (nextActiveColumn) {
          // xóa card ở column active (có thể hiêu là column cũ , lúc kéo sang column mới cần xóa nó đi)
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // cập nhật lại mảng cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
        }

        //colum mới
        if (nextOverColumn) {
          // kiểm tra xem card đang kéo có tồn tại ở trong overColumn chưa, nếu có thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          
          // tiếp theo thêm cái card đang kéo vào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          
          // cập nhật lại mảng cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
          console.log('🚀 ~ nextOverColumn:', nextOverColumn)
        }

        return nextColumns
      })
    }
  }
  return (
    <DndContext
      onDragStart={handelDragStart}
      onDragOver={handelDragOver}
      onDragEnd={handelDragEnd}
      sensors={sensor}>
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
