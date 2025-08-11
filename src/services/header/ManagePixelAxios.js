import {AdminAxios, AdverAxios} from "../../common/Axios";

const isInit = true;
const ACTION_URL = '/adver/pixel'
const ADVER_LIST ='/manage'
const EVENT ='/event'
const ADVER_NORMAL = '/pixel'

/**
 * 광고주 리스트 픽셀 관리
  keyword
 * @returns {Promise<null>}
 */
export async function selAdminPixelList(keyword) {
  let returnVal = null;
  if(isInit) {
    return [
      {
        pixelId: "1",// 픽셀 id
        interlockYn: "N",//연동 상태.
        pixelName: "dus",//픽셀 명.
        username: "ytkim_advert",//광고주 로그인 id.
        adverName: "용태팡",// 광고주 명.
        linkUrl: "https://adpilot.co.kr",//연동 url.
        managerName: "김용태",//담당자 명.
        mainCategoryCode: "1",//대 카테고리 코드.
        subCategoryCode: "1",// 하위 카테고리 코드.
        hostType: "",// 호스팅 타입.
        status: "N",//수집 상태
        lastModifiedAt: "20250810",//최근 수정 일자.
        events: "1"// 픽셀 events.
      }
    ]
  }
  await AdminAxios('POST', ACTION_URL + ADVER_LIST ,keyword)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}
export async function resistAdverPixelInfo(pixelInfo) {
  let returnVal = null;
  if(isInit){
    return [
      {
         pixelId         :"",// 픽셀 id
         interlockYn      :"",//연동 상태.
         pixelName        :"",//픽셀 명.
         username         :"",//광고주 로그인 id.
          adverName       :"",// 광고주 명.
         linkUrl          :"",//연동 url.
         managerName      :"",//담당자 명.
         mainCategoryCode :"",//대 카테고리 코드.
          subCategoryCode :"",// 하위 카테고리 코드.
          hostType        :"",// 호스팅 타입.
         status           :"",//수집 상태
         lastModifiedAt   :"",//최근 수정 일자.
          events          :""// 픽셀 events.
      }
    ]
  }
  await AdminAxios('POST', ACTION_URL,pixelInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===201){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function updatePixelInterlock(pixelId,interlockYn) {
  let returnVal = null;
  let params = {interlockYn : interlockYn ? 'Y': 'N'}
  await AdminAxios('PUT', ACTION_URL+'/'+pixelId+'/interlock',params)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function updateEventInterlock(eventId,interlockYn) {
  let returnVal = null;
  let params = {interlockYn : interlockYn ? 'Y': 'N'}
  await AdminAxios('PUT', ACTION_URL+EVENT+'/'+eventId+'/interlock',params)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function updatePixelInfo(pixelId,pixelInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+pixelId,pixelInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function selAdminPixelDetailList(userId) {
  let returnVal = null;
  if(isInit){
    return [{ pixelId         :"1",// 픽셀 id
        interlockYn      :"N",//연동 상태.
        pixelName        :"픽셀 명",//픽셀 명.
        username         :"ytkim_advert",//광고주 로그인 id.
        adverName       :"용태팡",// 광고주 명.
        linkUrl          :"",//연동 url.
        managerName      :"김용태",//담당자 명.
        mainCategoryCode :"CATE1",//대 카테고리 코드.
        subCategoryCode :"",// 하위 카테고리 코드.
        hostType        :"",// 호스팅 타입.
        status           :"",//수집 상태
        lastModifiedAt   :"",//최근 수정 일자.
        events          :""// 픽셀 events.
      }]
  }
  if(userId != undefined){
    await AdminAxios('GET', ACTION_URL + ADVER_LIST +'/'+userId ,null)
      .then((response) => {
        const {data, responseCode} =response
        if(responseCode.statusCode ===200){
          returnVal = data
        } else if (responseCode.statusCode === 500 || responseCode.statusCode === 400) {
          returnVal = null
        }else{
          returnVal = null
        }
      }).catch((e) => returnVal = false)
  }
  return returnVal;
}

export async function selPixelInfoList(pixelId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL +'/'+pixelId ,null)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selAdverPixelList(userId) {
  let returnVal = null;
  if(userId != undefined) {
    await AdverAxios('GET', ADVER_NORMAL + ADVER_LIST +'/'+userId ,null)
      .then((response) => {
        const {data, responseCode} = response
        if(responseCode.statusCode ===200){
          returnVal = data
        }else{
          returnVal = null
        }
      }).catch((e) => returnVal = false)
  }
  return returnVal;
}

export async function selPixelAdverInfoList(pixelId) {
  let returnVal = null;
  await AdverAxios('GET', ADVER_NORMAL +'/'+pixelId ,null)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};