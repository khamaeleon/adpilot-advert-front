import {AdminAxios, AdverAxios} from "../../common/Axios";

const isInit = false;
const ACTION_URL = '/adver/dashboard/';
const OVERVIEW = 'overview';

/**
 * 플랫폼 현황 조회
 * @returns {Promise<null>}
 */
export async function retrieveOverview(param) {
  let returnVal = null;
  if (isInit) {
    return [{
      historyDate: "2025-08-07", //              통계 일
      exposureCount: 1, //            노출 수
      totalExposureCount: 1, //       총 노출 수
      validClickCount: 0, //          클릭 수
      totalClickCount: 0, //          총 클릭 수
      sessionConversionCount: 0, //   세션 전환 수
      directConversionCount: 1, //    직접 전환 수
      exposureConversionCount: 0, //  노출 전환 수
      totalConversionCount: 1, //     총 전환 수
      costAmount: 0, //               소진 비용
      sessionConversionAmount: 0, //  세션 매출
      directConversionAmount: 0, //   직접 매출
      exposureConversionAmount: 0, // 노출 매출
      totalConversionAmount: 0, //    총 매출
    },{
      historyDate: "2025-08-08", //              통계 일
      exposureCount: 10, //            노출 수
      totalExposureCount: 10, //       총 노출 수
      validClickCount: 3, //          클릭 수
      totalClickCount: 3, //          총 클릭 수
      sessionConversionCount: 0, //   세션 전환 수
      directConversionCount: 1, //    직접 전환 수
      exposureConversionCount: 0, //  노출 전환 수
      totalConversionCount: 1, //     총 전환 수
      costAmount: 40, //               소진 비용
      sessionConversionAmount: 0, //  세션 매출
      directConversionAmount: 10, //   직접 매출
      exposureConversionAmount: 0, // 노출 매출
      totalConversionAmount: 10, //    총 매출
    }]
  }
  await AdminAxios('POST', ACTION_URL + OVERVIEW, param)
  .then((response) => {
    const { data, statusCode, message } = response;
    if (statusCode === 200) {
      returnVal = data;
    } else {
      returnVal = null;
    }
  }).catch((e) => returnVal = null)
  return returnVal;
}

/**
 * 특정 광고주 광고 현황 조회
 * @param userId
 * @returns {Promise<null>}
 */
export async function retrieveAdverOverview(userId, param) {
  let returnVal = null;
  if (isInit) {
    return [
        {
          historyDate: 20250805,
          revenueAmount: 10,
          requestCount: 10,
          responseCount: 10,
          exposureCount: 10,
          validClickCount: 10,
          costAmount: 10
        }
      ]

    // return {
    //   rows: [
    //     {
    //       historyDate: 20250805,
    //       revenueAmount: 10,
    //       requestCount: 10,
    //       responseCount: 10,
    //       exposureCount: 10,
    //       validClickCount: 10,
    //       costAmount: 10
    //     }
    //   ], totalCount: 1
    // }
  }
  await AdverAxios('POST', '/dashboard/' + userId + '/' + OVERVIEW, param)
  .then((response) => {
    const { data, statusCode, message } = response;
    if (statusCode === 200) {
      returnVal = data;
    } else {
      returnVal = null;
    }
  }).catch((e) => returnVal = null)
  return returnVal;
}

