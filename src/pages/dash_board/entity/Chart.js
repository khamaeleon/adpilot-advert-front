import {atom} from "jotai";
import {SwitchComponent} from "../../../components/table";
import {updatePixelInterlock} from "../../../services/header/ManagePixelAxios";
import {Link} from "react-router-dom";
import React from "react";
import {statusTypeAll} from "../../pixel/entity/Pixel";

/* 플랫폼 현황 차트 셀렉트 */
export const platformStatusType = [
  {id: 1, value: "userCount", label: "광고주수"},
  {id: 2, value: "totalExposureCount", label: "총노출수"},
  {id: 3, value: "totalClickCount", label: "총클릭수"},
  {id: 4, value: "clickRate", label: "클릭률"},
  {id: 5, value: "costAmount", label: "비용"},
  {id: 6, value: "cpc", label: "CPC"},
  {id: 7, value: "conversionRate", label: "전환율"},
  {id: 8, value: "conversionPerSales", label: "전환단가"},
  {id: 9, value: "avgConversionAmount", label: "구매액"},
  {id: 11, value: "roas", label: "ROAS"},
  {id: 12, value: "ecpm", label: "ECPM"},
]
/*플랫폼 현황 차트 데이터*/
export const platformStatusAtom = atom([])

/*플랫폼 현황 차트 항목별 합산*/
export const platformTotalCont = {
  clickCountTotal:0, //clickCount 합산
  exposureCountTotal:0,//exposureCount 합산
  conversionCountTotal:0,//conversionCount 합산
  userCount:0,//userCount 합산
  totalExposureCount:0,//totalExposureCount 합산
  totalClickCount:0,//totalClickCount 합산
  clickRate: 0,
  costAmount:0,//costAmount 합산
  cpc:0,//avgCpc 평균 계산
  conversionRate:0,//conversionRate 평균 계산
  conversionPerSales:0,//conversionPerSales 평균 계산
  avgConversionAmount:0,//avgConversionAmount 평균 계산
  roas:0,//roas 평균 계산
  ecpm:0,//ecpm 평균 계산
}
export const lineDataAtom = atom(null)
export const cloneLineDataAtom = atom(null)