import {atom} from "jotai";
import React from "react";

/* 플랫폼 현황 차트 셀렉트 */
export const platformStatusType = [
  {id: 1, value: "userCount", label: "광고주수"},
  {id: 2, value: "totalExposureCount", label: "총노출수"},
  {id: 3, value: "totalClickCount", label: "총클릭수"},
  {id: 4, value: "clickRate", label: "클릭률"},
  {id: 5, value: "costAmount", label: "비용"},
  {id: 6, value: "cpc", label: "CPC"},
  {id: 7, value: "conversionRate", label: "전환율"},
  {id: 8, value: "costPerConversion", label: "전환단가"},
  {id: 9, value: "avgConversionAmount", label: "구매액"},
  {id: 11, value: "sessionRoas", label: "세션매출"},
  {id: 12, value: "directRoas", label: "직접매출"},
  {id: 13, value: "exposureRoas", label: "노출매출"},
  {id: 14, value: "totalRoas", label: "총매출"},
  {id: 15, value: "ecpm", label: "ECPM"},
]
/*플랫폼 현황 차트 데이터*/
export const platformStatusAtom = atom([])

/*플랫폼 현황 차트 항목별 합산*/
export const platformTotalCont = {
  clickCountTotal:0, //clickCount 합산
  exposureCountTotal:0,//exposureCount 합산
  totalConversionCount:0,//conversionCount 합산
  userCount:0,//userCount 합산
  totalExposureCount:0,//totalExposureCount 합산
  totalClickCount:0,//totalClickCount 합산
  clickRate: 0,
  costAmount:0,//costAmount 합산
  cpc:0,//avgCpc 평균 계산
  conversionRate:0,//conversionRate 평균 계산
  costPerConversion:0,//costPerConversion 평균 계산
  avgConversionAmount:0,//avgConversionAmount 평균 계산
  sessionRoas:0,//세션매출 평균 계산
  directRoas:0,//직접매출 평균 계산
  exposureRoas:0,//노출매출 평균 계산
  totalRoas:0,//총매출 평균 계산
  ecpm:0,//ecpm 평균 계산
}
export const lineDataAtom = atom(null)
export const cloneLineDataAtom = atom(null)
export const onOffStatus = {
  clickCount: true,
  exposureCount: true,
  totalConversionCount: true,
  userCount: false,
  totalExposureCount: false,
  totalClickCount: false,
  clickRate: false,
  costAmount: false,
  cpc: false,
  conversionRate: false,
  costPerConversion: false,
  avgConversionAmount: false,
  sessionRoas: false,
  directRoas: false,
  exposureRoas: false,
  totalRoas: false,
  ecpm: false
}

export const toolTipLabel = {
  clickCount: '클릭수',
  exposureCount: '노출수',
  totalConversionCount: '전환수',
  userCount: '광고주수',
  totalExposureCount: '총 노출수',
  totalClickCount: '총 클릭수',
  clickRate: '클릭률',
  costAmount: '비용',
  cpc: 'CPC',
  conversionRate: '전환율',
  costPerConversion: '전환 단가',
  avgConversionAmount: '평균 구매액',
  sessionRoas: '세션매출',
  directRoas: '직접매출',
  exposureRoas: '노출매출',
  totalRoas: '총매출',
  ecpm: 'ECPM'
}