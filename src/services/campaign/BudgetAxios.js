import {AdminAxios} from "../../common/Axios";

const ACTION_URL ='/adver/campaign'
const BUDGET_UPDATE ='/config/budget'
export async function updateCampaignBudget(campaignInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+'/'+ campaignInfo.campaignId +BUDGET_UPDATE ,campaignInfo)
    .then((response) => {
      const {responseCode,data} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
