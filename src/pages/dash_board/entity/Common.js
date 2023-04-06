import {getThisMonth} from "../../../common/DateUtils";

export const searchConditionAtom = {
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: 'DEFAULT',
  agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP'],
  keyword: '',
  pageSize: 1000,
  currentPage:1,
  username:''
}

/* 광고 상품 타입 */
export const productType = [
  {id: "1", value: "DEFAULT", label: "기본"},
  {id: "2", value: "PRODUCT_CODE", label: "배너"},
  {id: "3", value: "PRODUCT_NAME", label: "팝언더"}
]