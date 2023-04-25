import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/dashboard/';
const ADVERTISER = 'advertiser-status';

/**
 * 광고주 현황 - 광고주 기준 조회
 * @returns {Promise<null>}
 */
export async function retrieveAdvertiserStatus(param) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL+ADVERTISER, param)
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
 * 특정 광고주 캠페인 리스트 조회
 * @param userId
 * @returns {Promise<null>}
 */
export async function retrieveAdvertiserCampaignStatus(userId, param) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL+userId+'/'+ADVERTISER, param)
    .then((response) => {
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

