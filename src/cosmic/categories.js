import { cosmic } from './config'

export const getCategories = async () => {
  const categories = await cosmic.objects
    .find({ type: 'categories' })
    .props('slug,title,metadata,thumbnail')
    .depth(1)
  return categories.objects
}
