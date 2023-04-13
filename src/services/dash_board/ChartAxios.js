import {AdminAxios, AdverAxios} from "../../common/Axios";

const ACTION_URL = '/adver/dashboard/';
const OVERVIEW = 'overview';

/**
 * 플랫폼 현황 조회
 * @returns {Promise<null>}
 */
export async function retrieveOverview(param) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL+OVERVIEW, param)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 특정 광고주 플랫폼 현황 조회
 * @param userId
 * @returns {Promise<null>}
 */
export async function retrieveAdverOverview(userId, param) {
  let returnVal = null;
  await AdverAxios('POST', ACTION_URL+userId+'/'+OVERVIEW, param)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

