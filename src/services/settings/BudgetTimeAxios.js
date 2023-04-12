import {AdminAxios} from "../../common/Axios";
const ACTION_URL ='/adver/setting'
const BUDGET_TIME_LIST ='/time'
const ADVER_LIST ='/time/list'

export async function selBudgetTimeAdverList(keyword) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + ADVER_LIST , keyword)
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

export async function selBudgetTimeList(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + BUDGET_TIME_LIST +'/'+userId)
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

export async function selBudgetTimeDetailInfo(userId,groupId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + BUDGET_TIME_LIST +'/'+userId +'/'+groupId)
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

export async function resistBudgetTimes(budgetTimesInfo) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + BUDGET_TIME_LIST ,budgetTimesInfo)
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

export async function updateBudgetTimes(budgetTimesInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL + BUDGET_TIME_LIST ,budgetTimesInfo)
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
