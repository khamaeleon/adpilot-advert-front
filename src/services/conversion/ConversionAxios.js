import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/conversion'
const CONVERSION_LIST ='/list'
export async function selConversionList(searchParams) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + CONVERSION_LIST ,searchParams)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data.conversionList
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function selConversionDetailList(conversionId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + '/' +conversionId,null)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}