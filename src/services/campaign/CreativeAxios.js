import {AdminAxios, AxiosImage} from "../../common/Axios";


const ACTION_URL ='/adver/campaign'
const PUBLISH ='/publish'
const IMAGE_UPDATE ='/banner/image'
const IMAGE_NATIVE='/native-banner/image'
const IMAGE_LOGO ='/image/logo'
const CREATE_BANNER ='/config/creative/banner'
const CREATE_NATIVE ='/config/creative/native'
const CREATE_POP_UNDER ='/config/creative/pop-under'

export async function selCreativeBannerInfo(campaignId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+ campaignId +CREATE_BANNER)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selCreativeNativeInfo(campaignId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+ campaignId +CREATE_NATIVE)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selCreativePopUnderInfo(campaignId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+ campaignId +CREATE_POP_UNDER)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

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

export async function updateCampaignPopUnder(creativeInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+ creativeInfo.campaignId +CREATE_POP_UNDER ,creativeInfo)
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

export async function updateCampaignPublish(campaignId, publish) {
  let returnVal = null;
  let param = {publishYn: publish ? 'Y' : 'N'};
  await AdminAxios('PUT', ACTION_URL+'/'+ campaignId +PUBLISH ,param)
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