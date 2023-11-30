import Box from '@mui/material/Box'
import TrelloCard from './Card/TrelloCard'


function ListCards({ cards }) {
  return (
    <div>
      <Box sx={{
        p:'0 5px',
        m:'0 5px',
        display:'flex',
        flexDirection:'column',
        gap:1,
        overflowX:'hidden',
        overflowY:'auto',
        maxHeight:(theme) => `calc(
          ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnFooterHeigth} - ${theme.trello.columnHeaderHeight}
          )`,
        '&::-webkit-scrollbar-thumb':{
          background:'#ced0da'
        },
        '&::-webkit-scrollbar-thumb:hover':{
          background: '#bfc2cf'
        }
      }}>
        {cards?.map( card => (<TrelloCard card={card} key={card._id}/>))}
      </Box>
    </div>
  )
}

export default ListCards