import {AdminAxios} from "../../common/Axios";

const ACTION_URL ='/adver/campaign'
const MEDIA_CATEGORY ='/list'
const MEDIA_SEARCH ='/media/inventory/by'

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