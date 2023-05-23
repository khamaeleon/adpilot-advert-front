import {atom} from "jotai";
import {atomWithReset} from "jotai/utils";

export const campaignBasicInfoAtom = atomWithReset({
  productType:'BANNER',
  goalType:'CAMPAIGN_CONVERSION_GOAL',
  pixelId:'',
  goal:'',
  goalValue:0,
  campaignId:'',
  step:''
})

export const campaignTemporaryListAtom = atom(null)



export const goalConversionType = [
  {key:0, value:'CONVERSION_SESSION_ROAS', label:'정상 수집'},
  {key:1, value:'CONVERSION_DIRECT_ROAS', label:'수집 중지'},
  {key:2, value:'CONVERSION_TOTAL_ROAS', label:'수집 전'},
  {key:3, value:'CONVERSION_DIRECT_SALES', label:'확인 필요'},
  {key:4, value:'CONVERSION_TOTAL_SALES', label:'수집 중지'},
  {key:5, value:'CONVERSION_PER_SALES', label:'수집 전'},
  {key:6, value:'CONVERSION_COUNT', label:'확인 필요'}
]

export const goalVisitType = [
  {key:0, value:'VISIT_CLICK_COUNT', label:'정상 수집'},
  {key:1, value:'VISIT_SPENT_COST', label:'수집 중지'},
  {key:2, value:'VISIT_CLICK_COST', label:'수집 전'}
]

export const goalViewType = [
  {key:0, value:'VIEW_COUNT', label:'정상 수집'},
  {key:1, value:'VIEW_CPM_COST', label:'수집 중지'}
]

export const biddingTypeAll = [
  {key:0, value:'CPC', label:'CPC'},
  {key:1, value:'CPM', label:'CPM'}
]
