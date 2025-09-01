import {AdverAxios} from "../../common/Axios";

const isInit = false;
const ACTION_URL = '/statistics';
const CREATE_STATISTICS = ACTION_URL+'/custom-report'
/**
 * 보고서 생성
 * @params params
 */
export async function createCustomReportsAxios(params) {
  let returnVal = null;
  await AdverAxios('POST', CREATE_STATISTICS, params)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch(() => returnVal = false)
  return returnVal;
}

/**
 * 리포트 삭제
 * @param deleteInfo
 * @returns {Promise<null>}
 */
export async function deleteCustomReportsAxios(deleteInfo) {
  let returnVal = null;
  await AdverAxios('DELETE', CREATE_STATISTICS, deleteInfo)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch(() => returnVal = false)
  return returnVal;
}

/**
 * 보고서 리스트 조회 (id)
 * @userId
 */
export async function retrieveCustomReportsList(userId){
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
  await AdverAxios('GET', `/statistics/${userId}/custom-report`,null)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch(() => returnVal = false)
  return returnVal;
}
/**
 * 보고서 상세 조회 (id)
 * return columns, dataSources
 */
export async function retrieveCustomReportsDetail(userId, reportUserSettingId, params) {
  let returnVal = null;
  await AdverAxios('POST', `/statistics/${userId}/custom-report/${reportUserSettingId}`,params)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = null;
      }
    }).catch(() => returnVal = false)
  return returnVal;
}
