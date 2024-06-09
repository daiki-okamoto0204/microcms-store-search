import { client } from '@/lib/microcms'
import { Stores } from '@/app/stores/types'

const getStore = async (contentId: string) => {
  return await client.getListDetail<Stores>({
    endpoint: 'stores',
    contentId,
  })
}

export default getStore
