import {AdminAxios} from "../../common/Axios";

const isInit = false;
const ACTION_URL = '/adver/campaign'
const BUDGET_UPDATE = '/config/budget'
const BUDGET_INFO = 'budget'

export async function updateCampaignBudget(campaignInfo) {
  let returnVal = null;
  if(isInit) {
    return true;
  }

  await AdminAxios('PUT', ACTION_URL + '/' + campaignInfo.campaignId + BUDGET_UPDATE, campaignInfo)
    .then((response) => {
      const { statusCode } = response;
      if (statusCode === 200) {
        returnVal = true;
      } else {
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selBudgetInfo(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+userId+'/'+BUDGET_INFO)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
