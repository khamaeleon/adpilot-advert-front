import {atom} from "jotai/index";

export const campaignBudgetInfoAtom =atom({
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
