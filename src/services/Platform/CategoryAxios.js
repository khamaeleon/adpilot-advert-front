import {AdminAxios, AdverAxios} from "../../common/Axios";

const ACTION_URL = '/category';
const SLASH = '/';
const LEVEL = ACTION_URL+'/level'
const CATEGORY_ALL = LEVEL+'/1/all'
const CATEGORY_BY_PARENT = ACTION_URL + '/by-parent'
const PRODUCT = '/product'
/**
 * 상위카테고리 조회
 * @returns {Promise<null>}
 */
export async function retrieveTopLevelCategory() {
  let returnVal = null;
  await AdverAxios('GET', CATEGORY_ALL, null)
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
export async function retrieveCategoryByParentCode (params) {
  let returnVal = null;
  await AdverAxios('GET', CATEGORY_BY_PARENT+SLASH+params, null)
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
  await AdverAxios('POST', ACTION_URL, params)
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
export async function retrieveTopLevelCategoryKeyValue() {
  let returnVal = null;
  await AdverAxios('GET', CATEGORY_ALL, null)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data

        const fetch = returnVal.map((item,idx) => {
          Object.assign(item, {key: idx, value:item.code, label: item.name})
        })
        console.log(fetch)
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}