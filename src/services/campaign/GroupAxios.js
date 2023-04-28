import {AdminAxios} from "../../common/Axios";

const ACTION_URL ='/adver/campaign'
const MEDIA_CATEGORY ='/list'
const MEDIA_SEARCH ='/media/inventory/by'
const CONFIG_INVENTORY ='/config/inventory'

export async function selMediaCategoryInfo() {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/MEDIA_CATEGORY'+MEDIA_CATEGORY)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selSearchMediaInfo(keyword) {
  let returnVal = null;
  await AdminAxios('GET', MEDIA_SEARCH+'?keyword='+keyword)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function updateCampaignConfigInventory(campaignGroupInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+ campaignGroupInfo.campaignId +CONFIG_INVENTORY ,campaignGroupInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
