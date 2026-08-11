const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export function formatPrice(price: number, currency: string = 'IDR'): string {
  if (currency !== 'IDR') {
    return `${currency} ${price.toLocaleString('en-US')}`
  }
  return idrFormatter.format(price)
}
