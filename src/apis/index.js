import axios from 'axios'
import { API_ROOT } from '~/utils/constant'

/** Board */
export const fetchBoardDetailsAPI = async(boardID) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardID}`)
  return response.data
}
export const updateBoardDetailsAPI = async(boardID, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardID}`, updateData)
  return response.data
}
export const moveCardToDifferentColumnAPI = async( updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}
/** Columns */
export const createNewColumAPI = async(newColumData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumData)
  return response.data
}
export const updateColumnDetailsAPI = async(columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnDetailsAPI = async(columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}
/** Cards */
export const createNewCardAPI = async(newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
