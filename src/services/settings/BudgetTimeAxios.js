import {AdminAxios} from "../../common/Axios";

const isInit = false;

const ACTION_URL ='/adver/setting'
const BUDGET_TIME_LIST ='/time'
const ADVER_LIST ='/time/list'

export async function selBudgetTimeAdverList(keyword) {
  let returnVal = null;
  if(isInit) {
    return {totalcount: 1, userDtos: [{
      userId: "1", //         user Id. UUID.
      username: "ytkim_advert", //       광고주 id.
      adverName: "용태팡", //      광고주 명.
      managerName: "김용태", //    담당자 명.
      lastModifiedAt: "20250810", // 최근 수정 날짜.
      timeGroups: [
        {
          id: "1",//               그룹 id
          userId: "1",//           광고주 UUID
          groupName: "그룹명",//        그룸 명
          exposureTimeType: "EQUAL_DISTRIBUTION",// 노출 타입
          dayOfWeeks: [
            "MONDAY", "TUESDAY", "WEDNESDAY"
          ],//       요일 리스트
        }
      ], //     타임 그룹 리스트.
    }]}
  }
  await AdminAxios('POST', ACTION_URL + ADVER_LIST , keyword)
    .then((response) => {
      const {data, statusCode} = response;
      if(statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selBudgetTimeList(userId) {
  let returnVal = null;

  if(isInit) {
    return {
       userId: "1", //         user Id. UUID.
       username: "ytkim_advert", //       광고주 id.
       adverName: "용태팡", //      광고주 명.
       managerName: "김용태", //    담당자 명.
       lastModifiedAt: "20250810", // 최근 수정 날짜.
       timeGroups: [
         {
            id: "1",//               그룹 id
            userId: "1",//           광고주 UUID
            groupName: "시간별 예산 그룹1",//        그룸 명
            exposureTimeType: "EQUAL_DISTRIBUTION",// 노출 타입
            dayOfWeeks: [
              "MONDAY", "TUESDAY", "WEDNESDAY"
            ],//       요일 리스트
         }
       ], //     타임 그룹 리스트.
    }
  }
  await AdminAxios('GET', ACTION_URL + BUDGET_TIME_LIST +'/'+userId)
    .then((response) => {
      const {data, statusCode} = response;
      if(statusCode === 200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selBudgetTimeDetailInfo(userId,groupId) {
  let returnVal = null;
  if(isInit){
    return {
      allowTimes:[],
      budgetItemId: 0,
      exposureTimeType: '',
      groupName: '',
      lastModifiedAt: '',
      userId: ''
    }
  }
  await AdminAxios('GET', ACTION_URL + BUDGET_TIME_LIST +'/'+userId +'/'+groupId)
    .then((response) => {
      const {data, statusCode} = response;
      if(statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function resistBudgetTimes(budgetTimesInfo) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + BUDGET_TIME_LIST ,budgetTimesInfo)
    .then((response) => {
      const {statusCode} = response
      if(statusCode === 200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function updateBudgetTimes(budgetTimesInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL + BUDGET_TIME_LIST ,budgetTimesInfo)
    .then((response) => {
      const {statusCode} = response;
      if(statusCode === 200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
