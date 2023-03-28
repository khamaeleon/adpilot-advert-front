import {AdminAxios} from "../common/Axios";

const ACTION_URL = '/system/setting'
const PRICE_EVENT ='/price/test'

export async function selPriceEventList() {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+PRICE_EVENT)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
