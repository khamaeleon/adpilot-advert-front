import {getThisMonth} from "../../../common/DateUtils";
import {hostList} from "../../signup/entity/Common";

/**
 * 상품 수집 기간 검색 아톰
 * @type {PrimitiveAtom<{endDate: string, stateDate: string}> & WithInitialValue<{endDate: string, stateDate: string}>}
 */
export const searchConditionAtom = {
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  searchType: 'DEFAULT',
  keyword: '',
  pageSize: 1000,
  currentPage:1,
  username:''
}

/**
 * 호스트 타입
 * @type
 */
export const hostType = [
  {key: 100, value: "ALL", label: "전체"},
  ...hostList
]
