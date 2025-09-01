import {AdminAxios} from "../../common/Axios";

const isInit = false;

const ACTION_URL = '/adver/setting'
const PRICE_EVENT = '/price'
const PRICE_LIST= '/price/list'


/**
 * 이벤트 단가 관리 광고주 리스트
 * @param keyword
 * @returns {Promise<null>}
 */
export async function selAdverPriceEventList(keyword) {
  let returnVal = null;
  if(isInit){
    return {
       totalCount: "1", //총 광고주 수.
       userDtos: [{
             userId: "1", //      UUID
             username: "ytkim_adver", //    광고주 id.
             adverName: "용태팡", //   광고주 명.
             managerName: "김용태", // 담당자 명.
             count: 1, //       그룹 수.
       }],  //광고주 리스트.

    };
  }
  await AdminAxios('POST', ACTION_URL + PRICE_LIST ,keyword)
    .then((response) => {
      const {data, statusCode} = response;
      if(statusCode === 200){
        returnVal = data;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 이벤트 단가 관리 상세 리스트
 * @param username
 * @returns {Promise<null>}
 */
export async function selPriceEventList(userId) {
  let returnVal = null;
  if(isInit) {
    return {
       userId: "1",//         UUID
       username: "ytkim_advert",//       광고주 id.
       adverName: "용태팡",//      광고주 명.
       managerName: "김용태",//    담당자 명.
       lastModifiedAt: "20250810",// 최근 수정 날짜.
       targetingPriceDtos: [
         {
           targetingPriceId: "1", //               이벤트 단가 id.
           targetingPrice: "100", //               이벤트 단가 id.
           groupName: "이벤트 단가 그룹1", //             이벤트 단가 그룹 name.
           shopperMatching: "0", //       쇼퍼 맞춤.
           cartRecommendation: "0", //    카트 추천.
           productRecommendation: "0", // 상품 추천.
           userMatching: "0", //          유저 매치.
           audience: "0", //              오디언스.
           userOptimization: "0" //      유저 최적화.}
         }
       ]// 이벤트 단가 그룹 리스트.
    }
  }
  await AdminAxios('GET', ACTION_URL + PRICE_EVENT +'/'+userId)
    .then((response) => {
      const {data, statusCode} = response;
      if(statusCode === 200){
        returnVal = data;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 이벤트 단가 관리 등록
 * @param priceEventInfo
 * @returns {Promise<null>}
 */
export async function resistPriceEvent(priceEventInfo) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + PRICE_EVENT ,priceEventInfo)
    .then((response) => {
      const {statusCode} =response;
      if(statusCode === 200){
        returnVal = true;
      }else{
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 이벤트 단가 관리 수정
 * @param priceEventInfo
 * @returns {Promise<null>}
 */
export async function updatePriceEvent(priceEventInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL + PRICE_EVENT ,priceEventInfo)
    .then((response) => {
      const {statusCode} = response;
      if(statusCode === 200){
        returnVal = true;
      }else{
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
