import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function TrelloCard({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <Card sx={{
        cursor:'pointer',
        boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
        overflow:'unset'
      }}>
        <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
          <Typography>
            Card test
          </Typography>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card sx={{
      cursor:'pointer',
      boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
      overflow:'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/404687869_122114215046102196_7928916660713104127_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=c42490&_nc_ohc=0xpQ5Q4sh6EAX-RFku5&_nc_ht=scontent.fsgn21-1.fna&oh=00_AfBgbN_4QK--ogh8ejlD6lU_Da_wLFTSnE_We3P52S7k5g&oe=656B6C0B"
        title="green iguana"
      />
      <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
        <Typography>
          LuongTranDev
        </Typography>
      </CardContent>
      <CardActions sx={{ p:'0px 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon/>}>20</Button>
        <Button size="small" startIcon={<CommentIcon/>}>15</Button>
        <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard