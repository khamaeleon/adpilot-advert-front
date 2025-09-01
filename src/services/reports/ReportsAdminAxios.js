import {AdminAxios} from "../../common/Axios";

const isInit = false;
const ACTION_URL = '/adver/statistics';
const CREATE_STATISTICS = ACTION_URL+'/custom-report'
/**
 * 보고서 생성
 * @params params
 */
export async function createCustomReportsAdminAxios(params) {
  let returnVal = null;
  if(isInit){
    return null;
  }
  await AdminAxios('POST', CREATE_STATISTICS, params)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 리포트 삭제
 * @param deleteInfo
 * @returns {Promise<null>}
 */
export async function deleteCustomReportsAdminAxios(deleteInfo) {
  let returnVal = null;
  await AdminAxios('DELETE', CREATE_STATISTICS, deleteInfo)
    .then((response) => {
      const { data, statusCode, message } = response;
      if(statusCode === 200) {
        returnVal = data;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 보고서 리스트 조회 (id)
 */
export async function retrieveCustomReportsAdminList(userId){
  let returnVal = null;
  if(isInit){
    return [{
      id: "",
      userId: "",
      adverName: "",
      reportName: "",
      groupByPeriod: "",
      groupByScopes: "",
      columns: ""
    }]
  }
  await AdminAxios('GET', `/adver/statistics/${userId}/custom-report`,null)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}
/**
 * 보고서 상세 조회 (id)
 * return columns, dataSources
 */
export async function retrieveCustomReportsAdminDetail(userId, reportUserSettingId, params) {
  let returnVal = null;
  await AdminAxios('POST', `/adver/statistics/${userId}/custom-report/${reportUserSettingId}`,params)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}
