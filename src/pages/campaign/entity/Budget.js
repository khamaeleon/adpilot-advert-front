import {atom} from "jotai/index";

export const campaignBudgetInfoAtom =atom({
  campaignId:'',
  budgetTimeId:'',
  budgetEventId:'',
  priceEventId:'',
  biddingType:'CPC',
  infiniteBudget:false,
  budgetRate: 50,
  maxBiddingPrice:0,
  dailyAvgBudget:0
})
