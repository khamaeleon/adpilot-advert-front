import {getThisMonth} from "../../../common/DateUtils";
import {atom} from "jotai";

export const searchConditionAtom = {
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  deviceType : null,
  agentTypes: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP'],
  keyword: '',
}

/* 광고 상품 타입 */
export const productType = [
  {id: "1", value: null, label: "기본"},
  {id: "2", value: "BANNER", label: "배너"},
  {id: "3", value: "POP_UNDER", label: "팝언더"}
]

export const deviceType = [
  {key:1,value:null,label: '전체'},
  {key:2,value:'PC',label: 'PC 웹'},
  {key:3,value:'MOBILE',label: '모바일'},
  {key:4,value:'RESPONSIVE_WEB',label: '반응형'}
]