import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/pixel'
const ADVER_LIST ='/manage'
const EVENT ='/event'

/**
 * 광고주 리스트 픽셀 관리
 * @param keyword
 * @returns {Promise<null>}
 */
export async function selAdverPixelList(keyword) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + ADVER_LIST ,keyword)
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
export async function resistAdverPixelInfo(pixelInfo) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL,pixelInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===201){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function updatePixelInterlock(pixelId,interlockYn) {
  let returnVal = null;
  let params = {interlockYn : interlockYn ? 'Y': 'N'}
  await AdminAxios('PUT', ACTION_URL+'/'+pixelId+'/interlock',params)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function updateEventInterlock(eventId,interlockYn) {
  let returnVal = null;
  let params = {interlockYn : interlockYn ? 'Y': 'N'}
  await AdminAxios('PUT', ACTION_URL+EVENT+'/'+eventId+'/interlock',params)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function updatePixelInfo(pixelId,pixelInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+pixelId,pixelInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function selAdverPixelDetailList(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + ADVER_LIST +'/'+userId ,null)
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

export async function selPixelInfoList(pixelId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL +'/'+pixelId ,null)
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