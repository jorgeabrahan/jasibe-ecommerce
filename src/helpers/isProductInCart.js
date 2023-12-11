export const isProductInArray = (productId, array) => {
    const item = array.find(item => item.id === productId)
    return item !== undefined
}
