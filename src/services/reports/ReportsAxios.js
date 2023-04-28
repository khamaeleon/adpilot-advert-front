import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/statistics';
const CREATE_STATISTICS = ACTION_URL+'/custom-report'
/**
 * 보고서 생성
 * @params params
 */
export async function createCustomReportsAxios(params) {
  let returnVal = null;
  console.log(params)
  await AdminAxios('POST', CREATE_STATISTICS, params)
    .then((response) => {
      returnVal = response.responseCode.statusCode === 200 ? response.data : null;
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 리포트 삭제
 * @param deleteInfo
 * @returns {Promise<null>}
 */
export async function deleteCustomReportsAxios(deleteInfo) {
  let returnVal = null;
  await AdminAxios('DELETE', CREATE_STATISTICS, deleteInfo)
    .then((response) => {
      returnVal = response.responseCode.statusCode === 200 ? response.data : null;
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 보고서 리스트 조회 (id)
 */
export async function retrieveCustomReportsList(userId){
  let returnVal = null;
  await AdminAxios('GET', `/statistics/${userId}/custom-report`,null)
    .then((response) => {
      returnVal = response.responseCode.statusCode === 200 ? response.data : null
    }).catch((e) => returnVal = false)
  return returnVal;
}
/**
 * 보고서 상세 조회 (id)
 * return columns, dataSources
 */
export async function retrieveCustomReportsDaily({userId, reportUserSettingId}) {
  let returnVal = null;
  await AdminAxios('POST', `/statistics/${userId}/custom-report/${reportUserSettingId}`,null)
    .then((response) => {
      returnVal = response.responseCode.statusCode === 200 ? response.data : null
    }).catch((e) => returnVal = false)
  return returnVal;
}
