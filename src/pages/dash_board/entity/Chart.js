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

/* 특정 광고주 광고 현황 차트 셀렉트 */
export const userPlatformStatusType = [
  {id: 1, value: "userCount", label: "광고주수"},
  {id: 2, value: "totalExposureCount", label: "총노출수"},
  {id: 3, value: "totalClickCount", label: "총클릭수"},
  {id: 4, value: "clickRate", label: "클릭률"},
  {id: 5, value: "costAmount", label: "비용"},
  {id: 6, value: "cpc", label: "CPC"},
  {id: 7, value: "conversionRate", label: "전환율"},
  {id: 8, value: "costPerConversion", label: "전환단가"},
  {id: 9, value: "avgConversionAmount", label: "구매액"},
  {id: 14, value: "totalRoas", label: "총매출"},
  {id: 15, value: "ecpm", label: "ECPM"},
]

/*플랫폼 현황 차트 항목별 합산*/
export const chartDataAtom = atom({
  validClickCount: {status: true, label: '클릭수', totalCount: 0},
  exposureCount: {status: true, label: '노출수', totalCount: 0},
  totalConversionCount: {status: true, label: '전환수', totalCount: 0},
  userCount: {status: true, label: '광고주수', totalCount: 0},
  totalExposureCount: {status: false, label: '총 노출수', totalCount: 0},
  totalClickCount: {status: false, label: '총 클릭수', totalCount: 0},
  clickRate: {status: false, label: '클릭률', totalCount: 0},
  costAmount: {status: true, label: '비용', totalCount: 0},
  cpc: {status: false, label: 'CPC', totalCount: 0},
  conversionRate: {status: false, label: '전환율', totalCount: 0},
  costPerConversion: {status: false, label: '전환 단가', totalCount: 0},
  avgConversionAmount: {status: false, label: '평균 구매액', totalCount: 0},
  sessionRoas: {status: false, label: '세션매출', totalCount: 0},
  directRoas: {status: false, label: '직접매출', totalCount: 0},
  exposureRoas: {status: false, label: '노출매출', totalCount: 0},
  totalRoas: {status: false, label: '총매출', totalCount: 0},
  ecpm: {status: false, label: 'ECPM', totalCount: 0},
})

export const commonProperties = {
  margin:{top: 30, right: 50, bottom: 30, left: 50},
  padding:0.75,
  yScale:{
    base: 10,
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: false,
    reverse: false
  },
  axisBottom:{
    tickSize: 0,
    tickPadding: 15,
    tickRotation: 0,
    legendOffset: 32,
  },
  enableGridY:false,
  useMesh:true,
  enableCrosshair:false,
  enableSlices:'x',
};