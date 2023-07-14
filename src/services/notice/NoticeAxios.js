import {AdverAxios} from "../../common/Axios";

const ACTION_URL = '/notice';
const NOTICE_LIST = ACTION_URL + '/all';
const NOTICE_DETAIL = ACTION_URL + '/{noticeId}';

export async function selNoticeList(searchCondition) {
  let returnVal = null;

  await AdverAxios('POST', NOTICE_LIST, searchCondition)
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

export async function selNotice(noticeId, searchCondition) {
  let returnVal = null;

  await AdverAxios('GET', NOTICE_DETAIL.replace('{noticeId}', noticeId), searchCondition)
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
