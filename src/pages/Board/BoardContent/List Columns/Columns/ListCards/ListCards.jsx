import Box from '@mui/material/Box'
import TrelloCard from './Card/TrelloCard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px 5px 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(
          ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnFooterHeigth} - ${theme.trello.columnHeaderHeight}
          )`,
        '&::-webkit-scrollbar-thumb': {
          background: '#ced0da'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#bfc2cf'
        }
      }}>
        {cards?.map(card => (<TrelloCard card={card} key={card._id} />))}
      </Box>
    </SortableContext>
  )
}

export default ListCards