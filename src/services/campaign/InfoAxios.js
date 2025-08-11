import {AdminAxios} from "../../common/Axios";

const isInit = true;

const ACTION_URL = '/adver/campaign'
const ENUM_LIST = 'list'
const TEMPORARY_LIST = '/temporaries'

export async function selEnumInfo(enumInfo) {
  let returnVal = null;
  if (isInit) {
    switch (enumInfo) {
      case "CAMPAIGN_CONVERSION_GOAL":
        return {
          data: [
            {label: "세션 ROAS", value: "CONVERSION_SESSION_ROAS"},
            {label: "직접 ROAS", value: "CONVERSION_DIRECT_ROAS"},
            {label: "총 ROAS", value: "CONVERSION_TOTAL_ROAS"},
            {label: "세션 매출", value: "CONVERSION_SESSION_SALES"},
            {label: "직접 매출", value: "CONVERSION_DIRECT_SALES"},
            {label: "총 매출", value: "CONVERSION_TOTAL_SALES"},
            {label: "전환 단가", value: "CONVERSION_PER_SALES"},
            {label: "전환 카운트", value: "CONVERSION_COUNT"}]
        };
        break;
      case "CAMPAIGN_VISIT_GOAL":
        return {
          data: [
            {label: "클릭 카운트", value: "VISIT_CLICK_COUNT"},
            {label: "소진 금액", value: "VISIT_SPENT_COST"},
            {label: "클릭 단가", value: "VISIT_CLICK_COST"}]
        };
        break;
      case "CAMPAIGN_VIEW_GOAL":
        return {
          data: [
            {
              label: "노출 카운트",
              value: "VIEW_COUNT",
              goalType: "CAMPAIGN_VIEW_GOAL"
            },
            {
              label: "CPM 단가",
              value: "VIEW_CPM_COST",
              goalType: "CAMPAIGN_VIEW_GOAL"
            }]
        };
        break;
      case "AGENT_TYPE":
        return {
          data: [
            {key: "1", label: "WEB", value: "PC 웹"},
            {key: "2", label: "WEB_APP", value: "PC 어플리케이션"},
            {key: "3", label: "MOBILE_WEB", value: "모바일 웹"},
            {key: "4", label: "MOBILE_HYBRID_APP", value: "하이브리드 APP"},
            {key: "5", label: "MOBILE_NATIVE_APP", value: "네이티브 APP"}
          ]
        };
        break;
      case "BANNER_SIZE":
        return {
          data: [
            {key: "1", label: "IMG300_150", value: "w300x150(300_150)"},
            {key: "2", label: "IMG200_200", value: "w200x200(200_200)"},
            {key: "3", label: "IMG120_600", value: "w120x600(120_600)"},
            {key: "4", label: "IMG150_150", value: "w150x150(150_150)"},
            {key: "5", label: "IMG160_600", value: "w160x600(160_600)"},
            {key: "6", label: "IMG100_200", value: "w100x200(100_200)"},
            {key: "7", label: "IMG100_300", value: "w100x300(100_300)"},
            {key: "8", label: "IMG100_400", value: "w100x400(100_400)"},
            {key: "9", label: "IMG100_500", value: "w100x500(100_500)"},
            {key: "10", label: "IMG100_600", value: "w100x600(100_600)"},
            {key: "11", label: "IMG300_300", value: "w300x300(300_300)"},
            {key: "12", label: "IMG400_400", value: "w400x400(400_400)"},
            {key: "13", label: "IMG500_500", value: "w500x500(500_500)"},
            {key: "14", label: "IMG600_600", value: "w600x600(600_600)"}
          ]
        };
        break;
      case "CLICK_INDUCEMENT_TYPE":
        return {
          data: [
            {label: "가입하기", value: "REGISTER"},
            {label: "게임하기", value: "GAMING"},
            {label: "구매하기", value: "PURCHASE"},
            {label: "다운로드", value: "DOWNLOAD"},
            {label: "문의하기", value: "INQUIRE"},
            {label: "바로가기", value: "SHORTCUT"},
            {label: "사용하기", value: "USING"},
            {label: "설치하기", value: "INSTALL"},
            {label: "소식받기", value: "SUBSCRIBE"},
            {label: "신청하기", value: "APPLY"},
            {label: "실행하기", value: "PLAY"},
            {label: "알아보기", value: "LEARN"},
            {label: "예약하기", value: "RESERVE"},
            {label: "채널추가", value: "ADD_CHANNEL"},
            {label: "쿠폰받기", value: "GET_COUPON"}
          ]
        };
        break;
      case "CREATIVE_TYPE_AUDIO":
        return {
          data: [
            {key:"1", label:"AUDIO", value:"AUDIO"}
          ]
        };
        break;
    }
  }

  await AdminAxios('GET', ACTION_URL + '/' + enumInfo + '/' + ENUM_LIST)
  .then((response) => {
    if (response.responseCode.statusCode === 200) {
      returnVal = response.data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

export async function resistCampaignBasic(campaignInfo) {
  let returnVal = null;
  if (isInit) {
    return {
      productType: 'BANNER',
      goalType: 'CAMPAIGN_CONVERSION_GOAL',
      pixelId: '',
      goal: '',
      goalValue: 0,
      campaignId: '',
      step: ''
    }
  }
  await AdminAxios('POST', ACTION_URL, campaignInfo)
  .then((response) => {
    const {responseCode, data} = response
    if (responseCode.statusCode === 201) {
      returnVal = data
    } else {
      returnVal = false
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selTemporaryList(userId) {
  let returnVal = null;
  if (isInit) {
    return [
      {
        id: "1",//          Campaign Id.
        name: "캠페인1",//        Campaign 이름.
        productType: "AUDIO",// 캠페인 상품.
        goal: "",//        캠페인 목표.
        goalValue: "",//   캠페인 목표 값.
        pixelId: "1",//     최적화 픽셀 id.
        step: "1",//        캠페인 생성 단계.
        createdAt: "20250810",//   캠페인 생성 일시.
        modifiedAt: "20250810",//  캠페인 수정 일시.
      }
    ]
  }
  await AdminAxios('GET', ACTION_URL + TEMPORARY_LIST + '?userId=' + userId)
  .then((response) => {
    if (response.responseCode.statusCode === 200) {
      returnVal = response.data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

export async function selBasicInfo(userId) {
  let returnVal = null;
  if (isInit) {
    return {
      id: "1",//          Campaign Id.
      name: "캠페인 임시저장1",//        Campaign 이름.
      productType: "AUDIO",// 캠페인 상품.
      goalValue: "12",//   캠페인 목표 값.
      goalType: 'CAMPAIGN_VIEW_GOAL',
      pixelId: '1',
      goal: 'VIEW_COUNT',
      step: "1",//        캠페인 생성 단계.
      createdAt: "20250810",//   캠페인 생성 일시.
      modifiedAt: "20250810",//  캠페인 수정 일시.
    }
  }
  await AdminAxios('GET', ACTION_URL + '/' + userId)
  .then((response) => {
    if (response.responseCode.statusCode === 200) {
      returnVal = response.data
    } else {
      returnVal = null
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 임시 저장 캠페인 삭제
 * @param campaignId
 * @returns {Promise<false>}
 */
export async function deleteTemporary(campaignId) {
  let returnVal = null;
  await AdminAxios('DELETE', ACTION_URL + '/' + campaignId + '/temporary', null)
  .then((response) => {
    returnVal = response.responseCode.statusCode === 200 ? true : false;
  }).catch((e) => returnVal = false)
  return returnVal;
}
