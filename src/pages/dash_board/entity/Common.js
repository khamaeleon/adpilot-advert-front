import {getThisMonth} from "../../../common/DateUtils";
import {atom} from "jotai";

export const searchConditionAtom = atom({
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  deviceType : null,
  agentTypes: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP'],
  keyword: '',
})

/* 광고 상품 타입 */
export const productType = [
  {id: "1", value: null, label: "전체"},
  {id: "2", value: "BANNER", label: "배너"},
  {id: "3", value: "POP_UNDER", label: "팝언더"}
]

export const deviceType = [
  {key:1,value:null,label: '전체'},
  {key:2,value:'PC',label: 'PC'},
  {key:3,value:'MOBILE',label: '모바일'},
  {key:4,value:'RESPONSIVE_WEB',label: '반응형 웹'}
]

export const eventType = [
  {key:1,value:null,label: '전체'},
  {key:2,value:'SAW_THE_PRODUCT',label: '카트 추천'},
  {key:3,value:'CART_THE_PRODUCT',label: '상품 추천'},
  {key:4,value:'DOMAIN_MATCHING',label: '유저 매칭'},
  {key:5,value:'USER_OPTIMIZATION',label: '유저 최적화'}
]