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