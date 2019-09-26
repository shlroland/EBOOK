import axios from 'axios'
import { setLocalForage } from '../utils/localforage'

export function download (book, onSuccess, onError, onProgress) {
  if (!onError) {
    onProgress = onError
  }
  return axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`).then(res => {
    const blob = new Blob([res.data])
    setLocalForage(book.fileName, blob, () => {
      if (onSuccess) onSuccess(book)
    }, err => {
      if (onError) onError(err)
    })
    //   .catch(err => {
    //   if (onError) onError(err)
    // })

  })
}

export function home () {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  })
}

export function shelf () {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
  })
}

export function detail (book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName,
    }
  })
}

export function list () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`
  })
}
