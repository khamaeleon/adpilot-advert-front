import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/revision/'
const CAMPAIGN_URL = ACTION_URL+'campaign'
const TARGET_BUDGET = ACTION_URL+'target-budget'
const TARGET_PRICE = ACTION_URL+'target-price'
const BUDGET_TIME = ACTION_URL+'budget-time'

export async function findRevisionCampaignList (params) {
  let returnVal = null;
  await AdminAxios('POST', CAMPAIGN_URL, params)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function findRevisionCampaignDetail(revID) {
  let returnVal = null;
  await AdminAxios('GET', CAMPAIGN_URL + `/${revID}`, null)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function findRevisionTargetingBudgetList (params) {
  let returnVal = null;
  await AdminAxios('POST', TARGET_BUDGET, params)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function findRevisionTargetingBudgetDetail (revId) {
  let returnVal = null;
  await AdminAxios('GET', TARGET_BUDGET+`/${revId}`, null)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function findRevisionTargetingPriceList (params) {
  let returnVal = null;
  await AdminAxios('POST', TARGET_PRICE, params)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function findRevisionTargetingPriceDetail(revID) {
  let returnVal = null;
  await AdminAxios('GET', TARGET_PRICE + `/${revID}`, null)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function findRevisionBudgetTimeList(params) {
  let returnVal = null;
  await AdminAxios('POST', BUDGET_TIME, params)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function findRevisionBudgetTimeDetail(revId) {
  let returnVal = null;
  await AdminAxios('GET', BUDGET_TIME + `/${revId}`, null)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}