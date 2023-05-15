import {atomWithReset} from "jotai/utils";

export const campaignBudgetInfoAtom =atomWithReset({
  campaignId:'',
  budgetTimeId:'',
  budgetEventId:'',
  priceEventId:'',
  biddingType:'CPC',
  infiniteBudgetYn:false,
  budgetRate: 50,
  maxBiddingPrice:0,
  dailyAvgBudget:0
})
