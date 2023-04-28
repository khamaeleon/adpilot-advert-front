import {AdminAxios, AxiosImage} from "../../common/Axios";


const ACTION_URL ='/adver/campaign'
const IMAGE_UPDATE ='/banner/image'
const IMAGE_NATIVE='/native-banner/image'
const IMAGE_LOGO ='/image/logo'
const CREATE_BANNER ='/config/creative/banner'
const CREATE_NATIVE ='/config/creative/native'

export async function uploadBannerImages(data,bannerSize) {
  let returnVal = null;
  await AxiosImage('POST', ACTION_URL+IMAGE_UPDATE+'/'+bannerSize, data)
    .then(response =>response.json())
    .then(data => {
      if(data.responseCode.statusCode === 201){
        console.log(data)
        returnVal = data.data
      } else {
        returnVal = false
      }
    })
    .catch((e) => returnVal = false)
  return returnVal;
};
export async function uploadNativeImages(data) {
  let returnVal = null;
  await AxiosImage('POST', ACTION_URL + IMAGE_NATIVE, data)
    .then(response =>response.json())
    .then(data => {
      if(data.responseCode.statusCode === 201){
        console.log(data)
        returnVal = data.data
      } else {
        returnVal = false
      }
    })
    .catch((e) => returnVal = false)
  return returnVal;
};

export async function uploadLogoImages(data) {
  let returnVal = null;
  await AxiosImage('POST', ACTION_URL + IMAGE_LOGO, data)
    .then(response =>response.json())
    .then(data => {
      if(data.responseCode.statusCode === 201){
        console.log(data)
        returnVal = data.data
      } else {
        returnVal = false
      }
    })
    .catch((e) => returnVal = false)
  return returnVal;
};

export async function updateCampaignBanner(creativeInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+ creativeInfo.campaignId +CREATE_BANNER ,creativeInfo)
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

export async function updateCampaignNative(creativeInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+ creativeInfo.campaignId +CREATE_NATIVE ,creativeInfo)
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