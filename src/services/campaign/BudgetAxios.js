import {AdminAxios} from "../../common/Axios";

const isInit = true
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
      const {responseCode} = response
      if (responseCode.statusCode === 200) {
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selBudgetInfo(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL+'/'+userId+'/'+BUDGET_INFO)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
