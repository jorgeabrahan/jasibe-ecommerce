import { cosmic } from './config'

export const getProducts = async () => {
  const products = await cosmic.objects
    .find({ type: 'products' })
    .props('slug,title,metadata,id,published_at,thumbnail')
    .depth(1)
  return products.objects
}

export const getProductsByCategory = async (categorySlug) => {
  const products = await cosmic.objects
    .find({ type: 'products', 'metadata.categoria.slug': categorySlug })
    .props('slug,title,metadata,id,published_at,thumbnail')
    .depth(1)
  return products.objects
}

export const getMostRecentProducts = async (amount = 10) => {
  const products = await cosmic.objects
    .find({ type: 'products' })
    .limit(amount)
    .props('slug,title,metadata,id,published_at,thumbnail')
    .depth(1)
  return products.objects
}
