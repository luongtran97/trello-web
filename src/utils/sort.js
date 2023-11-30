// sort colunms and carts
export const mapOrder = (originalArray, orderArray, key) => {
  if (!orderArray || !originalArray || !key) return []
  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
}