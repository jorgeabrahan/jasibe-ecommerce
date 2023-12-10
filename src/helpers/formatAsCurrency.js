const currencyFormater = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'HNL'
})
export const formatAsCurrency = (amount = 0) => currencyFormater.format(amount)
