import {MediaAxios} from "../common/Axios";

const ACTION_URL = '/statistics';
const SLASH = '/'

const ALL = 'all'
const MEDIA = 'media'
const INVENTORY = 'inventory'
const AD_EXCHANGE = 'ad-exchange'

/* 기간별 통계 리스트 조회 */
export async function selectReportsStaticsAll(params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL+SLASH+ALL, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 매체별 통계 리스트 조회 */
export async function selectReportsStaticsMedia(params) {
  //post
  let returnVal = null;
  console.log(params)
  await MediaAxios('POST', ACTION_URL+SLASH+MEDIA, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택매체지면별통계리스트조회 */
export async function selectReportsStaticsInventoryByMedia(accountId,params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL+SLASH+MEDIA+SLASH+accountId+SLASH+INVENTORY, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택 매체(상세) 통계 리스트 조회 */
export async function selectReportsStaticsMediaDetail(userId,params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL+SLASH+MEDIA+SLASH+userId, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}


/* 매체별 지면 리스트 조회 */
export async function selectReportsStaticsInventory(params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL+SLASH+INVENTORY, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택 지면(상세) 통계 리스트 조회 */
export async function selectReportsStaticsInventoryDetail(accountId,params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL+SLASH+INVENTORY+SLASH+accountId, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 지면별연동사수신통계리스트조회 */
export async function selectReportsStaticsAdExchange(params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL+SLASH+AD_EXCHANGE, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}

/* 선택 지면(상세) 통계 리스트 조회 */
export async function selectReportsStaticsAdExchangeByInventory(inventoryId,params) {
  //post
  let returnVal = null;
  await MediaAxios('POST', ACTION_URL+SLASH+AD_EXCHANGE+SLASH+inventoryId, params)
    .then((response) => {
      if(response?.responseCode.statusCode === '200'){
        returnVal = response.data
      }
      returnVal = response.data
    }).catch((e) => returnVal = false)
  return returnVal;
}