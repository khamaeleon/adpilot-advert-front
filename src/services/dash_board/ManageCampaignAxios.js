import {AdminAxios, AdverAxios} from "../../common/Axios"; // eslint-disable-line no-unused-vars

const isInit = false;
const ACTION_URL = '/adver/dashboard/';
const ADVERTISER = 'advertiser-status';

/**
 * 광고주 현황 - 광고주 기준 조회
 * @returns {Promise<null>}
 */
export async function retrieveAdvertiserStatus(param) {
  let returnVal = null;
  if (isInit) {
    return [{
      userId: "용태",
      //Adver UUID.
      adverName: "용태팡",
      //광고주 명.
      username: "ytkim_advert",
      //계정 명.
      campaignCount: "1",
      //캠페인 수.
      exposureCount: "153",
      //노출 수.
      totalExposureCount: "153",
      //총 노출 수.
      validClickCount: "3",
      //유효 클릭 수.
      totalClickCount: "5",
      //총 클릭 수.
      sessionConversionCount: "1",
      //세션 전환 수.
      directConversionCount: "1",
      //직접 전환 수.
      exposureConversionCount: "0",
      //노출 전환 수.
      totalConversionCount: "1",
      //총 노출 수.
      costAmount: "0",
      //소진 금액.
      sessionConversionAmount: "0",
      //세션 매출.
      directConversionAmount: "0",
      //직접 매출.0
      exposureConversionAmount: "0",
      //노출 매출.
      totalConversionAmount: "0",
      //총 매출.
    }]
  }
  await AdminAxios('POST', ACTION_URL + ADVERTISER, param)
  .then((response) => {
    const {data, statusCode} = response;
    if (statusCode === 200) {
      returnVal = data
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
  await AdminAxios('POST', ACTION_URL + userId + '/' + ADVERTISER, param)
  .then((response) => {
    const {data, statusCode} = response;
    if (statusCode === 200) {
      returnVal = data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 광고주 캠페인 리스트 조회
 * @param userId
 * @returns {Promise<null>}
 */
export async function retrieveUserAdvertiserCampaignStatus(userId, param) {
  let returnVal = null;
  await AdverAxios('POST', '/dashboard/' + userId + '/' + ADVERTISER, param)
  .then((response) => {
    const {data, statusCode} = response;
    if (statusCode === 200) {
      returnVal = data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

