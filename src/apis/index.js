import axios from 'axios'
import { API_ROOT } from '~/utils/constant'

/** Board */
export const fetchBoardDetailsAPI = async(boardID) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardID}`)
  return request.data
}

/** Columns */
export const createNewColumAPI = async(newColumData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumData)
  return response.data
}

/** Cards */
export const createNewCardAPI = async(newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}