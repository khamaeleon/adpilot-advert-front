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
      const { data, statusCode } = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = null)
  return returnVal;
}