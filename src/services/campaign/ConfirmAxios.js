import {AdminAxios, AdverAxios} from "../../common/Axios";

const ACTION_URL ='/adver/campaign/'
const CONFIRM ='/confirm'
export async function retrieveConfirm(campaignId) {
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
export async function retrieveAdverConfirm(campaignId) {
  let returnVal = null;
  await AdverAxios('GET', ACTION_URL+campaignId+CONFIRM)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
