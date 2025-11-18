import {AdminAxios, AxiosFile, AxiosImage} from "../../common/Axios";

const isInit = false;

const ACTION_URL ='/adver/campaign'
const PUBLISH ='/publish'
const IMAGE_UPDATE ='/banner/image'
const IMAGE_NATIVE='/native-banner/image'
const AUDIO_FILE='/audio/file'
const IMAGE_LOGO ='/image/logo'
const CREATE_BANNER ='/config/creative/banner'
const CREATE_NATIVE ='/config/creative/native'
const CREATE_POP_UNDER ='/config/creative/pop-under'
const CREATE_AUDIO ='/config/creative/audio'

export async function selCreativeBannerInfo(campaignId) {
  let returnVal = null;
  if(isInit){
    return {
      "name": "IMG200_200_TEST",
      "pcLandingUrl": "https://naver.com",
      "pcReferralCode": "ref=mcorpor",
      "mobLandingUrl": "https://m.naver.com",
      "mobReferralCode": "ref=mcorpor",
      "creativeType": "BANNER",
      "materials": [
        {
          "BannerSize": "IMG200_200",
          "images": [
            {
              "imagePath": "https://s3.aws.com/img1",
              "thumbnailPath": "https://s3.aws.com/thumnail/img1"
            },
            {
              "imagePath": "https://s3.aws.com/img2",
              "thumbnailPath": "https://s3.aws. com/thumnail/img2"
            }
          ]},{
          "bannerSize": "IMG300_300",
          "images": [
            {
              "imagePath": "https://s3.aws.com/img3",
              "thumbnailPath": "https://s3.aws.com/thumnail/img3"
            },
            {
              "imagePath": "https://s3.aws.com/img4",
              "thumbnailPath": "https://s3.aws.com/thumnail/img4"
            }
          ]
        }
      ],
      "title1": "타이틀1",
      "title2": "타이틀2",
      "title3": "타이틀3",
      "titleLong": "타이틀 긴거",
      "clickInducementType": "REGISTER",
      "logoPaths": [
        {
          "imagePath": "https://s3.aws.com/logo/img1",
          "thumbnailPath": null
        },
        {
          "imagePath": "https://s3.aws.com/logo/img2",
          "thumbnailPath": null
        }
      ],
      "serviceName": "나이키",
      "description": "나이키 프로모션"
    }
  }
  await AdminAxios('GET', ACTION_URL+'/'+ campaignId +CREATE_BANNER)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200 ){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selCreativeNativeInfo(campaignId) {
  let returnVal = null;
  if(isInit){
    return {
      "name": "IMG200_200_TEST",
      "pcLandingUrl": "https://naver.com",
      "pcReferralCode": "ref=mcorpor",
      "mobLandingUrl": "https://m.naver.com",
      "mobReferralCode": "ref=mcorpor",
      "creativeType": "BANNER",
      "materials": [
        {
          "BannerSize": "IMG200_200",
          "images": [
            {
              "imagePath": "https://s3.aws.com/img1",
              "thumbnailPath": "https://s3.aws.com/thumnail/img1"
            },
            {
              "imagePath": "https://s3.aws.com/img2",
              "thumbnailPath": "https://s3.aws. com/thumnail/img2"
            }
          ]},{
          "bannerSize": "IMG300_300",
          "images": [
            {
              "imagePath": "https://s3.aws.com/img3",
              "thumbnailPath": "https://s3.aws.com/thumnail/img3"
            },
            {
              "imagePath": "https://s3.aws.com/img4",
              "thumbnailPath": "https://s3.aws.com/thumnail/img4"
            }
          ]
        }
      ],
      "title1": "타이틀1",
      "title2": "타이틀2",
      "title3": "타이틀3",
      "titleLong": "타이틀 긴거",
      "clickInducementType": "REGISTER",
      "logoPaths": [
        {
          "imagePath": "https://s3.aws.com/logo/img1",
          "thumbnailPath": null
        },
        {
          "imagePath": "https://s3.aws.com/logo/img2",
          "thumbnailPath": null
        }
      ],
      "serviceName": "나이키",
      "description": "나이키 프로모션"
    }
  }
  await AdminAxios('GET', ACTION_URL+'/'+ campaignId +CREATE_NATIVE)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode ===200 ){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
export async function selCreativeAudioInfo(campaignId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+ campaignId +CREATE_AUDIO)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode ===200 ){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selCreativePopUnderInfo(campaignId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+ campaignId +CREATE_POP_UNDER)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode ===200 ){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function uploadBannerImages(data,bannerSize) {
  let returnVal = null;
  await AxiosImage('POST', ACTION_URL+IMAGE_UPDATE+'/'+bannerSize, data)
    .then(response => {
      const { data, statusCode } = response;
      if(statusCode === 200 ){
        returnVal = data;
      } else {
        returnVal = null;
      }
    })
    .catch((e) => returnVal = false)
  return returnVal;
};
export async function uploadAudioFile(asset) {
  let returnVal = null;
  const form = new FormData();
  form.append('file', asset, asset.name);

  await AxiosFile('POST', ACTION_URL+AUDIO_FILE, form)
    .then(response => {
      const { data, statusCode } = response;
      if(statusCode === 200 ){
        returnVal = data;
      } else {
        returnVal = null;
      }
    })
    .catch((e) => returnVal = false)
  return returnVal;
};
export async function uploadNativeImages(data) {
  let returnVal = null;
  await AxiosImage('POST', ACTION_URL + IMAGE_NATIVE, data)
    .then(response => {
      const { data, statusCode } = response;
      if(statusCode === 200 ){
        returnVal = data;
      } else {
        returnVal = null;
      }
    })
    .catch((e) => returnVal = false)
  return returnVal;
};

export async function uploadLogoImages(data) {
  let returnVal = null;
  await AxiosImage('POST', ACTION_URL + IMAGE_LOGO, data)
    .then(response => {
      const { data, statusCode } = response;
      if(statusCode === 200 ){
        returnVal = data;
      } else {
        returnVal = null;
      }
    })
    .catch((e) => returnVal = false)
  return returnVal;
};

export async function updateCampaignBanner(creativeInfo) {
  let returnVal = null;
  if(isInit){
    return true;
  }
  await AdminAxios('PUT', ACTION_URL+'/'+ creativeInfo.campaignId +CREATE_BANNER ,creativeInfo)
    .then((response) => {
      const { statusCode } = response;
      console.log(response)
      if(statusCode === 200 ){
        returnVal = true;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function updateCampaignNative(creativeInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+ creativeInfo.campaignId +CREATE_NATIVE ,creativeInfo)
    .then((response) => {
      const { statusCode } = response;
      if(statusCode === 200){
        returnVal = true;
      }else{
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function updateCampaignPopUnder(creativeInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+ creativeInfo.campaignId +CREATE_POP_UNDER ,creativeInfo)
    .then((response) => {
      const { statusCode } = response;
      if(statusCode === 200){
        returnVal = true;
      }else{
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
export async function updateCampaignAudio(creativeInfo) {
  let returnVal = null;
  console.log(creativeInfo)
  await AdminAxios('PUT', ACTION_URL+'/'+ creativeInfo.campaignId +CREATE_AUDIO ,creativeInfo)
    .then((response) => {
      const { statusCode } = response;
      if(statusCode === 200){
        returnVal = true;
      }else{
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function updateCampaignPublish(campaignId, publish) {
  let returnVal = null;
  let param = {publishYn: publish ? 'Y' : 'N'};
  await AdminAxios('PUT', ACTION_URL+'/'+ campaignId +PUBLISH ,param)
    .then((response) => {
      const { statusCode } =response;
      if(statusCode === 200 ){
        returnVal = true;
      }else{
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};