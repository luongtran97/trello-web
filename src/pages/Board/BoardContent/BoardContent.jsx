import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './List Columns/ListColumns'
import { mapOrder } from '~/utils/sort'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
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
  const [oldClumn, setOldColumn] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // điểm va chạm cuối cùng xử lý thuật toán phát hiện va chạm cuối cùng trước đó
  const lastOverId = useRef(null)
  //  cập nhật state trong trường hợp di chuyển Card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
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

        // đối với trường hợp dragEnd thì phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
        const rebuilt_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId:nextOverColumn._id
        }
        // tiếp theo thêm cái card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuilt_activeDraggingCardData)

        // cập nhật lại mảng cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)

      }

      return nextColumns
    })
  }
  // Tìm một column cardId
  const findColumnByCardId= ( cardId ) => {
    return orderedColumns.find(column => column?.cards?.map( card => card._id )?.includes(cardId))
  }
  // xử lý bắt đầu kéo - drag
  const handelDragStart = (event) => {
    // khi bắt đầu kéo set sữ liệu, sau khi kéo xong phải set về null
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_STYLE.CARD : ACTIVE_DRAG_ITEM_STYLE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    // nếu kéo card thì mới setOldCloumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id))
    }
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
      moveCardBetweenDifferentColumns(overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData)
    }
  }

  // xử lý khi kết thúc kéo 1 phần tử (thả - drop)
  const handelDragEnd = (event) => {

    const { active, over } = event
    //kiểm tra nếu không tồn tại over kéo linh tinh ra ngoài tránh lỗi
    if (!over || !active) return

    // xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.CARD) {

      // activeDraggingCard: là card đang được kéo
      const { id:activeDraggingCardId, data:{ current:activeDraggingCardData } } = active
      // overCard là card đang được tương tác phía trên hoặc phía dưới
      const { id:overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)

      const overColumn = findColumnByCardId(overCardId)
      // nếu không tồn tại 1 trong 2 column thì không làm gì, tránh tình trạng crash trang
      if (!activeColumn || !overColumn) return
      // hành động kéo thả card giữa 2 column khác nhau

      // phải dùng tới activeDragItemData (set vào state oldColumn ) không dùng activeData handelDragEnd bởi vì khi đi qua dragOver state đã bị cập nhật lại rồi
      if (oldClumn._id !== overColumn._id) {
        // xử lý kéo thả card khác column
        moveCardBetweenDifferentColumns(overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData)
      } else {
        // xử lý hành động kéo thả card trong cùng 1 column

        // lấy vị trí index cũ (từ thằng active)
        const oldCardIndex = oldClumn?.cards.findIndex(c => c._id === activeDragItemId )
        // lấy vị trí mới từ thằng over
        const newCardIndex = overColumn?.cards.findIndex(c => c._id === overCardId)
        // dùng arrayMove kéo card trong một cái column tương tự với logic kéo column trong boardContent
        const dndOrderedCards = arrayMove(oldClumn?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {

          // Clone mảng orderedColumnsState cũ ra một mảng mới để xứ lý data rồi > return - cập nhật lại orderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)

          // tìm tới column đang thực hiện kéo thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // cập nhập lại 2 giá trị mới là card và cardOrderIds trong cái targetColumn
          // biến constant trong js có thể ghi đè khi đi vào 1 cấp dữ liệu
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          // trả về giá trị state mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    // xử lý kéo thả column trong boradContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.COLUMN) {
      // nếu vị trí kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        // lấy vị trí index cũ (từ thằng active)
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id )
        // lấy vị trí mới từ thằng over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        // dùng array move của thằng dnd-kit để sắp xếp lại mảng columns ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // set state về null khi (kéo  ) thả xong
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumn(null)
  }

  //args = arguments = đối số tham số
  const collisionDetectionStrategy = useCallback(( args ) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_STYLE.COLUMN) {
      return closestCorners({ ...args })
    }
    // tìm các điểm va chạm với con trỏ
    const pointerIntersections = pointerWithin(args)

    // thuật toán phát hiện va chạm sẽ trả về 1 mảng
    const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)

    // tìm cái overId đầu tiên trong intersections bên trên
    let overId = getFirstCollision(intersections, 'id')
    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCenter({ ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
          })
        })[0]?.id
      }
      lastOverId.current = overId
      return [{ id:overId }]
    }
    // nếu overId là null thì trả về mảng rỗng - tránh crash trang
    return lastOverId.current ? [{ id:lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      onDragStart={handelDragStart}
      onDragOver={handelDragOver}
      onDragEnd={handelDragEnd}
      sensors={sensor}
      // sử dụng thuật toán collision detction algorithsm để phát hiện va chạm
      // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      // nếu dùng closesetCorners sẽ có bug flickering
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
    >
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
