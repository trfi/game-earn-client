import { atom } from 'recoil'

export const winDialogState = atom({
  key: 'winDialogState',
  default: false
})

export const walletTypeState = atom({
  key: 'walletTypeState',
  default: 'live'
})
