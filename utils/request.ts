import axios from 'axios'
let BASE_URL = process.env.baseUrl


export const requestApi = async (link:string = '', method:string ='', headers:any, body:any)  => {
    let url = BASE_URL
  if(link) {
    url += link 
  }

  let sendData:object = {
    method,
    url
  }
  if(headers) {
    Object.assign(sendData, {headers})
  }

  if(body) {
    Object.assign(sendData, {data:body})
  }
    try {
        const response = await axios(sendData)
        const data = response.data
        return data  
    } catch(e:any) {
      return e.response
    }
}