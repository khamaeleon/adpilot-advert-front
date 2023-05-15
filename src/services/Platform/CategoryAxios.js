import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/category';
const CATEGORY_ALL = ACTION_URL+'/level/1/all'
const CATEGORY_BY_KEYWORD = ACTION_URL+'/level/1'
const CATEGORY_BY_PARENT = ACTION_URL + '/by-parent/{parentCode}'

/**
 * 상위카테고리 조회
 * @returns {Promise<null>}
 */
export async function retrieveTopLevelAllCategory() {
  let returnVal = null;
  await AdminAxios('GET', CATEGORY_ALL, null)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
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
  let params = {keyword: searchKeyword != null ? searchKeyword : ''}
  await AdminAxios('POST', CATEGORY_BY_KEYWORD, params)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 하위카테고리 조회
 * @param params
 * @returns {Promise<null>}
 */
export async function retrieveCategoryByParentCode(parentCode, searchKeyword) {
  let returnVal = null;
  let params = {keyword: searchKeyword != null ? searchKeyword : ''}
  await AdminAxios('POST', CATEGORY_BY_PARENT.replace('{parentCode}',parentCode), params)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 카테고리 생성
 * @param params
 * @returns {Promise<null>}
 */
export async function createNewCategory (params) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL, params)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
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
  let response = await retrieveTopLevelCategory(params);
  returnVal = response.map((item, idx) => {
    return {key: idx, value: item.code, label: item.name}
  })

  return returnVal;
}

export async function retrieveSubLevelCategoryKeyValue(parentCode, params) {
  let returnVal;
  let response = await retrieveCategoryByParentCode(parentCode, params)
  returnVal = response.map((item, idx) => {
    return {key: idx, value: item.code, label: item.name}
  })

  return returnVal;
}