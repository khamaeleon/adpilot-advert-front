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
export const lineDataAtom = atom(null)
export const cloneLineDataAtom = atom(null)
export const chartDataAtom = atom({
  clickCount: {status: true, label: '클릭수', totalCount: 0, color: '#9FA291'},
  exposureCount: {status: true, label: '노출수', totalCount: 0, color: '#ba9480'},
  totalConversionCount: {status: true, label: '전환수', totalCount: 0, color: '#E5D9C9'},
  userCount: {status: true, label: '광고주수', totalCount: 0, color: '#B28C66'},
  totalExposureCount: {status: false, label: '총 노출수', totalCount: 0, color: '#CA785C'},
  totalClickCount: {status: false, label: '총 클릭수', totalCount: 0, color: '#AD6D4E'},
  clickRate: {status: false, label: '클릭률', totalCount: 0, color: '#d0c2bd'},
  costAmount: {status: true, label: '비용', totalCount: 0, color: '#DDD6CE'},
  cpc: {status: false, label: 'CPC', totalCount: 0, color: '#e8b867'},
  conversionRate: {status: false, label: '전환율', totalCount: 0, color: '#ffc1a2'},
  costPerConversion: {status: false, label: '전환 단가', totalCount: 0, color: '#987151'},
  avgConversionAmount: {status: false, label: '평균 구매액', totalCount: 0, color: '#B2AFAA'},
  sessionRoas: {status: false, label: '세션매출', totalCount: 0, color: '#EEECE8'},
  directRoas: {status: false, label: '직접매출', totalCount: 0, color: '#6eb658'},
  exposureRoas: {status: false, label: '노출매출', totalCount: 0, color: '#73a1b2'},
  totalRoas: {status: false, label: '총매출', totalCount: 0, color: '#BDB8B2'},
  ecpm: {status: false, label: 'ECPM', totalCount: 0, color: '#BC8A99'},
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
  //colors={[,,,,]}
  axisLeft:null,
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