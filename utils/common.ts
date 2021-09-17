export const formatMoney = (value:number) => {
    if (value) {
      return value.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1.')
    }
    return 0
  }