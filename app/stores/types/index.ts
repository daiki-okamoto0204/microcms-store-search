import { MicroCMSContentId, MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk'

export type Prefectures = {
  name: string
  code: number
  lat: number
  lng: number
} & MicroCMSContentId &
  MicroCMSDate

export type Categories = {
  title: string
} & MicroCMSContentId &
  MicroCMSDate

export type Stores = {
  name: string
  tel: string
  prefecture: Prefectures
  address: string
  lat: number
  lng: number
  categories: Categories[]
  image?: MicroCMSImage
  content: string
} & MicroCMSContentId &
  MicroCMSDate