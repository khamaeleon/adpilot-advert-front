import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/campaign'
const BUDGET_UPDATE = '/config/budget'
const BUDGET_INFO = 'budget'

export async function updateCampaignBudget(campaignInfo) {
  let returnVal = null;
  let param = {...campaignInfo, infiniteBudgetYn: campaignInfo.infiniteBudgetYn ? 'Y' : 'N'}

  await AdminAxios('PUT', ACTION_URL + '/' + campaignInfo.campaignId + BUDGET_UPDATE, param)
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
