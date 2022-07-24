import { atom } from 'recoil'

export const modalAuthState = atom({
  key: 'modalAuthState',
  default: false
})

export const formErrorState = atom({
  key: 'formErrorState',
  default: []
})
