import {AdminAxios} from "../../common/Axios";

const ACTION_URL ='/adver/campaign'
const ENUM_LIST ='list'
const TEMPORARY_LIST='/temporaries'
export async function selEnumInfo(enumInfo) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+enumInfo+'/'+ENUM_LIST)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
export async function resistCampaignBasic(campaignInfo) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL ,campaignInfo)
    .then((response) => {
      const {responseCode,data} =response
      if(responseCode.statusCode ===201){
        returnVal = data
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selTemporaryList(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+TEMPORARY_LIST+'?userId='+ userId)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selBasicInfo(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+userId)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 임시 저장 캠페인 삭제
 * @param campaignId
 * @returns {Promise<false>}
 */
export async function deleteTemporary(campaignId) {
  let returnVal = null;
  await AdminAxios('DELETE', ACTION_URL+'/'+campaignId+'/temporary', null)
    .then((response) => {
      returnVal = response.responseCode.statusCode === 200 ? true : false;
    }).catch((e) => returnVal = false)
  return returnVal;
}
