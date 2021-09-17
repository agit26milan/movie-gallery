export const formatMoney = (value:number) => {
    if (value) {
      return value.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1.')
    }
    return 0
  }

  export const splitUrl = (url:string, defaultParam:object = {}) => {
    if (url) {
      const spli2 = url.split('&').join()
      const spli3 = spli2.split('?')
      const b = spli3.slice(1, spli3.length)
      const c = b[0].split(',')
      const d = c.map((x) => {
        const splitEqual = x.split('=')
        return { label: splitEqual[0], value: splitEqual[1] }
      })
      let queryValue = {}
      for (let i = 0; i < d.length; i++) {
        queryValue = { ...queryValue, [d[i].label]: d[i].value ? globalReplaceAll(d[i].value, '-', ',') : d[i].value }
      }
      return queryValue
    } else {
      return defaultParam
    }
  }

  export const globalReplaceAll = (str:string, find:string, replace:string) => {
    if (str && find && replace) {
      return str.split(find).join(replace)
    }
  }
