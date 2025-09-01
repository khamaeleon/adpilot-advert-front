import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/revision/'
const CAMPAIGN_URL = ACTION_URL+'campaign'
const TARGET_BUDGET = ACTION_URL+'target-budget'
const TARGET_PRICE = ACTION_URL+'target-price'
const BUDGET_TIME = ACTION_URL+'budget-time'

export async function findRevisionCampaignList(params) {
  let returnVal = null;
  let searchParam = null;

  if(params.searchKeywordType === 'DEFAULT'){
    searchParam = {
      ...params,
      searchKeywordType: null
    };
  } else {
    searchParam = params;
  }

  await AdminAxios('POST', CAMPAIGN_URL, searchParam)
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

export async function findRevisionCampaignDetail(revID) {
  let returnVal = null;
  await AdminAxios('GET', CAMPAIGN_URL + `/${revID}`, null)
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

export async function findRevisionTargetingBudgetList (params) {
  let returnVal = null;
  let searchParam = null;

  if(params.searchKeywordType === 'DEFAULT'){
    searchParam = {
      ...params,
      searchKeywordType: null
    };
  } else {
    searchParam = params;
  }
  await AdminAxios('POST', TARGET_BUDGET, searchParam)
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

export async function findRevisionTargetingBudgetDetail (revId) {
  let returnVal = null;
  await AdminAxios('GET', TARGET_BUDGET+`/${revId}`, null)
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

export async function findRevisionTargetingPriceList (params) {
  let returnVal = null;
  let searchParam = null;

  if(params.searchKeywordType === 'DEFAULT'){
    searchParam = {
      ...params,
      searchKeywordType: null
    };
  } else {
    searchParam = params;
  }

  await AdminAxios('POST', TARGET_PRICE, searchParam)
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

export async function findRevisionTargetingPriceDetail(revID) {
  let returnVal = null;
  await AdminAxios('GET', TARGET_PRICE + `/${revID}`, null)
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

export async function findRevisionBudgetTimeList(params) {
  let returnVal = null;
  let searchParam = null;

  if(params.searchKeywordType === 'DEFAULT'){
    searchParam = {
      ...params,
      searchKeywordType: null
    };
  } else {
    searchParam = params;
  }

  await AdminAxios('POST', BUDGET_TIME, searchParam)
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

export async function findRevisionBudgetTimeDetail(revId) {
  let returnVal = null;
  await AdminAxios('GET', BUDGET_TIME + `/${revId}`, null)
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