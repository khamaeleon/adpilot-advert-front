import {AdverAxios} from "../common/Axios";

const ACTION_URL = '/category';
const SLASH = '/';
const LEVEL = ACTION_URL+'/level'
const CATEGORY_ALL = LEVEL+'/1/all'
const CATEGORY_BY_PARENT = ACTION_URL + '/by-parent'
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