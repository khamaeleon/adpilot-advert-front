import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/setting'
const BUDGET_EVENT = '/budget'
const BUDGET_LIST= '/budget/list'


/**
 * 이벤트 예산 관리 광고주 리스트
 * @param keyword
 * @returns {Promise<null>}
 */
export async function selAdverBudgetEventList(keyword) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + BUDGET_LIST ,keyword)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 이벤트 예산 관리 상세 리스트
 * @param username
 * @returns {Promise<null>}
 */
export async function selBudgetEventList(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + BUDGET_EVENT +'/'+userId)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 이벤트 예산 관리 등록
 * @param budgetEventInfo
 * @returns {Promise<null>}
 */
export async function resistBudgetEvent(budgetEventInfo) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + BUDGET_EVENT ,budgetEventInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===201){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 이벤트 예산 관리 수정
 * @param budgetEventInfo
 * @returns {Promise<null>}
 */
export async function updateBudgetEvent(budgetEventInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL + BUDGET_EVENT ,budgetEventInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};


