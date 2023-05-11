import {AdverAxios} from "../../../common/Axios";

const ACTION_URL = '/user/refund-info';

/**
 * 환불 정보 등록
 * @returns {Promise<null>}
 */
export async function RegisterRefundInformationRequest( param ) {
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