import {AdminAxios} from "../../common/Axios";

const isInit = true;

const ACTION_URL = '/adver/campaign'
const MEDIA_CATEGORY = '/list'
const MEDIA_SEARCH = '/media/inventory/by'
const MEDIA_SEARCH_ARRAY = '/media/inventory/array'
const CONFIG_INVENTORY = '/config/inventory'
const GROUP_INFO = '/inventory'

export async function selMediaCategoryInfo() {
  let returnVal = null;
  if (isInit) {
    return [
      {key: "1", label: "PRESS", value: "언론사"},
      {key: "2", label: "COMMUNITY", value: "커뮤니티"},
      {key: "3", label: "WEB_HARD", value: "웹하드"},
      {key: "4", label: "BLOG", value: "블로그"},
      {key: "5", label: "PORTAL", value: "포털"},
      {key: "6", label: "CAFE", value: "카페"},
      {key: "7", label: "ENTERTAINMENT", value: "엔터테인먼트"},
      {key: "8", label: "RELIGION", value: "종교지"},
      {key: "9", label: "ADULT_CONTENT", value: "성인 컨텐츠"},
      {key: "10", label: "SNS", value: "SNS"},
      {key: "11", label: "ETC", value: "기타"}
    ]
  }
  await AdminAxios('GET', ACTION_URL + '/MEDIA_CATEGORY' + MEDIA_CATEGORY)
  .then((response) => {
    if (response.responseCode.statusCode === 200) {
      returnVal = response.data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selSearchMediaInfo(keyword) {
  let returnVal = null;
  if (isInit) {
    return [
      {
        publishYn: "Y",//         개제 여부.
        siteName: "매체명2",//          매체 명.
        username: "ytkim_master",//          매체 id ( 계정 명 ).
        inventoryName: "지면명2",//     지면 명.
        inventoryId: "2",//       지면 코드(UUID).
        productType: "AUDIO",//       지면 광고 상품 타입.
        deviceType: "APP",//        지면 디바이스 타입.
        bannerSize: "",//        지면 배너 사이즈 타입.
        category1: "CATE1",//         매체 카테고리 1.
        category2: "",//         매체 카테고리 2.
        feeCalculation: "",//    지면 정산 방식.
        siteUrl: "",//           지면 사이트 url.
        script: "",//            지면 스크립트.
        examinationStatus: "",// 지면 심사 상태.
      }
    ]
  }
  await AdminAxios('GET', MEDIA_SEARCH + '?keyword=' + keyword)
  .then((response) => {
    if (response.responseCode.statusCode === 200) {
      returnVal = response.data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selSearchMediaList(inventoryIds) {
  let returnVal = null;
  if (inventoryIds.inventoryIds === undefined) {
    return null;
  }
  if (isInit) {
    return [
      {
        publishYn: "Y",//         개제 여부.
        siteName: "매체명1",//          매체 명.
        username: "ytkim_master",//          매체 id ( 계정 명 ).
        inventoryName: "지면명1",//     지면 명.
        inventoryId: "1",//       지면 코드(UUID).
        productType: "AUDIO",//       지면 광고 상품 타입.
        deviceType: "APP",//        지면 디바이스 타입.
        bannerSize: "",//        지면 배너 사이즈 타입.
        category1: "CATE1",//         매체 카테고리 1.
        category2: "",//         매체 카테고리 2.
        feeCalculation: "",//    지면 정산 방식.
        siteUrl: "",//           지면 사이트 url.
        script: "",//            지면 스크립트.
        examinationStatus: "",// 지면 심사 상태.
      }
    ]
  }
  await AdminAxios('POST', MEDIA_SEARCH_ARRAY, inventoryIds)
  .then((response) => {
    if (response.responseCode.statusCode === 200) {
      returnVal = response.data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

export async function updateCampaignConfigInventory(campaignGroupInfo) {
  let returnVal = null;
  if(isInit) {
    return true;
  }
  await AdminAxios('PUT',
      ACTION_URL + '/' + campaignGroupInfo.campaignId + CONFIG_INVENTORY,
      campaignGroupInfo)
  .then((response) => {
    const {responseCode} = response
    if (responseCode.statusCode === 200) {
      returnVal = true
    } else {
      returnVal = false
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selGroupInfo(campaignId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + '/' + campaignId + GROUP_INFO)
  .then((response) => {
    if (response.responseCode.statusCode === 200) {
      returnVal = response.data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

