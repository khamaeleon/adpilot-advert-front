import {AdminAxios} from "../../../common/Axios";

const PRODUCT = '/adver/payments/ADVERTISE/list';

/**
 * 전체 광고주 결제 정보 요청
 * @returns {Promise<null>}
 */
export async function paymentAllListRequest( param ) {
  let returnVal = null;
  await AdminAxios('POST', PRODUCT, param)
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