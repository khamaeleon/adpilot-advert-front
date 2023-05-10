import {AdminAxios, AdverAxios} from "../../common/Axios";

const ACTION_URL ='/adver/campaign/'
const CONFIRM ='/confirm'
export async function retrieveConfirm(campaignId) { //어드민 캠페인 검토 조회
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+campaignId+CONFIRM)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function UpdateCampaignDefaultInfo(campaignId, name) { //어드민 캠페인명 수정
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+campaignId, name)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function retrieveAdverConfirm(campaignId) { //광고주 캠페인 검토 조회
  let returnVal = null;
  await AdverAxios('GET', '/campaign/'+campaignId+CONFIRM)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selAdverEnumInfo(enumInfo) {
  let returnVal = null;
  await AdverAxios('GET', '/campaign/'+enumInfo+'/'+'list')
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
