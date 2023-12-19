import axios from 'axios'
import { API_ROOT } from '~/utils/constant'

export const fetchBoardDetailsAPI = async(boardID) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardID}`)
  return request.data
}