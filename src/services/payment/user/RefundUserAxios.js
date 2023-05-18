import {AdverAxios} from "../../../common/Axios";

const ACTION_URL = '/payments/point/refund-request';

/**
 * 결제 요청
 * @returns {Promise<null>}
 */
export async function refundRequest( param ) {
  let returnVal = null;
  await AdverAxios('POST', ACTION_URL, param)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = null)
  return returnVal;
}