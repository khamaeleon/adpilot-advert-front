import {AdminAxios, AdverAxios} from "../../common/Axios";

const isInit = false;

const ACTION_URL = '/adver/category';
const CATEGORY_ALL = ACTION_URL+'/level/1/all'
const CATEGORY_BY_KEYWORD = ACTION_URL+'/level/1'
const CATEGORY_BY_PARENT = ACTION_URL + '/by-parent/{parentCode}'

const USER_URL = '/category';
const USER_CATEGORY_ALL = USER_URL+'/level/1/all'
const USER_CATEGORY_BY_PARENT = USER_URL + '/by-parent/{parentCode}'
/**
 * 상위카테고리 조회
 * @returns {Promise<null>}
 */
export async function retrieveTopLevelAllCategory() {
  let returnVal = null;
  if(isInit){
    return [{
      name   :"예술 및 엔터테인먼트",//    the name of the category
      code      :"CATE1",// the unique code of the category
      level     :"1",// the hierarchical level of the category
      parentCode:"",// the parent code of this category
    }]
  }
  await AdminAxios('GET', CATEGORY_ALL, null)
    .then((response) => {
      const { data, statusCode } = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}
/**
 * 상위카테고리 조회
 * @returns {Promise<null>}
 */
export async function retrieveTopLevelCategory(searchKeyword) {
  let returnVal = null;
  if(isInit){
    return [{
        name   :"예술 및 엔터테인먼트",//    the name of the category
       code      :"CATE1",// the unique code of the category
       level     :"1",// the hierarchical level of the category
       parentCode:"",// the parent code of this category
    }]
  }
  let params = {keyword: searchKeyword != null ? searchKeyword : ''}
  await AdminAxios('POST', CATEGORY_BY_KEYWORD, params)
    .then((response) => {
      const { data, statusCode } = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 하위카테고리 조회
  params
 * @returns {Promise<null>}
 */
export async function retrieveCategoryByParentCode(parentCode, searchKeyword) {
  let returnVal = null;
  let params = {keyword: searchKeyword != null ? searchKeyword : ''}
  await AdminAxios('POST', CATEGORY_BY_PARENT.replace('{parentCode}',parentCode), params)
    .then((response) => {
      const { statusCode, data} = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 카테고리 생성
  params
 * @returns {Promise<null>}
 */
export async function createNewCategory (params) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL, params)
    .then((response) => {
      const { data, statusCode } = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 키밸류 변환
 */
export async function retrieveTopLevelCategoryKeyValue(params) {
  let returnVal;
  if(isInit) {
    return [
      {
        pixelId: "",// 픽셀 id
        interlockYn: "",//연동 상태.
        pixelName: "",//픽셀 명.
        username: "",//광고주 로그인 id.
        adverName: "",// 광고주 명.
        linkUrl: "",//연동 url.
        managerName: "",//담당자 명.
        mainCategoryCode: "",//대 카테고리 코드.
        subCategoryCode: "",// 하위 카테고리 코드.
        hostType: "",// 호스팅 타입.
        status: "",//수집 상태
        lastModifiedAt: "",//최근 수정 일자.
        events: ""// 픽셀 events.
      }
    ]
  }
  await retrieveTopLevelCategory(params).then(response => {
    if (response?.length > 0) {
      returnVal = response?.map((item, idx) => {
        return {key: idx, value: item.code, label: item.name}
      })
    } else {
      returnVal = null
    }
  })
  return returnVal;
}

export async function retrieveSubLevelCategoryKeyValue(parentCode, params) {
  let returnVal;
  await retrieveCategoryByParentCode(parentCode, params).then(response => {
    if(response.length > 0) {
      returnVal = response?.map((item, idx) => {
        return {key: idx, value: item.code, label: item.name}
      })
    } else {
      returnVal = null
    }
  })
  return returnVal;
}

/** 일반계정 카테고리
 *
 */

export async function retrieveUserTopLevelCategory(searchKeyword) {
  let returnVal = null;
  let params = {keyword: searchKeyword != null ? searchKeyword : ''}
  await AdverAxios('GET', USER_CATEGORY_ALL, params)
    .then((response) => {
      const { data, statusCode, message } = response;
      if(statusCode === 200) {
        returnVal = data;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function retrieveUserTopLevelCategoryKeyValue(params) {
  let returnVal;
  await retrieveUserTopLevelCategory(params).then(data => {
      returnVal = data?.map((item, idx) => {
        return {key: idx, value: item.code, label: item.name}
      })
  })
  return returnVal;
}

export async function retrieveUserCategoryByParentCode(parentCode, searchKeyword) {
  let returnVal = null;
  let params = {keyword: searchKeyword != null ? searchKeyword : ''}
  await AdverAxios('GET', USER_CATEGORY_BY_PARENT.replace('{parentCode}',parentCode), params)
    .then((response) => {
      const { data, statusCode, message } = response;
      if(statusCode === 200) {
        returnVal = data;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function retrieveUserSubLevelCategoryKeyValue(parentCode, params) {
  let returnVal;
  await retrieveUserCategoryByParentCode(parentCode, params).then(data => {
    returnVal = data?.map((item, idx) => {
      return {key: idx, value: item.code, label: item.name}
    })
  })
  return returnVal;
}