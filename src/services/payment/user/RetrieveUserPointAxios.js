import {AdverAxios} from "../../../common/Axios";

const ACTION_URL = '/payments/point/';

/**
 * 특정 유저 결제 정보 요청
 * @returns {Promise<null>}
 */
export async function retrieveUserPointRequest( userId ) {
  let returnVal = null;
  await AdverAxios('GET', ACTION_URL + userId , null)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = null)
  return returnVal;
}