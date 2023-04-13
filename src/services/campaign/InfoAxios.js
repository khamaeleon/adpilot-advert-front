import {AdminAxios} from "../../common/Axios";

const ACTION_URL ='/adver/campaign'
const ENUM_LIST ='list'
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

