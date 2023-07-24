import {atomWithReset} from "jotai/utils";

export const campaignBudgetInfoAtom =atomWithReset({
  campaignId:'',
  budgetTimeId:'',
  targetingBudgetId:'',
  targetingPriceId:'',
  biddingType:'CPC',
  infiniteBudgetYn:'N',
  budgetRate: 50,
  pcBudget: 0,
  mobBudget: 0,
  maxBiddingPrice:0,
  dailyAvgBudget:0
})
