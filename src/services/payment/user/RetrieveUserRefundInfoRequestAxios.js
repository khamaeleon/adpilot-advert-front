import {AdverAxios} from "../../../common/Axios";

const ACTION_URL = '/user/';
const URL = '/refund-info'

/**
 * 결제 요청
 * @returns {Promise<null>}
 */
export async function retrieveUserRefundInfoRequestAxios(userId ) {
  let returnVal = null;
  await AdverAxios('GET', ACTION_URL + userId + URL)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = null)
  return returnVal;
}