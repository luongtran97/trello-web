export const upperCaseString = (str) => {
  if (!str) return ''
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export const generatePlaceHolderCard = (column) => {
  return {
    _id:`${column._id}-placeholder-card`,
    boardId:column.boardId,
    columnId:column._id,
    Fe_PlaceholderCard:true
  }
}