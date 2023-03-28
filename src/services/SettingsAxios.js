import {AdminAxios} from "../common/Axios";

const ACTION_URL = '/system/setting'
const PRICE_EVENT = '/price'
const BUDGET_EVENT = '/budget'
const PRICE_LIST= '/price/list'
const BUDGET_LIST= '/budget/list'


export async function selPriceEventList(username) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + PRICE_EVENT +'/'+username)
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

export async function selBudgetEventList(username) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + BUDGET_EVENT +'/'+username)
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

export async function selAdverPriceEventList(keyword) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + PRICE_LIST ,keyword)
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

export async function selAdverBudgetEventList(keyword) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + BUDGET_LIST ,keyword)
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




