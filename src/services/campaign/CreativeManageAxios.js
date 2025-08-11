import {AdminAxios} from "../../common/Axios";

const isInit = true;
export async function findCreativeGroupList(value) {
  let returnVal = null;
  if(isInit){
    return {
       totalCount: 1, //  총 광고주 수
       creativeGroupDtos: [
         {
           userId: "ytkim", //        adver UUID
           username: "ytkim_advert", //      광고주 계정
           adverName: "용태팡", //     광고주 명
           managerName: "김용태", //   매니저 명
           creativeCount: "1", // 크리에티브 수
         }
       ], // 광고주 리스트.
    }
  }
  await AdminAxios('POST', `/adver/creative/list` ,{keyword: value})
    .then((response) => {
      const { responseCode } = response
      if(responseCode.statusCode ===200){
        returnVal = responseCode.statusCode === 200 ? response.data : null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function retrieveCreativeByUserId(userId) {
  let returnVal = null;
  if(isInit) {
    return [{
      userId: "1", //       유저 id.
      campaignId: "test", //   캠페인 id.
      creativeId: "1", //   크리에이티브 id.
      creativeName: "용태팡 자연의 소리", // 크리에이티브 명.
      productType: "AUDIO", //  플랫폼 상품 타입.
      creativeType: "AUDIO", // 크리에이티브 타입.
      images: [{
        imagePath: "", //     업로드된 이미지 url.
        thumbnailPath: "", // 썸네일 이미지 url.
      }], //       이미지 리스트.
    }]
  }
  await AdminAxios('GET', `/adver/creative/${userId}` ,null)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = responseCode.statusCode === 200 ? response.data : null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};