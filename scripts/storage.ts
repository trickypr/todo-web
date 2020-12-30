import defaultStorage from 'public/defaultStorage.json'

export const notPrerendering = () => typeof window !== 'undefined'

export const storageExists = () =>
  notPrerendering() ? localStorage.getItem('do.lists') != null : false

export const initStorage = () =>
  localStorage.setItem('do.lists', JSON.stringify(defaultStorage))

export const getStorage = (): List[] =>
  JSON.parse(localStorage.getItem('do.lists'))

export const setStorage = (data: List[]) =>
  localStorage.setItem('do.lists', JSON.stringify(data))

export const nextID = () => {
  let i = Number(localStorage.getItem('do.i')) || 3
  localStorage.setItem('do.i', String(i++))
  return i
}

export interface List {
  color: string
  name: string
  id: number
  items: Array<{
    id: number
    name: string
    done: boolean
  }>
}
