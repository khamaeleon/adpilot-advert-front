import {AdminAxios} from "../../../common/Axios";

const REFUND = '/adver/payments/point/refund-process';
const REFUNDALL = '/adver/payments/point/multiple-refund-process';

/**
 * 개별 환불 요청 처리
 * @returns {Promise<null>}
 */
export async function refundProcess( param ) {
  let returnVal = null;
  await AdminAxios('POST', REFUND, param)
    .then((response) => {
      const {responseCode, data} = response
      if (responseCode.statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 다중 환불 요청 처리
 * @returns {Promise<null>}
 */
export async function refundAllProcess( param ) {
  let returnVal = null;
  await AdminAxios('POST', REFUNDALL, param)
    .then((response) => {
      const {responseCode, data} = response
      if (responseCode.statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}