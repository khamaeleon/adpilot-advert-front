import {AdverAxios} from "../../../common/Axios";

const isInit = true;

const ACTION_URL_PAYMENTS = '/payments/ADVERTISE';
const LIST_PAYMENTS = '/list'

const ACTION_URL_POINT = '/payments/point';
const LIST_POINT = '/histories'


/**
 * 특정 유저 결제 정보 요청
 * @returns {Promise<null>}
 */
export async function paymentListRequest( userId, param ) {
  let returnVal = null;
  if(isInit){
    return null;
  }

  await AdverAxios('POST', ACTION_URL_PAYMENTS + "/" + userId + LIST_PAYMENTS , param)
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
/**
 * 특정 유저 포인트 지급 내역
 * @returns {Promise<null>}
 */
export async function pointListRequest( userId, param ) {
  let returnVal = null;
  if(isInit){
    return null;
  }
  await AdverAxios('POST', ACTION_URL_POINT + "/" + userId + LIST_POINT , param)
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
