import axios from 'axios'

const API_URL = process.env.REACT_APP_BACKEND_URL

const getLastBlocks = (page = 1, offset = 10) => {
  return axios.get(`${API_URL}/blocks`, {
    params: {page, offset}
  })
}

const getBlockInformation = (blockNumber) => {
  return axios.get(`${API_URL}/blocks/${blockNumber}`)
}

const getTransactionInfo = (transactionHash) => {
  return axios.get(`${API_URL}/transactions/${transactionHash}`)
}

const getTransactionsHistoryByAddress = (address, page = 1, offset = 10) => {
  return axios.get(`${API_URL}/transactions/address/${address}`, {
    params: {page, offset}
  })
}

export {
  getLastBlocks,
  getBlockInformation,
  getTransactionInfo,
  getTransactionsHistoryByAddress
}
