import {AdminAxios, AdverAxios} from "../../common/Axios";

const isInit = true;

const ACTION_URL ='/adver/campaign/'
const CONFIRM ='/confirm'
export async function retrieveConfirm(campaignId) { //어드민 캠페인 검토 조회
  let returnVal = null;
  if(isInit){
    return {
      id : "1", //                  캠페인 id
      name : "캠페인1", //                캠페인 명
      productType : "AUDIO", //         캠페인 상품.
      goalType : "CAMPAIGN_VIEW_GOAL", //            캠페인 목표.
      goal : "VIEW_COUNT", //                캠페인 상세 목표.
      goalValue : "12", //           캠페인 목표 값.
      pixelName : "픽셀명1", //           픽셀명.
      pixelLinkUrl : "https://pixel.co.kr", //        픽셀 url.
      pixelStatus : "Y", //         픽셀 상태.
      infiniteBudgetYn : "Y", //    일일 예산 무제한.
      dailyAvgBudget : "10", //      일일 평균 예산.
      pcBudget : "100", //            예산 비율(PC).
      mobBudget : "0", //           예산 비율(Mobile).
      budgetTimeName : "1", //      시간별 예산 그룹.
      targetingBudgetName : "1", // 타겟팅 예산 그룹.
      biddingType : "CPC", //         입찰 방식.
      maxBiddingPrice : "10", //     최대 입찰가.
      targetingPriceName : "이벤트단가1", //  이벤트 단가 그룹.
      inventoryDetail : {
        name: "", //                        광고 그룹 명.
        exposureAgentType: ["WEB"], //           노출 영역.
        exposureInventoryType: "", //       게재 지면.
        allowInventoryCategories: "", //    허용 지면 카테고리.
        allowInventoryIds: "", //           허용 지면 아이디.
        disExposureInventoryType: "", //    비 게재 지면 타입.
        disAllowInventoryCategories: "", // 비 게재 카테고리 타입.
        disAllowInventoryIds: "", //        송출 제한 지면.
        startDate: "20250810", //                   게재 기간 시작일.
        endDate: "20250810", //                     게재 기간 종료일.
        userTargetConfigType: "", //        고객 정보 기반 설정 타입.
        userTargetConfig: "", //            고객 정보 기반 설정.
        audienceTargetConfigType: "", //    오디언스 분석 설정 타입.
        audienceTargetConfig: "", //        오디언스 분석 설정.
      }, //     광고 그룹 설정 상세 Response.
      creativeType : "", //        설정 크리에이티브 타입.
      creativeName : "용태팡 자연의 소리", //        크리에이티브명.
      pcLandingUrl : "https://adpilot.co.kr", //        PC 랜딩 url.
      pcReferralCode : "test=pc", //      PC 인식 코드.
      mobLandingUrl : "https://adpilot.co.kr", //       Mobile 랜딩 url.
      mobReferralCode : "test=mobile", //     Mobile 인식 코드.
    }
  }
  await AdminAxios('GET', ACTION_URL+campaignId+CONFIRM)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function updateCampaignDefaultInfo(campaignId, name) { //어드민 캠페인명 수정
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL+campaignId, name)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function retrieveAdverConfirm(campaignId) { //광고주 캠페인 검토 조회
  let returnVal = null;
  if(isInit){
    return {
      id : "", //                  캠페인 id
      name : "", //                캠페인 명
      productType : "", //         캠페인 상품.
      goalType : "", //            캠페인 목표.
      goal : "", //                캠페인 상세 목표.
      goalValue : "", //           캠페인 목표 값.
      pixelName : "", //           픽셀명.
      pixelLinkUrl : "", //        픽셀 url.
      pixelStatus : "", //         픽셀 상태.
      infiniteBudgetYn : "", //    일일 예산 무제한.
      dailyAvgBudget : "", //      일일 평균 예산.
      pcBudget : "", //            예산 비율(PC).
      mobBudget : "", //           예산 비율(Mobile).
      budgetTimeName : "", //      시간별 예산 그룹.
      targetingBudgetName : "", // 타겟팅 예산 그룹.
      biddingType : "", //         입찰 방식.
      maxBiddingPrice : "", //     최대 입찰가.
      targetingPriceName : "", //  이벤트 단가 그룹.
      inventoryDetail : {
         name: "", //                        광고 그룹 명.
         exposureAgentType: "WEB", //           노출 영역.
         exposureInventoryType: "MANUAL", //       게재 지면.
         allowInventoryCategories: "", //    허용 지면 카테고리.
         allowInventoryIds: "", //           허용 지면 아이디.
         disExposureInventoryType: "", //    비 게재 지면 타입.
         disAllowInventoryCategories: "", // 비 게재 카테고리 타입.
         disAllowInventoryIds: "", //        송출 제한 지면.
         startDate: "", //                   게재 기간 시작일.
         endDate: "", //                     게재 기간 종료일.
         userTargetConfigType: "", //        고객 정보 기반 설정 타입.
         userTargetConfig: "", //            고객 정보 기반 설정.
         audienceTargetConfigType: "", //    오디언스 분석 설정 타입.
         audienceTargetConfig: "", //        오디언스 분석 설정.
      }, //     광고 그룹 설정 상세 Response.
      creativeType : "", //        설정 크리에이티브 타입.
      creativeName : "용태팡 자연의 소리", //        크리에이티브명.
      pcLandingUrl : "", //        PC 랜딩 url.
      pcReferralCode : "", //      PC 인식 코드.
      mobLandingUrl : "", //       Mobile 랜딩 url.
      mobReferralCode : "", //     Mobile 인식 코드.
    }
  }
  await AdverAxios('GET', '/campaign/'+campaignId+CONFIRM)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selAdverEnumInfo(enumInfo) {
  let returnVal = null;
  await AdverAxios('GET', `/campaign/${enumInfo}/list`)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
