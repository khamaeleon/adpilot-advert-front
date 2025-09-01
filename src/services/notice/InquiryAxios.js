import {AdverAxios} from "../../common/Axios";

const ACTION_URL = '/inquiry';
const INQUIRY_LIST = ACTION_URL + '/all/{userId}';
const INQUIRY_DETAIL = ACTION_URL + '/{inquiryId}';

export async function selInquiryList(userId, searchCondition) {
  let returnVal = null;

  await AdverAxios('POST', INQUIRY_LIST.replace('{userId}', userId), searchCondition)
  .then((response) => {
    const { data, statusCode, message } = response;
    if(statusCode ===200) {
      returnVal = data;
    }else{
      returnVal = null;
    }
  }).catch((e) => returnVal = null)

  return returnVal;
}

export async function selInquiryById(inquiryId, searchCondition) {
  let returnVal = null;

  await AdverAxios('GET', INQUIRY_DETAIL.replace('{inquiryId}', inquiryId), searchCondition)
  .then((response) => {
    const { data, statusCode, message } = response;
    if(statusCode === 200) {
      returnVal = data;
    }else{
      returnVal = null;
    }
  }).catch((e) => returnVal = null)

  return returnVal;
}

export async function createInquiry(inquiryParam) {
  let returnVal = null;

  await AdverAxios('POST', ACTION_URL, inquiryParam)
  .then((response) => {
    const { data, statusCode, message } = response;
    if(statusCode === 200) {
      returnVal = data;
    }else{
      returnVal = null;
    }
  }).catch((e) => returnVal = null)

  return returnVal;
}