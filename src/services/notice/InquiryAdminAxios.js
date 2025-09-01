import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/inquiry';
const INQUIRY_LIST = ACTION_URL + '/all';
const INQUIRY_DETAIL = ACTION_URL + '/{inquiryId}';
const INQUIRY_UPDATE = ACTION_URL + '/{inquiryId}/reply';

export async function selInquiryListAdmin(searchCondition) {
  let returnVal = null;

  await AdminAxios('POST', INQUIRY_LIST, searchCondition)
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

export async function selInquiryByIdAdmin(inquiryId) {
  let returnVal = null;

  await AdminAxios('GET', INQUIRY_DETAIL.replace('{inquiryId}', inquiryId), null)
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

export async function updateInquiryReply(inquiryId, reply) {
  let returnVal = null;

  const params = {title : reply.title, content: reply.content}

  await AdminAxios('PUT', INQUIRY_UPDATE.replace('{inquiryId}', inquiryId), params)
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