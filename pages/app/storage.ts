import defaultStorage from './defaultStorage'

export const notPrerendering = () => typeof window !== "undefined"

export const storageExists = () => notPrerendering() ? localStorage.getItem('do.lists') != null : false

export const initStorage = () => localStorage.setItem('do.lists', JSON.stringify(defaultStorage))

export const getStorage = () => JSON.parse(localStorage.getItem('do.lists'))

export const setStorage = data => localStorage.setItem('do.lists', JSON.stringify(data))
