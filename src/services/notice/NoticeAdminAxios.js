import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/notice';
const NOTICE_LIST = ACTION_URL + '/all';
const NOTICE_DETAIL = ACTION_URL + '/{noticeId}';
const NOTICE_UPDATE = ACTION_URL + '/{noticeId}/publish';

export async function selNoticeListAdmin(searchCondition) {
  let returnVal = null;

  await AdminAxios('POST', NOTICE_LIST, searchCondition)
  .then((response) => {
    const {data, responseCode} = response
    if(responseCode.statusCode ===200){
      returnVal = data
    }else{
      returnVal = null
    }
  }).catch((e) => returnVal = null)

  return returnVal;
}

export async function selNoticeAdmin(noticeId, searchCondition) {
  let returnVal = null;

  await AdminAxios('GET', NOTICE_DETAIL.replace('{noticeId}', noticeId), searchCondition)
  .then((response) => {
    const {data, responseCode} = response
    if(responseCode.statusCode ===200){
      returnVal = data
    }else{
      returnVal = null
    }
  }).catch((e) => returnVal = null)

  return returnVal;
}

export async function updateNoticePublishAdmin(noticeId, publishYn) {
  let returnVal = null;

  const params = {publishYn : publishYn}

  await AdminAxios('PUT', NOTICE_UPDATE.replace('{noticeId}', noticeId), params)
  .then((response) => {
    const {data, responseCode} = response
    if(responseCode.statusCode ===200){
      returnVal = data
    }else{
      returnVal = null
    }
  }).catch((e) => returnVal = null)

  return returnVal;
}

export async function createNoticeAdmin(noticeParam) {
  let returnVal = null;

  await AdminAxios('POST', ACTION_URL, noticeParam)
  .then((response) => {
    const {data, responseCode} = response
    if(responseCode.statusCode === 200){
      returnVal = data
    }else{
      returnVal = null
    }
  }).catch((e) => returnVal = null)

  return returnVal;
}