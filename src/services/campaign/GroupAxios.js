import {AdminAxios} from "../../common/Axios";

const ACTION_URL ='/adver/campaign'
const MEDIA_CATEGORY ='/list'
const MEDIA_SEARCH ='/media/inventory/by'
const MEDIA_SEARCH_ARRAY ='/media/inventory/array'
const CONFIG_INVENTORY ='/config/inventory'
const GROUP_INFO ='/inventory'

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

export async function selSearchMediaList(inventoryIds) {
  let returnVal = null;
  if(inventoryIds.inventoryIds === undefined) return null;
  await AdminAxios('POST', MEDIA_SEARCH_ARRAY, inventoryIds)
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
  let params = {
    ...campaignGroupInfo,
    exposureAttentionUserYn: campaignGroupInfo.exposureAttentionUserYn ? 'Y' : 'N',
    exposureConversionAudienceYn: campaignGroupInfo.exposureConversionAudienceYn ? 'Y' : 'N',
    exposureConversionUserYn: campaignGroupInfo.exposureConversionUserYn ? 'Y' : 'N',
    exposureNewAudienceYn: campaignGroupInfo.exposureNewAudienceYn ? 'Y' : 'N',
    exposurePotentialAudienceYn: campaignGroupInfo.exposurePotentialAudienceYn ? 'Y' : 'N',
    exposureShoppingAudienceYn: campaignGroupInfo.exposureShoppingAudienceYn ? 'Y' : 'N',
    exposureShoppingUserYn: campaignGroupInfo.exposureShoppingUserYn ? 'Y' : 'N',
    exposureVisitUserYn: campaignGroupInfo.exposureVisitUserYn ? 'Y' : 'N'
  }

  await AdminAxios('PUT', ACTION_URL+'/'+ campaignGroupInfo.campaignId +CONFIG_INVENTORY ,params)
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
export async function selGroupInfo(campaignId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+campaignId+GROUP_INFO)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

